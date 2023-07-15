const { getIssue } = require("../utils");

module.exports = async ({ github, context, TAG }) => {
  const metaData = {
    owner: context.actor,
    repo: context.repo.repo,
  };

  const issue = await getIssue(github, metaData, TAG);

  if (!issue.labels.includes("ready for deployment")) {
    console.log("Release is not labeled as ready for deployment");
    console.log("exiting...");
    process.exit(1);
  }
};
