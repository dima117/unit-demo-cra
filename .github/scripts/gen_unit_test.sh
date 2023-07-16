#!/bin/bash

unit=$(npm test)
echo "UNIT=$unit" >> $GITHUB_ENV
