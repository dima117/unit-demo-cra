const { getIssue, getRelease } = require("../utils");

module.exports = async ({ github, context, TAG, success }) => {
  const metaData = {
    owner: context.actor,
    repo: context.repo.repo,
  };
  const LABEL = "RELEASE";
  const SUCCESS_URL = "https://img.shields.io/badge/Tests-Passing-success";
  const FAILURE_URL = "https://img.shields.io/badge/Tests-Failed-red";
  const IN_PROGRESS_URL =
    "https://img.shields.io/badge/Tests-In%20progress-yellow";

  const issue = await getIssue(metaData, TAG, LABEL);
  const release = await getRelease(metaData, TAG);

  if (issue) {
    const body = issue.body.replace(
      IN_PROGRESS_URL,
      success ? SUCCESS_URL : FAILURE_URL
    );
    github.rest.issues.update({
      ...metaData,
      issue_number: issue.number,
      body,
    });
  }

  if (release) {
    const body = release.body.replace(
      IN_PROGRESS_URL,
      success ? SUCCESS_URL : FAILURE_URL
    );
    github.rest.repos.updateRelease({
      ...metaData,
      release_id: release.id,
      body,
    });
  }
};
