---
title: Release {{ env.release }}
labels: RELEASE
---
{% if env.reviewVerified %}
:heavy_check_mark: All checks passed: {{ env.reviewUrl }}
{% else %}
:x: Failed checks: {{ env.reviewUrl }}
{% endif %}
{% if env.ghPagesVerified %}
:heavy_check_mark: Successfully deployed to GH pages: {{ env.ghPagesUrl }}
{% else %}
:x: Failed to deploy to GH pages
{% endif %}