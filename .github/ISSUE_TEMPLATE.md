---
title: RELEASE {{ ref.tag }}
labels: RELEASE
---
Author: {{ ref.author }}
Release date: {{ date | date('dddd, MMMM Do') }}
Version number: {{ ref.tag }}
Changelog: {{ env.CHANGELOG }}
Changelog: {{ payload }}
