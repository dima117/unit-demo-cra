const { getIssue } = require("../utils");

module.exports = async ({ github, context, TAG }) => {
  const READY_LABEL = "ready for deployment";
  const RELEASE_LABEL = "RELEASE";
  const metaData = {
    owner: context.actor,
    repo: context.repo.repo,
  };

  const issue = await getIssue(github, metaData, TAG, [
    READY_LABEL,
    RELEASE_LABEL,
  ]);

  const hasLabel = (issue) => {
    for (const label of issue?.labels) {
      if (label.name === READY_LABEL) {
        return true;
      }
    }

    return false;
  };

  if (!hasLabel(issue)) {
    console.log("Release is not labeled as ready for deployment");
    console.log("exiting...");
    process.exit(1);
  }
};
