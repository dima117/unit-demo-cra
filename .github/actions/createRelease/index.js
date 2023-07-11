const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

const main = async () => {
    try {
        const token = core.getInput("token", {required: true});
        const owner = core.getInput("owner", {required: true});
        const repo = core.getInput("repo", {required: true});

        const ref = core.getInput("ref", {required: true});
        const tag_name = ref.split("/")[2];

        const actor = core.getInput("actor", {required: true});
        
        // создаем релиз
        const octokit = github.getOctokit(token);
        const {data: releaseData} = await octokit.rest.repos.createRelease({
            owner, 
            repo,
            tag_name,
            generate_release_notes: true,
        });

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
            await exec.exec('git', ['log', "--pretty=oneline"] , commitsOptions);
        } else {
            const secondTagName = tags[tags.indexOf(tag_name) - 1].trim();
            // можем идти от HEAD так как 1) в случае push-a нового тега - коммит с новым тегом и будет HEAD 2) в случае ветки release/* - HEAD может также содержать hotfixes
            await exec.exec('git', ['log', "--pretty=oneline", `HEAD...${secondTagName}`] , commitsOptions);
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
${releaseData.created_at}
        
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

        // создаем релиз
        await octokit.rest.issues.create({
            owner,
            repo,
            title: `RELEASE - ${tag_name}`,
            labels: ["RELEASE"],
            body: issueBody,
        })
    } catch (error) {
        core.setFailed(error.message);
    }
}

main();