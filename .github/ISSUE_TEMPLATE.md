---
title: Release {{env.ISSUE_TITLE}}
labels: RELEASE
---
Update: {{env.ISSUE_TITLE}}->{{env.PREVIOUS_TAG}}
Author:  {{ payload.sender.login }}.
Date: {{ date | date('dddd, MMMM Do') }}
CHANGELOG: {{ env.HISTORY }}
TEST RUN: {{ env.TEST_RUN }}
DEPLOY STATUS: {{env.DEPLOYED}}