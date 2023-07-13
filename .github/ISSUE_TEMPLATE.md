---
title: Release {{ env.release }}
labels: RELEASE
---
{% if env.verified %}
:heavy_check_mark: All checks passed  
{% else %}
:x: Failed checks:
{% endif %}