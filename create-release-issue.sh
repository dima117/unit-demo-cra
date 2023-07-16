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

get_existing_issue() {
  curl -H "Authorization: token $GH_TOKEN" \
       -H "Accept: application/vnd.github.v3+json" \
       "https://api.github.com/search/issues?q=repo:$GITHUB_REPOSITORY+label:RELEASE+in:title+$(echo "Release $VERSION" | sed 's/ /+/g')"
}

issue_response=$(get_existing_issue)
issue_number=$(echo "$issue_response" | jq '.items[0].number')
issue_body=$(echo "$issue_response" | jq -r '.items[0].body')

if [ "$issue_number" != "null" ]; then
  echo "Issue already exists, updating existing issue #$issue_number"
  
  NEW_BODY="**Release version:** $VERSION \n**Released by:** $RELEASED_BY \n**Date:** $TAG_DATE \n\n[Check tests results link](https://github.com/$GITHUB_REPOSITORY/actions/runs/$RUN_ID) \n\n**Changelog:** \n$CHANGES \n\n $issue_body"
  
  update_issue_payload="{ \"title\": \"Release $VERSION\", \"labels\": [\"RELEASE\"], \"body\": \"$NEW_BODY\" }"
  
  curl -X PATCH \
       -H "Authorization: token $GH_TOKEN" \
       -H "Accept: application/vnd.github.v3+json" \
       "https://api.github.com/repos/$GITHUB_REPOSITORY/issues/$issue_number" \
       -d "$update_issue_payload"
else
  echo "No existing issue found, creating a new one"
  curl -X POST \
       -H "Authorization: token $GH_TOKEN" \
       -H "Accept: application/vnd.github.v3+json" \
       "https://api.github.com/repos/$GITHUB_REPOSITORY/issues" \
       -d "$(create_issue_payload)"
fi
