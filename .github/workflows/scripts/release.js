const { getIssue, getRelease } = require("../utils");

module.exports = async ({ github, context, exec, TAG }) => {
  const GH_URL = "https://github.com/";
  const { COMMIT_TIME, COMMIT_BEFORE, COMMIT_AFTER } = process.env;
  const LABEL = "RELEASE";
  const SUCCESS_URL = "https://img.shields.io/badge/Tests-Passing-success";
  const FAILURE_URL = "https://img.shields.io/badge/Tests-Failed-red";
  const IN_PROGRESS_URL =
    "https://img.shields.io/badge/Tests-In%20progress-yellow";
  const ACTIONS_URL =
    "https://github.com/Memesaurus/SHRI_Infrastructure/actions/workflows/tests.yml";

  const metaData = {
    owner: context.actor,
    repo: context.repo.repo,
  };

  const getPreviousReleaseTag = async () => {
    const tags = await github.rest.repos
      .listTags(metaData)
      .then((res) => res.data)
      .catch(() => {});

    if (tags) {
      return tags[1];
    }
  };

  const buildChangelog = async () => {
    const prevTag = await getPreviousReleaseTag();

    let output = "";

    await exec.exec(`git log --oneline --reverse ${prevTag.name}..HEAD`, [], {
      listeners: {
        stdout: (data) => (output += data.toString()),
        stderr: (data) => (output += data.toString()),
      },
    });

    return output;
  };

  const appendChangeLog = async (body) => {
    let output = "";

    await exec.exec(
      `git log --oneline --reverse ${COMMIT_BEFORE}..${COMMIT_AFTER}`,
      [],
      {
        listeners: {
          stdout: (data) => (output += data.toString()),
          stderr: (data) => (output += data.toString()),
        },
      }
    );
    body = body.replace(SUCCESS_URL, IN_PROGRESS_URL);
    body = body.replace(FAILURE_URL, IN_PROGRESS_URL);
    return body + output + "\n";
  };

  const buildInitBody = async (body) => {
    if (body) {
      return appendChangeLog(body);
    }

    const changelog = await buildChangelog();
    return `[![Tests](${IN_PROGRESS_URL})](${ACTIONS_URL}?query=branch%3A${TAG}++) \n \
            Author: [${metaData.owner}](${GH_URL}${metaData.owner})\n \
            Release Time: ${COMMIT_TIME}\n \
            Changelog: \n \
            ${changelog} \n`;
  };

  const issue = await getIssue(github, metaData, TAG, LABEL);
  const release = await getRelease(github, metaData, TAG);

  const issueData = {
    ...metaData,
    title: TAG,
    labels: [LABEL],
    issue_number: issue?.number ?? null,
    body: await buildInitBody(issue?.body),
  };

  const releaseData = {
    ...metaData,
    tag_name: TAG,
    release_id: release?.id ?? null,
    title: TAG,
    body: await buildInitBody(release?.body),
  };

  if (issue) {
    github.rest.issues.update(issueData);
  } else {
    github.rest.issues.create(issueData);
  }

  if (release) {
    github.rest.repos.updateRelease(releaseData);
  } else {
    github.rest.repos.createRelease(releaseData);
  }
};
