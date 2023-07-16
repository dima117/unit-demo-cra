## Release Information

name: {{ env.RELEASE_NAME }}
about: Release issue
title: 'test'
labels: RELEASE
assignees: {{ env.RELEASE_AUTHOR }}

**Version:** {{ env.RELEASE_NAME }}
**Release Date:** {{ env.RELEASE_DATE }}
**Author:** {{ env.RELEASE_AUTHOR }}
**Changelog:**

{{ env.RELEASE_CHANGELOG }}