---
description: Where everything begins
---

# Workflows

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Available from '@site/src/components/Available';
import VideoTutorial from '@site/src/components/VideoTutorial';
import Steps from '@site/src/components/Steps';

A workflow is the series of teps to build, test, release, or deploy your application. This page explains workflows, how they are triggered and their settings.

:::tip

If this is your first time using Semaphore, check out [Guided Tour](../getting-started/guided-tour).

:::

## Overview

In the context of Continuous Integration and Delivery (CI/CD) a workflow implements the automation to manage development cycle from code to deployment.

Workflows in Semaphore consists of one or more [pipelines](./pipelines). A pipeline defines the sequence of task to achieve goals like build, release or deploy to production.

![Workflows in Semaphore](./img/workflows.jpg)

Before you can run a workflow in Semaphore you need:

- A Semaphore account
- A repository on GitHub or BitBucket
- A Semaphore project linked to the repository
- One or more pipelines

The [project page](./projects#view-projects) shows all the recent workflows for the project. 

![Types of workflows](./img/workflow-types.jpg)

## Visual workflow editor {#workflow-editor}

You can define most aspect of your workflows using the visual editor. 

To access the editor, open one of your projects on and press **Edit Workflow**. All your changes are stored as YAML pipeline definitions on your Git repository. You can make changes using the visual editor, or edit the YAML directly by clicking on the pipeline YAML file.

![Workflow editor button](./img/workflow-editor.jpg)

See the [jobs page](./jobs) to learn how define jobs and blocks.

## Workflow triggers

The following events or actions trigger workflows by default:

- Pushing commits into any branch
- Pushing Git tags
- Changing any pipelines
- Manually re-running workflows 
- Running pipelines using [Tasks](./tasks)

Aditionally, you can configure workflows to be triggered by:

- Pull requests
- Pull request on forked repositories

### How to customize triggers {#project-triggers}

Triggers are configured in the [project settings](./projects#general). To change what actions can trigger a workflow, follow these steps:

<Steps>

1. Open your project on Semaphore
2. Go to the **Settings** tab

    ![General Settings](./img/project-settings.jpg)

3. In the **General** section scroll down to **What to build**
4. Change the settings and press **Save**

</Steps>

Selecting **Do not run on any events** disables all triggers, effectively pausing the project. You can, however, still run workflows manually or with [tasks](./tasks).

![Pausing the projet](./img/pause-project.jpg)

Selecting **Run on** allows you to configure what triggers are enabled for the project.

- The **Branches** option allows you to run workflows on all branches or configure an allow list with branch names. Regular expressions are supported
- The **Tags** options work the same but for Git tags

![Branch and tag triggers](./img/project-general-settings-2.jpg)

- Enabling **Pull requests** option allows Semaphore to run workflows on pull requests originating in the same repository
- The **Forked pull request** works the same for pull requests originating from forked pull requests. [To prevent security leaks](#pr), you can configure a list of allowed secrets and GitHub/BitBucket usernames that can trigger workflows in this way
  
![Pull request triggers](./img/project-general-settings-3.jpg)


## How to skip commits {#skip}

If you don't want to start a workflow, type one of the following strings in the commit message. 

- `[ci skip]`
- `[skip ci]`


For example, this push does not trigger a Semaphore pipeline execution, it is completely ignored:

```shell title="Skipping a commit"
git add -A
git commit -m "[skip ci] Initial commit"
git push origin main
```

:::note notes

- Skip doesn't work when [pushing tags](./promotions#tagged)
- Be careful when squashing commits as they can contain skip messages

:::
