---
description: Frequently Asked Questions
---

# FAQ

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Available from '@site/src/components/Available';
import VideoTutorial from '@site/src/components/VideoTutorial';
import Steps from '@site/src/components/Steps';

This page contains Frequently Asked Questions organized in categories.

Existing responses:
- https://docs.semaphoreci.com/account-management/billing-faq/
- https://docs.semaphoreci.com/faq/faq/
- https://docs.semaphoreci.com/faq/managing-projects/

## Architecture

### Can I use my own machines to run workflows?

Yes. With the Semaphore [Hybrid Plan](https://semaphoreci.com/pricing) you can add your own machines as [self-hosted agents](../using-semaphore/self-hosted). You cam use a mix of Semaphore Cloud and your own machines for your workflows.

### Can I run Semaphore On-Premise?

Yes. The Semaphore [On-Premise Plan] allows you to host a separater installation of Semaphore behind your firewall, allowing you to run CI/CD on completely on your own infrastructure.

### Can I use a self-signed certificates with a private Docker registries?

Yes. To use private Docker registry with a self-signed SSL certificate you must:

1. Import the self-signed certificate files as a [secret](../using-semaphore/secrets) with the filename `domain.crt`
2. Use the following command to your pipeline:

    ```shell
    sudo mv $SEMAPHORE_GIT_DIR/domain.crt /etc/docker/certs.d/myregistrydomain.com:5000/ca.crt
    ```

This will allow a connection to a private remote registry using the provided certificate.

## Billing

### How do I track spending?

You can get insights about your spending, past invoices, and update your plan on the Plans & Billing page.

To access this page:

1. Open on your organization menu
2. Select **Plans & Billing**

### Can I set budget alerts?

Yes. Organizations [Owners and Admins](../using-semaphore/rbac) can set up budget alerts.

To set up a budget alert:

<Steps>

1. Open your organization menu
2. Select **Plans & Billing**
3. Click on **Update** next to **Spending budget limits**

    ![Spending alerts](./img/spending-alert.jpg)

4. Set the alert value and the email address

</Steps>

Semaphore will send alerts when your organization has spent 50%, 90%, and 100% of the budget.

:::warning

Pipelines are not be disabled if you go over budget.

:::

### How do I change my payment method?

In order to change your credit card or PayPal information, follow these steps:

<Steps>

1. Open the organization menu
2. Select **Plans & Billing**
3. Under **Payment details** click on **Update**

    ![Update payment method](./img/update-payment.jpg)

4. Go to the **Subscriptions** tag
5. Press **Manage** and then **Update payment method**
6. Type the new information

</Steps>

### Can I change my billing information?

Yes. If you want to change the recipient name, company name, address, phone number, billing email, VAT ID, or country on the invoice, please contact us at: support@semaphoreci.com

### Can I change my VAT number?

Not directly from the Semaphore website. After a subscription has been purchased, it is not possible for users to add or change VAT number (VAT ID) from the UI. 

If you wish to change the VAT number associated with your subscription, please reach out to support@semaphoreci.com with the VAT number you want to add and we will gladly make it happen.

### Will I get an invoice?

Yes. You will receive an invoice for your organization at the end of each billing period. This invoice will be sent to the email address that was entered when payment info was added.

You can also find your invoices at the bottom of the **Plans & Billing** in your organization menu.

### What is your refund policy?

Apart from cases of extended downtime (multiple hours in a day, or multiple days in a month), we do not offer refunds. 

We will, however, consider requests for refunds in extenuating circumstances. If you would like to request a refund, please email us at billing@semaphoreci.com and our team will do what we can to work out a solution. 

Please include the affected Workflow ID when contacting our Billing team regarding refunds.

### Why are you still charging my old credit card?

If you’ve added a new credit card to the subscription, but the old one is still being charged, it means that the new credit card wasn't properly marked for usage. 

Here’s how to do that:

<Steps>

1. Open the organization menu
2. Select **Plans & Billing**
3. Under **Payment details** click on **Update**

    ![Update payment method](./img/update-payment.jpg)

4. Go to the **Subscriptions** tag
5. Press **Manage** and then **Update payment method**
6. Press **Use this** next to the credit card you'd like to use

</Steps>

After that, you can also remove the old credit card if you don't need it anymore.

### Why can't I remove my old credit card?

If you run into this situation, it means that the old credit card is still in use. In order to mark the new credit card for usage, you can:

<Steps>

1. Open the organization menu
2. Select **Plans & Billing**
3. Under **Payment details** click on **Update**

    ![Update payment method](./img/update-payment.jpg)

4. Go to the **Subscriptions** tag
5. Press **Manage** and then **Update payment method**
6. Press **Use this** next to the credit card you'd like to use

</Steps>

After that, you’ll be able to remove the old credit card.

## Git, GitHub and BitBucket

### Can I build a project with git submodules?

Yes. To do that, follow these steps:

<Steps>

1. Append the these commands in the [prologue](../using-semaphore/jobs#prologue)

    ```shell
    git submodule init
    git submodule update
    ```
2. Append the these commands in the [epilogue](../using-semaphore/jobs#epilogue)

    ```shell
    git submodule deinit --force .
    ```

</Steps>

Make sure that Semaphore has permissions to clone your submodules repository. 

### Can I redeliver webhooks from Github to Semaphore?

Yes. Rarely Semaphore does not receive a webhook from Github. This results in a workflow not being triggered. When this happens, you can redeliver the webhook totrigger the workflow. 

These are the steps to redeliver webhooks from Github:

1. Go to your repository on GitHub
2. Click **Settings**
3. Click **Webhooks**
4. Click **Edit** for the webhook you want to redeliver
5. Scroll down to Recent Deliveries and search for the one that failed
6. Press the ... symbol, then Press **Redeliver**

### Can I send a comment on a pull request on GitHub from a workflow?

Yes. You can use the [GitHub API](https://docs.github.com/en/rest/issues?apiVersion=2022-11-28#create-an-issue-comment) to comment on pull requests. 

For example:

```shell
curl -X POST -H "Authorization: token <OAUTH_TOKEN>" \
    https://api.github.com/repos/<owner>/<repo-name>/issues/<number>/comments \
    -d '{"body":"body"}'
```

## Pipelines

- How can I insert multiline commands?
- How can I use different machines in the same pipeline?
- Can I use YAML anchors in Semaphore?
- How can I change timezone?
- How can I change the Postgres locale?
- What can I use to split my parallel tests?
- How can I troubleshoot a stalling job?
- Why are tests passing locally but not on Semaphore?
- - Why won't my jobs start?
- Why does my job fail when I specify "exit 0" in commands?

## Project

### Can I transfer ownership of a project?

Yes. The following conditions need to be met:

- The new project owner needs to have [Admin role](../using-semaphore/rbac) for the repository
- The new owner needs to ensure that the [GitHub connection](../using-semaphore/connect-github) or [BitBucket connection](../using-semaphore/connect-bitbucket) is working

To change the project ownership:

1. Open to the project
2. Go to **Settings**
3. In the **General** section, under **Project Owner** type the name of the new owner
4. Press **Change**

After project ownership has been transferred, you need to push a new commit. Old workflows cannot be re-run after transferring ownership.

If you come accross any issues, please reach out to support@semaphoreci.com and include the name of the project and the GitHub/Bitbucket username of the new owner in your message.

### Can I rename a project?

Yes. To do that, follow these steps:

1. Open the project you want to rename
2. Go to **Settings**
3. Type the new name for the project
4. Press **Save Changes**

This can also be performed from the CLI by using the [sem edit](../reference/semaphore-cli#sem-edit) command.

### Can I delete a project?

Yes. In order to delete a project:

1. Open the project you want to rename
2. Go to **Settings**
3. At the bottom of the page, click on the link in the Delete project section.
4. Fill in the delete reason details
5. Enter the project name for final confirmation.
6. Press the **Delete** project button.

If you prefer using CLI, you can delete a project by using the [sem delete](../reference/semaphore-cli#sem-delete) command.

:::danger

Deleting a project cannot be reversed.

:::


### Can I change the visibility of a project?

### Why I can't I make the project public/private?

There was a problem related to free plan???

----

## Workflows

- How do I approve blocked workflow triggers?
- What is the cause of ### "Revision: COMMIT_SHA not found .... Exiting"
- Why are my workflows not running in parallel?
- Why did my workflow stop without explanation?
- Why aren't workflows triggering on pull requests?
- Why does my code contain tags that have already been deleted?
