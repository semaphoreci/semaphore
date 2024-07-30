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

The Semaphore CLI tool lets you create projects, debug jobs, define dashboards, set up notifications, and your Semaphore manage resources.

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

## Syntax {#syntax}

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

Before you can use any other commands, you need to conenct to your Semaphore organization.

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

For the following resource types you need to supply the `-f <resource.yaml>` or `--file <resource.yaml> argument with a YAML file. The file spec is described in a dedicated reference page:

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

Absolute paths for <agent_path_file> are mounted relative to the root on the agent's disk. So `/etc/hosts` is actually mounted at `/etc/hosts` in the agent's machine or container.

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

### sem get resource-name {#sem-get-details}

You can use the `sem get` command to get details about a particular resource. The syntax is:

```shell
sem get <resource-type> <resource-name>
```

For example, this retrieves the project details for the project `hello-semaphore`:

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

This section describes in detail how to create, edit, and debug jobs using the Semaphore CLI.

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

In order to view details about a specific job, provide the job ID as shown in `sem get job`. For example:

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

### Create one-off jobs {#sem-create-job}

To create a one-off job, use `sem create` and supply the the job spec using the [Job YAML reference](./job-yaml).

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
fail.

:::

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

The `sem debug` command allows you to connect a terminal to a finished job. You can re-run the job interactively using a SSH session to debug a problem.

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

Using the wrong `--repo-url` can cause problems to connect to the repository.

:::

### sem debug project {#sem-debug-project}

You can debug problems with your project using `sem debug project`. This can be particularly helpful when you do not know whether the Virtual Machine you are using has the latest version of a programming language or a package, and when you want to know what you need to download in order to perform the task you want.

The syntax is:

```shell
sem debug project <project-name>
```

This command opens a SSH session on the "master" branch and the HEAD revision of the repository.

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

Use `sem create` to create Slack and other webhook based notifications.

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

See [Notifications YAML reference](./notifications) for more details.

## Working with pipelines

This section describes in detail how to create, edit, and rebuild pipelines using the Semaphore CLI

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

### sem get pipeline detail {#sem-get-pipeline-detail}

You can see the pipeline details using:

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
- If you want to be notified when pipeline is done (e.g. in shell scripts).

## Working with workflows

This section describes in detail how to create, edit, and rebuild workflows using the Semaphore CLI


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

### sem get workflow detail {#sem-get-workflow-detail}

You can see the workflow details using:

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

### Listing agent types

The `sem get agent_types` command returns the list of self-hosted agent types for a Semaphore
organization.

#### Listing agent types examples

```bash
sem get agent_types
sem get agenttypes
```

### Listing agents

The `sem get agents` command returns the list of self-hosted agents Semaphore organization. By default, it returns all agents for all agent types, but you can use the `--agent-type` flag to filter for agents for a specific agent type.

#### Listing agents examples

```bash
# Returns all agents in the organization, for all agent types
sem get agents

# Return agents only for the 's1-my-type' agent type
sem get agents s1-my-type
```

### Describing an agent type

Each agent type has its own unique name. Using that unique name you
can find more information about that particular agent type using the following command:

```bash
sem get agent_type [AGENT TYPE NAME]
```

#### Describing an agent type example

```bash
$ sem get agent_type s1-my-agent-type
```

### Creating an agent type

There are two ways you can use the CLI to create an agent type:

- Using the `sem create agent_type` command, specifying all the parameters. You can check the available parameters with `sem create agent_type -h`.
- Using the `sem create -f agent_type.yml` command, defining the agent type from a YAML file.

You can find more details about each parameter in the [Agent Types YAML Reference](/reference/agent-types-yaml-reference)

#### Creating an agent type inline

```bash
# This creates an agent type with all the default settings.
# By default, --name-assignment-origin=assignment_origin_agent and --release-name-after=0.
$ sem create agent_type s1-my-agent-type

