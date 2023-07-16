#!/bin/bash

# This script generates a tag report

latest_tag=$(git describe --tags --abbrev=0)
previous_tag=$(git describe --tags --abbrev=0 HEAD^)

echo "Latest tag: $latest_tag"
echo "Previous tag: $previous_tag"

# Get author and date of latest tag

author=$(git log -1 $latest_tag --pretty="%an")
date=$(git log -1 $latest_tag --pretty="%ad")

echo "Author: $author"
echo "Date: $date"

changelog=$(git log $previous_tag...$latest_tag --oneline)

echo "Changelog: $changelog"

# Send to github env
echo "TAG=$latest_tag" >> $GITHUB_ENV
echo "AUTHOR=$author" >> $GITHUB_ENV
echo "DATE=$date" >> $GITHUB_ENV
echo "CHANGELOG=$changelog" >> $GITHUB_ENV
