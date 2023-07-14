module.exports = async ({ github, context, TAG }) => {
  const GH_URL = "https://github.com/";
  const { COMMIT_TIME } = process.env;
  const LABEL = "RELEASE";

  const metaData = {
    owner: context.actor,
    repo: context.repo.repo,
  };

  const buildChangelog = async () => {
    return "tba";
  }

  const body = `Author: [${metaData.owner}](${GH_URL}${metaData.owner})\n \
              Release Time: ${COMMIT_TIME}\n \
              Changelog: ${buildChangelog()}`;

  const getIssue = async () => {
    const issues = await github.rest.issues
      .listForRepo({ ...metaData, labels: LABEL })
      .then((res) => res.data)
      .catch(() => {});

    for (const issue of issues) {
      if (issue.title === TAG) {
        return issue;
      }
    }
  };

  const getRelease = async () => {
    const releases = await github.rest.repos
      .listReleases(metaData)
      .then((res) => res.data)
      .catch(() => {});

    for (const release of releases) {
      if (release.tag_name === TAG) {
        return release;
      }
    }
  };

  const issue = await getIssue();
  const release = await getRelease();

  const issueData = {
    ...metaData,
    title: TAG,
    labels: [LABEL],
    issue_number: issue?.number ?? null,
    body,
  };

  const releaseData = {
    ...metaData,
    tag_name: TAG,
    release_id: release?.id ?? null,
    title: TAG,
    body,
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
