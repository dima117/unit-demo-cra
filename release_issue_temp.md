### Release Information

- Version: ${{ steps.release_info.outputs.version }}
- Author: Github Actions
- Date: ${{ steps.release_info.outputs.date }}

#### Changelog

${{ env.CHANGELOG }}

#### CI Results

- CI Tests: [link]
- CI Results: [Link](https://github.com/${{ github.repository }}/actions/runs/${{ github.run_id }})
- Deployment GH-Pages: [link](https://${{ github.repository_owner }}.github.io/${{ github.repository }})