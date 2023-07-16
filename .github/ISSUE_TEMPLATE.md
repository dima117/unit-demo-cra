---
title: RELEASE {{ env.GITHUB_REF_NAME }}
labels: release
---

Автор релиза: {{ env.GITHUB_ACTOR }}
Версия релиза: {{ env.GITHUB_REF_NAME }}
Дата релиза: {{ date | date('DD.MM.YY, hh:mm') }}