# If you want to create an agent type with --name-assignment-origin=assignment_origin_aws_sts,
# you need to specify the --aws-account-id and --aws-roles parameters.
$ sem create agent_type s1-my-agent-type \
  --name-assignment-origin assignment_origin_aws_sts \
  --aws-account-id 1234567890 \
  --aws-roles role1,role2
```

#### Creating an agent type from YAML

```bash
# Define the agent type through a YAML file
$ cat > agent_type.yml << EOF
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
EOF

# Create the agent type
$ sem create -f agent_type.yml
```

### Updating an agent type

You can use the [`sem apply`](#sem-apply) command to update an agent type:

```bash
# Save the current state of the agent type into a YAML file.
$ sem get agent_type s1-example > my_agent_type.yml

# Edit 'my_agent_type.yml' as you wish.
$ vim my_agent_type.yml

# Update the agent type.
$ sem apply -f agent_type.yml
```

### Describing an agent

Each agent has its own unique name. Using that unique name you can find more information about that particular agent using the following command:

```bash
sem get agent [AGENT NAME]
```

#### Describing an agent example

```bash
$ sem get agent tE77rxu2gHy2clIe4tHV
```

## Working with deployment targets

This section offers a guide on how to handle deployment targets using the `sem` utility,
starting from creating a new deployment target.

### Creating a deployment target

To begin, you'll need to create a deployment target utilizing the `sem` utility.

The simplest way to create a deployment target is by using the `sem create dt` command.
This command will generate a deployment target with a specified name and link it to
a particular project:

```shell
sem create dt [name] --project-name [project-name]
```

When creating a new deployment target with the `sem create dt` command, you don't need
to utilize all the command line options. However, the project must be defined, either
by supplying the project's ID using `--project-id` (short `-i`) or by providing
the project's name using `--project-name` (`-p`).

Additional parameters that can be specified include `--desc` (or `-d`) for
the deployment target's description, `--url` (`-u`) for the URL, `--bookmark` (`-b`)
to set a maximum of three bookmarks, `--file` (`-f`) to supply files, `--env` (`-e`)
to allocate environment variables to the deployment target, `--subject-rule` (`-s`)
for subject rules, and `--object-rule` (`-o`) for object rule assignment.

Files should be provided using the format `-f <local-path>:<mount-path>`. Environment
variables can be assigned using `-e VAR=VALUE`.

For subject rules, use the format `-s TYPE,SUBJECT-ID`, where `TYPE` can be either `ANY`,
`ROLE`, or `USER`. The `SUBJECT-ID` is either the name of the role or the UUID of the user.

Object rules should follow the format `-o TYPE,MODE,PATTERN`. Here, `TYPE` can be `BRANCH`,
`PR`, or `TAG`. `MODE` could be `ALL`, `EXACT`, or `REGEX`, and `PATTERN` represents
the string used for name matching.

Example:
```shell
sem create dt myDTName -p testProject -d "DT description" -u "myurl321.zyx" -b "book 1" \
        -b "book 2" -f /home/dev/app/server.conf:/etc/my.conf -e X=123 \
        -s ROLE,admin -o branch,exact,main
