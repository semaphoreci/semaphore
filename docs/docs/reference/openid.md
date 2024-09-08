---
description: OpenID Connect (OIDC) token reference
---

# OCID Tokens 

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Available from '@site/src/components/Available';
import VideoTutorial from '@site/src/components/VideoTutorial';

This page describes how [OpenID Connect (OIDC)](../using-semaphore/openid) tokens are generated.

## Reference

Semaphore generates a unique OIDC token for every job. The token is injected into the job environment as a variable named `SEMAPHORE_OIDC_TOKEN`.

The token consists of a JWT token signed by Semaphore and contains the following claims.

Sure, here is the reordered list presented in a table with three columns: Claim, Description, Example.

| Claim       | Description                                               | Example                              |
|-------------|-----------------------------------------------------------|--------------------------------------|
| iss         | The issuer of the token. The full URL of the organization | `https://{org-name}.semaphoreci.com` |
| aud         | The intended audience of the token. The full URL of the organization | `https://{org-name}.semaphoreci.com` |
| sub         | The subject of the token. A combination of org, project, repository, and git reference for which this token was issued<br/>Template:<br/> `org:{org-name}:`<br/>`project:{project-id}:`<br/>`repo:{repo-name}:`<br/>`ref_type:{branch or pr or tag}:`<br/>`ref:{git_reference}` | `org:{org-name}:`<br/>`project:936a5312-a3b8-4921-8b3f-2cec8baac574:`<br/>`repo:web:`<br/>`ref_type:branch:`<br/>`ref:refs/heads/main` |
| exp         | The UNIX timestamp when the token expires  | `1660317851` |
| iat         | The UNIX timestamp when the token was issued | `1660317851` |
| nbf         | The UNIX timestamp before which the token is not valid | `1660317851` |
| jti         | The Unique ID of the JWT token | `2s557dchalv2mv76kk000el1` |
| branch      | The name of the branch on which the job is running. If the job was triggered by a pull request, then the value is the target branch of the pull request that triggered that job | `main` |
| pr_branch   | The name of the source branch of the Pull Request which triggered a job | `feature-branch` |
| pr          | The number of the Pull Request for which the token was issued  | `123` |
| ref         | The full git reference for which the token was issued  | `refs/heads/main` |
| ref_type    | The type of git reference that triggered the job  | `branch`, `tag`, or `pull-request` |
| tag         | The name of the git tag for which the token was issued    | `v1.0.0`   |
| repo        | The name of the repository for which the token was issued | `web` |
| repo_slug   | Specifies the repository's name in the format `owner_name/repository_name` for the current Semaphore project. It is associated with the environment variable `SEMAPHORE_GIT_REPO_SLUG` | `semaphoreci/docs`  |
| prj_id      | The project ID for which the token was issued | `1e1fcfb5-09c0-487e-b051-2d0b5514c42a` |
| wf_id       | The ID of the workflow for which the token was issued | `1be81412-6ab8-4fc0-9d0d-7af33335a6ec` |
| ppl_id      | The pipeline ID for which the token was issued | `1e1fcfb5-09c0-487e-b051-2d0b5514c42a` |
| job_type    | The type of the job based on the way it was created <br/>The possible values are:<ul><li>`pipeline_job`: A regular job that is the part of a pipeline</li><li>`debug_job`: A job that was created to debug the other job via the sem debug job `<JOB_ID>` command</li><li>`project_debug_job`:A job that was created to debug the project via the sem debug project `<PROJECT_NAME>` command</li></ul> | `pipeline_job` |
| job_id      | The ID of the job for which the token was issued | `c117e453-1189-4eaf-b03a-dd6538eb49b2` |


A token with the above claims is exported into jobs as the `SEMAPHORE_OIDC_TOKEN` environment variable, which can then be presented to the cloud provider as an authorization token.

If the cloud provider is configured to accept OIDC tokens, it will receive the token, verify its signature by connecting back to `{org-name}.semaphoreci.com.well-known/jwts`, and if the token is valid, it will respond with a short-lived token for this specific job that can be used to fetch and modify cloud resources.

## See also

- [Pipeline YAML](./pipeline-yaml)
