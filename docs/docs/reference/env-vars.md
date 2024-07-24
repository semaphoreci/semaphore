---
description: Environment variables in Semaphore
---


# Environment variables


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Available from '@site/src/components/Available';
import VideoTutorial from '@site/src/components/VideoTutorial';

```text title="example"
```


## Semaphore variables

### `CI` {#ci}

Holds `true` when the session is running in a Semaphore continuous integration (CI) environment.

```text title="example"
true or false
```

### `SEMAPHORE` {#semaphore}

Holds `true` when the session is running in a Semaphore environment.

```text title="example"
true or false
```

### `SEMAPHORE_AGENT_MACHINE_ENVIRONMENT_TYPE` {#agent-machine-environment-type}

Defines the type of environment for the current job. 

Possible values are:

- `container`: job running inside a Docker container
- `VM`: job running on a virtual machine

```text title="example"
container
```

### `SEMAPHORE_AGENT_MACHINE_OS_IMAGE` {#agent-machine-os-image}

The name of the operating system image active in the current job.

See [machine types](./machine-types) for all available options.

```text title="example"
ubuntu2004
```

### `SEMAPHORE_AGENT_MACHINE_TYPE` {#agent-machine-type}

The type of agent running the current job.

See [machine types](./machine-types) for all available options.

```text title="example"
e1-standard-2
```

### `SEMAPHORE_JOB_CREATION_TIME` {#job-creation-time}

The UNIX epoch seconds when the current job was created.

```text title="example"
1632943641
```

### `SEMAPHORE_JOB_ID` {#job-id}

The unique identifier for the current job. Semaphore automatically generates unique IDs for every job.

You can view all the job IDs using the [sem CLI](./semaphore-cli):

- **Get active jobs**: execute `sem get jobs`
- **Get most recent jobs**: execute `sem get jobs --all`

```text title="example"
a26d42cf-89ac-4c3f-9e2d-51bb231897bf
```

### `SEMAPHORE_JOB_NAME` {#job-name}

A string with user-supplied name for the job. 

```text title="example"
Push image to Docker
```

### `SEMAPHORE_JOB_RESULT` {#job-result}

Describes the ending state of the job. The possible states are:

- `none`: the job has not yet finished
- `passed`: the job finished successfully
- `failed`: the job finished in failure
- `stopped`: the job was terminated before completion

```text title="example"
passed
```

### `SEMAPHORE_JOB_TYPE` {#job-type}

Describes why the current jobs was created. The possible values are:

