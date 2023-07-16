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

ALL_ISSUES=$(curl \
  -H "Authorization: token $GH_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -X GET \
  https://api.github.com/repos/$GITHUB_REPOSITORY/issues)

EXISTING_ISSUE_NUMBER=""

# Convert the JSON array into an array of base64 encoded strings
ENCODED_ISSUES=$(echo "${ALL_ISSUES}" | jq -c '.[]' | awk '{print $0}' | base64)

for encoded_row in ${ENCODED_ISSUES}
do
    # Decode the base64 encoded JSON
    row=$(echo "${encoded_row}" | base64 --decode)
    
    ISSUE_TITLE=$(echo "${row}" | jq -r '.title')
    ISSUE_NUMBER=$(echo "${row}" | jq -r '.number')

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
