---
description: Connect Git repos to Semaphore
---

# Projects

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Available from '@site/src/components/Available';
import VideoTutorial from '@site/src/components/VideoTutorial';

Projects are codebases developed and managed through Semaphore [Continuous Integration](https://semaphoreci.com/continuous-integration). A project links your Git repository with Semaphore, so it can run [jobs](./jobs) to test, build, or deploy your application. 

This page explains how to set up projects and what settings are available.

## Create a project {#create-project}

<VideoTutorial title="Create a Project" src="https://www.youtube.com/embed/Y4Ac5EJpzEc?si=INZVrNw4LTWg3l6k"/>

To create a Semaphore project you need:

- A [Semaphore](https://semaphoreci.com) account with an [organization](./organizations.md)
- A GitHub or Bitbucket account. For more information, see the connection guides
  - [How to connect to GitHub](./connect-github)
  - [How to connect to Bitbucket](./connect-bitbucket)
- A repository with at least one commit

<Tabs groupId="ui-cli">
<TabItem value="ui" label="UI">

Go to Semaphore, press **+Create New** 1 and then press **Choose repository**

![Creating a new project](./img/create-project-1.jpg)

1. Select the GitHub or Bitbucket tab. You may need to press the **Connect account** button if this is the first time
2. Select the repository from the list and press on **Choose**
    <details>
    <summary>Show me</summary>
    <div>
    ![Select repository](./img/create-project-2.jpg)
    </div>
    </details>
3. Optionally, [add people](./organizations#people) to the project. Press **Continue**
    <details>
    <summary>Show me</summary>
    <div>
    ![Add people](./img/create-project-3.jpg)
    </div>
    </details>
4. Select a started workflow. If in doubt, select **Single Job** and **Start**
    <details>
    <summary>Show me</summary>
    <div>
    ![Add people](./img/create-project-4.jpg)
    </div>
    </details>

Semaphore creates a new [pipeline](./pipelines) file in the `.semaphore` folder in the repository and starts working.

![Project created](./img/project-created.jpg)

</TabItem>
<TabItem value="cli" label="CLI">

After installing and connecting the [Semaphore command line](../reference/semaphore-cli):

1. Clone the repository in your machine
2. Run `sem init` at the root of the repository
3. Push a change to get Semaphore working
 
 ```shell title="Push pipeline to the repository
    git add .semaphore
    git commit "Initalize Semaphore"
    git push origin main
 ```

![Project created](./img/project-created.jpg)

You can override the project name and URL by using [additional options](../reference/semaphore-cli#sem-edit)

```shell
sem init --project-name <project_name> --project-url <project_url>
```

If you get permission or not find error message, double check the connection between Semaphore and your Git provider:
- [How to connect to GitHub](./connect-github)
- [How to connect to Bitbucket](./connect-bitbucket)

</TabItem>
</Tabs>

## View projects {#view-projects}

<Tabs groupId="ui-cli">
<TabItem value="ui" label="UI">

You can find your projects in Semaphore by pressing on the **Projects** tab and searching by project name.

![Searching for projects](./img/find-project.jpg)

Semaphore shows the latest activity in the last few days when logging in. 

![Project activity](./img/project-activity.jpg)

</TabItem>
<TabItem value="cli" label="CLI">

To get the list of the projects in your organization:

1. If needed, [switch the context](./organizations#org-selection) to your organization
2. Run [sem get](../reference/semaphore-cli) to list your projects

```shell
$ sem get project
NAME                                 REPOSITORY
semaphore-demo-flutter               git@github.com:semaphoreci-demos/semaphore-demo-flutter.git
hello-semaphore                      git@github.com:semaphoreci-demos/hello-semaphore.git
```

</TabItem>
</Tabs>

## Workflow triggers {#triggers}

The following actions in the repository can trigger Semaphore to start the project's pipelines.

- Pushing commits into any branch
- Pushing Git tags
- Creating pull requests from the same repository
- Creating pull requests originating from a forked repository
- Updating any of the project's pipelines using the [visual editor](./jobs#workflow editor)
- Pressing the Run button on the Semaphore website
- Requesting a re-run [using the API](../openapi-spec/workflows-reschedule)
- Scheduling workflows [using Tasks](./tasks)

The reason for the trigger can be determined at runtime by examining the Semaphore environment variables in the job. See the [environment variable reference page](../reference/env-vars#semaphore) for more details.

### How pull requests are handled {#pr}

Semaphore starts a workflow for every push to a pull request originating from a forked repository. For security reasons, secrets are disabled in jobs triggered in this way. You can [create an allow list](#settings-triggers) with the secrets you want to expose in the project settings.

:::note

Instead of pushing the HEAD commit to the pull request, Semaphore uses the MERGE commit between the source and the upstream branch. You can find the SHA of the HEAD commit of the Pull Request in the [`SEMAPHORE_GIT_PR_SHA`](../reference/env-vars#pr-sha) environment variable.

:::

## Project tabs {#manage-projects}

Project members can view or manage the following project elements:

- **Activity**: shows the latest [pipeline](./pipelines) runs
- **Deployments**: access the [project's environment](./promotions#deployment-targets) (formerly deployment targets)
- **Insights**: shows the [insights](./optimization/insights)
- **Artifacts**: shows the [project-level artifacts](./artifacts#projects) and [retention policy](./artifacts#retention)
- **Tasks**: shows the [tasks](./tasks)
- **Flaky Tests**: shows the [flaky tests](./tests/flaky-tests) detected in the project
- **People**: shows or changes the [project members](#people)
- **Settings**: shows the [project-level settings](#settings)

![Project tabs](./img/project-tabs.jpg)

## How to add/remove people to the project {#people}

:::note

You must add individuals to your Git repository and to your [Semaphore organization](./organizations#people) before you can add them to your project.

:::

Open your project and go to the **People** tab

1. Press **Add People**
2. Select the user from the list of options
3. Select the role
4. Press **Add Selected**

![Adding a member to the project](./img/add-user-2.jpg)

See [project roles](./rbac#project) for more information what actions can each role perform.

### How to change permissions {#people-roles}

Open your project and go to the **People** tab

1. Press the **Change role** next to the project member
2. Select the new role

![Changing a members role](./img/change-role.jpg)

### How to view pre-defined roles {#project-roles}

Semaphore provides pre-defined roles for projects. You can see what actions each role can perform by following these steps:

1. Open the Organization **Settings** menu
2. Select **Roles**
    ![Settings Role location](./img/settings-roles.jpg)
3. Scroll down to **Project roles**
4. Press the eye button next to the role you want to examine

The actions with enabled checkbox are allowed for that role.

### How to create custom roles {#custom-roles}

Create custom roles to give your users the precise permissions they need. 

1. Open the Organization **Settings** menu
2. Select **Roles**
3. On the **Project Roles** section, press **New Role**
4. Give a name a description to the new role
5. Enable the permissions allowed to the role. You can use the search box to narrow down options
6. Press **Save changes**

### How to change the project's owner {#owner-change}

Open the [project settings](#settings), under **Project Owner** type the username and press **Change**. The user must already have been [invited to the organization](./organizations#add-people).

![Changing project owner](./img/change-project-owner.jpg)

:::note

Transferring ownership does not automatically grant [project roles](./rbac#project) on the project. You must still manually grant the [admin role](./rbac#project-admin) to allow the new owner manage the project.

:::

## Settings {#settings}

The **Settings** tab in your project allows you to customize your project settings, add project-level secrets, and manage [artifacts](./artifacts)

### Project settings {#general}

In the general project settings, you can: 

- [Change the owner](#owner-change) of the project
- Change the visibility of the project
- Change the project name or description
- Delete the project

![General settings](./img/project-general-settings-1.jpg)

### Workflow triggers {#settings-triggers}

See [workflow triggers](./workflow#project-triggers) to learn how to customize what actions trigger a workflow.

### Repository {#settings-repo}

In **Repository** settings page you can:

- change the URL of your Git repository if you moved it
- configure or reinstall the [GitHub](./connect-github) or [Bitbucket](./connect-bitbucket) connections
- regenerate the [git webhook](./connect-github) if Semaphore is not picking up on the remote changes

![Repository settings](./img/project-settings-reop.jpg)

### Project secrets {#project-secrets}

In **Secrets** page, you can create project-level [secrets](./secrets.md). These are only accessible for this project and not globally to all the organizations.

To learn how to create project secrets, see the [secrets documentation page](./secrets#create-project-secrets).

Project roles: https://docs.semaphoreci.com/security/default-roles/

### Badges {#badges}

The **Badge** settings page shows you [shields](https://shields.io/) embed codes for your README or any webpage, allowing team members and users about the build status of your project.

To get a badge embed code:

1. Type the branch name you want to show the status for. This is typically "main" or "master"
2. Select a badge style. This is only a style choice
3. Choose the file format where you will embed the badge
4. Copy the code into your README or webpage

![Using project badges](./img/project-badges.jpg)

### Artifacts {#artifacts}

The **Artifacts** settings page lets you configure the [artifact](./artifacts) retention policy.

To learn more, see the [artifacts retention page](./artifacts#retention)

## Pre-flight checks {#preflight}

<Available plans={['Scaleup']}/>

Pre-flight checks are user-defined commands executed before the pipeline begins as part of the pipeline [initialization job](./pipelines#init-job). They checks allow you to define the type of agent running the initialization job and to manually run commands before a pipeline starts.

:::note

If you want to run commands for all pipelines in your organization, see [organization pre-flight checks](./org-preflight).

:::

### How to set up checks {#preflight-add}

To create, edit, or delete project pre-flight checks, follow these steps:

1. Open the project on Semaphore
2. Go to the **Settings** tab
3. Select **Pre-flight checks**
4. Type the pre-flight commands
5. Optionally, type the name of [secrets](./secrets) to be injected during the initialization job
6. Press **Save changes**

![Setting up pre-flight checks for project](./img/project-preflight.jpg)

See the [organization pre-flight page](./org-preflight#env-vars) to learn about the available environment variables and see examples of pre-flight checks.

### How to change init agent {#init-agent}

You can change the agent in which the initialization and pre-flight commands run.

To change the initialization for the project, follow these steps:

1. Go to the [Pre-flight settings page](#preflight-add)
2. Check the box **Override default agent configuration**
3. Select an **Environment type**
4. Select a **Machine type**
5. Select an **OS image**
6. Press **Save changes**

![Changing the initialization agent for the project](./img/override-project-init-agent.jpg)

:::note

This setting overrides the [organization-wide initialization agent](./organizations#init-agent).

:::

## See also

- [Organization pre-flight checks](./org-preflight)
- [How to manage organizations](./organizations.md)
- [How to configure test reports](./tests/test-reports)

