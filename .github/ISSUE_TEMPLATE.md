---
title: RELEASE {{ tools.context.ref.tag }}
labels: RELEASE
---
Author: {{ tools.context.ref.author }}
Release date: {{ date | date('dddd, MMMM Do') }}
Version number: {{ tools.context.ref.tag }}
Changelog: {{ env.CHANGELOG }}
