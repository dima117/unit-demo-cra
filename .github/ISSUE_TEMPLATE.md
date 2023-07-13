---
title: RELEASE version {{env.RELEASE_VERSION}}
assignees: { { payload.sender.login } }
---

Someone just started release! Here's who did it: `{{ payload.sender.login }}`.
What we have in payload: {{ payload.commits }}
{{ payload.commits[0].message }}

Date: {{env.TAG_DATE}}
