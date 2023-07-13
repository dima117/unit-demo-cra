const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
    try {
        const token = core.getInput("token", {required: true});
        const owner = core.getInput("owner", {required: true});
        const repo = core.getInput("repo", {required: true});
        const ref = core.getInput("ref", {required: true});
        const deployment = JSON.parse(core.getInput("deployment", {required: true}));
        const workflowLink = core.getInput("workflow_link", {required: true});

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
            if (deployment.result !== "success") {
                let body = `# ❌ Deployment не удался\n`
                body +=`${workflowLink}`
                await octokit.rest.issues.createComment({owner, repo, issue_number: issueNumber, body})
            } else {
                let body = `# ✅ Deployment прошел успешно\n`
                body +=`${deployment.outputs.url}`
                await octokit.rest.issues.createComment({owner, repo, issue_number: issueNumber, body})
                await octokit.rest.issues.update({owner, repo, issue_number: issueNumber, state: "closed"});
            }
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

main();