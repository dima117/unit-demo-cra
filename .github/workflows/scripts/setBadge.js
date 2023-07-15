const { getIssue, getRelease } = require("../utils");

module.exports = async ({ github, context, TAG, success, run }) => {
  const metaData = {
    owner: context.actor,
    repo: context.repo.repo,
  };
  const LABEL = "RELEASE";
  const STATIC_LINK = `https://github.com/Memesaurus/SHRI_Infrastructure/actions/workflows/tests.yml?query=branch%3A${TAG}++`;
  const RUN_LINK = `https://github.com/Memesaurus/SHRI_Infrastructure/actions/runs/${run}`;
  const SUCCESS_URL = "https://img.shields.io/badge/Tests-Passing-success";
  const FAILURE_URL = "https://img.shields.io/badge/Tests-Failed-red";
  const IN_PROGRESS_URL =
    "https://img.shields.io/badge/Tests-In%20progress-yellow";

  const issue = await getIssue(github, metaData, TAG, LABEL);
  const release = await getRelease(github, metaData, TAG);

  if (issue) {
    let body = issue.body.replace(
      IN_PROGRESS_URL,
      success ? SUCCESS_URL : FAILURE_URL
    );
    body = body.replace(STATIC_LINK, RUN_LINK);

    github.rest.issues.update({
      ...metaData,
      issue_number: issue.number,
      body,
    });
  }

  if (release) {
    let body = release.body.replace(
      IN_PROGRESS_URL,
      success ? SUCCESS_URL : FAILURE_URL
    );
    body = body.replace(STATIC_LINK, RUN_LINK);

    github.rest.repos.updateRelease({
      ...metaData,
      release_id: release.id,
      body,
    });
  }
};
