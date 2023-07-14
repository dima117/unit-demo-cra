const {Octokit} = require("@octokit/core");
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

const issueNumber = process.env.ISSUE_NUMBER;

const fields = {
    owner: 'illicit-oblivion',
    repo: 'unit-demo-cra',
    issue_number: issueNumber,
    headers: {
        'X-GitHub-Api-Version': '2022-11-28'
    }
};

async function performTask() {
    const response = await octokit.request('GET /repos/{owner}/{repo}/issues/{issue_number}', {
        ...fields,
    });

    const body = response.data.body;

    const githubPagesLink = `

Деплой ✅: https://illicit-oblivion.github.io/unit-demo-cra/`;
    await octokit.request('PATCH /repos/{owner}/{repo}/issues/{issue_number}', {
        ...fields,
        body: body + githubPagesLink,
    });

}

void performTask();
