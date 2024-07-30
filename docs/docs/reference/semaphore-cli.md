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
sem <command> <resource> <name> [flags]
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

### sem edit

The `sem edit` command works for `projects`, `secrets`, `notifications`,
`dashboards` and `deployment-targets` and allows you to edit the YAML representation of these resources
using your configured text editor.

The `sem edit` command does not support the `job` resource type.

#### sem edit examples

The following command will edit an existing `secret` that is named `my-secret` by overwriting it,
and will automatically run your configured text editor:

```shell
sem edit secret my-secret
```

If the secret is on the project `my-project` level you can edit it with the following command:

```bash
sem edit secret -p my-project my-secret
```

A YAML representation of the `my-secret` secret should appear on your screen.

Similarly, the next command will edit a `dashboard` named `my-activity`:

```shell
sem edit dashboard my-activity
```

To edit a `project` with the name `my-project`, use the following command:

```shell
sem edit project my-project
```

To modify a `deployment-target` named `my-dt`, which is associated with the project `my-project`,
execute the following command:

```shell
sem edit deployment-target my-dt -p my-project
```

### sem get

The `sem get` command can do two things. First, it can return a list of items
for a given resource type that can be found in the active organization. This
option requires a command line argument, which is the resource type. Second, it
can return analytical information for a given resource. In this case, you
should provide `sem get` with the type of the resource and the name of the
resource that interests you, in that exact order.

For the first case, `sem get` can be used as follows:

```shell
sem get [RESOURCE]
```

For the second case, `sem get` should be used as follows:

```shell
sem get [RESOURCE] [name]
```

In the case of a `job` resource, you should give the Job ID of the job that
interests you and **not** its name.

#### sem get examples

As the `sem get` command works with resources, you will need to specify a
resource type each time you issue a `sem get` command.

So, in order to get a list of the available projects for the current user
within the active organization, you should execute the following command:

```shell
sem get project
```

Similarly, the next command returns a list of the names of the available
secrets for the current user within the active organization:

```shell
sem get secret
```

List of names of project-level secrets can be obtained by appending 
the project name flag to the previous command:

```bash
sem get secret -p my-project
```

Each entry is printed on a separate line, which makes the generated output
suitable for being further processed by traditional UNIX command line tools.

Additionally, you can use `sem get` to display all running jobs:

```shell
sem get jobs
```

Last, you can use `sem get jobs` with `--all` to display the more recent jobs
of the current organization, both running and finished:

```shell
sem get jobs --all
```

In order to find out more information about a specific project, named `docs`,
you should execute the following command:

```shell
sem get project docs
```

Similarly, in order to find out the list of environment variables and files in a `secret`, named `mySecrets`,
you should execute the following command:

```shell
sem get secret mySecrets
```

You can also use `sem get` for displaying information about a `dashboard`:

```shell
sem get dashboard my-dashboard
```

In order to find more information about a specific job using its Job ID
(either running or finished), you should execute the following command:

```shell
sem get job 5c011197-2bd2-4c82-bf4d-f0edd9e69f40
```

### sem apply

The `sem apply` command works for `projects`, `secrets`, `dashboards`, `notifications` and `agent_types`, and allows you to
update the contents of an existing resource using an external
YAML file. `sem apply` is used with the `-f` command
line option followed by a valid path to a proper YAML file.

#### sem apply example

The following command will update the `my-secret` secret according to the
contents of `aFile`, which must be a valid `secrets` YAML file:

```shell
sem apply -f aFile
```

If everything is OK with `aFile`, the output of the previous command will be as
follows:

```shell
Secret 'my-secrets' updated.
```

This means that `my-secrets` was updated successfully.

You can also use `sem apply -f` in the same manner to update an existing dashboard.

### sem delete

The `sem delete` command is used for deleting existing resources, i.e. Semaphore 2.0 projects, dashboards, and secrets.

When you delete a secret, then that particular secret will disappear from the
active organization, which will affect **all** the Semaphore 2.0 projects that are
using it.

