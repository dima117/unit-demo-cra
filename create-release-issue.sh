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
echo "first"
ALL_ISSUES=$(curl \
  -H "Authorization: token $GH_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -X GET \
  https://api.github.com/repos/$GITHUB_REPOSITORY/issues)

echo $ALL_ISSUES
EXISTING_ISSUE_NUMBER=""
for row in $(echo "${ALL_ISSUES}" | jq -r '.[] | @base64'); do
    echo "parse"
    _jq() {
     echo ${row} | base64 --decode | jq -r ${1}
    }

    ISSUE_TITLE=$(_jq '.title')
    echo "ISSUE_TITLE: $ISSUE_TITLE"
    ISSUE_NUMBER=$(_jq '.number')
    echo "ISSUE_NUMBER: $ISSUE_NUMBER"

    echo "Release $VERSION"
    if [ "$ISSUE_TITLE" = "Release $VERSION" ]; then
        EXISTING_ISSUE_NUMBER="$ISSUE_NUMBER"
        break
    fi
done

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
