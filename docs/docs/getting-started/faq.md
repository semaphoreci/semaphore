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

## Billing questions

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


CONTINUE HERE:

Here: https://docs.semaphoreci.com/account-management/billing-faq/
- Why can't I remove my old credit card after adding a new one?
- Why are you still charging my old credit card when I added a new default credit card?

---

## Git, GitHub and BitBucket

- How can I build a project with git submodules?
- How can I redeliver webhooks from Github to Semaphore?
- How can I add repositories that belong to my GitHub organization?
- How to comment on Github's pull requests from a workflow?

## Organization

- How do I transfere ownership of an organization

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

- How to make the project visible/private?
- What does it mean a project is visible?
- How do I rename a project?
- How do I transfer ownership of a project

## Workflows

- How do I approve blocked workflow triggers?
- What is the cause of ### "Revision: COMMIT_SHA not found .... Exiting"
- Why are my workflows not running in parallel?
- Why did my workflow stop without explanation?
- Why aren't workflows triggering on pull requests?
- Why does my code contain tags that have already been deleted?