```

### Listing deployment targets

You can list all the deployment targets within your project with the command
`sem get dt -p [project-name]` or `sem get dt -i [project-id]`:

```shell
sem get dt -p [projectName]
```

### Describing a deployment target

You can acquire detailed information about a deployment target using the `sem get dt`
command followed by the target's UUID, or by specifying the deployment target's name
and project name or project ID.

```shell
sem get dt [ID]
sem get dt [dt-name] -p [project-name]
sem get dt [dt-name] -i [project-id]
```

The output will be a YAML file that describes the deployment target. To understand more
about Deployment Targets YAML syntax, visit the [Deployment Targets YAML reference](/reference/deployment-targets-yaml-reference)
page.

### Retrieving deployment history

To retrieve deployment history for a specific deployment target you can use the
`sem get dt` command with `--history` (`-s`) parameter.

```shell
sem get dt [ID] --history
sem get dt [dt-name] -p [project-name] -s
sem get dt [dt-name] -i [project-id] -s
```

The output will be list of deployments for the provided deployment target.

### Editing a deployment target

Use the `sem edit dt` command followed by the UUID of the deployment target, or
the target's name and project name or project ID, to edit a deployment target:

```shell
sem edit dt [UUID]
sem edit dt [dt-name] -p [project-name]
sem edit dt [dt-name] -i [project-id]
```

The `sem edit dt` command will open your configured text editor. Ensure that you save
the changes and close your text editor for the modifications to take effect.

You can also deactivate an active deployment target using the `--deactivate` (`-d`) parameter:

```shell
sem edit dt [UUID] -d
sem edit dt [UUID] --deactivate
sem edit dt [dt-name] -p [project-name] -d
sem edit dt [dt-name] -i [project-id] --deactivate
```

You can similarly activate previously deactivated target, using the `--activate` (`-a`) parameter.

### Deleting a deployment target

To remove a deployment target, use the `sem delete dt` command followed by
the UUID of the target you wish to delete.

```shell
sem delete dt [UUID]
```

#### Example use cases for deployment targets

This section provides `sem` command examples for handling deployment targets.

You can create a new deployment target named `my-dt` and assign it to a project
named `my-proj` (provided such a project has been created) as follows:

```shell
sem create deployment-target my-dt -p my-proj
```

To view all deployment targets associated with your `my-proj` project, including
your newly created target, use the following command:

```shell
sem get dt -p my-proj

```

To get further details about your created target, use:

```shell
sem get dt my-dt -p my-proj
```

To edit your target using your configured editor, execute:

```shell
sem edit dt my-dt -p my-proj
```

After saving your changes and closing the editor, the updated deployment target
can be verified by retrieving it again.

If you assign your deployment target to a promotion and trigger that promotion,
you can later view the history of the deployments using:

```shell
sem get dt my-dt -p my-proj --history
```

You can deactivate the deployment target using:

```shell
sem edit dt my-dt -p my-proj -d
```

Or reactivate it later with:

```shell
sem edit dt my-dt -p my-proj -a
```

Finally, you can delete the deployment target by replacing the UUID below with
the UUID of the target you wish to remove:

```shell
sem delete dt 0d4d4184-c80a-4cbb-acdd-b75e3a03f795
```


## Help commands

The last group of `sem` commands includes the `sem help`, `sem troubleshoot` and `sem version`
commands, which are help commands.

### sem help

The `sem help` command returns information about an existing command when it is
followed by a valid command name. If no command is given as a command line
argument to `sem help`, a help screen is displayed.

#### sem help example

The output of the `sem help` command is static and identical to the output of
the `sem` command when executed without any command line arguments.

Additionally, the `help` command can be also used as follows (the `connect`
command is used as an example here):

```shell
sem connect help
```

In this case, `help` will generate information about the use of the
`sem connect` command.

### sem troubleshoot

The `sem troubleshoot` command has the following form:

```
sem troubleshoot [RESOURCE_TYPE] [RESOURCE_ID]
```

It can be used to gather information about a workflow, pipeline or job. The output of the command is a YAML containing IDs, timestamps, and other information that you can copy and paste in a support case. That helps the support and engineering teams to troubleshoot issues faster.

#### sem troubleshoot example

```bash
# This returns information about a workflow
sem troubleshoot workflow 4a7b869d-9cb3-4818-944a-e67c9009a188

# This returns information about a pipeline
sem troubleshoot pipeline ece6ee2a-f2a0-488c-a1c0-7d26bfdd254a

