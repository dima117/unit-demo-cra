#!/bin/sh

GH_TOKEN=$1
VERSION=$(git describe --tags --abbrev=0)
TAG_DATE=$(date --iso-8601=seconds)
RELEASED_BY=$(git log --pretty=format:"%an" | grep -v "semantic-release-bot" | head -n 1)
RUN_ID=$2
CHANGES=$(awk -v RS='\n\n' -v version="$VERSION" '$0 ~ version' CHANGELOG.md)

create_comment_payload() {
  cat <<EOF
  {
    "body": "**Release version:** $VERSION \n**Released by:** $RELEASED_BY \n**Date:** $TAG_DATE \n\n[Check tests results link](https://github.com/$GITHUB_REPOSITORY/actions/runs/$RUN_ID) \n\n**Changelog:** \n$CHANGES"
  }
EOF
}

create_issue_payload() {
  cat <<EOF
  {
    "title": "Release $VERSION",
    "labels": ["RELEASE"],
    "body": "**Release version:** $VERSION \n**Released by:** $RELEASED_BY \n**Date:** $TAG_DATE \n\n[Check tests results link](https://github.com/$GITHUB_REPOSITORY/actions/runs/$RUN_ID) \n\n**Changelog:** \n$CHANGES"
  }
EOF
}

get_existing_issue_number() {
  curl -H "Authorization: token $GH_TOKEN" \
       -H "Accept: application/vnd.github.v3+json" \
       "https://api.github.com/search/issues?q=repo:$GITHUB_REPOSITORY+label:RELEASE+in:title+$(echo "Release $VERSION" | sed 's/ /+/g')" | jq '.items[0].number'
}

issue_number=$(get_existing_issue_number)

if [ "$issue_number" != "null" ]; then
  echo "Issue already exists, adding a comment to existing issue #$issue_number"
  curl -X POST \
       -H "Authorization: token $GH_TOKEN" \
       -H "Accept: application/vnd.github.v3+json" \
       "https://api.github.com/repos/$GITHUB_REPOSITORY/issues/$issue_number/comments" \
       -d "$(create_comment_payload)"
else
  echo "No existing issue found, creating a new one"
    response=$(curl -sS \
    -X POST \
    -H "Authorization: token $GH_TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    https://api.github.com/repos/$GITHUB_REPOSITORY/issues \
    -d "$(create_issue_payload)")
  issue_number=$(echo "$response" | jq '.number')
fi
echo $issue_number
echo "$issue_number" > issue_number.txt


