const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

const main = async () => {
    try {
        const token = core.getInput("token", {required: true});
        const owner = core.getInput("owner", {required: true});
        const repo = core.getInput("repo", {required: true});
        const actor = core.getInput("actor", {required: true});
        const ref = core.getInput("ref", {required: true});

        const tag_name = ref.split("/")[ref.split("/").length - 1];
        const octokit = github.getOctokit(token);

        // создаем релизную ветку, если ее не существует
        const {data: branches} = await octokit.rest.repos.listBranches({owner, repo});
        let branchExists = false;
        branches.forEach((branch) => {
            if (branch.name === `release/${tag_name}`) branchExists = true;
        })
        const releaseBranchName = `release/${tag_name}`
        if (!branchExists) {
            await exec.exec("git", ["checkout", "-b", releaseBranchName])
            await exec.exec("git", ["push", "origin", releaseBranchName])
        }

        // создаем релиз, если его не существует
        const {data: releases} = await octokit.rest.repos.listReleases({owner, repo});

        let releaseId;
        releases.forEach((release) => {
            if (release.tag_name === tag_name) releaseId = release.id;
        })

        let releaseData;
        if (releaseId === undefined) {
            const {data} = await octokit.rest.repos.createRelease({
                owner, 
                repo,
                tag_name,
                generate_release_notes: true,
            });
            releaseData = data;
        } else {
            const {data} = await octokit.rest.repos.updateRelease({
                owner,
                repo,
                release_id: releaseId,
            })
            releaseData = data;
        }

        // создаем changelog между двумя тегами
        let tagsOutput = "";
        const options = {};
        options.listeners = {
            stdout: (data) => {
                tagsOutput += data.toString();
            },
        };
        await exec.exec('git', ['tag'] , options);
        let tags = tagsOutput.split("\n").filter((tag) => tag.trim() !== "");

        // получаем коммиты между двумя тегами
        let commitsOutput = "";
        const commitsOptions = {};
        commitsOptions.listeners = {
            stdout: (data) => {
                commitsOutput += data.toString();
            },
        };
        if (tags.length === 1) {
            await exec.exec('git', ['log', "--pretty=oneline", releaseBranchName] , commitsOptions);
        } else {
            const secondTagName = tags[tags.indexOf(tag_name) - 1].trim();
            // можем идти от HEAD так как 1) в случае push-a нового тега - коммит с новым тегом и будет HEAD 2) в случае ветки release/* - HEAD может также содержать hotfixes
            // + если бы у нас была ветка release/*, то мы бы делали git log от нее, а не от главной ветки
            await exec.exec('git', ['log', "--pretty=oneline", releaseBranchName, `HEAD...${secondTagName}`] , commitsOptions);
        }

        // фильтруем коммиты по заголовку
        let commitsBetween = commitsOutput.split("\n").filter((commit) => commit.trim() !== "");
        const commitsCategories = {"feat" : [], "fix": [], "Merge pull request": []}, commitsTitles = {"feat": "🚀 Что было добавлено?", fix: "⚙️ Что было исправлено?", "Merge pull request": "🕸 Какие были PR?"}, others = [];
        let fullChangelog = "";
        commitsBetween.forEach((commit, index) => {
            commit = commit.trim();
            const firstSpaceIndex = commit.indexOf(" ");
            const sha = commit.substring(0, firstSpaceIndex).trim(), text =  commit.substring(firstSpaceIndex + 1).trim();
            
            let hasCategory = false;
            Object.keys(commitsCategories).forEach((category) => {
                if (text.startsWith(category)) {
                    commitsCategories[category].push({sha, text});
                    hasCategory = true;
                }
            })
            if (!hasCategory) others.push({sha, text})
            fullChangelog += `${commitsBetween.length - index}. <a href="https://github.com/${owner}/${repo}/commit/${sha}">${text}</a><br/>`
        })

        // формируем issue body
        let issueBody = `## Кто автор?
@${actor}
        
## Когда был создан релиз?
${releaseData.published_at}
        
## Какая версия у релиза?
${tag_name}
`

        Object.keys(commitsCategories).forEach((category) => {
            if (commitsCategories[category].length > 0) {
                issueBody += `## ${commitsTitles[category]}\n`
                commitsCategories[category].forEach(({sha, text}) => {
                    issueBody += `- ${text} - [commit link](https://github.com/${owner}/${repo}/commit/${sha})\n`
                })
            }
        })
        if (others.length > 0) {
            issueBody += `## 🌈 Остальное\n`
            others.forEach(({sha, text}) => {
                issueBody += `- ${text} - [commit link](https://github.com/${owner}/${repo}/commit/${sha})\n`
            })
        }
        if (fullChangelog.length > 0) {
            issueBody += `<details>
<summary>Полный список изменений</summary>
${fullChangelog}
</details>`
        }

        // создаем issue, если его не сущесвует
        const {data: issues} = await octokit.rest.issues.listForRepo({owner, repo, labels: ["RELEASE"]});
        
        let issueNumber;
        issues.forEach((issue) => {
            if (issue.title === `RELEASE - ${tag_name}`) issueNumber = issue.number;
        })

        if (issueNumber === undefined) {
            await octokit.rest.issues.create({
                owner,
                repo,
                title: `RELEASE - ${tag_name}`,
                labels: ["RELEASE"],
                body: issueBody,
            })
        } else {
            await octokit.rest.issues.update({owner, repo, issue_number: issueNumber, body: issueBody})
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

main();