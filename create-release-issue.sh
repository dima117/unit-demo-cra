#!/bin/bash

REPO=Rubicones/hw-infra
TOKEN=$1
VERSION=$2
NOTES=$3
curl -X POST -H "Authorization: token $TOKEN" -d '{
  "title": "Release v'"$VERSION"'",
  "body": "'"${NOTES//\"/\\\"}"'",
  "labels": ["RELEASE"]
}' "https://api.github.com/repos/$REPO/issues"

