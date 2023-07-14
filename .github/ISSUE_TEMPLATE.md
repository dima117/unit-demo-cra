---
title: Release {{ env.release }}
labels: RELEASE
---
{% if env.reviewVerified %}
  :heavy_check_mark: All checks passed: {{ env.reviewUrl }}
{% else %}
  :x: Failed checks: {{ env.reviewUrl }}.
{% endif %}
{% if env.reviewVerified and env.deployVerified %}
  :heavy_check_mark: Successfully deployed to GH pages: {{ env.pagesUrl }}
{% elif env.reviewVerified %}
  :x: Failed to deploy to GH pages: ${{env.deployUrl}}
{% else %}
  :x: Cancel deployment due to failed checks.
{% endif %}