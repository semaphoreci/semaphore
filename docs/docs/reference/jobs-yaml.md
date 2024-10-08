---
description: Jobs YAML reference
---

# Jobs YAML

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Available from '@site/src/components/Available';
import VideoTutorial from '@site/src/components/VideoTutorial';

This page describes the YAML syntax to create and manage Semaphore jobs.

## Overview

Jobs are represented using YAML in Semaphore. This page describes the specification used to create and view jobs using the [Semaphore Command Line](./semaphore-cli).

## apiVersion {#apiVersion}

This property defines the version of the YAML specification.

The only value supported is: `v1alpha`

## kind {#kind}

Defines the type of a YAML file.

For jobs, this property must be `Job`

## metadata {#metadata}

Defines the metadata for the job. 

Contains the following properties:

- [`name`](#name-in-metadata)
- [`id`](#id-in-metadata)
- [`create_time`](#create-time-in-metadata)
- [`update_time`](#update-time-in-metadata)
- [`start_time`](#start-time-in-metadata)
- [`finish_time`](#finish-time-in-metadata)

The `name` property is the only one that can be used-defined. The rest are populated by Semaphore automatically.

### name {#name-in-metadata}

A descriptive name for the job. Jobs can share the same name as they are uniquely identified by a job ID.

### id {#id-in-metadata}

The job ID is automatically generated by Semaphore and should not be changed by the user.

### create_time {#create-time-in-metadata}

The UNIX timestamp epoch for the creation time of the job.

### update_time {#update-time-in-metadata}

The UNIX timestamp epoch for the last time the job was changed.

### start_time {#start-time-in-metadata}

The UNIX timestamp epoch for the start time for the job execution.

### finish_time {#finish-time-in-metadata}

The UNIX timestamp epoch for the finish time for the job execution.

## spec {#spec}

This property describes the full specification for the job.

It contains the following properties:

- [`agent`](#agent-in-spec)
- [`files`](#files-in-spec)
- [`envvars`](#envvars-in-spec)
- [`secrets`](#secrets-in-spec)
- [`commands`](#commands-in-spec)
- [`project_id`](#project-id-in-spec)

### files {#files-in-spec}

A list of files to be used in the job.

Each file item is represented by two properties:

- `path`: the path for the file in the job environment
- `content`: base64 encoded contents of the file

### envvars {#envvars-in-spec}

A list of environment variables key-value pairs.

Each variable is represented with two properties:

- `name`: name for the environment variable
- `value`: the value of the variable

### secrets {#secrets-in-spec}

A list of [secrets](../using-semaphore/secrets) to be imported into the job.

Each secret requires the `name` property to identify the secret by name.

### commands {#commands-in-spec}

This property contains a list of shell commands for the job.

Each item represents one line to be executed in the job environment.

### project_id {#project-id-in-spec}

Defines the project where the job is to be executed. Requires a valid project ID.

## agent {#agent-in-spec}

Defines the [agent](../using-semaphore/pipelines#agents) to run the job.

Takes one property: [`machine`](#machine-in-agent)

### machine {#machine-in-agent}

Defines the VM machine or [self-hosted agent type](../using-semaphore/self-hosted) to run the job.

Requires two properties

- `type`: the type of hardware or [self-hosted agent type](../using-semaphore/self-hosted) to run the job. See [machine types](./machine-types) for valid values on Semaphore Cloud
- `os_image`: the Operating System image name to run in the machine. See [machine types](./machine-types) for valid values on Semaphore Cloud

## status {#status}

Describes the status of the job. It's automatically populated by Semaphore. The status contains the following properties:

- [`state`](#state-in-status)
- [`result`](#result-in-status)
- [`agent`](#agent-in-status)

### state {#state-in-status}

The current state of the job.

The possible values are:

- `PENDING`: the job has been accepted by Semaphore
- `QUEUED`: the job is waiting for available capacity
- `RUNNING`: the job is processing commands
- `FINISHED`: job processing has finished and the [`result`](#result-in-status) has been calculated

### result {#result-in-status}

Describes the result of the job. Its value is valid when the job [`state`](#state-in-status) is `FINISHED`.

The possible values are:

- `NONE`: the job has not yet finished
- `PASSED`: the job has successfully finished
- `FAILED`: the job has failed, either because a command has failed or because
 one or more dependencies were not available
- `STOPPED`: the job was terminated before completion

## agent in status {#agent-in-status}

Describes the agent that is running or has run the job. These values are populated automatically by Semaphore.


Contains the following properties:

- `ip`: IP address of the machine
- `name`: only used on [self-hosted agents](../using-semaphore/self-hosted). This is the name of the agent assigned to the job
- `ports`: a list of name-number pairs that describes the ports using during SSH communication. Contains the following properties:
  - `name`: descriptive name for the port
  - `number`: the number of the TCP port

## Examples {#examples}

The following example is the output of [`sem get jobs <job-id>`](./semaphore-cli#sem-get-job):

```yaml title="Example"
apiVersion: v1alpha
kind: Job
metadata:
  name: Deploy
  id: 33cbe5af-fafb-424b-b06f-12006929cb08
  create_time: "1539327331"
  update_time: "1539327332"
  start_time: "1539327334"
  finish_time: "1539327340"
spec:
  agent:
    machine:
      type: e1-standard-2
      os_image: ubuntu2004
  files: []
  envvars:
  - name: SEMAPHORE_GIT_SHA
    value: f7da446084515d25db52b4fe6146db6e81ded482
  - name: SEMAPHORE_GIT_BRANCH
    value: master
  - name: SEMAPHORE_WORKFLOW_ID
    value: 0137eba3-fb19-41f8-87ac-77e040d437f6
  - name: SEMAPHORE_PIPELINE_ARTEFACT_ID
    value: b6452489-3bd7-4a09-a73d-a834b6cad1ac
  - name: SEMAPHORE_PIPELINE_ID
    value: b6452489-3bd7-4a09-a73d-a834b6cad1ac
  - name: SEMAPHORE_PIPELINE_0_ARTEFACT_ID
    value: b6452489-3bd7-4a09-a73d-a834b6cad1ac
  secrets:
  - name: docker-secrets
  commands:
  - checkout
  - gem install redcarpet
  - if [ $SEMAPHORE_GIT_BRANCH == "master" ]; then ./deploy_docs.rb; fi
  project_id: 0dd982e8-32f5-4037-983e-4de01ac7fb1e
status:
  state: FINISHED
  result: PASSED
  agent:
    ip: 94.130.207.151
    ports:
    - name: ssh
      number: 57693
```

As you can see, the description of a job as returned by Semaphore 2.0 contains many
properties. Some of them are defined by Semaphore 2.0, whereas others can be
defined by the user. You can visit the [sem command line tool Reference](https://docs.semaphoreci.com/reference/sem-command-line-tool/) documentation to learn how to define a job using the `sem create` command.

## See also

- [Pipeline YAML reference](./pipeline-yaml)
- [Projects YAML reference](./project-yaml)
- [Secret YAML reference](./secret-yaml)
- [Deployment targets YAML reference](./deployment-target-yaml)
- [Agents YAML reference](./agent-yaml)
- [Notifications YAML reference](./notifications-yaml)
- [Semaphore Command Line reference](./semaphore-cli)

