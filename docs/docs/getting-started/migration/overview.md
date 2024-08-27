---
description: Migrate to Semaphore
sidebar_position: 1
---

# Migration Overview

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Available from '@site/src/components/Available';
import VideoTutorial from '@site/src/components/VideoTutorial';
import Steps from '@site/src/components/Steps';

Migrating a Continuous Integration and Delivery (CI/CD) platfrom can be straightforward or very challenging. Every project, every team is a world; for some is trivial while for others is a big effort. In any case, it is our dearest hope that the effort yields benefits for you and your team.

These guides will help you migrate from other CI systems to Semaphore. In this page, we'll review the basis for the migration process, as several migration steps are common for all CI systems.

We recommend going through the [Guided Tour](../guided-tour) pages to familiarize yourself to Semaphore before starting the migration plan.

## Workflow visual editor {#wf}

One of the key advantages Semaphore users have over other CI providers that Semaphore provides a [Visual Workflow Editor](../../using-semaphore/workflows#workflow-editor). Most alternatives to Semaphore require you to learn some special syntax to use.

As a result, Semaphore provides a gentler learning curve to create any workflow faster.


## Migration plan

Here is the recommended plan to migrate from any CI provider to Semaphore.

<Steps>

1. Plan how many organizations you need

    Everything in Semaphore happens in an organization. The [organization](../../using-semaphore/organizations) is where you run your projects, add your team members

    You might want to create more than one organization if your company consists of separate business units that do not need to interact with each other while developing applications.

2. Choose a billing plan

    Every organization can have a different billing plan. Explore the available plans and features to find the one that fits your organization best.

3. Connect your organization to your Git provider

    Semaphore supports GitHub and BitBucket. Connect and grant Semaphore access to your repositories.

    For more details see:

    - [How to install GitHub App](../../using-semaphore/connect-github): if you are a GitHub user, read this to install the GitHub app and allow Semaphore to read your repositories
    - [How to connect GitHub OAuth](../../using-semaphore/connect-github-oauth): an alternative way to connect to GitHub. We recommend using GitHub App instead since it gives you more granular access to repositories
    - [How to connect to BitBucket](../../using-semaphore/connect-bitbucket): read this guide if your are a BitBucket user

4. Migrate your secrets

    [Secrets](../../using-semaphore/secrets) are used to store sensitive data such as SSH keys, database passwords, deployment keys, API keys. If your CI/CD workflows connect to external services, secrets can help you keep these confidential details secure.

    For example, let's say you build Docker images in your CI/CD and push them to Docker Hub. This action requires authenticating with the Docker registry, your scripts or workflow will  need some authentication token or username and password. Secrets are specifically designed to store this kind of information.

    We recommend creating a new set of credentials for Semaphore access instead of just copying the credentials you were using in your previous CI system. Once the migration is complete, you can disable or delete the older credentials without disrupting your Semaphore workflows.

5. Create your projects
    

    [Projects] connect Semaphore to your repositories. When you create a project two things happen:

        - An initial pipeline is created on a dedicated branch
        - You get the chance to repository contributors to the project
  
6. Add people to your organization

    You can invite people to organization even of they don't have access to the repositories. Semaphore uses a [Role Based Access Control](../../using-semaphore/rbac) to grant members the permissions they need to work. You can add people with read-only access to certain parts of the organization.

7. 

</Steps>



## Feature parity

If you come from GitHub Actions and a bit lost on Semaphore use the following guide to find what you need:

- [How to use Environment variables](../../using-semaphore/jobs#environment-variables)
- [Use Secrets to protect sensitive data](../../using-semaphore/secrets)
- [How to use the Cache](../../using-semaphore/optimization/cache)
- [How to use Artifacts](../../using-semaphore/artifacts)
- [How to use Docker Environments](../../using-semaphore/pipelines#docker-environments)
- [How to specify language versions](../../reference/toolbox#sem-version)

See a few comparison examples below.