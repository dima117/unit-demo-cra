const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
    try {
        const token = core.getInput("token", {required: true});
        const ref = core.getInput("ref", {required: true});
    } catch (error) {
        core.setFailed(error.message);
    }
}

main();