#!/bin/bash

unit="$(npm test; echo x)"
unit="${unit%?}"
echo "UNIT="$unit"" >> $GITHUB_ENV
