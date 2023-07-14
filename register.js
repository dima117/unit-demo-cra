const {Octokit} = require("@octokit/core");
const core = require("@actions/core");
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

const fields = {
    owner: 'illicit-oblivion',
    repo: 'unit-demo-cra',
    headers: {
        'X-GitHub-Api-Version': '2022-11-28'
    }
};

const tagNumber = process.env.ACTION_REF;

async function performTask() {
    const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
        ...fields,
    });
    const title = `RELEASE ${tagNumber}`;
    const body = `Author: ${process.env.ACTOR}

Release date: ${Intl.DateTimeFormat("ru-RU",  { dateStyle: 'full', timeStyle: 'long' }).format(new Date())}

Version: ${process.env.ACTION_REF }

${process.env.ISSUE_BODY }

${process.env.ACTIONS_URL }`;

    const previousIssueUrl = response.data.find(it => it.title === title)?.url;

    const value = response.data.length + 1;
    let currentIssue;

    if(previousIssueUrl) {
        currentIssue = await octokit.request(`PATCH ${previousIssueUrl}`, {
        body,
        });
    } else {
        currentIssue = await octokit.request(`POST /repos/{owner}/{repo}/issues`, {
            ...fields,
            issue_number: value,
            title,
            body,
        });
    }

    core.setOutput('number', currentIssue.data.number)
}

void performTask();
