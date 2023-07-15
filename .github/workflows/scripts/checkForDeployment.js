const { getIssue } = require("../utils");

module.exports = async ({ github, context, TAG }) => {
  const READY_LABEL = "ready for deployment";
  const RELEASE_LABEL = "RELEASE";
  const DEPLOYED_LABEL = "deployed";
  const metaData = {
    owner: context.actor,
    repo: context.repo.repo,
  };

  const getLatestReleaseIssue = async () => {
    const issues = await github.rest.issues.listForRepo({
      ...metaData,
      labels: [READY_LABEL, RELEASE_LABEL],
    });

    const latest = issues?.[0];

    for (const label of latest.labels) {
      if (label.name === DEPLOYED_LABEL) {
        return;
      }
    }

    return latest;
  };

  let issue;
  if (TAG !== "") {
    issue = await getIssue(github, metaData, TAG);
  } else {
    issue = await getLatestReleaseIssue();
  }

  const hasLabel = (issue) => {
    for (const label of issue.labels) {
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
