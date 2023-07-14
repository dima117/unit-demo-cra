module.exports = async ({ github, context, exec, TAG }) => {
  const GH_URL = "https://github.com/";
  const { COMMIT_TIME, COMMIT_BEFORE, COMMIT_AFTER } = process.env;
  const LABEL = "RELEASE";

  const metaData = {
    owner: context.actor,
    repo: context.repo.repo,
  };

  const getPreviousReleaseTag = async () => {
    const tags = await github.rest.repos.listTags(metaData)
      .then((res) => res.data)
      .catch(() => {}); 
    
    if(tags) {
      return tags[1];
    }
  }

  const buildChangelog = async () => {
    const prevTag = await getPreviousReleaseTag();
  
    let output = '';
    
    await exec.exec(`git log --oneline --reverse ${prevTag.name}..HEAD`, [], {
      listeners: {
        stdout: (data) => output += data.toString(),
        stderr: (data) => output += data.toString(),
      }
    });

    return output;
  }

  const appendChangeLog = async (body) => {
    let output = '';
    
    await exec.exec(`git log --oneline --reverse ${COMMIT_BEFORE}..${COMMIT_AFTER}`, [], {
      listeners: {
        stdout: (data) => output += data.toString(),
        stderr: (data) => output += data.toString(),
      }
    });

    return body + output;
  }

  const buildInitBody = async (body) => {
    if (body) {
      return appendChangeLog(body);
    }

    const changelog = await buildChangelog();
    return `Author: [${metaData.owner}](${GH_URL}${metaData.owner})\n \
                Release Time: ${COMMIT_TIME}\n \
                Changelog: \n \
                ${changelog}`;
  }


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
