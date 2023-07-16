#!/bin/bash

e2e="$(npm run ci:e2e; echo x)"
e2e="${e2e%?}"
echo "E2E="$e2e"" >> $GITHUB_ENV
