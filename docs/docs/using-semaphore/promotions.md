---
description: Connect pipelines to create workflows
---

# Promotions

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Available from '@site/src/components/Available';
import VideoTutorial from '@site/src/components/VideoTutorial';

Promotions connect [pipelines](./pipelines) to create branching workflows. This page explains what promotions are, how to use them to connect pipelines, and what settings are available.

## Connecting pipelines {#promotions}

If your [project](./projects) contains more than one pipeline, you can use promotions to chain them.  Promotions *connect pipelines* in the same way that [pipelines connect blocks](./pipelines#dependencies).

Using promotions we can create a tree-like structure where pipelines branch off other pipelines. The root of the tree is the default pipeline located at `.semaphore/semaphore.yml`.

Promoted pipelines are typically used for continuous delivery and continuous deployment. The following example shows the initial pipeline branching into two continuous delivery pipelines: production and development. In each of these two, we define the sequence of [jobs](./jobs) needed to deploy the application in the respective environment.

![A workflow with 3 pipelines](./img/workflows.jpg)


:::tip

You can also run specific pipelines with [tasks](./tasks).

:::

## Promotion triggers {#triggers}

When a promotion is triggered the child pipeline starts to run. There are three options for triggering a promotion:

- **Manual promotions**: the default. Start the next pipeline by pressing a button
- **Auto promotions**: start on certain conditions such as when all tests have passed on the "master" branch
- **Parameterized promotions**: pass values as environment variables into the next pipelines. Allows us to reuse the same pipeline configuration for different tasks

## How to add promotions {#create-promotions}

Promotions are defined in the pipeline from which the child pipelines branch off. 

<Tabs groupId="editor-yaml">
<TabItem value="editor" label="Editor">

1. Press **+Add Promotion** 
2. Set a descriptive name for the promotion
3. Configure the new pipeline and add jobs as needed

![Adding a manual promotion](./img/promotion-add-manual.jpg)

Press (A) "Delete Promotion" to completely delete the promotion and *all child pipelines*.

</TabItem>
<TabItem value="yaml" label="YAML">

1. Create a new pipeline file in the `.semaphore` folder, e.g. `deploy.yml`
2. Edit the pipeline from which the new one (from step 1) branches off, e.g. `semaphore.yml` 
3. Add the `promotions` key at the root level of the YAML
4. Type the `name` of the promotion
5. Type the `pipeline_file` filename of the pipeline created in step 1.

```yaml title=".semaphore/semaphore.yml"
version: v1.0
name: Initial Pipeline
agent:
  machine:
    type: e1-standard-2
    os_image: ubuntu2004
blocks:
  - name: Build
    dependencies: []
    task:
      jobs:
        - name: Build
          commands:
            - checkout
            - npm run build
# highlight-start
promotions:
  - name: Promotion 1
    pipeline_file: deploy.yml
# highlight-end
```

</TabItem>
</Tabs>

### Automatic promotions {#automatic-promotions}

Automatic promotions start a pipeline on user-defined conditions.

After [adding a promotion](#promotions), you can set automatic conditions. Whenever Semaphore detects these conditions are fulfilled the child pipeline automatically starts.

<Tabs groupId="editor-yaml">
<TabItem value="editor" label="Editor">

1. Open the promotion you wish to autostart
2. Enable the checkbox **Enable automatic promotion**
3. Type in the _start conditions_

![Setting autostart conditions on a promotion](./img/promotion-auto.jpg)

</TabItem>
<TabItem value="yaml" label="YAML">

1. Open the pipeline file containing the promotion you wish to autostart
2. Add an `auto_promote` key
3. Add a child `when` key. Type in the _start conditions_

```yaml title=".semaphore/semaphore.yml"
version: v1.0
name: Initial Pipeline
agent:
  machine:
    type: e1-standard-2
    os_image: ubuntu2004
blocks:
  - name: 'Block #1'
    dependencies: []
    task:
      jobs:
        - name: 'Job #1'
          commands:
            - checkout
            - make build
# highlight-start
promotions:
  - name: Promotion 1
    pipeline_file: deploy.yml
    auto_promote:
      when: branch = 'master' AND result = 'passed'
# highlight-end
```

</TabItem>
</Tabs>

## Parameterized promotions {#parameters}

Parameterized promotions allow you to propagate environment variables on all jobs in the next pipeline. 

Use parameters to reduce the amount of pipeline duplication. For example, if you create a parametrized pipeline that reads the target environment from a variable, you can reuse it to deploy an application to production and testing environments. Parameters work with [manual](#manual-promotions) and [automatic](#automatic-promotions) promotions.


### How to add parameters {#parameters-add}

To add parameters to a promotion, follow these steps:

<Tabs groupId="editor-yaml">
<TabItem value="editor" label="Editor">

1. Press the promotion you wish to add parameters to
2. Click **+Add Environment Variable**

    <details>
    <summary>Show me</summary>
    <div>
    ![Add parameter to promotion](./img/parameter-1.jpg)
    </div>
    </details>

3. Set the variable name 
4. Set an optional description
5. Set optional valid options. Leave blank to input value as freeform text
6. Enable the "This is a required parameter" checkbox if the parameter is mandatory
7. Set a default value (only when the parameter is mandatory)
8. Add more parameters as needed

    <details>
    <summary>Show me</summary>
    <div>
    ![Setting up parameters](./img/parameter-2.jpg)
    </div>
    </details>

</TabItem>
<TabItem value="yaml" label="YAML">

1. Edit the file where you wish to add the parameters
2. Add a `parameters.env_vars` key
3. Every list item is a new parameter. Set the `name` of the environment variable
4. Type an optional `description`
5. Optionally set `required` to `true|false`
6. Optionally set `options`. Each item in the list is a valid option. Leave blank to input value as freeform text
7. If `required: true`, set the `default_value`. Optional parameters don't have a default value

```yaml title=".semaphore/semaphore.yml"
# ...
promotions:
  - name: Push to Prod
    pipeline_file: pipeline_8.yml
    parameters:
      # highlight-start
      env_vars:
        - required: true
          options:
            - Stage
            - Production
          default_value: Stage
          description: Where to Deploy?
          name: ENVIRONMENT
      # highlight-end
```

</TabItem>
</Tabs>

:::info

When a pipeline is triggered with [automatic promotions](#automatic-promotions) the parameter values are automatically filled following these rules:

- Mandatory parameters use the default value
- Optional parameters are left blank

:::

### Promoting with the UI {#manual-promotions}

Once you have [added a parameter](#parameters-add), you can select its value from the Semaphore UI.

1. Press the promotion button
2. Select or type in the value. Optional parameters can be left blank
3. Press **Start promotion**

<Tabs>
<TabItem value="options" label="Select value from options">

![Selecting a parameter value from options](./img/promotion-options.jpg)

</TabItem>
<TabItem value="freeform" label="Freeform type value">

![Typing the parameter value in freeform](./img/promotion-freeform.jpg)

</TabItem>
</Tabs>

### Promoting with the API {#api-promotions}

<Available/>

You can pass parameter values to the promotion when it is triggered using the _Semaphore API_.

The following is an example of a curl call that includes parameters:

```shell
curl -H "Authorization: Token {api_token}" \
 -d "name={promotion_name}&pipeline_id={parent_pipeline_id}&{param_1_name}={param_1_value}&{param_2_name}={param_2_value}" \
 -X POST "https://{org_name}.semaphoreci.com/api/v1alpha/promotions"
```

### Accessing values in jobs {#access-parameters-jobs}

Parameters are exported as [environment variables](./jobs#environment-variables) in all the jobs contained in the promoted pipeline.

You can access the parameter value by directly using the environment variable in your commands.

<Tabs groupId="editor-yaml">
<TabItem value="editor" label="Editor">

![Using parameters a environment variables in jobs](./img/parameters-jobs.jpg)

</TabItem>
<TabItem value="yaml" label="YAML">

The parameters are accessible are regular environment variables in the `commands` section.

```yaml title="deploy.yml"
version: v1.0
name: Deployment pipeline
agent:
  machine:
    type: e1-standard-2
    os_image: ubuntu2004
blocks:
  - name: Deploy
    task:
      jobs:
        - name: Deploy
          commands:
            # highlight-next-line
            - echo "Deploy to $ENVIRONMENT"
```

</TabItem>
</Tabs>


### Accessing values in pipelines {#access-parameters-pipeline}

You can access parameter values in pipeline elements like the pipeline name.

Parameters can be accessed in the pipeline configuration using the `${{parameters}}` namespace. For example, if you defined a parameter called `ENVIRONMENT`, you can read its value in the pipeline config as:

```shell
${{parameters.ENVIRONMENT}}
```

Parameters are available in the following places:

- Pipeline `name`
- Pipeline _queue name_ (only available via YAML)
- As the name of a [secret](./jobs#secrets) (only available in YAML)

<Tabs groupId="editor-yaml">
<TabItem value="editor" label="Editor">

![Parameter value is expanded in the pipeline name](./img/pipeline-parameter-expansion.jpg)

</TabItem>
<TabItem value="yaml" label="YAML">
The following YAML pipeline shows all the places where a parameter value can be used:

```yaml title="deploy.yml"
version: v1.0
# highlight-start
# Use parameter values in the pipeline name
name: '${{parameters.ENVIRONMENT}} deployment of the release: ${{parameters.RELEASE}}'
# highlight-end
agent:
  machine:
    type: e1-standard-2
    os_image: ubuntu2004
queue:
  # highlight-start
  # Use parameter values in the pipeline queue name
  name: '${{parameters.ENVIRONMENT}}-queue'
  scope: project
  # highlight-end
blocks:
    task:
      jobs:
        - name: Using promotion as env. var
          commands:
            # highlight-start
            # Use parameter values inside a job
            - echo $ENVIRONMENT
            - echo $RELEASE
            # highlight-end
version: v1.0
# highlight-next-line
name: '${{parameters.ENVIRONMENT}} deployment of the release: ${{parameters.RELEASE}}'
agent:
  machine:
    type: e1-standard-2
    os_image: ubuntu2004
# highlight-start
queue:
  name: '${{parameters.ENVIRONMENT}}-queue'
  scope: project
# highlight-end
blocks:
  - name: Install
    dependencies: []
    task:
      jobs:
        - name: npm install
          commands:
            # highlight-start
            - echo "Release: $RELEASE"
            - echo "Deploying to $ENVIRONMENT"
            # highlight-end
      # highlight-start
      secrets:
        - name: 'creds-for-${{parameters.ENVIRONMENT}}'
      # highlight-end
```

</TabItem>
</Tabs>

## Environments (deployment targets)

<VideoTutorial title="How to Use Environments" src="https://www.youtube.com/embed/xId2H2wlKx4?si=0IXKyNNUVVjDDvHz" />

Environments provide additional controls over [pipelines](./pipelines). You can limit who and when a pipeline is triggered or define fine-grained secrets and environment variables.

:::note

Environments we are formerly known as "Deployment Targets"

:::

### Overview {#overview-environments}

Environments allow you to tightly control [promotions](#promotions), preventing unauthorized users from starting a critical pipeline. In addition, deployment targets can restrict branches, pull requests, and protect [secrets](./organizations#secrets).

Environments also provide a convenient way to [view the history of your deployments](#view-history).

Configuring a deployment target is a two-step process:

1. Create a deployment target
2. Associate the target with a promotion

### How to create an environment {#create-environment}

Environments can be defined once and used in multiple promotions in a project.

To create an environment, navigate to your Semaphore project and:
1. Go to the **Deployment Targets** tab
2. Press **Create your first Deployment Target**

    <details>
    <summary>Show me</summary>
    <div>
    ![Creating a deployment target](./img/deployment-target-create.jpg)
    </div>
    </details>

3. Fill in the deployment details:
    - Name of the deployment
    - Optional description
    - Optional URL of the deployed application
    - Optional bookmarks
4. Press **Next**

    <details>
    <summary>Show me</summary>
    <div>![Example deployment target](./img/deployment-target-1.jpg)</div>
    </details>

The bookmarks are useful when using [parameterized promotions](#parameters). You can add up to three bookmarks matching the names of the parameters in the promotions. Think of the bookmarks as additional filters available in the deployment history view. 

### Credentials and secrets {#credentials}

Credentials are a restricted type of [secrets](./organizations#secrets) that are only accessible to authorized members of your organization.

In the second part, we can define environment variables and upload files that will be accessible to the promoted pipelines. All information will be encrypted once saved.

Credentials are optional. Go to the next step if you don't need them.

1. Set the environment variable name and value
2. Add more variables as needed
3. Upload a file and set where to put it in the [agent](./pipelines#agents)
4. Add more files as needed
5. Press **Next**

    <details>
    <summary>Show me</summary>
    <div>
    ![Setting up credentials for the deployment target](./img/deployment-target-2.jpg)
    </div>
    </details>

### Granular permissions {#granular-permissions}

<Available plans={['Scaleup']} />

In the "Who can deploy?" section you can define the users and roles that can manually start the promotion. Granular permission is optional. You can go to the next section if you don't need to restrict access to the promotion.

By default, everyone can start the promotion linked to this environment. To restrict access:

1. Select "Allow only particular users to deploy"
2. Optionally, select the roles that can deploy from the list
3. Optionally, select the members of your organization that can deploy
4. Uncheck the "Allow automatic promotions.." option to disallow [automatic promotions](#automatic-promotions)
5. Press **Next**

    <details>
    <summary>Show me</summary>
    <div>
    ![Configuring granular access permissions for the deployment target](./img/deployment-target-3.jpg)
    </div>
    </details>

### Git-based permissions {#git-permissions}

In the fourth part, you can restrict which Git branches and tags are allowed to start a promotion. Here you can also block promotions coming from pull requests. This section is optional.

To restrict Git-based access:
1. Select which branches are enabled for promotions: all, none, or list of allowed branches
2. Select which Git tags are enabled: all, none, or a list of allowed tags
3. Enable or disable pull requests from triggering promotions
4. Press **Next**
5. Press **Create**

    <details>
    <summary>Show me</summary>
    <div>
    ![Setting up Git-based permissions](./img/deployment-target-4.jpg)
    </div>
    </details>

Once done, you can see the created environment in the **Deployments** tab.

:::tip Exact match or regular expressions?

Branches and tags can be matched in two ways:
- **Exact match**: strings must match exactly
- **Regex match**: strings are matched using Perl-compatible regular expressions. See the [Erlang re module documentation](https://www.erlang.org/doc/man/re.html) to see more details on the syntax

:::

### How to view deployment history {#view-history}

The **Deployment** tab allows you to track your previous deployments. In this tab, you can see:

- how started the last deployment
- which commit was used
- what workflow does the deployment belong to

You can also stop a running pipeline or rerun a promotion if you have the right to do so.

![Deployment history](./img/deployment-history-1.jpg)

Press **View full history** to see the latest deployments in reverse chronological order.

![Deployment history details](./img/deployment-history-2.jpg)

Use **Newer** and **Older** buttons to navigate to other pages. You can also jump to a specific date.

You can also filter deployments by:
- **Type**: view branches, tags, pull requests, or everything
- **Author**: everyone or just you
- **Origin**: branch, tag, or pull request
- **Promotion parameters**: these are the [bookmarks](#create-environment) added to the environment target

To filter using promotion parameters, type the value of the parameter and press Enter. This feature is useful when you have [parameterized promotions](#promotions).

![Deployment history filtered by parameters](./img/deployment-history-3.jpg)

### How to target promotions {#promotion-target}

Once you have created at least one environment, you can associate it with a [promotion](#promotions). This creates a targeted promotion.

![Deployment target created](./img/deployment-target-created.jpg)

<Tabs groupId="editor-yaml">
<TabItem value="editor" label="Editor">

Press **Edit workflow** to open the visual editor and:
1. Select or create a promotion
2. In **Deployment target**, select the target from the dropdown list

Select **No target** to remove the association between the deployment target and the promotion.
![Associating a deployment target with a promotion](./img/promotion-target.jpg)

</TabItem>
<TabItem value="yaml" label="YAML">

1. Edit the pipeline file with the promotion you wish to target
2. Add a `deployment_target` key to the promotion. The value is the name of the environment  you wish to associate with this promotion

Delete `deployment_target` to remove the association between the environment and the promotion.

```yaml title=".semaphore/semaphore.yml"
# ...
promotions:
  - name: Promotion 1
    pipeline_file: pipeline_4.yml
    # highlight-next-line
    deployment_target: Production
```

</TabItem>
</Tabs>

### Promoting environments {#targeted-promotions}

Promotions with attached environment show a lock icon next to the promotion button.  The icon will be unlocked if you have permission to start the promotion or locked if you don't.

<Tabs groupId="targeted-promotions">
<TabItem value="unlocked" label="Unlocked promotion">

The promotion is unlocked. Press the promotion button to start the next pipeline.
![Promotion is unlocked](./img/promotion-unlocked.jpg)

</TabItem>
<TabItem value="locked" label="Locked promotion">

The promotion is unlocked. The button is grayed out and you can't start the next pipeline.
![Promotion is locked](./img/promotion-locked.jpg)

</TabItem>
</Tabs>

:::warning

Anyone with write access to the repository can edit the pipeline file and remove the environment in the promotion.

:::

### Help! I can't start a promotion {#promotion-debug}

Once a [promotion](#promotions) is targeted, you may be locked out from starting it. The most common reasons that a promotion appears as blocked are:

- you don't have the correct permissions to deploy to the bound [environment](#overview-environments)
- you are on a Git branch, tag, or pull request that is not allowed
- you are not logged in or you are viewing a build of a public project
- the environment is deactivated or deleted

### Promoting environments via API {#promotion-api}

You can also use the _Public API (alpha)_ to trigger promotions. If promotion is forbidden by the environment, you will receive an `HTTP 400 Bad Request` response with a reason in the body.
