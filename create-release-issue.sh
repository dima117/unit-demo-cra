#!/bin/sh

GH_TOKEN=$1
echo "token sat"
VERSION=$(git describe --tags --abbrev=0)
echo "version sat"
TAG_DATE=$(git log -1 --pretty=format:"%ai" $VERSION)
echo "tag date sat"
AUTHOR=$(git show $VERSION --pretty="format:%an" --no-patch)
echo "author sat"
RUN_ID=$2
echo "runid sat"

create_issue_payload() {
  cat <<EOF
  {
    "title": "Release $VERSION",
    "labels": ["RELEASE"],
    "body": "**Release version:** $VERSION \n**Tagged by:** $AUTHOR \n**Date:** $TAG_DATE \n\n[Check tests results link](https://github.com/$GITHUB_REPOSITORY/actions/runs/$RUN_ID)"
  }
EOF
}
echo "created issue payload"

EXISTING_ISSUE=$(curl \
  -H "Authorization: token $GH_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -X GET \
  https://api.github.com/search/issues?q=repo:$GITHUB_REPOSITORY+label:RELEASE+title:"Release $VERSION")

EXISTING_ISSUE_NUMBER=$(echo $EXISTING_ISSUE | jq '.items[0].number')

if [ -n "$EXISTING_ISSUE_NUMBER" ]; then
  curl \
    -X PATCH \
    -H "Authorization: token $GH_TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    https://api.github.com/repos/$GITHUB_REPOSITORY/issues/$EXISTING_ISSUE_NUMBER \
    -d "$(create_issue_payload)"
else
  curl \
    -X POST \
    -H "Authorization: token $GH_TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    https://api.github.com/repos/$GITHUB_REPOSITORY/issues \
    -d "$(create_issue_payload)"
fi
