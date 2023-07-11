const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
    try {
        const token = core.getInput("token", {required: true});
        const owner = core.getInput("owner", {required: true});
        const repo = core.getInput("repo", {required: true});

        const ref = core.getInput("ref", {required: true});
        const tag_name = ref.split("/")[2];

        const actor = core.getInput("actor", {required: true});
        
        const octokit = github.getOctokit(token);
        const {data} = await octokit.rest.repos.createRelease({
            owner, 
            repo,
            tag_name,
            generate_release_notes: true,
        });

        const issueBody = `<h1 align="center">RELEASE DATA</h1>

- Author: ${actor}
        
- Date: ${data.created_at}
        
- Version: ${tag_name}`

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