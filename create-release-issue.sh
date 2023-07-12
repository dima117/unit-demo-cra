#!/bin/sh

VERSION=$2
CHANGELOG=$3
GH_TOKEN=$1
TAG_NAME=$(git describe --tags --abbrev=0)
TAG_DATE=$(git log -1 --pretty=format:"%ai" $TAG_NAME)
AUTHOR=$(git show $TAG_NAME --pretty="format:%an" --no-patch)

create_issue_payload() {
  cat <<EOF
  {
    "title": "Release $VERSION",
    "labels": ["RELEASE"],
    "body": "**Release version:** $VERSION \n**Tag:** $TAG_NAME \n**Tagged by:** $AUTHOR \n**Date:** $TAG_DATE \n\n$CHANGELOG"
  }
EOF
}

curl \
  -X POST \
  -H "Authorization: token $GH_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/$GITHUB_REPOSITORY/issues \
  -d "$(create_issue_payload)"