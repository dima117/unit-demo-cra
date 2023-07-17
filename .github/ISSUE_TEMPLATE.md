---
title: RELEASE version {{env.RELEASE_VERSION}}
---

Инициатор релиза: {{ payload.sender.login }}

Запуск процесса релиза: {{env.TAG_DATE}}

Список коммитов
{{ env.COMMITS }}
