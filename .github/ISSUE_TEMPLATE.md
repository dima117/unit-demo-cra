---
title: RELEASE {{ env.ACTION_REF }}
---
Author: {{ env.ACTOR }}

Release date: {{ env.DATE | date('dddd, MMMM Do') }}

Version: {{ env.ACTION_REF }}

{{ env.ISSUE_BODY }}