When you use `sem delete` to delete a project, then that particular project is
deleted from the active organization of the active user.

Deleting a `dashboard` does not affect any Semaphore 2.0 projects.

#### sem delete example

In order to delete an existing project, named `be-careful`, from the current
organization, execute the following command:

```shell
sem delete project be-careful
```

Similarly, you can delete an existing dashboard, named `my-dashboard`, as
follows:

```shell
sem delete dashboard my-dashboard
```

Last, you can delete an existing secret, named `my-secret`, as follows:

```shell
sem delete secret my-secret
```

The `sem delete` command does not work with `jobs`.

## Working with jobs

The list of commands for working with `jobs` includes the `sem attach`,
`sem logs`, `sem port-forward`, and `sem debug` commands. You can also
use `sem create -f` to create a one-off job that is not part of a pipeline.

Additionally, you can use the `sem get` command to get a list of all
jobs or getting a description of a particular job.

The `sem get jobs` command returns a list of all running jobs.

The `sem get jobs --all` command returns a list of all recent jobs of the
current organization, both running and finished.

The `sem stop` command allows you to stop a running job or entire pipeline.

### Creating one-off jobs

You can use `sem create -f` to create a one-off job that runs without being
part of an existing pipeline. You must provide `sem create -f` with a valid
YAML file, as described in the
[Jobs YAML Reference page](https://docs.semaphoreci.com/reference/jobs-yaml-reference/).

This can be very useful for checking out things like compiler versions and
package availability before adding a command into a bigger and slower pipeline.

When a job is created this way, it cannot be viewed in the Semaphore 2.0 UI.
The only way to see the results of such a job is with the `sem logs` command.

#### One-off job creation example

```shell
sem create -f /tmp/aJob.yml
```

The previous command creates a new job based on the contents of
`/tmp/aJob.yml`, which are as follows:

``` yaml
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

The value of `project_id` must be valid or the `sem create -f` command will
fail.

The output of the `sem create -f` command appears as follows:

```shell
Job '686b3ed4-be56-4e95-beee-b3bbcc3981b3' created.
```

### sem attach

The `sem attach` command allows you to connect to running jobs with an interactive SSH
session. This allows you to explore and inspect the state of a job.

When the job ends, the SSH session will automatically end and the SSH
connection will be closed.

If you want to debug finished jobs, use `sem debug jobs [job-id]`.

#### sem attach example

The `sem attach` command requires the *Job ID* of a **running** job as its single
parameter. So, the following command will connect to the environment of the
job with Job ID `6ed18e81-0541-4873-93e3-61025af0363b` using SSH:

```shell
sem attach 6ed18e81-0541-4873-93e3-61025af0363b
```

The job with the given Job ID must be in running state at the time of
execution of `sem attach`.

### sem logs

The `sem logs` command allows you to see the log entries of a job, which is
specified by its Job ID.

The `sem logs` command works with both finished and running jobs.

#### sem logs example

The `sem logs` command requires the *Job ID* of a job as its parameter:

```shell
sem logs 6ed18e81-0541-4873-93e3-61025af0363b
```

The last lines of the output of the previous command of a PASSED job should be
similar to the following output:

```shell
✻ export SEMAPHORE_JOB_RESULT=passed
exit status: 0
Job passed.
```

### sem port-forward

The general form of the `sem port-forward` command is the following:

```shell
sem port-forward [JOB ID of running job] [LOCAL TCP PORT] [REMOTE TCP PORT]
```

So, the `sem port-forward` command needs three command line arguments: the Job
ID, the local TCP port number that will be used in the local machine, and
the remote TCP port number, which is defined in the Virtual Machine (VM).

The `sem port-forward` command works with running jobs only.

#### sem port-forward example

The `sem port-forward` command is executed as follows:

```shell
sem port-forward 6ed18e81-0541-4873-93e3-61025af0363b 8000 8080
```

The previous command tells `sem` to forward the network traffic from the TCP
port 8000 of the job with job ID `6ed18e81-0541-4873-93e3-61025af0363b` that is
running in a VM to TCP port 8080 of your local machine.

All traffic of `sem port-forward` is transferred over an encrypted SSH channel.

Note: Port-Forwarding works only for Virtual Machine-based CI/CD environments.

### sem debug for jobs

The general form of the `sem debug` command for jobs is the following:

```shell
sem debug job [Job ID]
```

This will start a new interactive job based on the specification of an old job,
export the same environment variables, inject the same secrets, and connect to
the same git commit.

Commands in the debug mode are not executed automatically, instead they are
stored in `~/commands.sh`. This allows you to execute them step-by-step, and
inspect the changes in the environment.

By default, the duration of the SSH session is limited to one hour. To run
longer debug sessions, pass the `duration` flag to the previous command:

```shell
sem debug job [job-id] --duration 3h
```

A debug session does not include the contents of the repository related
to your Semaphore 2.0 project. Run `checkout` in the debug session to clone
your repository.

#### The --duration flag

By default the SSH session of a `sem debug` command is limited to **one hour**.
In order to change that, you can pass the `--duration` flag to the `sem debug`
command.

You can define the time duration using numeric values in the `XXhYYmZZs` format
in any valid combination. One hour can be defined as `1h0m0s`, `1h`,
or even `60m`.

### sem stop

You can stop a running job or pipeline with `sem stop`:

```shell
sem stop job|pipeline [ID]
```

If you are executing `sem stop job`, you must provide the `ID` of a
running job. If you are executing `sem stop pipeline`, you must provide the `ID` of a running pipeline.

#### sem stop example

The following command will stop the `job` with the Job ID of
`0ae14ece-17b1-428d-99bd-5ec6b04494e9`:

```shell
sem stop job 0ae14ece-17b1-428d-99bd-5ec6b04494e9
```

The following command will stop the `pipeline` with the Pipeline ID of
`ea3e6bba-d19a-45d7-86a0-e78a2301b616`:

```shell
sem stop pipeline ea3e6bba-d19a-45d7-86a0-e78a2301b616
```

## Working with projects

This group includes the `sem init`, `sem get`, `sem edit`, `sem apply`, and `sem debug` commands.

### sem init

The `sem init` command adds a repository as a Semaphore 2.0 project to
the active organization.

The `sem init` command should be executed from within the root directory of the repository that has been either created locally and pushed to or
cloned using the `git clone` command. Although the command can be executed
without any other command line parameters or arguments, it also supports the
`--project-name`, `--repo-url` and `--github-integration` options.

#### --project-name

The `--project-name` command line option is used for manually setting the name
of a Semaphore 2.0 project.

#### --repo-url

The `--repo-url` command line option allows you to manually specify the URL of
a repository in case `sem init` cannot determine it.

#### --github-integration

The `--github-integration` command line option allows you to manually specify
the GitHub integration type for the project. It supports two values:

- `github_token`: Creates the project using the OAuth integration. This is the default one.
- `github_app`: Creates the project using the GitHub App integration.

#### sem init example

As `sem init` can be used without any command line arguments, you can execute
it as follows from the root directory of a repository that resides on
your local machine:

```shell
sem init
```

If a `.semaphore/semaphore.yml` file already exists in the root directory of a repository, `sem init` will keep that `.semaphore/semaphore.yml` file
and continue with its operation. If there is no `.semaphore/semaphore.yml` file,
`sem init` will create one.

If you decide to use `--project-name`, then you can call `sem init` as follows:

```shell
sem init --project-name my-own-name
```

The previous command creates a new Semaphore 2.0 project that will be called
`my-own-name`.

Using `--repo-url` with `sem init` is very tricky--**you need to know what you're doing**.

#### Troubleshooting

If running `sem init` returns an error:

``` txt
error: http status 422 with message
"{"message":"POST https://api.github.com/repos/orgname/projectname/keys: 404 - Not Found // See:
https://developer.github.com/v3/repos/keys/#add-a-new-deploy-key";}"
received from upstream
```

or

``` txt
"{"message":"admin permisssions are required on the repository in order to add the project to Semaphore"}"
```

or

``` txt
error: http status 422 with message "{"message":"Repository 'orgname/projectname' not found"}"
received from upstream
```

check the following pages to debug connection to your git provider:

- [Checking the Connection Between GitHub and Semaphore](/account-management/connecting-github-and-semaphore/#checking-the-connection-between-github-and-semaphore)
- [Checking the Connection Between Bitbucket and Semaphore](/account-management/connecting-bitbucket-and-semaphore/#checking-the-connection-between-bitbucket-and-semaphore)

### sem get

You can list your projects by using the `sem get projects` command and from there you can get
a specific project YAML file by using `sem get project` followed by the `name` of an existing project.

```shell
sem get project [name]
```

The `sem get project` command will fetch the YAML file of a project which you can store, edit and later
use with `sem apply -f` command.

### sem edit

You can edit a project by using the `sem edit project` command followed by the
`name` of an existing project.

```shell
sem edit project [name]
```

The `sem edit project` command will start your configured text editor. In order
for the changes to take effect, you will have to save the changes and exit your
text editor.

To learn more about the configuration options for projects, visit the
[Projects YAML Reference](https://docs.semaphoreci.com/reference/projects-yaml-reference/) page.

### sem apply 

You can apply an existing YAML a project by using the `sem apply -f` command followed by the
valid file path to a project YAML file that contains the updates.

```shell
sem apply -f [file_path]
```

The `sem apply -f` command will use that file and try to update the project specified.

To learn more about the configuration options for projects, visit the
[Projects YAML Reference](https://docs.semaphoreci.com/reference/projects-yaml-reference/) page.



### sem debug for projects

You can use the `sem debug` command to debug an existing Semaphore 2.0 project.

The `sem debug` command can help you specify the commands of a job before
adding and executing it in a pipeline. This can be particularly helpful when
you do not know whether the Virtual Machine you are using has the latest
version of a programming language or a package, and when you want to know what
you need to download in order to perform the task you want.

The general form of the `sem debug project` command is the following:

```shell
sem debug project [Project NAME]
```

Next, you will be automatically connected to the VM of the
project using SSH. The value of `SEMAPHORE_GIT_BRANCH` will be `master`
whereas the value of `SEMAPHORE_GIT_SHA` will be `HEAD`, which means that
you will be using the latest version of the `master` branch available on the repository of the Semaphore 2.0 project.

Projects that are created using the `sem debug project` command support the
`--duration` parameter for specifying the timeout period of the project.

#### sem debug project example

You can debug the project, named `docker-push`, by executing the following command:

```shell
sem debug project docker-push
```

You will need to execute either `sudo poweroff` or `sudo shutdown -r now` to
**manually terminate** the VM. Otherwise, you can wait for the timeout period
to pass.

By default, the SSH session of a `sem debug` command is limited to **one hour**.
In order to change that, you can pass a `--duration` flag to the `sem debug`
command.

You can define the time duration using numeric values in the `XXhYYmZZs` format
using any valid combination. One hour can be defined as `1h0m0s`, `1h`,
or even `60m`.

The following command specifies that the SSH session for the `deployment` project
will time out in 2 minutes:

```shell
sem debug project deployment --duration 2m
```

The following command specifies that the SSH session for the `job` with JOB ID
`d7caf99e-de65-4dbb-ad63-91829bc8a693` will time out in 2 hours:

```shell
sem debug job d7caf99e-de65-4dbb-ad63-91829bc8a693 --duration 2h
```

Last, the following command specifies that the SSH session of the `deployment`
project will time out in 20 minutes and 10 seconds:

```shell
sem debug project deployment --duration 20m10s
```

### Changing the initial pipeline file

By default, `.semaphore/semaphore.yml` is the initial pipeline file that is
triggered when a git hook is received on Semaphore.

To modify the initial pipeline file, edit the repository section in the project's
YAML file.

For example, to modify the initial pipeline file from `.semaphore/semaphore.yml`
to `.semaphore/alternative-tests.yml`, edit your project with the following
command:

```shell
sem edit project example-project-1
```

In the editor, modify the `pipeline_file` entry as follows:

``` yaml
# Editing Projects/example-project-1.

apiVersion: v1alpha
kind: Project
metadata:
  name: example-project-1
  id: 37db0a22-592c-45e2-bdeb-799ba977502c
  description: "Example project"
spec:
  repository:
    url: git@github.com:example/project-1.git
    run_on:
      - tags
      - branches

    #
    # Edit this line to set a new entry-point YAML file for the project.
    #
    pipeline_file: ".semaphore/alternative-tests.yml"
```

When you save the changes and leave the editor, they will be applied to
the project.

### Changing the status check notifications

By default, Semaphore submits pull request status checks for
the initial pipeline.

To change this, edit the status property in the repository section of the project's
YAML file.

#### Add status notifications from promoted pipelines

Let's say that your Semaphore workflow is composed of two pipelines:
a promotion connecting `semaphore.yml` to `production.yml`.

To submit status checks from the pipeline defined in `production.yml`,
modify the `pipeline_files` entry and add the following additional pipeline file:

```yaml
# Editing Projects/example-project-1.

apiVersion: v1alpha
kind: Project
metadata:
  name: example-project-1
  id: 37db0a22-592c-45e2-bdeb-799ba977502c
  description: "Example project"
spec:
  repository:
    url: git@github.com:example/project-1.git
    run_on:
      - tags
      - branches
    pipeline_file: ".semaphore/semaphore.yml"
    status:
      pipeline_files:
      - path: ".semaphore/semaphore.yml"
        level: "pipeline"
        #
        # Add this line to send status also after promotion
        #
      - path: ".semaphore/production.yml"
        level: "pipeline"
```

#### Pipeline or block level statuses

Status notifications can be set on two levels: `pipeline` or `block`.

`pipeline` level means that only one status will be created per commit.
The name of the status is based on name of the pipeline.

`block` level means that Semaphore will create a status for each block in
the pipeline. The name of each status is based on the corresponding block name.

## Working with notifications

In this section you will learn how to work with notifications with the `sem`
utility, starting with how to create a new notification with a single rule.

### Create a notification

The first thing that you will need to do is to create one or more notifications
with the help of the `sem` utility.

The general form of the `sem create notification` command is as follows:

```shell
sem create notification [name] \
  --projects [list of projects] \
  --branches [list of branches] \
  --slack-endpoint [slack-webhook-endpoint] \
  --slack-channels [list of slack channels] \
  --pipelines [list of pipelines]
```

Please refer to the [Examples](#examples) section to learn more about using the `sem create notification` command.

You do not need to use all the command line options of the `sem create notification`
command when creating a new notification. However, the `--projects` as well as the
`--slack-endpoint` options are mandatory. The former specifies which
Semaphore 2.0 projects will be included in the notification rule and the
latter specifies the URL for the Incoming WebHook that will be associated with
this particular notification rule. All `--branches`, `--pipelines`, and
`--slack-channels` are optional.

If the `--slack-channels` option is not set, the default Slack channel that is
associated with the specified Incoming WebHook will be used. If you want to
test your notifications, you might need to create a dedicated Slack channel for
that purpose.

Additionally, the values of `--branches`, `--projects`, and `--pipelines` can
contain regular expressions. Regex matches must be wrapped in forward slashes
(`/.-/`). Specifying a branch name without slashes (example: `.-`) would
execute a direct equality match.

Therefore, the minimum valid `sem create notification` command that can be
executed will have the following form:

```shell
sem create notification [name] \
  --projects [list of projects] \
  --slack-endpoint [slack-webhook-endpoint]
```

The `sem create notification` command can only create a single rule under the
newly created notification. However, you can now use the `sem edit notification`
command to add as many rules as you like to a notification.

Tip: you can use a single Incoming WebHook from Slack for all your
notifications as this Incoming WebHook has access to all the channels of a
Slack Workspace.

### List notifications

You can list all the available notifications within your current organization
with the `sem get notifications` command.

```shell
sem get notifications
```

### Describing a notification

You can describe a notification using the `sem get notifications` command
followed by the `name` of the desired notification.

```shell
sem get notifications [name]
```

The output of the previous command will be a YAML file – you can learn more
about the Notifications YAML grammar by visiting the
[Notifications YAML reference](https://docs.semaphoreci.com/reference/notifications-yaml-reference/) page.

### Editing a notification

You can edit a notification using the `sem edit notification` command followed
by the `name` of the notification.

```shell
sem edit notification [name]
```

The `sem edit notification` command will start your configured text editor.
In order for the changes to take effect, you must save the changes and
exit your text editor.

### Deleting a notification

You can delete an existing notification using the `sem delete notification`
command followed by the `name` of the notification you want to delete.

```shell
sem delete notifications [name]
```

#### Working with notifications examples

In this subsection you will find `sem` examples related to notifications.

You can create a new notification, named `documents`, as follows:

```shell
sem create notifications documents \
  --projects "/.*-api$/" \
  --branches "master" \
  --pipelines "semaphore.yml" \
  --slack-endpoint https://hooks.slack.com/services/XXTXXSSA/ABCDDAS/XZYZWAFDFD \
  --slack-channels "#dev-team,@mtsoukalos"
```

You can list all existing notifications within your current organization as
follows:

```shell
sem get notifications
```

The output that you will get from the previous command will look similar to the
following:

```shell
$ sem get notifications
NAME        AGE
documents   18h
master      17h
```

The `AGE` column shows the time since the last change.

You can find more information about a notification called `documents` as
follows:

```shell
sem get notifications documents
```

You can edit that notification as follows:

```shell
sem edit notifications documents
```

The aforementioned command will take you to your configured text editor. If your
changes are syntactically correct, you will get an output similar to the follwing:

```shell
$ sem edit notifications documents
Notification 'documents' updated.
```

If there is a syntactical error in the new file, the `sem` reply will give you
more information about the error but any changes you made to the notification
will be lost.

Last, you can delete an existing notification, named `documents`, as follows:

```shell
sem delete notification documents
```

The output of the `sem delete notification documents` command is as follows:

```shell
$ sem delete notification documents
Notification 'documents' deleted.
```

## Working with pipelines

### Listing pipelines

The `sem get pipelines` command returns the list of pipelines for a Semaphore
2.0 project. If you are inside the directory of a Semaphore project, then you
will not need to provide `sem` with the name of the project as this will be
discovered automatically.

However, if you want list of pipelines for a project other than the one you
are currently in, you can use the `-p` flag to declare the Semaphore project
that interests you.

So, the `sem get pipelines` command can have the following two formats:

```shell
sem get pipelines
sem get pipelines -p [PROJECT NAME]
```

#### Listing pipelines example

The following command will return the last 30 pipelines of the S1 project:

```shell
sem get pipelines -p S1
```

### Describing a pipeline

The `sem get pipeline` command followed by a valid Pipeline ID will return
a description of the specified pipeline.

### Describing a pipeline example

You can find more information about the pipeline with the Pipeline ID of
`c2016294-d5ac-4af3-9a3d-1212e6652cd8` as follows:

```shell
sem get pipeline c2016294-d5ac-4af3-9a3d-1212e6652cd8
```

### Rebuilding a pipeline

You can rebuild an existing pipeline with the help of the
`sem rebuild pipeline` command, in the following format:

```shell
sem rebuild pipeline [Pipeline ID]
```

Note that `sem rebuild pipeline` will perform a partial rebuild of the pipeline
as **only the blocks that failed** will be rerun.

#### Rebuilding a pipeline example

Rebuilding the pipeline with a Pipeline ID of
`b83bce61-fdb8-4ace-b8bc-18be471aa96e` will return the following output:

```shell
$ sem rebuild pipeline b83bce61-fdb8-4ace-b8bc-18be471aa96e
{"pipeline_id":"a1e45038-a689-460b-b3bb-ba1605104c08","message":""}
```

### The --follow flag

The general form of the `sem get pipeline` command when used with the
`--follow` flag is as follows:

```shell
sem get pipeline [RUNNING Pipeline ID] --follow
```

The `--follow` flag calls the `sem get pipeline [RUNNING Pipeline ID]` command
repeatedly until the pipeline reaches a terminal state.

The `--follow` flag is particularly useful in the following two cases:

- If you want to look at how a build is advancing without using the Semaphore
    Web Interface (e.g. when you are prototyping something).
- If you want to be notified when pipeline is done (e.g. in shell scripts).

### The --follow flag example

The `--follow flag` can be used on a running pipeline with a Pipeline ID of
`9bfaf8d6-05c8-4397-b764-5f0f574c8e64` as follows:

```shell
sem get pipeline 9bfaf8d6-05c8-4397-b764-5f0f574c8e64 --follow
```

## Working with workflows

### Listing workflows

The `sem get workflows` command returns the list of workflows for a Semaphore
2.0 project. If you are inside the directory of a Semaphore project, then you
will not need to provide `sem` the name of the project as this will be
discovered automatically.

However, if you want the list of workflows for some project other than the one
you are currently in, you can use the `-p` flag to directly specify the
Semaphore project that interests you.

So the `sem get workflows` can have the following two formats:

```shell
sem get workflows
sem get workflows -p [Project Name]
```

### Listing workflows examples

Finding the last 30 workflows for the `S1` Semaphore project is as simple as
executing the following commands:

```shell
sem get workflows -p S1
```

If the project name does not exist, you will get an error message.

If you are inside the root directory of the `S1` Semaphore project, then you
can also execute the next command to get the same output:

```shell
sem get workflows
```

### Describing a workflow

Each workflow has its own unique Workflow ID. Using that unique Workflow ID you
can find more information about that particular workflow using the following command:

```shell
sem get workflow [WORKFLOW ID]
```

The output of the previous command is a list of pipelines that includes
promoted and auto-promoted pipelines.

#### Describing a workflow example

Finding more information about the Workflow with ID
`5bca6294-29d5-4fd3-891b-8ac3179ba196` is simple. To do so, enter the following command:

```shell
$ sem get workflow 5bca6294-29d5-4fd3-891b-8ac3179ba196
Label: master

PIPELINE ID                            PIPELINE NAME            CREATION TIME         STATE
9d5f9986-2694-43b9-bc85-6fee47440ba7   Pipeline 1 - p1.yml      2018-10-03 09:37:59   DONE
55e94adb-7aa8-4b1e-b60d-d9a1cb0a443a   Testing Auto Promoting   2018-10-03 09:31:35   DONE
```

Please note that you should have the required permissions in order to find
information about a Workflow.

### Rebuilding a workflow

You can rebuild an existing workflow using the following command:

```shell
sem rebuild workflow [WORKFLOW ID]
```

Note that `sem rebuild workflow` will perform a full rebuild of the specified
workflow. A new workflow will be created as if a new commit was pushed to the repository.

#### Rebuilding a workflow example

You can rebuild a workflow with a Workflow ID of
`99737bcd-a295-4278-8804-fff651fb6a8c` as follows:

```shell
$ sem rebuild wf 99737bcd-a295-4278-8804-fff651fb6a8c
{"wf_id":"8480a83c-2d90-4dd3-8e8d-5fb899a58bc0","ppl_id":"c2016294-d5ac-4af3-9a3d-1212e6652cd8"}
```

The output of `sem rebuild wf` command is a new Workflow ID and a new pipeline
ID as the `sem rebuild workflow` command creates a new workflow based on an
existing one.

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


