const getIssue = async (metaData, tag, label) => {
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

const getRelease = async (metaData, tag) => {
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
