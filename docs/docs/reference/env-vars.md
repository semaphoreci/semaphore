---
description: Environment variables in Semaphore
---


# Environment variables


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Available from '@site/src/components/Available';
import VideoTutorial from '@site/src/components/VideoTutorial';

## Semaphore variables

### CI {#ci}

- **Environment variable**: `CI`
- **Example**: `true`

Holds `true` when the session is running in a Semaphore continuous integration (CI) environment.

### Semaphore {#semaphore}

- **Environment variable**: `SEMAPHORE`
- **Example**: `true`

Holds `true` when the session is running in a Semaphore environment.

### Agent machine type {#agent-machine-environment-type}

- **Environment variable**: `SEMAPHORE_AGENT_MACHINE_ENVIRONMENT_TYPE`
- **Example**: `container`

Defines the type of environment for the current job.

Possible values are:

- `container`: job running inside a Docker container
- `VM`: job running on a virtual machine

### Agent OS image {#agent-machine-os-image}

- **Environment variable**: `SEMAPHORE_AGENT_MACHINE_OS_IMAGE`
- **Example**: `ubuntu2004`

The name of the operating system image active in the current job.

See [machine types](./machine-types) for all available options.

### Agent machine type {#agent-machine-type}

- **Environment variable**: `SEMAPHORE_AGENT_MACHINE_TYPE`
- **Example**: `e1-standard-2`

The type of agent running the current job.

See [machine types](./machine-types) for all available options.

### Job creation time {#job-creation-time}

- **Environment variable**: `SEMAPHORE_JOB_CREATION_TIME`
- **Example**: `1632943641`

The UNIX epoch seconds when the current job was created.

### Job id {#job-id}

- **Environment variable**: `SEMAPHORE_JOB_ID`
- **Example**: `a26d42cf-89ac-4c3f-9e2d-51bb231897bf`

The unique identifier for the current job. Semaphore automatically generates unique IDs for every job.

You can view all the job IDs using the [sem CLI](./semaphore-cli):

- **Get active jobs**: execute `sem get jobs`
- **Get most recent jobs**: execute `sem get jobs --all`

### Job name {#job-name}

- **Environment variable**: `SEMAPHORE_JOB_NAME`
- **Example**: `Push image to Docker`

A string with a user-supplied name for the job.

### Job result {#job-result}

- **Environment variable**: `SEMAPHORE_JOB_RESULT`
- **Example**: `passed`

Describes the ending state of the job. The possible states are:

- `none`: the job has not yet finished
- `passed`: the job finished successfully
- `failed`: the job finished in failure
- `stopped`: the job was terminated before completion

### Job type {#job-type}

- **Environment variable**: `SEMAPHORE_JOB_TYPE`
- **Example**: `pipeline_job`

Describes why the current job was created. The possible values are:

