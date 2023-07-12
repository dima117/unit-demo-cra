#!/bin/bash

VERSION=$1
NOTES=$2
REPO=Rubicones/hw-infra
TOKEN=${{ secrets.GITHUB_TOKEN }}

curl -X POST -H "Authorization: token $TOKEN" -d '{
  "title": "Release v'"$VERSION"'",
  "body": "'"${NOTES//\"/\\\"}"'",
  "labels": ["RELEASE"]
}' "https://api.github.com/repos/$REPO/issues"
