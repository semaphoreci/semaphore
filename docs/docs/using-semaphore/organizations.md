---
description: Manage people, plans, and notifications
---

# Organizations

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Available from '@site/src/components/Available';
import VideoTutorial from '@site/src/components/VideoTutorial';

Organizations are the administrative unit in Semaphore. This page explains how to create organizations, manage users, and what settings are available.

## Overview {#overview}

The fist time you log in to Semaphore you'll be prompted to create an *organization*. An organization is the basic unit of administration. 

Organizations have:
- one or more [projects](./projects)
- a [billing plan](https://semaphoreci.com/pricing)
- one or more owners
- users and permission levels

## How to change organizations {#org-selection}

Switch the active organization to change its settings or view its projects.

<Tabs groupId="ui-cli">
<TabItem value="ui" label="UI">

To view or create other organizations, open the organization menu on the top right corner and select **Change Organization**.

![Organization menu location](./img/organization-menu.jpg)

</TabItem>
<TabItem value="cli" label="CLI">

You must install and connect the [Semaphore command line] to access your organizations

1. Run `sem context` to show the organizations connected to the tool. The active organization has an asterisk (*) next to it
    ```shell title="View connected organizations"
    $ sem context
        myorg1_semaphoreci_com
        myorg2_semaphoreci_com
        # highlight-next-line
      * myorg3_semaphoreci_com
    ```
2. Change organization with `sem context <organization-name>`
    ```shell title="Change active organization"
    $ sem context myorg1_semaphoreci_com
    switched to context "myorg1_semaphoreci_com"
    ```

</TabItem>
</Tabs>

## Managing users {#people}

Semaphore uses roles to manage user access. You can add an unlimited number of persons to your organization.

To manage users in your organization, open the organization menu and select **People**.

### Organization roles {#roles}

The default organization roles are:

- **Members**
  - Can create new [projects](./projects)
  - Can view existing notifications and settings.
- **Admins**
  - Can view, manage, and modify everything within the organization except general settings and financial information.
  - Get admin access to every project inside the organization
- **Owners**
  - Can do everything within the organization, including changing general settings and deleting it
  - By default, this role is assigned to the user that creates the organization
  - Get admin access to every project inside the organization 



The **People** tab shows users in your organization along with their:

- Semaphore usernames
- GitHub or BitBucket handles
- Role

TODO: people screenshot (rtx can be a starting point)

### How to add users {#add-people}

To add a user, press the **Add people** button. You have two options:

- By their GitHub handle
  - Type their GitHub handle and press **Invite**
  - Invitees will receive an email to join the organization
- By shared GitHub organization
  - The list shows users who already belong in the same GitHub organization as you
  - Select the users and optionally type an email
  - Press **Add selected** to add them to the organization

TODO: people screenshot

### How to change user roles {#roles-people}

To change the role of a user, press the **Change Role** button next to the person.

TODO: image


### How to create user groups {#add-groups}

<Available plans={['Scaleup']}/>

User groups allows you to manage users in bulk. Instead of managing users one by one, add them to a group and assign a role to it.

To create a group, open the organization menu and select **People**. 

1. Press on **Create group**
2. Type in the group name and description
3. Type the names of the persons to add to the group
4. Press **Save changes** to create the group

TODO: image

### How to change the role of a group {#group-role}

To change the role of a group, press the **Change Role** button next to the group.

TODO: image

### How to add/remove users to a group {#change-groups}

To add or remove users in a group, press the **Modify group** button next to it.

- Press the **X** button to remove the user from the group
- Type the name of the persons you want to add to the group
- Press **Save changes** to finish editing the group

TODO: image

https://docs.semaphoreci.com/security/groups/groups/

## Managing ownership {#manage-ownership}

TODO: https://docs.semaphoreci.com/account-management/organizations/

## Organization settings {#org-settings}

To access your organization settings, open the organization menu and click on **Settings**.

### General settings {#general-settings}

Your organization main settings.  Here, you can change its name, its URL, and control how workflows run.

TODO: we need to explain this "Do not run workflows for project/non-project members"

![General settings](./img/organization-settings-general.jpg)

### Slack notifications {#slack-notifications}

Send notifications to Slack and other webhook-based services. Notifications are sent when a pipeline finishes running so your team get instant feedback on the result. 

<Tabs groupId="ui-cli">
<TabItem value="ui" label="UI">

To create a notification, navigate to **Notifications** and press **New Notification**

1. Type the name of the notification
2. Type the name of the rule to fires the notification
3. You can supply optional filters for this rule:
   - **Projects**: comma-separated list of [projects](./projects) where it applies
   - **Branches**: comma-separated list of Git branches
   - **Pipelines**: comma-separated list [pipeline](./pipelines) YAML files that need to run in order to fire the notification
   - **Results**: comma-separated list of results. Valid values are: "passed", "failed", "stopped", or "canceled"

<details>
<summary>Show me</summary>
<div>
![Creating a new notification](./img/notifications-setup-1.jpg)
</div>
</details>

:::note

Regular expressions must wrapped in forward slashes, e.g. `/.*/` matches all values. You can use regular expressions in Projects, Branches, and Pipelines.

:::

To send Slack notifications:

1. Copy the [Slack webhook](https://slack.com/help/articles/360041352714-Build-a-workflow--Create-a-workflow-that-starts-outside-of-Slack) for your Slack Workspace
2. Type the comma-separated list of channels to receive the message

<details>
<summary>Show me</summary>
<div>
![Adding an Slack webhook](./img/notifications-setup-2.jpg)
</div>
</details>

To send notifications to other webhook-based services:

1. Create a organization [secret](./secrets#org-secrets) containing the environment variable `WEBHOOK_SECRET` and a secret value. Remember the name of this secret, e.g. "mywebhook-secret"
2. Copy the URL of the webhook that receives the notification
3. Type the name of the secret created on step 1, e.g. "mywebhook-secret"

<details>
<summary>Show me</summary>
<div>
![Adding a webhook-based service](./img/notifications-setup-3.jpg)
</div>
</details>

:::note

The value contained in the secret is sent along with the payload on notification to help secure the message. You can should validate that the secret value matches before accepting the message on the receiving end.

:::


At this point, you can create additional rules or save the changes by pressing **Save Notification**.

</TabItem>
<TabItem value="cli" label="CLI">

TODO: via CLI and tabs


"passed", "failed", "stopped", or "canceled"

https://docs.semaphoreci.com/essentials/slack-notifications/

https://docs.semaphoreci.com/essentials/webhook-notifications/


</TabItem>
</Tabs>


### IP Allow List {#ip-list}

Filter access to your organization by IP.

TODO: get access to this feature

### Initialization jobs {#initialization-jobs}

Configure how pipelines are initialized.

Semaphore must run some initialiation steps before it can start a [pipeline](./pipelines). It must fetch and validate the pipeline YAML and, in some cases like [monorepos] or [pre-flight checks], even do a full repository clone.

By default, Semaphore chooses automatically which kind of [agent](./pipelines#agents) run the initialization job, but in this section you can customize it for all [projects](./projects).

<details>
<summary>Show me</summary>
<div>
![Customizing a the initialization job agent](./img/organization-settings-initialization.jpg)
</div>
</details>

### Okta integration {#okta-integration}

<Available plans={['Scaleup']} />

TODO: TBD

### Contacts {#contacts}

Manage your contact information.

In this section, you can add contact details in case the Semaphore Support Team needs to reach you. Add your name, phone number and email in three categories:

- **Finance**: used any billing-related messaging related to your organization
- **Main**: used as the primary point of communication
- **Security**: used to discuss any issues related to security in your organization

## Audit logs {#audit-log}

TODO: TBD

## Activity monitor {#activity-monitor}

TODO: TBD

## Plans and billing {#plans}

TODO: TBD