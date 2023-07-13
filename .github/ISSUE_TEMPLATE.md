---
title: RELEASE version {{env.RELEASE_VERSION}}
---

Someone just started release! Here's who did it: `{{ payload.sender.login }}`.
What we have in payload: {{ payload.commits }}

Date: {{env.TAG_DATE}}
