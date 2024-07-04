---
description: Access your BitBucket repositories
---

# Connect Bitbucket

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Available from '@site/src/components/Available';
import VideoTutorial from '@site/src/components/VideoTutorial';

BitBucket users need to provide access to Semaphore so it can read their repositories.

## Overview {#overview}

You can connect your Bitbucket account to Semaphore in two ways:

- By signing in with BitBucket when creating a new Semaphore account
- By granting access to BitBucket in an existing Semaphore account

## How to sign up using BitBucket {#sign-bb}

If you are creating a new Semaphore account, you can sign in with BitBucket to create the connection automatically.

Follow these steps to create a Semaphore account using BitBucket:

1. Log in to your BitBucket account
2. Navigate to the [Semaphore login page](https://semaphoreci.com/login)
3. Select **Log in with BitBucket**
4. Grant access to the Semaphore [OAuth App](https://support.atlassian.com/bitbucket-cloud/docs/use-oauth-on-bitbucket-cloud/) in BitBucket
5. Finish the Semaphore setup

## How to connect existing accounts to BitBucket {#grant-bb}

If you already have a Semaphore account, you can connect it with your BitBucket account. To do that, follow these steps:

1. Log in to your existing Semaphore account
2. Go to your [Semaphore account page](https://me.semaphoreci.com/account)
3. Under the **Repository**, click on the Grant access link next to Bitbucket.
 ![Grant access to BitBucket](./img/grant-bb.jpg)
4. Grant access to the Semaphore OAuth App

## How to disconnect a BitBucket account {#disconnect-bb}

Disconnecting a BitBucket account removes Semaphore access to your repositories.

To disconnect Semaphore from BitBucket:

1. Log in your BitBucket account
2. Go to the [Application authorization page](https://bitbucket.org/account/settings/app-authorizations/)
3. Click on **Revoke** next to Semaphore 2.0
 ![Revoke access to Semaphore](./img/revoke-bb.jpg)

## Troubleshooting guide

If your repositories aren't showing in Semaphore or changes are not triggering new workflows, check the connection between BitBucket and Semaphore.

1. Navigate to your [Semaphore account](https://me.semaphoreci.com/account)
2. Read the status next to BitBucket
 ![Connection status green](./img/account-gh-bb-access.jpg)
3. If the status is disconnected, click on **Grant**

Your Bitbucket profile connection on this page can be in one of these states:

- **Not Connected**: your account is not connected. Next time you attempt to log in, you will need to grant access to Semaphore again.
- **Connected**: can connect both private and public repositories via OAuth. 

You can check and change the permissions of your OAuth App connection on the [BitBucket authorization page](https://bitbucket.org/account/settings/app-authorizations/).

### Verify deploy key health {#deploy-key}

Semaphore generates a [deploy key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys) when a [project](./projects) is created. This means there is a deploy key per repository connected to Semaphore.

When a deploy key is broken or invalid, Semaphore shows the following error message:

```text
git@github.com: Permission denied (publickey).
fatal: Could not read from remote repository.
```

To verify the status of a deploy key:

1. Open your [project settings](./projects#settings)
2. If there isn't a green check next to **Deploy Key**, the key is invalid
 ![Checking the status of the deploy key](./img/deploy-key-bb.jpg)

To deploy a new key, click on **Regenerate**.

:::info

A deploy key can be invalidated if:

- it was manually removed from the repository
- OAuth permissions were revoked
- the repository's original owner no longer has access to it

:::

### Verify webhook health {#webhook}

Semaphore uses a webhook to detect changes in your repository. When the webhook is broken, Semaphore can't trigger new workflows.

To verify the status of a webhook:

1. Open your [project settings](./projects#settings)
2. If there isn't a green check next to **Deploy Key**, the key is invalid
 ![Checking the status of the deploy key](./img/webhook-bb.jpg)


To fix the broken webhook, click on **Regenerate**. This should generate a new webhook and repair the connection between Semaphore and GitHub.

### Reconnecting moved or renamed projects

There are several actions that can break the connection between BitBucket and Semaphore. For example:

- moving the repository to a different location
- renaming the repository
- renaming the BitBucket user account

When this happens, you must update the URL of the repository in Semaphore. To do this:

1. Open your [project settings](./projects#settings)
2. Type the new repository URL
3. Press **Change**
 ![Changing the repository URL in Semaphore](./img/repository-url-bb.jpg)

After changing the URL, double-check the status of the [deploy key](#deploy-key) and the [webhook](#webhook).

## See also

- [Projects](./projects)
- [Getting Started Guide](../getting-started/guided-tour)
- [Semaphore Organizations](./organizations)
- [How to connect with GitHub](./connect-github)