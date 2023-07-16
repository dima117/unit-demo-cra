#!/bin/bash

build="$(npm run build; echo x)"
build="${build%?}"
echo "BUILD="$build"" >> $GITHUB_ENV
