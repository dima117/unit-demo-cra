---
title: RELEASE {{ tools.context.ref }}
labels: RELEASE
---
Author: {{ tools.context.actor }}
Release date: {{ date | date('dddd, MMMM Do') }}
Version number: {{ tools.context.ref }}
Changelog: {{ env.CHANGELOG }}