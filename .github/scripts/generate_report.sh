#!/bin/bash

# This script generates a tag report

latest_tag=$(git describe --tags --abbrev=0)
previous_tag=$(git describe --tags --abbrev=0 $latest_tag^)

author=$(git log -1 $latest_tag --pretty="%an")
date=$(git log -1 $latest_tag --pretty="%ad")

changelog=$(git log $previous_tag..$latest_tag --oneline)

# Send to github env
echo "TAG=$latest_tag" >> $GITHUB_ENV
echo "AUTHOR=$author" >> $GITHUB_ENV
echo "DATE=$date" >> $GITHUB_ENV
echo "CHANGELOG=$changelog" >> $GITHUB_ENV
