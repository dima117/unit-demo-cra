---
title: RELEASE {{ ref }}
labels: RELEASE
---
Author: {{ actor }}
Release date: {{ date | date('dddd, MMMM Do') }}
Version number: {{ ref }}
{% for k, v in env %}
  {{ k }}: {{ v }}
{% endfor %}



{% for k, v in payload %}
  {{ k }}: {{ v }}
{% endfor %}