- `pipeline_job`: a regular job created by Semaphore as part of the workflow
- `project_debug_job`: job created with [`sem debug project`](./semaphore-cli#debug-project)
- `debug_job`: job created with [`sem debug job`](./semaphore-cli#debug-job)

```text title="example"
pipeline_job
```


### `SEMAPHORE_ORGANIZATION_URL` {#organization-url}

The URL for the organization that owns the project running the current job.

```text title="example"
https://my-org.semaphoreci.com
```

### `SEMAPHORE_PIPELINE_ID` {#pipeline-id}

The unique identifier for the current workflow. All jobs that belong to the same pipeline share the same ID. 

```text title="example"
ea3e6bba-d19a-45d7-86a0-e78a2301b616
```

### `SEMAPHORE_PIPELINE_PROMOTION` {#pipeline-promotion}

Holds `true` when the pipeline was started due to a [promotion](../using-semaphore/promotions). It is always `false` for the initial pipeline that starts the workflow.

```text title="example"
true or false
```

### `SEMAPHORE_PIPELINE_PROMOTED_BY` {#pipeline-promoted-by}

Determines the individual that promoted the pipeline. There are three possible cases:

- **Initial pipelines**: the variable contains an empty string
- **Manual promotions**: the GitHub or BitBucket username that manually promoted the pipeline
- [Auto-promotions](../using-semaphore/promotions#automatic-promotions): the value is `auto-promotion`

```text title="Example"
torvalds
```

### `SEMAPHORE_PIPELINE_RERUN` {#pipeline-rerun}

Holds `true` when the pipeline was rerun by the user.

```text title="example"
true or false
```


### `SEMAPHORE_PROJECT_ID` {#project-id}

The project unique identifier that the job session belongs to. Semaphore automatically assigns unique IDs to every project.

```text title="example"
0dd982e8-32f5-4037-983e-4de01ac7fb1e
```

### `SEMAPHORE_PROJECT_NAME` {#project-name}

The name of the project that a job belongs to.

```text title="example"
my-awesome-project
```

### `SEMAPHORE_WORKFLOW_ID` {#workflow-id}

The workflow unique identifier. All jobs belonging to all pipelines in the workflow share this same ID. This includes the initial pipeline and all manually or auto-promoted pipelines in the same build.

```text title="example"
0dd982e8-32f5-4037-983e-4de01ac7fb1e
```

### `SEMAPHORE_WORKFLOW_NUMBER` {#workflow-number}

This number is incremented every time the workflow runs. In other words, the number is incremented by one every time there is a Git push on any branch, every time there is a pull request or a tag is pushed to the repository. It doesn't increment with debug jobs.

This number is available to all jobs in all pipelines belonging to the same workflow. This includes the initial pipeline and all manually or auto-promoted pipelines in the same build.

```text title="example"
42
```

### `SEMAPHORE_WORKFLOW_RERUN` {#workflow-rerun}

Holds `true` if the workflow is a rerun of a previously-ran workflow.

```text title="example"
true or false
```

### `SEMAPHORE_WORKFLOW_TRIGGERED_BY` {#workflow-triggered-by}

Determines the GitHub or BitBucket username for the individual that promoted the pipeline.

```text title="example"
torvalds
```

### `SEMAPHORE_WORKFLOW_TRIGGERED_BY_API` {#workflow-triggered-by-api}

Holds `true` if the workflow was triggered using the [Semaphore API](../openapi-spec/workflows-schedule).

The variable is `false` if the workflow is triggered by a Git push, pull request, or via [Tasks](../using-semaphore/tasks).

```text title="example"
true or false
```

### `SEMAPHORE_WORKFLOW_TRIGGERED_BY_HOOK` {#workflow-triggered-by-hook}

Holds `true` if the workflow was triggered by a Git push to the repository. It's also true for Git tags and pull requests.

The variable is `false` when the workflow is triggered via the Semaphore API or using [Tasks](../using-semaphore/tasks).

```text title="example"
true or false
```

### `SEMAPHORE_WORKFLOW_TRIGGERED_BY_MANUAL_RUN` {#workflow-triggered-by-manual-run}

Holds `true` if the workflow was triggered by a user through the Semaphore UI.

The variable is `false` when the workflow is triggered Git push, pull request, Tasks, or the Semaphore API

```text title="example"
true or false
```

### `SEMAPHORE_WORKFLOW_TRIGGERED_BY_SCHEDULE` {#workflow-triggered-by-schedule}

Holds `true` if the workflow was triggered using [Tasks](../using-semaphore/tasks).

```text title="example"
true or false
```

## Git repo variables

### `SEMAPHORE_GIT_REPO_SLUG` {#git-repo-slug}

The repository name in the form `owner/repo-name` for the current Semaphore project.

```text title="example"
semaphoreci/my-awesome-app
```

### `SEMAPHORE_GIT_REPO_NAME` {#git-repo-name}

The name of the Git repository name for the current Semaphore project.

```text title="Example"
my-awesome-app
```

### `SEMAPHORE_GIT_BRANCH` {#git-branch}


The Git branch used in the current job. On pull requests, the value is the name of the upstream branch targeted by the merge. 

For example, if you create a branch called `feature` and create a pull request to merge to `main`, then `SEMAPHORE_GIT_BRANCH=main`

```text title="example"
main
```

### `SEMAPHORE_GIT_WORKING_BRANCH` {#git-working-branch}

```text title="example"
main
```

The name of the branch used in the current job. On pull request, this is the downstream branch that would be merged.

For example, if you create a branch called `feature` and create a pull request to merge to `main`, then `SEMAPHORE_GIT_BRANCH=feature`

The variable is *missing* when the workflow is triggered by pushing Git tag.

## After pipeline variables

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