- `pipeline_job`: a regular job created by Semaphore as part of the workflow
- `project_debug_job`: job created with [`sem debug project`](./semaphore-cli#debug-project)
- `debug_job`: job created with [`sem debug job`](./semaphore-cli#debug-job)

### Organization URL {#organization-url}

- **Environment variable**: `SEMAPHORE_ORGANIZATION_URL`
- **Example**: `https://my-org.semaphoreci.com`

The URL for the organization that owns the project running the current job.

### Pipeline ID {#pipeline-id}

- **Environment variable**: `SEMAPHORE_PIPELINE_ID`
- **Example**: `ea3e6bba-d19a-45d7-86a0-e78a2301b616`

The unique identifier for the current workflow. All jobs that belong to the same pipeline share the same ID.

### Pipeline is promotion {#pipeline-promotion}

- **Environment variable**: `SEMAPHORE_PIPELINE_PROMOTION`
- **Example**: `true`

Holds `true` when the pipeline was started due to a [promotion](../using-semaphore/promotions). It is always `false` for the initial pipeline that starts the workflow.

### Pipeline promoted by {#pipeline-promoted-by}

- **Environment variable**: `SEMAPHORE_PIPELINE_PROMOTED_BY`
- **Example**: `torvalds`

Determines the individual that promoted the pipeline. There are three possible cases:

- **Initial pipelines**: the variable contains an empty string
- **Manual promotions**: the GitHub or BitBucket username that manually promoted the pipeline
- [Auto-promotions](../using-semaphore/promotions#automatic-promotions): the value is `auto-promotion`

### Pipeline is rerun {#pipeline-rerun}

- **Environment variable**: `SEMAPHORE_PIPELINE_RERUN`
- **Example**: `true`

Holds `true` when the pipeline was rerun by the user.

### Project ID {#project-id}

- **Environment variable**: `SEMAPHORE_PROJECT_ID`
- **Example**: `0dd982e8-32f5-4037-983e-4de01ac7fb1e`

The project unique identifier that the job session belongs to. Semaphore automatically assigns unique IDs to every project.

### Project name {#project-name}

- **Environment variable**: `SEMAPHORE_PROJECT_NAME`
- **Example**: `my-awesome-project`

The name of the project that a job belongs to.

### Workflow ID {#workflow-id}

- **Environment variable**: `SEMAPHORE_WORKFLOW_ID`
- **Example**: `0dd982e8-32f5-4037-983e-4de01ac7fb1e`

The workflow unique identifier. All jobs belonging to all pipelines in the workflow share this same ID. This includes the initial pipeline and all manually or auto-promoted pipelines in the same build.

### Workflow number {#workflow-number}

- **Environment variable**: `SEMAPHORE_WORKFLOW_NUMBER`
- **Example**: `42`

This number is incremented every time the workflow runs. In other words, the number is incremented by one every time there is a Git push on any branch, every time there is a pull request, or a tag is pushed to the repository. It doesn't increment with debug jobs.

This number is available to all jobs in all pipelines belonging to the same workflow. This includes the initial pipeline and all manually or auto-promoted pipelines in the same build.

### Workflow is rerun {#workflow-rerun}

- **Environment variable**: `SEMAPHORE_WORKFLOW_RERUN`
- **Example**: `true`

Holds `true` if the workflow is a rerun of a previously-ran workflow.

### Workflow triggered by {#workflow-triggered-by}

- **Environment variable**: `SEMAPHORE_WORKFLOW_TRIGGERED_BY`
- **Example**: `torvalds`

Determines the GitHub or BitBucket username for the individual that promoted the pipeline.

### Workflow is triggered by API {#workflow-triggered-by-api}

- **Environment variable**: `SEMAPHORE_WORKFLOW_TRIGGERED_BY_API`
- **Example**: `true`

Holds `true` if the workflow was triggered using the [Semaphore API](../openapi-spec/workflows-schedule).

The variable is `false` if the workflow is triggered by a Git push, pull request, or via [Tasks](../using-semaphore/tasks).

### Workflow is triggered by hook {#workflow-triggered-by-hook}

- **Environment variable**: `SEMAPHORE_WORKFLOW_TRIGGERED_BY_HOOK`
- **Example**: `true`

Holds `true` if the workflow was triggered by a Git push to the repository. It's also true for Git tags and pull requests.

The variable is `false` when the workflow is triggered via the Semaphore API or using [Tasks](../using-semaphore/tasks).

### Workflow is triggered manually {#workflow-triggered-by-manual-run}

- **Environment variable**: `SEMAPHORE_WORKFLOW_TRIGGERED_BY_MANUAL_RUN`
- **Example**: `true`

Holds `true` if the workflow was triggered by a user through the Semaphore UI.

The variable is `false` when the workflow is triggered Git push, pull request, Tasks, or the Semaphore API

### Workflow is triggered by task {#workflow-triggered-by-schedule}

- **Environment variable**: `SEMAPHORE_WORKFLOW_TRIGGERED_BY_SCHEDULE`
- **Example**: `true`

Holds `true` if the workflow was triggered using [Tasks](../using-semaphore/tasks).

## Git variables

### Branch (upstream) {#git-branch}

- **Environment variable**: `SEMAPHORE_GIT_BRANCH`
- **Example**: `main`

The Git branch used in the current job. On pull requests, the value is the name of the upstream branch targeted by the merge.

For example, if you create a branch called `feature` and create a pull request to merge to `main`, then `SEMAPHORE_GIT_BRANCH=main`.

### Working branch (downstream) {#git-working-branch}

- **Environment variable**: `SEMAPHORE_GIT_WORKING_BRANCH`
- **Example**: `main`

The name of the branch used in the current job. On pull request, this is the downstream branch that would be merged.

For example, if you create a branch called `feature` and create a pull request to merge to `main`, then `SEMAPHORE_GIT_WORKING_BRANCH=feature`.

:::note

The variable is *missing* when the workflow is triggered by pushing Git tag.

:::

### Commit Author {#commit-author}

- **Environment variable**: `SEMAPHORE_GIT_COMMIT_AUTHOR`
- **Example**: `torvalds`

The GitHub or Bitbucket username of the person that authored the revision.

### Commit Range {#commit-range}

- **Environment variable**: `SEMAPHORE_GIT_COMMIT_RANGE`
- **Example**: `5c84719708b9b649b9ef3b56af214f38cee6acde...92d87d5c0dd2dbb7a68ecb27df43d1b164fd3e30`

The range of SHA commits that were included in a push or pull request.

This is empty for builds triggered by the initial commit of a new branch or tag.

### Commit SHA {#commit-sha}

- **Environment variable**: `SEMAPHORE_GIT_SHA`
- **Example**: `5c84719708b9b649b9ef3b56af214f38cee6acde`

The current Git SHA revision of code that the job is using.

### Committer {#committer}

- **Environment variable**: `SEMAPHORE_GIT_COMMITTER`
- **Example**: `torvalds`

The GitHub or Bitbucket username of the person that authored the revision.

### Git Provider {#git-provider}

- **Environment variable**: `SEMAPHORE_GIT_PROVIDER`
- **Example**: `bitbucket`, `github`

The Git provider the repository is hosted on. Possible values are `bitbucket` or `github`.

### Git Reference {#git-reference}

- **Environment variable**: `SEMAPHORE_GIT_REF`
- **Example**: `refs/heads/master`

The name of Git reference to the commit that the job is using.

### Git Reference Type {#git-reference-type}

- **Environment variable**: `SEMAPHORE_GIT_REF_TYPE`
- **Example**: `branch`, `tag`, or `pull-request`

The type of Git reference. Possible values are: `branch`, `tag`, or `pull-request`.

### Git URL {#git-url}

- **Environment variable**: `SEMAPHORE_GIT_URL`
- **Example**: `http://git@github.com:semaphoreci/toolbox.git`

The URL of the repository used in the current Semaphore project.

### Pull request branch {#pr-branch}

- **Environment variable**: `SEMAPHORE_GIT_PR_BRANCH`
- **Example**: `featureA`

The name of the Git branch from which the Pull Request originated (upstream)

:::note

Present only for builds where `SEMAPHORE_GIT_REF_TYPE=pull-request`

:::

### Pull request name {#pr-name}

- **Environment variable**: `SEMAPHORE_GIT_PR_NAME`
- **Example**: `Update Readme.md`

The name of the Pull Request that originated the workflow.

:::note

Present only for builds where `SEMAPHORE_GIT_REF_TYPE=pull-request`

:::

### Pull request number {#pr-number}

- **Environment variable**: `SEMAPHORE_GIT_PR_NUMBER`
- **Example**: `1`

The number of the Pull Request.


:::note

Present only for builds where `SEMAPHORE_GIT_REF_TYPE=pull-request`

:::

### Pull request SHA {#pr-sha}

- **Environment variable**: `SEMAPHORE_GIT_PR_SHA`
- **Example**: `5c84719708b9b649b9ef3b56af214f38cee6acd3`

The Git SHA of the HEAD commit of the Pull Request.

:::note

Present only for builds where `SEMAPHORE_GIT_REF_TYPE=pull-request`

:::

### Pull request slug {#pr-slug}

- **Environment variable**: `SEMAPHORE_GIT_PR_SLUG`
- **Example**: `renderedtext/docs`

The name in format `owner_name/repo_name` of the repository from which the Pull Request originated.

::note

Present only for builds where `SEMAPHORE_GIT_REF_TYPE=pull-request`

:::

### Repository directory {#git-dir}

- **Environment variable**: `SEMAPHORE_GIT_DIR`
- **Example**: `src`

The name of the directory that contains the files of the repository linked to the current Semaphore project.


### Repository name {#git-repo-name}

- **Environment variable**: `SEMAPHORE_GIT_REPO_NAME`
- **Example**: `my-awesome-app`

The name of the Git repository name for the current Semaphore project.

### Repository slug {#git-repo-slug}

- **Environment variable**: `SEMAPHORE_GIT_REPO_SLUG`
- **Example**: `semaphoreci/my-awesome-app`

The repository name in the form `owner/repo-name` for the current Semaphore project.

### Tag Name {#git-tag-name}

- **Environment variable**: `SEMAPHORE_GIT_TAG_NAME`
- **Example**: `v1.0.0`

The name of the Git tag used in the current job.

:::note

Present only for builds where `SEMAPHORE_GIT_REF_TYPE=tag`.

:::

## After pipeline variables

### Pipeline created at {#pipeline-created-at}

- **Environment variable**: `SEMAPHORE_PIPELINE_CREATED_AT`
- **Example**: `1632943641`

The UNIX epoch timestamp when the pipeline was created.

### Pipeline done at {#pipeline-done-at}

- **Environment variable**: `SEMAPHORE_PIPELINE_DONE_AT`
- **Example**: `1632943650`

The UNIX epoch timestamp when the pipeline was finished.

### Pipeline init duration {#pipeline-init-duration}

- **Environment variable**: `SEMAPHORE_PIPELINE_INIT_DURATION`
- **Example**: `1`

The duration of [initialization job](../using-semaphore/pipelines#init-job) expressed in seconds.

CONTINUE HERE

### Pipeline Queueing Duration {#pipeline-queueing-duration}

- **Environment variable**: `SEMAPHORE_PIPELINE_QUEUEING_DURATION`
- **Example**: `1`

The value of the `SEMAPHORE_PIPELINE_QUEUEING_DURATION` contains the time that the pipeline spent in the queue. The value is expressed in seconds.

### Pipeline Result {#pipeline-result}

- **Environment variable**: `SEMAPHORE_PIPELINE_RESULT`
- **Example**: `failed`, `passed`, `canceled`, `stopped`

The value of the `SEMAPHORE_PIPELINE_RESULT` contains the result of the pipeline.

### Pipeline Result Reason {#pipeline-result-reason}

- **Environment variable**: `SEMAPHORE_PIPELINE_RESULT_REASON`
- **Example**: `test`, `malformed`, `stuck`, `internal`, `user`, `strategy`, `timeout`

The value of the `SEMAPHORE_PIPELINE_RESULT_REASON` contains the reason for the pipeline result.

### Pipeline Running Duration {#pipeline-running-duration}

- **Environment variable**: `SEMAPHORE_PIPELINE_RUNNING_DURATION`
- **Example**: `12`

The value of the `SEMAPHORE_PIPELINE_RUNNING_DURATION` contains the pipeline execution time while jobs were running. The value is expressed in seconds.

### Pipeline Started At {#pipeline-started-at}

- **Environment variable**: `SEMAPHORE_PIPELINE_STARTED_AT`
- **Example**: `1632943642`

The value of the `SEMAPHORE_PIPELINE_STARTED_AT` is the UNIX epoch timestamp when the pipeline started running jobs.

### Pipeline Total Duration {#pipeline-total-duration}

- **Environment variable**: `SEMAPHORE_PIPELINE_TOTAL_DURATION`
- **Example**: `10`

The value of the `SEMAPHORE_PIPELINE_TOTAL_DURATION` contains the duration of the pipeline including queuing time. The value is expressed in seconds.

## Cache variables

## Docker variables

## Self-hosted variables


## Initialization job {#init}

NOTE: These seem to be all the env-vars that are defined during initialization jobs

"SEMAPHORE_PIPELINE_ID"
"SEMAPHORE_PIPELINE_ARTEFACT_ID"
"SEMAPHORE_PIPELINE_RERUN"
"SEMAPHORE_PIPELINE_PROMOTION"
"SEMAPHORE_PIPELINE_PROMOTED_BY"
"SEMAPHORE_WORKFLOW_ID"
"SEMAPHORE_SNAPSHOT_ID"
"SEMAPHORE_WORKFLOW_NUMBER"
"SEMAPHORE_WORKFLOW_RERUN"
"SEMAPHORE_WORKFLOW_TRIGGERED_BY_HOOK"
"SEMAPHORE_WORKFLOW_HOOK_SOURCE"
"SEMAPHORE_WORKFLOW_TRIGGERED_BY_SCHEDULE"
"SEMAPHORE_WORKFLOW_TRIGGERED_BY_API"
"SEMAPHORE_WORKFLOW_TRIGGERED_BY_MANUAL_RUN"
"SEMAPHORE_WORKFLOW_TRIGGERED_BY"
"SEMAPHORE_GIT_COMMIT_AUTHOR"
"SEMAPHORE_GIT_COMMITTER"

"TERM"
"CI"
"SEMAPHORE"
"SEMAPHORE_PROJECT_NAME"
"SEMAPHORE_PROJECT_ID"
"SEMAPHORE_JOB_NAME"
"SEMAPHORE_JOB_ID"
"SEMAPHORE_JOB_CREATION_TIME"
"SEMAPHORE_JOB_TYPE"
"SEMAPHORE_AGENT_MACHINE_TYPE"
"SEMAPHORE_AGENT_MACHINE_OS_IMAGE"
"SEMAPHORE_AGENT_MACHINE_ENVIRONMENT_TYPE"
"SEMAPHORE_ORGANIZATION_URL"
