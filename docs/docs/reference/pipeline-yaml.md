---
description: Pipeline YAML reference
---

# Pipeline YAML 

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Available from '@site/src/components/Available';
import VideoTutorial from '@site/src/components/VideoTutorial';

## version {#version}


The version of the pipeline YAML specification used.

- **Valid values**: `v1.0`

```yaml title="Example"
version: v1.0
```

## name {#name}

A Unicode string for the pipeline name. It is strongly recommended to give descriptive names to your Semaphore pipelines.

```yaml title="Example"
name: The name of the Semaphore pipeline
```

:::note

The `name` property can also be found in other sections, e.g., defining the name of a job inside a `jobs` block.

:::

## agent {#agent}

Defines the agent's [machine type](#machine) and [OS image](#os_image) to run the jobs by default.

```yaml title="Example"
# highlight-next-line
agent:
  machine:
    type: e1-standard-2
    os_image: ubuntu2004
```

:::note

The default `agent` can be overriden on specific [tasks](#agent-task).

:::

### machine {#machine}

The `machine` property, which can only be defined under `agent`, requires two properties: `type` and `os_image`.

```yaml title="Example"
# highlight-next-line
machine:
  type: e1-standard-2
  os_image: ubuntu2004
```

### type {#type}


The `type` property is intended for selecting the hardware you would like to use on the virtual machine that runs your jobs. A complete list of valid values for the `type` property is available on the [Machine Types](./machine-types) page.

```yaml title="Example"
machine:
  # highlight-next-line
  type: e1-standard-4
  os_image: ubuntu2004
```

### os_image {#os_image}


`os_image` is an optional property that specifies the operating system image to be used in the virtual machine. If a value is not provided, the default for the machine type is used.

Default values:

- `e1-standard-*` machine types: `ubuntu2004`
- `a1-standard-*` machine types: `macos-xcode14`

A complete list of valid values for the `os_image` property is available on the [Machine Types](./machine-types) page.

```yaml title="Example"
machine:
  type: e1-standard-4
  # highlight-next-line
  os_image: ubuntu2004
```

### containers {#containers}

A list of Docker images to contain the jobs in the pipeline.

The `containers` property, which can only be defined under `agent`, is an array of docker images that will run the jobs in the pipeline.

Each container entry must define a `name` and `image` property. The name of the container is used when linking the containers together, and for defining hostnames in the first container.

The first container runs the jobs' commands, while the rest of the containers are linked via DNS records. The container with name `db` is registered with the hostname `db` in the first container.

Other optional parameters of container definition can be divided into two groups:

1. Docker-related parameters that are passed to the docker run command that starts the container. More information about these can be found in [Docker environments](../using-semaphore/pipelines#docker-environments).

    - `user`: the user that will be used within the container.
    - `command`: the first command to execute within the container. This overrides the command defined in Dockerfile.
    - `entrypoint`: this specifies which executable to run when the container starts.

2. The data that needs to be injected into containers, which is either defined directly in the YAML file or stored in Semaphore secrets.

    - `env_vars`: environment variables that are injected into the container. These are defined in the same way as in [task definition](#environment-variables-task).
    - `secrets`: secrets which hold the data to be injected into the container. They are defined in the same way as in [task definition](#secrets-task)
    - 

```yaml title="Example"
agent:
  machine:
    type: e1-standard-2
  # highlight-start
  containers:
    - name: main
      image: 'registry.semaphoreci.com/ruby:2.6'
    - name: db
      image: 'registry.semaphoreci.com/postgres:9.6'
      user: postgres
      env_vars:
        - name: POSTGRES_PASSWORD
          value: keyboard-cat
  # highlight-end
```

:::note

Only environment variables defined in a secret will be injected into container, the files within the secret will be ignored.

:::

## execution_time_limit {#execution_time_limit}


The `execution_time_limit` property can be used at the `pipeline`, `block`, or `job` scope. It holds two properties, `hours` and `minutes`, to specify the execution time limit. 

Use only one property at a time.

```yaml title="Single Example"
version: v1.0
name: Using execution_time_limit
agent:
  machine:
    type: e1-standard-2
    os_image: ubuntu2004

# highlight-start
execution_time_limit:
  hours: 3
# highlight-end

blocks:
  - name: Creating Docker Image
    task:
      jobs:
      - name: Docker build
        commands:
          - checkout
          - sleep 120

  - name: Building executable
    task:
      jobs:
      - name: Building job
        commands:
          - echo 360
          - echo "Building executable"
```

```yaml title="Block Example"
version: v1.0
name: Using execution_time_limit
agent:
  machine:
    type: e1-standard-2
    os_image: ubuntu2004

blocks:
  - name: Creating Docker Image
    # highlight-start
    execution_time_limit:
      minutes: 15
    # highlight-end
    task:
      jobs:
      - name: Docker build
        commands:
          - checkout
          - sleep 120

  - name: Building executable
  # highlight-start
    execution_time_limit:
      minutes: 10
  # highlight-end
    task:
      jobs:
      - name: Building job
        commands:
          - echo 360
          - echo "Building executable"
```

```yaml title="Job Example"
version: v1.0
name: Using execution_time_limit on a job
agent:
  machine:
    type: e1-standard-2
    os_image: ubuntu2004

blocks:
  - name: Tests
    task:
      jobs:

      - name: Lint
        commands:
          - checkout
          - make lint

      - name: Tests
      # highlight-start
        execution_time_limit:
          minutes: 30
      # highlight-end
        commands:
          - checkout
          - make test
```

```yaml title="Multiple Properties Example"
version: v1.0
name: Using execution_time_limit
agent:
  machine:
    type: e1-standard-2
    os_image: ubuntu2004
# highlight-start
execution_time_limit:
  hours: 5
# highlight-end

blocks:
  - name: Creating Docker Image
    execution_time_limit:
      minutes: 15
    task:
      jobs:
      - name: Docker build
        commands:
          - checkout
          - sleep 120

  - name: Building executable
    task:
      jobs:
      - name: Building job
        commands:
          - checkout
          - echo "Building executable"
```

## fail_fast {#fail_fast}

The `fail_fast` property enables you to set a policy for a pipeline in the event that one of its jobs fails. It can have two sub-properties: `stop` and `cancel`.  At least one of them is required. If both are set, `stop` will be evaluated first.

The `stop` and `cancel` properties both require a condition defined with a `when`, according to the [Conditions DSL](./conditions-dsl).

If this condition is fulfilled for a given pipeline's execution, the appropriate fail-fast policy is activated.

If a `stop` policy is set, all running jobs will be stopped and all pending jobs will be canceled as soon as possible in the event that a job fails.

If a `cancel` policy is set, when one job fails, the blocks and jobs which have not yet started executing will be canceled, but those which are already running will be allowed to finish. This will provide you with more data for debugging without using additional resources.

### stop {#fail-sop}

In the following configuration, blocks A and B run in parallel. Block C runs after block B is finished.

When Block A fails, if the workflow was initiated from a non-master branch, the
fail fast `stop` policy will be applied to:

```yaml title="Example"
version: v1.0
name: Setting fail fast stop policy
agent:
  machine:
    type: e1-standard-2
    os_image: ubuntu2004

# highlight-start
fail_fast:
  stop:
    when: "branch != 'master'"
# highlight-end

blocks:
  - name: Block A
    dependencies: []
    task:
      jobs:
      - name: Job A
        commands:
          - sleep 10
          - failing command
  - name: Block B
    dependencies: []
    task:
      jobs:
      - name: Job B
        commands:
          - sleep 60
  - name: Block C
    dependencies: ["Block B"]
    task:
      jobs:
      - name: Job C
        commands:
          - sleep 60
```

### cancel {#fail-cancel}

In the following configuration, blocks A and B run in parallel. Block C runs after block B is finished.

When Block A fails, if the workflow was initiated from a non-master branch, the fail fast `cancel` policy will be applied to:

- Let block B finish
- Cancel (i.e. not run) block C

```yaml title="Example"
version: v1.0
name: Setting fail fast cancel policy
agent:
  machine:
    type: e1-standard-2
    os_image: ubuntu2004

# highlight-start
fail_fast:
  cancel:
    when: "branch != 'master'"
# highlight-end

blocks:
  - name: Block A
    dependencies: []
    task:
      jobs:
      - name: Job A
        commands:
          - sleep 10
          - failing command
  - name: Block B
    dependencies: []
    task:
      jobs:
      - name: Job B
        commands:
          - sleep 60
  - name: Block C
    dependencies: ["Block B"]
    task:
      jobs:
      - name: Job C
        commands:
          - sleep 60
```

---

WIP

this is the YAML reference for pipelines

## Queue name {#queue}