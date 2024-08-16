---
description: Finish up with automated continuous delivery
---

# Continuous Delivery

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Available from '@site/src/components/Available';
import VideoTutorial from '@site/src/components/VideoTutorial';
import Steps from '@site/src/components/Steps';

We suceeded into having a program built and tested using Continuous Integration. It's time to release it automatically using Continuous Delivery.

In this section you will learn about:

- Protective sensitive data with Secrets
- Creating multiple pipelines
- Using automated promotions

## Prerequisites

For this part of the tutorial you will need:

- A [GitHub Access Token](https://github.com/settings/tokens) with read+write content permissions
- The `git` command line tool

## Releasing to the world

The goal is to automatically deploy the built binary to the GitHub repository so people can download and enjoy our program. So, we're going to add a job that automatically uploads the binary to the repository every time we tag a release with `git tag`

## Creating a Secret

In order to upload the release from a Semaphore job we need to authenticate with the GitHub account. For that, we'll need an access token. Now, the problem with such tokens is that they should remain secret. This rules out using environment variables in our jobs to store the token, as these are visible to anyone with read access to the repository.

The answer to this problems is using Secrets. Secrets provide a secure way to store key-value pairs and files in a way that's not visible to anyone outside our Semaphore organization. So even if our repository is public, anonymouns people won't be able to see our precious tokens.

To create a Secret, follow these steps:

<Steps>

1. Open the Organization menu and select **Settings**
2. Go to **Secrets**
3. Press **New Secret**
4. Type a name for the secret, e.g. `github-release`
5. Type the key-value pair required to authenticate with GitHub

    The variable name is `GH_TOKEN` and the value is your unique token generated in your GitHub account

    ![Creating a secret](./img/create-secret.jpg)

6. Press **Save Secret**

</Steps>

## Release job

Now we're ready to add a release job. We can use the [gh command line tool](https://cli.github.com/) to automate the release from a Semaphore job.

<Steps>

1. Add a block
2. Type the following commands ...commands
3. Open the **Secrets** section on the block and enable `github-release` ...picture
4. Press **Run the workflow** > **Start**

</Steps>

There are a few problems with these approach. it works but.....

## Promotions

What is a promotion

Step-by-step
Create a promotion pipeline to release

## The release pipeline

Add pipeline

## Try the release workflow

Git tags

## What's next?