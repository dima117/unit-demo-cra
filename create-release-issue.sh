#!/bin/sh

GH_TOKEN=$1
VERSION=$(git describe --tags --abbrev=0)
TAG_DATE=$(git log -1 --pretty=format:"%ai" $VERSION)
RELEASED_BY=$(git log --pretty=format:"%an" | grep -v "semantic-release-bot" | head -n 1)
RUN_ID=$2
CHANGES=$(awk -v RS='\n\n' -v version="$VERSION" '$0 ~ version' CHANGELOG.md)

create_issue_payload() {
  cat <<EOF
  {
    "title": "Release $VERSION",
    "labels": ["RELEASE"],
    "body": "**Release version:** $VERSION \n**Released by:** $RELEASED_BY \n**Date:** $TAG_DATE \n\n[Check tests results link](https://github.com/$GITHUB_REPOSITORY/actions/runs/$RUN_ID) \n\n**Changelog:** \n$CHANGES"
  }
EOF
}

curl \
    -X POST \
    -H "Authorization: token $GH_TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    https://api.github.com/repos/$GITHUB_REPOSITORY/issues \
    -d "$(create_issue_payload)"
    