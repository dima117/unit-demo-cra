---
title: Release {{ env.release }}
labels: RELEASE
---
{% if env.reviewVerified %}
  :heavy_check_mark: All checks passed: {{ env.reviewUrl }}
  {% if env.deployVerified %}
    :heavy_check_mark: Successfully deployed to GH pages: {{ env.pagesUrl }}
  {% else %}
    :x: Failed to deploy to GH pages: ${{env.deployUrl}}
  {% endif %}
{% else %}
  :x: Failed checks: {{ env.reviewUrl }}.
  :x: Cancel deployment due to failed checks.
{% endif %}
