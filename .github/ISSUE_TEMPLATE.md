---
name: New Release Issue
about: Create new release
title: RELEASE {{ env.RELEASE_NO }}
labels: New Release
---

Release date: {{ env.RELEASE_DATE | date('dddd, MMMM Do') }}  

Author: {{ env.RELEASE_AUTHOR }}  

Changes:  
{{ env.RELEASE_CHANGELOG }}
