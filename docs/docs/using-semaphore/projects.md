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

## Create a project

<VideoTutorial title="Create a Project" src="https://www.youtube.com/embed/Y4Ac5EJpzEc?si=INZVrNw4LTWg3l6k"/>

To create a Semaphore project you need:

- A [Semaphore](https://semaphoreci.com) account with an [organization](./organizations.md)
- A GitHub or Bitbucket account. For more information, see the connection guides
  - [How to connect to GitHub](./connect-github)
  - [How to connect to Bitbucket](./connect-bitbucket)
- A repository with at least one commit

<Tabs groupId="ui-cli">
<TabItem value="ui" label="UI">

Go to Semaphore and press **+Create New**

1. Press **Choose repository**
2. Select the GitHub or Bitbucket tab. You may need to press the **Connect account** button if this is the first time
3. Select the repository from the list and press on **Choose**
4. Optionally, [add people](./organizations#people) to the project. Press **Continue**
5. Select a started workflow. If in doubt, select **Single Job** and **Start**

Semaphore creates a new [pipeline](./pipelines) file in the `.semaphore` folder in the repository and starts working.

TODO: image

</TabItem>
<TabItem value="cli" label="CLI">

After installing and connecting the [Semaphore command line](../reference/semaphore-cli):

1. Clone the repository in your machine
2. Run `sem init` at the root of the repository
3. Push a change to get Semaphore working
 
    ```shell title="Push pipeline to repository
    git add .semaphore
    git commit "Initalize Semaphore"
    git push origin main
    ```

TODO: image

You can override the project name and url by using [additional options](../reference/semaphore-cli#sem-edit)

```shell
sem init --project-name <project_name> --project-url <project_url>
```

If you get an permission or not found error message, double check the connection between Semaphore and your Git provider:
- [How to connect to GitHub](./connect-github)
- [How to connect to Bitbucket](./connect-bitbucket)

</TabItem>
</Tabs>

## Manage people {#people}

Add people to the project to let them view or administrate it. Semaphore uses role-based permissions to manage access to projects.

The available roles are:

- **Admin**: admins can change any setting in the project, add or remove people, and even delete the project altogether
- **Contributor**: contributors can view, change [pipelines](./pipelines) and re-run them. They can also start [promotions](./promotions), view insights and [tasks](./tasks)
- **Reader**: readers can view the project's page, view results and jobs logs. They can't make any modification to the project

### How to add/remove people {#people-add}

### How to change permissions {#people-roles}

## Project tabs {#manage-projects}

Project members can view or manage the following project elements:

- **Activity**: shows the latest [pipeline](./pipelines) runs
- **Deployments**: access the [project's environment](./promotions#deployment-targets) (formerly deployment targets)
- **Insights**: shows the [insights](./optimization/insights)
- **Artifacts**: shows the [project-level artifacts](./artifacts#projects) and [retention policy](./artifacts#retention)
- **Tasks**: shows the [tasks](./tasks)
- **Flaky Tests**: shows the [flaky tests](./tests/flaky-tests) detected in the project
- **People**: shows the [project members](#people)
- **Settings**: shows the [project-level settings](#settings)

TODO: image

## Settings {#settings}

### Project secrets {#project-secrets}

TODO: project-level secrets - https://docs.semaphoreci.com/essentials/using-secrets/
    CLI
    https://docs.semaphoreci.com/essentials/using-secrets/#project-level-secrets_3


Project roles: https://docs.semaphoreci.com/security/default-roles/

## Manage project ownership {#manage-ownership}

## Mapping roles to repositories

Users on Semaphore are always mapped to GitHub or Bitbucket repositories. Semaphore keeps track of all linked accounds that have access to the repositories.

Permission levels on GitHub

Repository-to-role mappings#
On Semaphore, each project has to stem from a code base on a remote repository, like GitHub or Bitbucket. Semaphore keeps track of all accounts that have access to those remote repositories (collaborators), and if any of them is associated with a Semaphore account, that Semaphore user is given access to the project (if he is a member of the organization which owns it).

Rules for assigning project roles#
Depending on user's premissions within the remote repository, a different role is assigned to them on the Semaphore project.

Repository permission level Semaphore project role
Admin Contributor
Push Contributor
Pull Reader
Bitbucket:#
Repository permission level Semaphore project role
Admin Contributor
Write Contributor
Read Reader

Members can access the organization's homepage and the projects they are assigned to. However, they are not able to modify settings.

https://docs.semaphoreci.com/security/repository-to-role-mappings/

## See also

- [Getting Started Guide](../getting-started/guided-tour)
- [How to manage organizations](./organizations.md)
- [How to configure test reports](./tests/test-reports)