# This returns information about a job
sem troubleshoot job 3c70699a-b2bb-411b-a9ae-24b049d19308
```

### sem version

The `sem version` command requires no additional command line parameters and
returns the current version of the `sem` tool.

#### sem version example

The `sem version` command displays the used version of the `sem` tool. As an
example, if you are using `sem` version 0.4.1, the output of `sem version`
will be as follows:

```shell
$ sem version
v0.8.17
```

Your output might be different.

Additionally, the `sem version` command cannot be used with the `-f` flag and
does not create any additional output when used with the `-v` flag.

## Flags

### The --help flag

The `--help` flag, which can also be used as `-h`, is used for getting
information about a `sem` command or `sem` itself.

### The --verbose flag

The `--verbose` flag, which can also be used as `-v`, displays verbose
output – you will see the interaction and the data exchanged between
`sem` and the Semaphore 2.0 API.

This flag is useful for debugging.

### The -f flag

The `-f` flag allows you to specify the path to the desired YAML file that will
be used with the `sem create` or `sem apply` commands.

Additionally, `-f` can be used for creating new `secrets` with multiple files.

Last, the `-f` flag can be used as `--file`.

### The --all flag

The `--all` flag can only be used with the `sem get jobs` command in order to
display the most recent jobs of the current organization, both running and
finished.

### Defining an editor

The `sem` utility chooses which editor to use according to the process shown below:

- Using the value of the `editor` property. This value can be set using the
    `sem config set editor` command.
- From the value of the `EDITOR` environment variable, if one is set.
- If none of the above exists, `sem` will try to use the `vim` editor.

#### The `sem config set editor` command

You can define that you want to use the `nano` editor for editing Semaphore
resources by executing the following command:

```shell
sem config set editor nano
```

#### The EDITOR environment variable

The `EDITOR` environment variable offers a way of defining the editor that
will be used with the session of the `sem edit` command.

You can check whether the `EDITOR` environment variable is set on your UNIX
machine by executing the following command:

```shell
echo $EDITOR
```

If the output is an empty line, then then `EDITOR` environment variable is not
set. You can set it to the `nano` editor using the following command:

```shell
$ export EDITOR=nano
$ echo $EDITOR
nano
```

The `sem` utility also supports custom flags in the `EDITOR` environment
variable, e.g. `EDITOR="subl --wait"`.

## Command aliases

The words of each line that follows, which represent resource types, are
equivalent:

- `project`, `projects`, and `prj`
- `dashboard`, `dashboards`, and `dash`
- `secret` and `secrets`
- `job` and `jobs`
- `notifications`, `notification`, `notifs`, and `notif`
- `pipelines`, `pipeline`, and `ppl`
- `workflows`, `workflow`, and `wf`
- `deployment-target`, `deployment-targets`, `dt`, `dts`, `deployment` and `deployments`

As an example, the following three commands are equivalent and will return the
same output:

```shell
sem get project
sem get prj
sem get projects
```


---

## sem-edit {#sem-edit}

## Debug projects {#debug-project}

## Debug jobs {#debug-job}


## Set up notifications {#notifications}

You can set up more complex notifications by creating a YAML resource. This option is only available with the command line.

To create an advanced notification, install and connect the [Semaphore command line](../reference/semaphore-cli).

Next, create a YAML resource:

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

You can create a notification using the file above with the following command:

```shell
sem create -f notify.yml
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

You can set up more complex notifications by creating a YAML resource. This option is only available with the command line.

To create an advanced notification, install and connect the [Semaphore command line](../reference/semaphore-cli)

Next, create a YAML resource:

```yaml title="notify.yml"
# webhook notification on failure
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
          - cancelled
      notify:
        webhook:
          endpoint: https://example.org/postreceiver
```

You can create a notification using the file above with the following command:

```shell
sem create -f notify.yml
```

The available values for `filter.results` are:

- `passed`
- `failed`
- `stopped`
- `canceled`

## See also

---

# FRAGMENTS

## Resource breakdown {#resources}

This section explains

