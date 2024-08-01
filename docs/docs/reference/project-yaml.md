---
description: Projects YAML reference
---

# Projects YAML reference

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Available from '@site/src/components/Available';
import VideoTutorial from '@site/src/components/VideoTutorial';


This document is the YAML sytnax reference used for adding and editing Semaphore projects via [Semaphore Command Line](./semaphore-cli).

## Overview

Projects can be created using [`sem init`](./semaphore-cli#sem-init) or [`sem create`](./semaphore-cli#sem-create). The syntax described here is required to use `sem create` for creating a project.

## apiVersion {#apiVersion}

The `apiVersion` property defines the version of the YAML grammar that will be used to define the YAML file. Different YAML versions might have different features.

The only allowed value is: `v1alpha`

### kind {#kind}

The value of the `kind` property is a string that specifies the type of the resource to create.

To create a project `kind` value must be `Project`

## metadata {#metadata}

The metadata supports the `name` property. This is the name for the project.

The value of the `name` property should be unique among all Semaphore projects belonging to the same organization and must only contain alphanumeric characters ([a-z], [A-Z] or [0-9]). Dashes, underscores, hypens, and spaces are not allowed.

## spec {#spec}

The `spec` property contains the [`repository`](#repository-in-spec) property.

It can also optionally include:

- [`schedulers`](#schedulers-in-spec)
- [`tasks`](#tasks-in-spec)

### repository {#repository-in-spec}

The `repository` property is used for holding the `url`, `run_on`, and,
`forked_pull_requests` properties.

##### url

The `url` property is a string that specifies the URL of the GitHub repository
you want to add to Semaphore 2.0. The format of the `url` value should be as
follows:

``` txt
git@github.com:github_username/github_repository.git
```

If the value of `url` is erroneous, you will get various types of error
messages, as detailed below.

1. If the GitHub repository cannot be found, `sem create` will reply with the
following error message:

``` bash
$ sem create -f goDemo.yaml

error: http status 422 with message "{"message":"repository \"text/goDemo\" not found"}" received from upstream
```

2. If the Semaphore 2.0 project's name is already taken, `sem` will reply with
the following error message:

``` bash
$ sem create -f goDemo.yaml

error: http status 422 with message "{"message":"project name \"goDemo2.1\" is already taken"}" received from upstream
```

3. If the `url` value does not have the correct format, `sem` will print
the following error message:

``` bash
$ sem create -f goDemo.yaml

error: http status 422 with message "{"message":"repository url must be an SSH url"}" received from upstream
```

##### run_on

The value of the `run_on` property is an array of repository events which should trigger
new workflows for your Semaphore project.

Here is a list of values for `run_on`: `branches`, `tags`, `pull_requests`, and `forked_pull_requests`.

For more information about workflow triggers, visit the
[project workflow tigger options](https://docs.semaphoreci.com/essentials/project-workflow-trigger-options/) documentation page.

##### forked\_pull\_requests

The `forked_pull_requests` property is used for holding the `allowed_secrets`
and `allowed_contributors` properties.

###### allowed\_secrets

The `allowed_secrets` property specifies the array of secrets' names that are allowed
to be exported into jobs triggered by `forked-pull-requests`. If the array is empty,
no secrets will be exported.

###### allowed\_contributors

The `allowed_secrets` property specifies an array of secrets (i.e. their names) that are allowed
to be exported into jobs triggered by `forked-pull-requests`. If the array is empty,
no secrets will be exported.

##### pipeline\_file

The `pipeline_file` property is used for setting the initial pipeline file
that is executed when a post-commit hook is received by Semaphore.

The default value is `.semaphore/semaphore.yml`.

*Note*: When modifying the initial pipeline file it is necessary to also update 
the corresponding [status check](/essentials/configuring-status-checks/).

##### status

The `status` property is used to specify which Semaphore pipeline(s) will
submit a status check on GitHub pull requests.

A pipeline can create a single status check as a result of a whole pipeline.
Or each block in a pipeline can create its own status check.

##### pipeline\_files

The `pipeline_files` property is a list of pipeline files for which Semaphore
will submit a status check.

Each value has two properties: `path` and `level`.

When you create a project, the default value is
`path: .semaphore/semaphore.yml, level: pipeline`.

##### path

The `path` property specifies a pipeline.

##### level

The `level` property specifies the granularity of status checks.

Here is a list of values for `level`: `block`, `pipeline`.

### schedulers {#schedulers-in-spec}

!!! warning "Scheduler/cron has been deprecated in favor of Tasks"
    This property is deprecated and will be removed in the future. Please use `tasks` instead.

The schedulers property can contain a list of schedulers defined in the
project.

A scheduler is a way to run a pre-defined pipeline on a project
at the pre-defined time. All times are interpreted as UTC.

A scheduler has the following properties:

##### name

The `name` property uniquely identifies each scheduler within an organization.

##### branch

The `branch` property specifies which branch will be used for
running the pipeline.

The chosen branch must have at least one workflow initiated by a push in order
for the scheduler to be valid.

##### at

The `at` property defines the schedule under which the pipeline will be run.

Semaphore expects this property to be in the [standard cron syntax](https://en.wikipedia.org/wiki/Cron).
For a simple way to define your cron syntax, visit [crontab.guru](https://crontab.guru/).

##### pipeline_file

The `pipeline_file` property contains the relative path to the pipeline
definition file from the root of the project.

For more information on defining a valid pipeline file, visit the
[Pipeline YAML Reference](https://docs.semaphoreci.com/reference/pipeline-yaml-reference/) documentation page.

##### status

The current status of the scheduler. This can be `ACTIVE` if the scheduler is currently enabled, or `INACTIVE` if the scheduler is currently disabled. 

### tasks {#tasks-in-spec}

The tasks property can contain a list of tasks defined in the project.

A task is a way to run a pre-defined pipeline on a project at a pre-defined 
time or on demand. All times are interpreted as UTC.

A task has the following properties:

##### name

The `name` property uniquely identifies each task within a project.

##### description

The `description` property provides additional comment for a task. It is optional and can be omitted.

##### scheduled

The `scheduled` property determines whether task is scheduled 
(triggers a workflow periodically) or not. It is a boolean value
(`true` or `false`).

If `scheduled` is set to `true`, then the `at` property must be set.

##### branch

The `branch` property specifies which branch will be used for
running the pipeline.

The chosen branch must exist on the remote repository.

##### at

The `at` property defines the schedule under which the pipeline will be run. This parameters is accepted and is mandatory only if `scheduled` is set to `true`. Otherwise, an empty string is expected.

Semaphore expects this property to be in the [standard cron syntax](https://en.wikipedia.org/wiki/Cron).
For a simple way to define your cron syntax, visit [crontab.guru](https://crontab.guru/).

##### pipeline_file

The `pipeline_file` property contains the relative path to the pipeline
definition file from the root of the project.

For more information on defining a valid pipeline file, visit the
[Pipeline YAML Reference](https://docs.semaphoreci.com/reference/pipeline-yaml-reference/) documentation page.

##### status

The current status of the task. This can be `ACTIVE` if the scheduler is currently enabled, or `INACTIVE` if the scheduler is currently disabled. 

##### parameters

The `parameters` property contains a list of parameters passed to the triggered workflow. 
Those parameters are accessible in job environment as environment variables. By default,
`parameters` is an empty list.

Each parameter has the following properties:

- `name` *(required)* - the name of the parameter, it must be unique within the list of parameters
- `required` *(required)* - a boolean value (`true` or `false`) that determines whether the parameter is required or not
- `description` *(optional)* - a description of the parameter
- `default_value` *(optional)* - the default value of a parameter (mandatory in case of required parameters)
- `options` *(optional)* - a list of possible values displayed in the UI

## Examples

A simple project:

``` yaml
apiVersion: v1alpha
kind: Project
metadata:
  name: goDemo
spec:
  repository:
    url: "git@github.com:renderedtext/goDemo.git"
    run_on:
      - branches
      - tags
    pipeline_file: ".semaphore/semaphore.yml"
    status:
      pipeline_files:
        - path: ".semaphore/semaphore.yml"
          level: "pipeline"
```

A project with schedulers:

``` yaml
apiVersion: v1alpha
kind: Project
metadata:
  name: goDemo
spec:
  repository:
    url: "git@github.com:renderedtext/goDemo.git"
    run_on:
      - branches
      - tags
    pipeline_file: ".semaphore/semaphore.yml"
    status:
      pipeline_files:
        - path: ".semaphore/semaphore.yml"
          level: "pipeline"
  schedulers:
    - name: first-scheduler
      branch: master
      at: "5 4 * * *"
      pipeline_file: ".semaphore/cron.yml"
    - name: second-scheduler
      branch: master
      at: "5 3 * * *"
      pipeline_file: ".semaphore/semaphore.yml"
      status: ACTIVE
```


A project with tasks:

``` yaml
apiVersion: v1alpha
kind: Project
metadata:
  name: goDemo
spec:
  repository:
    url: "git@github.com:renderedtext/goDemo.git"
    run_on:
      - branches
      - tags
    pipeline_file: ".semaphore/semaphore.yml"
    status:
      pipeline_files:
        - path: ".semaphore/semaphore.yml"
          level: "pipeline"
  tasks:
    - name: first-scheduler
      scheduled: true
      branch: master
      at: "5 4 * * *"
      pipeline_file: ".semaphore/cron.yml"
      status: ACTIVE
    - name: second-task
      description: "second-task description"
      scheduled: false
      branch: develop
      at: ""
      pipeline_file: ".semaphore/canary.yml"
      status: ACTIVE
      parameters:
      - name: CANARY_VERSION
        required: true
        default_value: "1.0.0"
      - name: DEBUG_INFO
        required: false
        default_value: "false"
        options:
        - "true"
        - "false"
```

## See Also