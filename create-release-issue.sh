#!/bin/sh

GH_TOKEN=$1
VERSION=$(git describe --tags --abbrev=0)
TAG_DATE=$(git log -1 --pretty=format:"%ai" $VERSION)
AUTHOR=$(git show $VERSION --pretty="format:%an" --no-patch)
RUN_ID=$2

create_issue_payload() {
  cat <<EOF
  {
    "title": "Release $VERSION",
    "labels": ["RELEASE"],
    "body": "**Release version:** $VERSION \n**Tagged by:** $AUTHOR \n**Date:** $TAG_DATE \n\n[Check tests results link](https://github.com/$GITHUB_REPOSITORY/actions/runs/$RUN_ID)"
  }
EOF
}


