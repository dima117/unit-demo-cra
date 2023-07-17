---
title: RELEASE version {{env.RELEASE_VERSION}}
---

Инициатор релиза: {{ env.SENDER }}

Запуск процесса релиза: {{env.TAG_DATE}}

Список коммитов
{{ env.COMMITS }}

Результаты тестов

- unit: {{env.TEST_UNIT}}
- e2e: {{env.TEST_E2E}}
- job: {{env.TEST}}
