---
title: Release issue {{ env.TAG }}
labels: RELEASE
---

New Release!
Author: {{env.AUTHOR}}
Date: {{ date | date('dddd, MMMM Do') }}
Version: {{env.TAG}}
Changelog: {{ env.CHANGELOG }}
