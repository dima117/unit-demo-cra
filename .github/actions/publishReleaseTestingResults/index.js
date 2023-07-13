const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
    try {
        const token = core.getInput("token", {required: true});
        const owner = core.getInput("owner", {required: true});
        const repo = core.getInput("repo", {required: true});
        const ref = core.getInput("ref", {required: true})
        const workflowLink = core.getInput("workflow_link", {required: true});
        const headCommit = JSON.parse(core.getInput("head_commit", {required: true}))
        const tests = JSON.parse(core.getInput("tests", {required: true}));

        const tag_name = ref.split("/")[ref.split("/").length - 1];
        const octokit = github.getOctokit(token);

        // Находим issue, в которую нам надо отправить результаты тестирования
        const {data: issues} = await octokit.rest.issues.listForRepo({owner, repo, labels: ["RELEASE"]});
        
        let issueNumber;
        issues.forEach((issue) => {
            if (issue.title === `RELEASE - ${tag_name}`) issueNumber = issue.number;
        })

        if (issueNumber === undefined) throw Error("Issue not exists.");
        else {
            let commentBody = "## Протестированный коммит\n";
            commentBody += `*${headCommit.message}* - [commit link](${headCommit.url})\n`
            commentBody += "## Результаты тестирования\n"
            Object.keys(tests).map((key) => {
                const status = tests[key].result
                key = key.replaceAll("_", " ").replaceAll("-", " ");
                key = key.split(" ").map((word) => word[0].toUpperCase() + word.substring(1)).join(" ");
                commentBody += `- ${status === 'success' ? "✅" : status === "failure" ? "❌" : "🟡"} ${key} - **${status}**\n`
            })
            commentBody += "## Ссылка на workflow\n"
            commentBody += `${workflowLink}`
            await octokit.rest.issues.createComment({owner, repo, issue_number: issueNumber, body: commentBody})
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

main();