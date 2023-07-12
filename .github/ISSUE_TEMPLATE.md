---
title: release {{ env.VERSION }}
labels: RELEASE
assignees: shvkn
---
## Release {{ env.VERSION }} {{ date | date('D MMMM YYYY') }}
- Ответственный: {{ payload.sender.login }}.
- Runner url: {{ env.RUNNER_URL }}
---

| Flow       | Status                  |
|------------|-------------------------|
| Build      | {{ env.BUILD_STATUS }}  |
| Linter     | {{ env.LINTER_STATUS }} |
| Unit tests | {{ env.UNIT_STATUS }}   |
| e2e tests  | {{ env.E2E_STATUS }}    |
| Deploy     | {{ env.DEPLOY_STATUS }} |

## Changelog
{{ env.CHANGELOG }}