You can use `sem` to manipulate eight types of Semaphore resources: dashboards,
jobs, notifications, projects, pipelines, workflows, secrets and deployment targets.
Most resource related operations require either a valid resource name or an ID.

#### Dashboards

A Semaphore 2.0 `dashboard` is a place when you can keep the `widgets` that you
define in order to manage the operations of your current Semaphore 2.0
organization.

A `widget` is used for following the activity of pipelines and workflows,
according to specific criteria defined using filters that help you
narrow down the displayed information.

As with `secrets`, each `dashboard` is associated with a given
organization. Therefore, in order to view a specific `dashboard`, you must be
connected to the organization to which the `dashboard` belongs.

#### Jobs

A `job` is the only Semaphore 2.0 entity that can be executed in a Virtual
Machine (VM). You cannot have a pipeline without at least one `job`.

The `jobs` of Semaphore 2.0 pipelines are independent from each other because they
run in completely different Virtual Machines.

#### Notifications

A notification offers a way to send messages to one or more Slack
channels or users. Notifications are delivered on the success or failure of a
pipeline. Notification rules contain user-defined criteria and filters.

A notification can contain multiple rules that are evaluated each time
a pipeline ends, either successfully or unsuccessfully.

#### Projects

A project is the way Semaphore 2.0 organizes, stores, and processes
repositories. As a result, each Semaphore 2.0 project has a direct relationship
with a single repository.

However, the same repository can be assigned to multiple Semaphore 2.0
projects under different names. Additionally, the same project name can exist
within multiple Semaphore 2.0 organizations, and deleting a Semaphore 2.0 project
from an organization will not automatically delete it from the other
organizations. Last, the related repository will
remain intact after deleting a project from Semaphore 2.0.

You can use the same project name in multiple organizations but you cannot
use the same project name more than once within the same organization.

#### Pipelines

The smallest unit of scheduling and execution in Semaphore 2.0 is the **Job**.
A `pipeline` is the Semaphore 2.0 entity where jobs are defined in order to be
executed in a Virtual Machine.

Each `pipeline` is defined using a YAML file. The YAML file of the initial
pipeline is `.semaphore/semaphore.yml`. This value can be adjusted by [editing
the project configuration](#changing-the-initial-pipeline-file).

#### Workflows

Put simply, a `workflow` is the execution of a Semaphore 2.0 project. Each
workflow has its own Workflow ID that uniquely differentiates each workflow
execution from other workflow executions.

A `workflow` is composed of one or more `pipelines` depending on whether there
are promotions or auto-promotions in the `workflow`. Therefore, a workflow
should be viewed of as *a group of pipelines* or, more strictly, as a dynamically-configurable n-ary tree of pipelines.

#### Secrets

A `secret` is a bucket for keeping sensitive information in the form of
environment variables and small files. Therefore, you can consider a `secret`
to be a place where you can store small amounts of sensitive data such as
passwords, tokens, or keys. Sharing sensitive data in a `secret` is both
safer and more flexible than storing it using plain text files or environment
variables that anyone can access.

Each `secret` is associated with a single organization. In other words, a
`secret` belongs to an organization. In order to use a specific `secret` you
must be connected to the organization to which it belongs.

Aditionally a `secret` can be associated with a single project. This is 
called a project-level secret. In order to manage project-level secrets
you must provide the project name or id of the associated project with 
`-i` or `-p` flags, or use a different yaml `kind` described [here](/reference/secrets-yaml-reference).

#### Deployment Targets

The `deployment-targets` serve as stringent control mechanisms, allowing you to
restrict **who** (person or a role) can trigger a promotion pipeline and on
**which git reference** (branch, tag, and/or pull request).

Each `deployment-target` is created within a single project and it can be linked
with numerous [promotions](/essentials/deploying-with-promotions) within that project.
To use `deployment-targets`, ensure your organization has this feature activated.

For more comprehensive information, refer to our in-depth guide on
[Deployment Targets](/essentials/deployment-targets).


