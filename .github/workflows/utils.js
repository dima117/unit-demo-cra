const DEPLOYED_LABEL = "deployed";

const getLatestReleaseIssue = async (github, metaData, label) => {
  const issues = await github.rest.issues
    .listForRepo({
      ...metaData,
      labels: label,
    })
    .then((res) => res.data)
    .catch(() => {});

  if (!issues && !issues.length) {
    return;
  }

  const latest = issues?.[0];

  for (const label of latest?.labels) {
    if (label.name === DEPLOYED_LABEL) {
      return;
    }
  }

  return latest;
};

const getIssue = async (github, metaData, tag, label) => {
  if (tag === "" || !tag) {
    return getLatestReleaseIssue(github, metaData, label);
  }

  const issues = await github.rest.issues
    .listForRepo({ ...metaData, labels: label })
    .then((res) => res.data)
    .catch(() => {});

  for (const issue of issues) {
    if (issue.title === tag) {
      return issue;
    }
  }
};

const getRelease = async (github, metaData, tag) => {
  const releases = await github.rest.repos
    .listReleases(metaData)
    .then((res) => res.data)
    .catch(() => {});

  for (const release of releases) {
    if (release.tag_name === tag) {
      return release;
    }
  }
};

module.exports = {
  getIssue,
  getRelease,
};
