---
description: Environment variables in Semaphore
---

# Environment variables

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Available from '@site/src/components/Available';
import VideoTutorial from '@site/src/components/VideoTutorial';

## SEMAPHORE_PROJECT_NAME {#project-name}

Example: `semaphore-demo-javascript`

The value of the SEMAPHORE_PROJECT_NAME environment variable holds the name of the project that a job belongs to.

## SEMAPHORE_GIT_REPO_SLUG {#git-repo-slug}

Example: `semaphoreci/docs`

The value of the SEMAPHORE_GIT_REPO_SLUG environment variable is the name (owner_name/repo_name) of the repository of the current Semaphore project.

## SEMAPHORE_PIPELINE_PROMOTION {#pipeline-promotion}

Example: `false`

The value of the SEMAPHORE_PIPELINE_PROMOTION environment variable is true if the pipeline was started by a promotion belonging to another pipeline.

It has a false value only in the initial pipeline that was created when the workflow was created.

The SEMAPHORE_PIPELINE_PROMOTION environment variable remains the same throughout all the blocks of a pipeline.

## SEMAPHORE_PIPELINE_PROMOTED_BY {#pipeline-promoted-by}

Example: `tomfern`

The value of the SEMAPHORE_PIPELINE_PROMOTED_BY environment variable is auto-promotion, if the pipeline is auto-promoted.

If the pipeline is manually-promoted, the value is the GitHub/Bitbucket username of the person that promoted the pipeline.

However, if it is an initial pipeline, the value of the environment variable is an empty string.

## SEMAPHORE_GIT_REPO_NAME {#git-repo-name}

Example: `docs`

The name of the Git repository name for the current Semaphore project.

## SEMAPHORE_GIT_BRANCH {#git-branch}

Example: `next`

The value of the SEMAPHORE_GIT_BRANCH environment variable is the name of the git branch used in the current job.

In builds triggered by a Pull Request, the value of the SEMAPHORE_GIT_BRANCH is the name of the git branch targeted by the Pull Request.

## SEMAPHORE_GIT_WORKING_BRANCH {#git-working-branch}

Example: `main`

The value of the SEMAPHORE_GIT_WORKING_BRANCH environment variable is the name of the repository branch used in the current job.

In builds triggered by a Pull Request, the value of the SEMAPHORE_GIT_WORKING_BRANCH is the name of the head repository branch.

In builds triggered by a Tag, the variable is missing.


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