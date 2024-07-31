---
description: Semaphore command line reference
---

# Semaphore Command Line

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Available from '@site/src/components/Available';
import VideoTutorial from '@site/src/components/VideoTutorial';

You can interact with most aspects of your jobs, pipelines, projects, and organizations using only the command line. This page explains how to use the Semaphore CLI tool.

## Overview

The Semaphore CLI tool lets you create projects, debug jobs, define dashboards, set up notifications, and manage your Semaphore resources.

## Installation and set up {#install}

You can install the Semaphore CLI with:

```shell
curl https://storage.googleapis.com/sem-cli-releases/get.sh | bash
```

macOS users with Homebrew can also use:

```shell
brew install semaphoreci/tap/sem
```

Once installed, you need to authorize access to your Semaphore organization. You can do this with:

```shell
sem connect <organization-name>.semaphoreci.com <API_TOKEN>
```
You can get an API token on your [account page](https://me.semaphoreci.com/account).

## General syntax {#syntax}

The general syntax of the `sem` utility is:

```shell
sem <command> <resource-type> <resource-name> [flags]
```

The supported commands are:

- `apply`: update projects, secrets, dashboards, notifications, and deployment targets
- `attach`: attach to a running job
- `config`: get and set configuration options
- `connect`: connect to an organization
- `context`: switch to another organization
- `create`: create a new resource
- `debug`: debug a job or a project
- `delete`: delete a resource
- `edit`: edit a resource
- `get`: list and get details on resources
- `init`: create a new project from a repository
- `logs`: display a job's log
- `port-forward`: redirect traffic from an agent to the local machine
- `rebuild`: rebuild workflow or pipeline
- `stop`: stop pipelines, workflows, and jobs
- `troubleshoot`: view debugging information for workflows, pipelines, and jobs

The supported resource types are:

- `dashboard`
- `job`
- `notification`
- `project`
- `pipeline`
- `workflow`
- `secret`
- `deployment-target`

## Working with organizations {#orgs}

This section explains how to connect and switch organizations.

### sem connect {#sem-connect}

Before using any other commands, you need to conenct to your Semaphore organization.

The syntax to connect is:

```shell title="Connecting to your organization"
sem connect <organization-name>.semaphoreci.com <API_TOKEN>
```

For example

```shell
sem connect tomfern.semaphoreci.com NeUFkim46BCdpqCAyWXN
```

You can get an API token on your [account page](https://me.semaphoreci.com/account).

If you have multiple organizations, you can repeat the command to connect to all of them. The authentication token is stored on your local machine.

### sem context {#sem-context}

To view all connected organizations use:

```shell title="View connected organizations"
$ sem context
  tomfern_semaphoreci_com
* semaphore-demos_semaphoreci_com
```

The active organization is marked with an asterisk (*). Commands are always executed in the active organization.

To switch the active organization:

```shell title="Changing the active organization"
sem context <organization>
```

Note that you must supply the organization name as shown in `sem context`. For example:

```shell
sem context tomfern_semaphoreci_com
```

## Working with resources {#resources}

You can create, edit, and delete resources using the commands described in this section.

### sem create {#sem-create}

The `sem create` action creates new resources. 

For the following resource types you need to supply the `-f <resource.yaml>` or `--file <resource.yaml>` argument with a YAML file. The file spec is described in a dedicated reference page:

- [Dashboards reference](./dashboard-yaml.md)
- [Deployment targets reference](./deployment-target-yaml.md)
- [Projects reference](./project-yaml.md)
- [Jobs reference](./job-yaml.md)
- [Secrets reference](./secret-yaml.md)

For example:

```shell
# create a resource
sem create -f resource.yaml

# create a project secret
sem create -p <project-name> -f secret.yaml
```

The following types resource types can be created without supplying a YAML spec file:

- Secrets
- Dashboards

For example, to create an empty secret or dashboard:

```shell
sem create secret <secret-name>
# or
sem create dashboard <dashboard-name>
```

You may also create a secret and initialize it with values or files with:

```shell
sem create secret <secret-name> \
 -e <VARIABLE_NAME1>=<VALUE2> \
  -e <VARIABLE_NAME2>=<VALUE2> \
 -f <local_path_file1>:<agent_path_file1> \
  -f <local_path_file2>:<agent_path_file2>
```

For example:

```shell
sem create secret example-secret \
 -e FOO=BAR \
  -e "MESSAGE=Hello World" \
 -f /Users/John/hello.txt:/home/semaphore/hello.txt
```

You can supply the `-p <project-name>` to create the secret as [project level secret](../using-semaphore/secrets#project-secrets).

:::info

Absolute paths for `<agent_path_file>` are mounted relative to the root on the agent's disk. So `/etc/hosts` is actually mounted at `/etc/hosts` in the agent's machine or container.

Relative paths are mounted relative to the agent's service account home directory. So `.ssh/id_rsa` is mounted as `/home/semaphore/.ssh/id_rsa`.

:::

### sem edit {#sem-edit}

The `sem edit` command works with the same resources as [`sem create`](#sem-create), except jobs. In other words, `sem edit` does not support editing jobs.

The syntax is:

```shell
sem edit <resource-type> <resource-name>
```

The tool retrieves the resource YAML definition and opens it on an editor. Once you exit the editor, the updated configuration is applied to the resource.

For example:

```shell
sem edit secret mysecret
```

You can add the `-p <project-name>` argument to edit project-level secrets.

The following examples show how to edit other types of resources

```shell
# edit a dashboard
sem edit dashboard my-activity

# edit a project
sem edit project my-project

# edit a deployment target
sem edit deployment-target my-target -p my-project
```

### sem get {#sem-get}

The `sem get` command can retrieve all resources of a given type. 

The syntax is:

```shell
sem get <resource-type>
```

For example, this retrieves a list of all secrets in the organization:

```shell
$ sem get secret
NAME                            AGE
dockerhub                        2d
sshkeys                         10d
my-secret                      100d
```

You can view project-level secrets with:

```shell
sem get secret -p <project-name>
```

To see all projects in the organization:

```shell
$ sem get project
NAME                                 REPOSITORY
semaphore-demo-python-notebooks      git@github.com:TomFern/semaphore-demo-python-notebooks.git
semaphore-demo-scala-play            git@github.com:semaphoreci-demos/semaphore-demo-scala-play.git
semaphore-demo-workflows             git@github.com:semaphoreci-demos/semaphore-demo-workflows.git
semaphore-flutter-example            git@github.com:semaphoreci-demos/semaphore-flutter-example.git
```

### sem get resource {#sem-get-properties}

You can use the `sem get` command to get properties about a particular resource. The syntax is:

```shell
sem get <resource-type> <resource-name>
```

For example, this retrieves the project properties for the project `hello-semaphore`:

```shell
$ sem get project hello-semaphore
apiVersion: v1alpha
kind: Project
metadata:
  name: hello-semaphore
  id: a2ba1008-afc9-4326-b994-58fb816fc4d5
  description: ""
spec:
  visibility: public
  repository:
    url: git@github.com:semaphoreci-demos/hello-semaphore.git
    run_on:
    - tags
    - branches
    pipeline_file: .semaphore/semaphore.yml
    status:
      pipeline_files:
      - path: .semaphore/semaphore.yml
        level: pipeline
    whitelist:
      branches: []
      tags: []
    integration_type: github_app
  tasks:
  - name: Audit task
    description: ""
    scheduled: true
    id: ef84157f-0e23-42dc-aaf0-df6875919e78
    branch: setup-semaphore
    at: 0 0 * * *
    pipeline_file: .semaphore/semaphore.yml
    status: ACTIVE
```

You can, for instance, change the `pipeline_file` value to use a different default path for the initial pipeline.

### sem apply {#sem-apply}

The `sem apply` command works exactly like [`sem create`](#sem-create), except it allows you to update an existing resource.

The syntax is:

```shell
sem apply -f <resource-file>
```

You must provide the path to the updated YAML resource file using `-f <resource.yaml>` or `--file <resource.yaml>`.

### sem delete {#sem-delete}

The `sem delete` command deletes resources. It can work on all the same resource types as [`sem create`](#sem-create), with the exception of jobs. In other words, `sem delete` cannot delete jobs.

The syntax is:

```shell
sem delete <resource-type> <resource-name>
```

For example, this deletes the secret `my-secret`:

```shell
sem delete secret my-secret
```

## Working with jobs

This section describes in properties how to create, edit, and debug jobs using the Semaphore CLI.

### Create one-off jobs {#sem-create-job}

To create a one-off job, use `sem create` and supply the job spec using the [Job YAML reference](./job-yaml).

The syntax is:

```shell
sem create -f <job-specification.yaml>
```

:::info

One-off jobs are not shown in the Semaphore UI. They can only be viewed and managed using the Semaphore CLI.

:::

For example, to create a job that outputs the Go version in the agent, we can use this job definition:

```yaml title="my-job.yaml"
apiVersion: v1alpha
kind: Job
metadata:
  name: A new job
spec:
  files: []
  envvars: []
  secrets: []
  commands:
    - go version
  project_id: 7384612f-e22f-4710-9f0f-5dcce85ba44b
```

To run it, we execute:

```shell
sem create -f my-job.yaml
```

:::note

The value of `project_id` must be valid or the command will fail.

:::

### sem get job {#sem-get-job}

You can use the `sem get` command to view running jobs.

The syntax is:

```shell
$ sem get jobs
ID                                     NAME          AGE   STATE     RESULT
7f3b9a52-8ad6-4adc-9d0a-7ed91d31df86   Compilation   9s    RUNNING   NONE
```

To view the most recent jobs, even if they are no longer running:

```shell
$ sem get jobs --all
sem get jobs --all
ID                                     NAME                                                         AGE   STATE      RESULT
8c7800ed-8f97-4124-8a95-08669af9b0c8   Job #1                                                       30s   FINISHED   PASSED
767b0e41-a56a-4553-afd3-c2f102438f52   Job #1                                                       35s   FINISHED   PASSED
7f3b9a52-8ad6-4adc-9d0a-7ed91d31df86   Compilation                                                  45s   FINISHED   PASSED
5dc508b9-9f93-4769-9fdf-80e81e1c5e42   Debug Session for Job 17c008c8-68d7-48aa-95d6-456d1b013ebd   2h    FINISHED   STOPPED
d593f1e2-c68f-48a4-b3c8-3310fe9c0e93   Job #1                                                       2h    FINISHED   PASSED
```

In order to view properties about a specific job, provide the job ID as shown in `sem get job`. For example:

```shell
$ sem get job 5c011197-2bd2-4c82-bf4d-f0edd9e69f40
apiVersion: v1alpha
kind: Job
metadata:
  name: 'Job #1'
  id: 8c7800ed-8f97-4124-8a95-08669af9b0c8
  create_time: 1722352753
  update_time: 1722352757
  start_time: 1722352755
  finish_time: 1722352757
spec:
  agent:
    machine:
      type: e1-standard-2
      os_image: ubuntu2004
  project_id: a2ba1008-afc9-4326-b994-58fb816fc4d5
status:
  state: FINISHED
  result: PASSED
  agent:
    ip: 195.201.62.241
    name: ""
    ports:
    - name: ssh
      number: 40004
```

### sem stop job {#sem-stop-job}

You can stop running jobs with `sem stop job`. You need to supply the job ID as explained in [`sem get job`](#sem-get-job).

The syntax is:

```shell
sem stop job <job-id>
```

For example:

```shell
sem stop job 5c011197-2bd2-4c82-bf4d-f0edd9e69f40
```

### sem stop pipeline {#sem-stop-pipeline}

You can stop running jobs with `sem stop pipeline`. You need to supply the pipeline ID. This stops all running jobs in the pipeline.

The syntax is:

```shell
sem stop pipeline <pipeline-id>
```

For example:

```shell
sem stop pipeline ea3e6bba-d19a-45d7-86a0-e78a2301b616
```

### sem attach {#sem-attach}

The `sem attach` command allows you to connect a terminal to a running job using SSH. You can explore the state of the job and the agent while the job is running.

The syntax is:

```shell
sem attach <job-id>
```

Where the job id is the one shown with [`sem get job`](#sem-get-job).

:::note

`sem attach` has a different behavior in [self-hosted agents](../using-semaphore/self-hosted#debug)

:::

### sem debug {#sem-debug}

The `sem debug` command allows you to connect a terminal to a finished job. You can re-run the job interactively using an SSH session to debug a problem.

The syntax is:

```shell
sem debug <job-id>
```

Where the job id is the one shown with [`sem get job`](#sem-get-job).

Once you are logged in, you can start the job commands interactively with:

```shell
source ~/commands.sh
```

The duration of the SSH session is limited to one hour. You can supply the `--duration` argument to change the limit. For example:

```shell
sem debug job 5c011197-2bd2-4c82-bf4d-f0edd9e69f40 --duration 3h
```

You can define the duration using numeric values in the `XXhYYmZZs` format. For instance, 1 hour can be defined as `1h0m0s`, `1h`, or `60m`.

:::note

`sem debug` has a different behavior in [self-hosted agents](../using-semaphore/self-hosted#debug)

:::

### sem logs {#sem-logs}

The `sem logs` command allows you to see the output of a finished jog.

The syntax is:

```shell
sem logs <job-id>
```

Where the job id is the one shown with [`sem get job`](#sem-get-job).

### sem port-forward {#sem-port-forward}

The `sem port-forward` command lets you forward a port in the agent to your local machine. This allows you to connect to services running on the machine for debugging.

The syntax is:

```shell
sem port-forward <job-id> <local-port> <remote-port>
```
Where the job id is the one shown with [`sem get job`](#sem-get-job).

For example, if we have a MySQL database running on the default port in the agent, we can forward it to our local machine on port 8000 with:

```shell
sem port-forward 5c011197-2bd2-4c82-bf4d-f0edd9e69f40 8000 3306
```

:::note

`sem port-forward` command works with running jobs only.

:::

## Working with projects

You can create, edit, debug, and delete projects using the commands described in this section.

### sem init {#sem-init}

The `sem init` command creates a Semaphore project from a repository. The command must be run at the root of a repository that has been cloned or pushed to GitHub or BitBucket.

The syntax is:

```shell
sem init [flags]
```

You can provide the following options with `sem init`:

- `--project-name`: override the project name on Semaphore
- `--repo-url`: manually specify the URL of the repository in GitHub or BitBucket
- `--github-integration`: accepts one of two arguments
  - `github_token` (default) creates the project using the [OAuth integration](../using-semaphore/connect-github-oauth)
  - `github_app` creates the project using the [GitHub App integration](../using-semaphore/connect-github)

On project creation, if a `.semaphore/semaphore.yml` file already exists in the root directory of a repository, `sem init` will keep that file
and continue with its operation. If there is no `.semaphore/semaphore.yml` file, `sem init` will create one for you.


:::warning

Using the wrong `--repo-url` can cause problems in connecting to the repository.

:::

### sem debug project {#sem-debug-project}

You can debug problems with your project using `sem debug project`. This can be particularly helpful when you do not know whether the Virtual Machine you are using has the latest version of a programming language or a package, and when you want to know what you need to download in order to perform the task you want.

The syntax is:

```shell
sem debug project <project-name>
```

This command opens an SSH session on the "master" branch and the HEAD revision of the repository.

For example:

```shell
sem debug project my-project
```

The agent will remain operational for the duration of the session (by default 1 hour). You can terminate the agent early by running `sudo poweroff` or `sudo shutdown -r now`.

Sessions that are created using the `sem debug project` command support the
[`--duration`](#sem-debug) parameter.

## Working with notifications {#notifications}

You can define complex notifications using YAML resources.

### sem create notification {#sem-create-notification}

Use `sem create` to create Slack and other webhook-based notifications.

The syntax is:

```shell
sem create -f <notification-spec>
```

For example:

```shell
sem create -f notify.yml
```

You must provide a valid notification YAML spec:

```yaml title="notify.yml"
# Slack notification for failures
apiVersion: v1alpha
kind: Notification
metadata:
  name: notify-on-fail
spec:
  rules:
    - name: "Example"
      filter:
        projects:
          - example-project
        results:
          - failed
          - stopped
          - canceled
      notify:
        slack:
          endpoint: https://hooks.slack.com/services/xxx/yyy/zzz
```


The available values for `filter.results` are:

- `passed`
- `failed`
- `stopped`
- `canceled`

Here is a more comprehensive example sending notifications to two teams:

```yaml title="notify.yml"
# release-cycle-notifications.yml

apiVersion: v1alpha
kind: Notification
metadata:
  name: release-cycle-notifications
spec:
  rules:
    - name: "On staging branches"
      filter:
        projects:
          - /.*/
        branches:
          - staging
        results:
          - passed
      notify:
        slack:
          endpoint: https://hooks.slack.com/XXXXXXXXXXX/YYYYYYYYYYYY/ZZZZZZZZZZ
          channels:
            - "#qa-team"

    - name: "On master branches"
      filter:
        projects:
          - /.*/
        branches:
          - master
      notify:
        slack:
          endpoint: https://hooks.slack.com/XXXXXXXXXXX/YYYYYYYYYYYY/ZZZZZZZZZZ
          channels:
            - "#devops-team"
            - "#secops-team"
```

See [Notifications YAML reference](./notifications-yaml) for more details.

## Working with pipelines

This section describes in detail how to create, edit, and rebuild pipelines using the Semaphore CLI.

### sem get pipeline {#sem-get-pipeline}

The `sem get pipelines` command returns the pipelines for all your projects in your organization.

The syntax is:

```shell
sem get pipelines
```

If you want to see only the pipelines for a project use:

```shell
sem get pipelines -p <project-name>
```

### sem get pipeline properties {#sem-get-pipeline-properties}

You can see the pipeline properties using:

```shell
sem get pipeline <pipeline-id>
```

The pipeline id is the value shown with [`sem get pipeline`](#sem-get-pipeline).

The `sem get pipeline` command followed by a valid Pipeline ID will return
a description of the specified pipeline.

For example:

```shell
sem get pipeline c2016294-d5ac-4af3-9a3d-1212e6652cd8
```

### sem rebuild pipeline {#sem-rebuild-pipeline}

Rebuilding a pipeline re-runs only the failed jobs.

The syntax is:

```shell
sem rebuild pipeline <pipeline-id>
```

The pipeline id is the value shown with [`sem get pipeline`](#sem-get-pipeline).

For example:

```shell
$ sem rebuild pipeline b83bce61-fdb8-4ace-b8bc-18be471aa96e
{"pipeline_id":"a1e45038-a689-460b-b3bb-ba1605104c08","message":""}
```

The `sem rebuild` command accepts the `--follow` flag. The command will block until the pipeline ends running. This only works with an already running pipeline.

For example

```shell
sem get pipeline <pipeline-id> --follow
```

The `--follow` flag is particularly useful in the following two cases:

- If you want to look at how a build is advancing without using the Semaphore UI
- If you want to be notified when the pipeline is done (e.g. in shell scripts).

## Working with workflows

This section describes in detail how to create, edit, and rebuild workflows using the Semaphore CLI.


### sem get workflows {#sem-get-workflows}

The `sem get workflows` command returns the workflows for all your projects in your organization.

The syntax is:

```shell
sem get workflows
```

If you want to see only the workflows for a project use:

```shell
sem get workflows -p <project-name>
```

### sem get workflow properties {#sem-get-workflow-properties}

You can see the workflow properties using:

```shell
sem get workflow <workflow-id>
```

The workflows id is the value shown with [`sem get workflows`](#sem-get-workflows).

For example:

```shell
$ sem get workflow 5bca6294-29d5-4fd3-891b-8ac3179ba196
Label: master

PIPELINE ID                            PIPELINE NAME            CREATION TIME         STATE
9d5f9986-2694-43b9-bc85-6fee47440ba7   Pipeline 1 - p1.yml      2018-10-03 09:37:59   DONE
55e94adb-7aa8-4b1e-b60d-d9a1cb0a443a   Testing Auto Promoting   2018-10-03 09:31:35   DONE
```

### sem rebuild workflow {#sem-rebuild-workflow}

Rebuilding a workflow re-runs all the jobs in the pipeline, even those that previously ended successfully.

The syntax is:

```shell
sem rebuild workflow <workflow-id>
```

The workflow id is the value shown with [`sem get workflows`](#sem-get-workflows).

For example:

```shell
$ sem rebuild wf 99737bcd-a295-4278-8804-fff651fb6a8c
{"wf_id":"8480a83c-2d90-4dd3-8e8d-5fb899a58bc0","ppl_id":"c2016294-d5ac-4af3-9a3d-1212e6652cd8"}
```

The output of `sem rebuild workflow` command is a new workflow id and a new pipeline id.

## Working with self-hosted agents

This section describes in detail how to create, edit, and view [self-hosted agents](../using-semaphore/self-hosted) using the Semaphore CLI


### sem create agent_type {#sem-create-agent-type}

The `sem create agent_type` command can be used to create a self-hosted agent type using the Semaphore CLI.

There are two ways of creating a new agent type:

- Command line arguments : passing arguments to the `sem create` command
- Resource file: passing an [Agent Type YAML spec file](./agent-yaml.md)

To create an agent using command line arguments:

```shell
sem create agent_type s1-my-type
```

You can provide options to customize the agent:

```shell
sem create agent_type s1-my-agent-type \
  --name-assignment-origin assignment_origin_aws_sts \
  --aws-account-id 1234567890 \
  --aws-roles role1,role2
```

To create an agent using an Agent YAML resource, start with an spec:

```yaml title="agent_type.yml"
apiVersion: v1alpha
kind: SelfHostedAgentType
metadata:
  name: s1-example
spec:
  agent_name_settings:
    assignment_origin: assignment_origin_aws_sts
    release_after: 300
    aws:
      account_id: 1234567890
      role_name_patterns: "role1,role2"
```

Then use `sem create -f` to create the agent type. For example:

```shell
sem create -f agent_type.yml
```

See [Agent Type YAML spec file](./agent-yaml.md) for more details.


### sem get agent_types {#sem-get-agent-types}

The `sem get agent_types` command returns the list of self-hosted agent types for a Semaphore organization.

The syntax is:

```shell
sem get agent_types
```

### sem get agent_type properties {#sem-get-agent-types-properties}

The `sem get agent_type` command can be used to view properties on a specific self-hosted agent.

The syntax is:

```shell
sem get agent_type <agent-type-name>
```

### sem get agents {#sem-get-agents}

The `sem get agents` command returns the list of self-hosted agents Semaphore organization.

The syntax is:

```shell
sem get agents
```

This returns all agents for all agent types, but you can use the `--agent-type` flag to filter for agents for a specific agent type.

For example:

```shell
sem get agents s1-my-type
```


### sem get agent properties {#sem-get-agent-types-props}

The `sem get agent` command can be used to view properties on specific self-hosted agents. You need to provide the unique agent name.

The syntax is:

```shell
sem get agent_type <agent-name>
```


## Working with deployment targets

This section describes in properties how to create, edit, and view [deployment targets](../using-semaphore/promotions#deployment-targets) using the Semaphore CLI.

### sem create dt {#sem-create-dt}

The `sem create dt` command can be used to create a deployment target.

The syntax is:

```shell
sem create dt <target-name> --project-name <project-name> [flags]
# or
sem create dt <target-name> --project-id <project-id> [flags]
```

Optional flags are:

- `--desc <description>` (`-d`): a description for the target
- `--url <URL>` (`-u`): the URL of the deployed application
- `--bookmark <bookmark>` (`-b`): up to 3 bookmarks for the target
- `--file <local-path>:<mount-path>` (`-f`): files to be imported as secrets in the deployment target pipeline
- `--env <VAR=VALUE>`(`-e`): environment variables imported as secrets in the deployment target pipeline
- `--subject-rule <TYPE>,<SUBJECT-ID>` (`-s`): subject rules assignment
- `--object-rule <TYPE>,<MODE>,<PATTERN>` (`-o`): object rules assignment

For subject rule assignment, the `<TYPE>` can be one of the following:

- `ANY`
- `ROLE`
- `USER`

The `<SUBJECT-ID>` is either the name of the role or the UUID of the user.

For object rule assignment, the `<TYPE>` can be one of the following:

- `BRANCH`
- `PR`
- `TAG`

Mode can be one of the following:

- `ALL`
- `EXACT`
- `REGEX`

And the `<PATTERN>` represents the string to be used for name matching.

For example with all the options:

```shell
sem create dt <target-name> \
  -p <project-name> \
  -d "A description for the target" \
  -u "myurl321.zyx" \
  -b "bookmark 1" \
  -b "bookmark 2" \
  -f /home/dev/app/server.conf:/etc/my.conf \
  -e X=123 \
  -s ROLE,admin \
  -o branch,exact,main
```

See [environments (deployment targets)](../using-semaphore/promotions#deployment-targets) for more information.

### sem get dt {#sem-get-dt}

You can list all the deployment targets for a project with:

```shell
sem get dt --project-name <project-name>
# or
sem get dt --project-id <project-id>
```

To view the properties of a given deployment target:

```shell
sem get dt <deployment-target-id>
```

The output is a YAML file that describes the deployment target. See [Deployment Targets YAML reference](./deployment-target-yaml).

### sem get dt history {#sem-get-dt-history}

You can retrieve the deployment history for a specific deployment target with the `--history` or `-s` parameter.

The syntax is:

```shell
sem get dt <deployment-target-id> --history
sem get dt <target-id> --project-name <project-name> --history
sem get dt <target-id> --project-id <project-id> --history
```

The output is a list of deployments with their IDs for the provided deployment targets.

### sem edit dt {#sem-edit-dt}

The `sem edit dt` command is used to edit an existing deployment target.

The syntax is:

```shell
sem edit dt <target-name> --project-name <project-name>
# or
sem edit dt <target-name> --project-id <project-id>
```

This opens a text editor with the YAML spec. After closing the file, the new changes are updated.

You can also edit the deployment target using its id with:

```shell
sem edit dt <target-id>
```

The `<target-id>` is obtained with [sem get dt](#sem-get-dt).

In addition, you can supply the `--activate` (`-a`) or `--deactivate` (`-d`) option to activate or deactivate the deployment target.

For example:

```shell
sem edit dt my-deployment-target --project-name my-project --deactivate
```

### sem delete dt {#sem-delete-dt}

The `sem delete dt` to delete a deployment target.

The syntax is:

```shell
sem delete dt <target-id>
```

The `<target-id>` is obtained with [sem get dt](#sem-get-dt).

## Troubleshooting resources {#troubleshoot}

The `sem troubleshoot` command can help you troubleshoot problems with any of the supported resources.

The syntax is:

```shell
sem troubleshoot <RESOURCE_TYPE> <RESOURCE_ID>
```

The command returns vital information about the resource in YAML format containing IDs, timestamps, and debugging information that the support staff might need to help you resolve your issues.

For example:

```shell
# This returns information about a workflow
sem troubleshoot workflow 4a7b869d-9cb3-4818-944a-e67c9009a188

# This returns information about a pipeline
sem troubleshoot pipeline ece6ee2a-f2a0-488c-a1c0-7d26bfdd254a

# This returns information about a job
sem troubleshoot job 3c70699a-b2bb-411b-a9ae-24b049d19308
```

## Changing the text editor {#editor}

The `sem edit` command opens a text editor so you can modify resources. The editor program can be customized in the following ways:

- `sem config`: for example by running `sem config set editor nano`
- Environment variables: with `$EDITOR` variable in your shell session, e.g. `export EDITOR=nano`
- Default editor: the default editor is `vim`

## Command aliases

The Semaphore CLI supports the following aliases for these resources:

| Resource | Aliases |
|--|--|
| `project` | `projects`, `prj` |
| `dashboard` | `dashboards`, `dash` |
| `secret` | `secrets` |
| `job` | `jobs` |
| `notification` | `notifications`, `notifs`, `notif` |
| `pipeline` | `pipelines`, `ppl` |
| `workflow` | `workflows`, `wf` |
| `deployment-target` | `deployment-targets`, `dt`, `dts`, `deployments`, `deployment` |

As an example, the following three commands are equivalent:

```shell
sem get project
sem get prj
sem get projects
```

## See also

- [Jobs YAML reference](./jobs-yaml)
- [Pipeline YAML reference](./pipeline-yaml)
- [Projects YAML reference](./project-yaml)
- [Secret YAML reference](./secret-yaml)
- [Deployment targets YAML reference](./deployment-target-yaml)
- [Agents YAML reference](./agent-yaml)
- [Notifications YAML reference](./notifications-yaml)
