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

A list of Docker images to contain the jobs in the pipeline.  Each container entry must define a `name` and `image` property. The name of the container is used when linking the containers together, and for defining hostnames in the first container.

The first container runs the jobs' commands, while the rest of the containers are linked via DNS records.

Other optional parameters of container definition can be divided into two groups:

- **Docker commands**: are passed to the `docker run` command that starts the container. These are:

  - `user`: the user that will be used within the container
  - `command`: the first command to execute within the container. This overrides the command defined in Dockerfile
  - `entrypoint`: this specifies which executable to run when the container starts

- **Data**: the data that needs to be injected into containers, which is either defined directly in the YAML file or stored in Semaphore secrets. These are:

  - `env_vars`: environment variables that are injected into the container. These are defined in the same way as in [task definition](#environment-variables-task).
  - `secrets`: secrets which hold the data to be injected into the container. They are defined in the same way as in [task definition](#secrets-task)

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

The `stop` and `cancel` properties both require a condition defined with a `when`, according to the [Conditions DSL](./conditions-dsl). If this condition is fulfilled for a given pipeline's execution, the appropriate fail-fast policy is activated.

The behavior is:

- when `stop` is set all running jobs are stopped and all pending jobs are canceled as soon a job fails
- when `cancel` is set running jobs are allowed to finish but no new jobs are started. This will provide you with more data for debugging without using additional resources

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

## queue {#queue}

The optional `queue` property enables you to assign pipelines to custom execution queues, and/or to configure the way the pipelines are processed when queuing happens.

There are two ways you can define `queue` behavior:

- **Direct**: using `direct queue configuration` applies to ll pipelines initiated from the current pipeline YAML file
- **Conditional**: using `conditional queue configurations` which allows you to define an array of queue definitions, and conditions under which those definitions should be applied

All the sub-properties and their potential values for both approaches are listed below and you can find more examples and use cases for different queue configurations on the [Pipeline Queues](../using-semaphore/pipelines#queues).

### direct {#direct-queue-configuration}

This option allows you to can use the `name`, `scope`, and `processing` properties as direct sub-properties of the `queue` property.  

The following rules apply:

- `name` or `processing` properties are required
- `scope` can only be set if `name` is defined
- `name` should hold the string that uniquely identifies the desired queue within the configured scope
- if you omit `name` if you only wish the `processing` property. The `name` is autogenerated from the Git commit details.
- `scope` can have one of two values: `project` or `organizations`. The default is `project`

When `scope: project` the queues with the same values for the `name` property in different projects are not queued together.

When `scope: organization` the pipelines from the queue will be queued together with pipelines from other projects within the organization that have a queue configuration with same `name` and `scope` values. 

The `processing` property can have two values:

- `serialized` the pipelines in the queue will be queued and executed one by one in ascending order, according to creation time. This is the default
- `parallel`: all pipelines in the queue will be executed as soon as they are created and there will be no queuing.

### conditional {#conditional-queue-configurations}

In this option you define an array of items with queue configurations as a sub-property of the `queue` property. Each array item can have the same properties, i.e. `name`, `scope`, and `processing`, as in [direct queue configuration](#direct-queue-configuration).

In addition, you need to supply a `when` property using the [Conditions DSL](./conditions-dsl). When the `queue` configuration is evaluated in this approach, the `when` conditions from the items in the array are evaluated one by one starting with the first item in the array.

The evaluation is stopped as soon as one of the `when` conditions is evaluated as `true`, and the rest of the properties from the same array item are used to configure the queue for the given pipeline.

This means that the order of the items in the array is important and that items should be ordered so that those with the most specific conditions are defined first, followed by those with more generalized conditions (e.g. items with conditions such as `branch = 'develop'` should be ordered before those with `branch != 'master'`).

If none of the conditions are evaluated as true, the [default queue behavior](../using-semaphore/pipelines#queues) is used.

## auto_cancel {#auto_cancel}

Sets an strategy for auto-canceling pipelines in a queue when a new pipeline appears. Two values are supported:

- `running`: older pipelines are cancelled, this includes queued and running pipelines
- `queued`: queued pipelines are cancelled, running pipelines are alloed to complete

At least one of them is required. If both are set, `running` will be evaluated first.

The `running` and `queued` properties both require a condition defined with a `when`, following the [Conditions DSL](./conditions-dsl).

### running {#cancel-running}

In the following configuration, all pipelines initiated from a non-master branch will run immediately after auto-stopping everything else in front of them in the queue.

```yaml title="Example"
version: v1.0
name: Setting auto-cancel running strategy
agent:
  machine:
    type: e1-standard-2
    os_image: ubuntu2004

# highlight-start
auto_cancel:
  running:
    when: "branch != 'master'"
# highlight-end

blocks:
  - name: Unit tests
    task:
      jobs:
      - name: Unit tests job
        commands:
          - echo Running unit test
```

### queued {#cancel-queued}

In the following configuration, all pipelines initiated from a non-master branch will cancel any queued pipelines and wait for the one that is running to finish before starting.

```yaml title="Example"
version: v1.0
name: Setting auto-cancel queued strategy
agent:
  machine:
    type: e1-standard-2
    os_image: ubuntu2004
# highlight-start
auto_cancel:
  queued:
    when: "branch != 'master'"
# highlight-end
blocks:
  - name: Unit tests
    task:
      jobs:
      - name: Unit tests job
        commands:
          - echo Running unit test
```

## global_job_config {#global_job_config}

Set global properties to be applied to all jobs and blocks in the pipeline. It can contain any of these properties:

- [prologue](#prologue)
- [epilogue](#epilogue)
- [secrets](#secrets)
- [env_vars](#env_vars)
- [priority](#priority)

The defined configuration values have the same syntax as the ones defined on the task or a job level and are applied to all the tasks and jobs in a pipeline.

In the case of `prologue` and `env_vars` the global values, i.e. values from `global_job_config`, are exported first, and those defined on a task level thereafter. This allows for overriding of global values for the specific task, if the need arises.

In the case of `epilogue`, the order of exporting is reversed, so, for example, one can first perform specific cleanup commands before global ones.

`secrets` are simply merged since order plays no role here.

In the case of the `priority`, the global values are added at the end of the list of priorities, and their conditions defined on the job level. This allows for job-specific priorities to be evaluated first, and only if none of them match will the global values be evaluated and used.

```yaml title="Example"
version: "v1.0"
name: An example of using global_job_config
agent:
  machine:
    type: e1-standard-2
    os_image: ubuntu2004
# highlight-start
global_job_config:
  prologue:
    commands:
      - checkout
  env_vars:
    - name: TEST_ENV_VAR
      value: test_value
# highlight-end
blocks:
  - name: Linter
    task:
      jobs:
        - name: Linter
          commands:
            - echo $TEST_ENV_VAR
  - name: Unit tests
    task:
      jobs:
        - name: Unit testing
          commands:
            - echo $TEST_ENV_VAR
  - name: Integration Tests
    task:
      jobs:
        - name: Integration testing
          commands:
            - echo $TEST_ENV_VAR
```

## blocks {#blocks}

Defines an array of items that holds the elements of a pipeline. Each element of that array is called a *block* and can have two properties:

- `name`: optional name of the block, defaults to unique auto-generated names
- `task`: mandatory property that describes the jobs inside the block

### dependencies {#dependencies-in-blocks}

Defines the flow of execution between blocks. When no dependencies are set, blocks run in parallel.

The following example runs `Block A` and `Block B` in parallel at the beginning of a pipeline. `Block C` runs only after `Block A` and `Block B` have finished.

```yaml title="Example"
version: "v1.0"
name: Pipeline with dependencies
agent:
  machine:
    type: e1-standard-2
    os_image: ubuntu2004

blocks:
  - name: "Block A"
  # highlight-next-line
    dependencies: []
    task:
      jobs:
      - name: "Job A"
        commands:
          - echo "output"
  - name: "Block B"
  # highlight-next-line
    dependencies: []
    task:
      jobs:
      - name: "Job B"
        commands:
          - echo "output"
  - name: "Block C"
  # highlight-next-line
    dependencies: ["Block A", "Block B"]
    task:
      jobs:
      - name: "Job C"
        commands:
          - echo "output"
```

If you use the `dependencies` property in one block, you have to specify dependencies for all other blocks as well. The following pipeline **is invalid** because dependencies are missing for `Block A` and `Block B`.

```yaml title="This example is INVALID"
version: "v1.0"
name: Invalid pipeline
agent:
  machine:
    type: e1-standard-2
    os_image: ubuntu2004

blocks:
  - name: "Block A"
    task:
      jobs:
      - name: "Job A"
        commands:
          - echo "output"
  - name: "Block B"
    task:
      jobs:
      - name: "Job B"
        commands:
          - echo "output"
  - name: "Block C"
  # highlight-next-line
    dependencies: ["Block A", "Block B"]
    task:
      jobs:
      - name: "Job C"
        commands:
          - echo "output"
```

### skip {#skip-in-blocks}

The `skip` property is optional and it allows you to define conditions, written in [Conditions DSL](./conditions-dsl) which are based on the branch name or tag name of current push which initiated entire pipeline.  If a condition defined in this way is evaluated to be true, the block will be skipped.

When a block is skipped, it means that it will immediately finish with a `passed` result without actually running any of its jobs.

Its result_reason will be set to `skipped` and other blocks which depend on it passing will be started and executed as if this block executed regularly and all of its jobs passed.

Example of a block that has been skipped on all branches except master:

```yaml title="Example"
version: v1.0
name: The name of the Semaphore project
agent:
  machine:
    type: e1-standard-2
    os_image: ubuntu2004
blocks:
 - name: Inspect Linux environment
 # highlight-start
   skip:
     when: "branch != 'master'"
 # highlight-end
   task:
      jobs:
        - name: Print Environment variables
          commands:
            - echo $SEMAPHORE_PIPELINE_ID
            - echo $HOME
```

:::note

It is not possible to have both `skip` and [`run`](#run-in-blocks) properties defined for the same block.

:::

### run {#run-in-blocks}

The `run` property is optional and it allows you to define a condition, written in [Conditions DSL](./conditions-dsl) that is based on properties of the push which initiated the entire workflow.

If the run condition is evaluated as true, the block and all of its jobs will run, otherwise the block will be skipped.

When a block is skipped, it means that it will immediately finish with a `passed` result and a `skipped` result_reason, without actually running any of its jobs.

Example of a block that is run only on the master branch:

```yaml title="Example"
version: v1.0
name: The name of the Semaphore project
agent:
  machine:
    type: e1-standard-2
    os_image: ubuntu2004
blocks:
 - name: Inspect Linux environment
 # highlight-start
   run:
     when: "branch = 'master'"
 # highlight-end
   task:
      jobs:
        - name: Print Environment variables
          commands:
            - echo $SEMAPHORE_PIPELINE_ID
            - echo $HOME
```

:::note

It is not possible to have both `skip` and [`run`](#run-in-blocks) properties defined for the same block.

:::

### task {#task}

The `task` property defines the jobs in the blocks along with all its optional properties such as `prologue`, `epilogue`, `env_vars`, or `secrets`.

```yaml title="Example"
version: v1.0
name: The name of the Semaphore project
agent:
  machine:
    type: e1-standard-2
    os_image: ubuntu2004
blocks:
 - name: Inspect Linux environment
 # highlight-next-line
   task:
      jobs:
        - name: Print Environment variables
          commands:
            - echo $SEMAPHORE_PIPELINE_ID
            - echo $HOME
```

### agent {#agent-section-in-task}

The `agent` section under a `task` section is optional and can coexist with the global `agent` definition at the beginning of a Pipeline YAML file. The properties and the possible values of the `agent` section can be found in the [agent reference](#agent).

An `agent` block under a `task` block overrides the global `agent` definition.


```yaml title="Example"
version: v1.0
name: YAML file example with task and agent.
agent:
  machine:
    type: e1-standard-2
    os_image: ubuntu2004
blocks:
 - name: Run in Linux environment
   task:
      jobs:
        - name: Learn about SEMAPHORE_GIT_DIR
          commands:
            - echo $SEMAPHORE_GIT_DIR

 - name: Run in macOS environment
   task:
   # highlight-start
      agent:
          machine:
            type: a1-standard-4
            os_image: macos-xcode14
   # highlight-end
      jobs:
        - name: Using agent job
          commands:
            - echo $PATH
```

### secrets {#secrets}

The `secrets` property uses pre-existing environment variables from a secret. This is described in the [secrets](#secrets) section.

### prologue {#prologue}

A `prologue` block is executed before the commands of each job within a `task` item.

You can consider the `prologue` commands as a part of each of the `jobs` within the same `task` item.

### epilogue {#epilogue}

An `epilogue` block is executed after the commands of each `jobs` item within a `task`.

### env_vars {#env-vars}

The elements of an `env_vars` array are name and value pairs that hold the name of the environment variable and the value of the environment variable.

```yaml title="Example"
version: v1.0
name: A Semaphore project
agent:
  machine:
    type: e1-standard-2
    os_image: ubuntu2004
blocks:
   task:
      jobs:
        - name: Check environment variables
          commands:
            - echo $HOME
            - echo $PI
            - echo $VAR1
            # highlight-start
      env_vars:
           - name: PI
             value: "3.14159"
           - name: VAR1
             value: This is Var 1
            # highlight-end
```

:::note

The indentation level of the `prologue`, `epilogue`, `env_vars`, and `jobs` properties should be the same.

:::

## jobs {#jobs}

The `jobs` items are essential for each pipeline because they allow you to define the actual commands that you want to execute.

### name {#name-property-in-jobs}

The value of the optional `name` property is a Unicode string that provides a name for a job.

Semaphore assigns its own names to nameless `jobs` items, which is displayed in the UI.

It is strongly recommended that you give descriptive names to all `jobs` and `blocks` items in a Semaphore pipeline.

### commands {#commands}

The `commands` property is an array of strings that holds the commands that will be executed for a job.

The general structure of a job when using the `commands` property is as follows:

```yaml title="Example"
version: v1.0
name: The name of the Semaphore project
agent:
  machine:
    type: e1-standard-2
    os_image: ubuntu2004
blocks:
   task:
      jobs:
        - name: Check environment variables
        # highlight-start
          commands:
            - echo $SEMAPHORE_PIPELINE_ID
            - pwd
        # highlight-end
```

---

WIP

this is the YAML reference for pipelines

## Queue name {#queue}