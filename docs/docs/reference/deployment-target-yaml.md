---
description: Deployment Targets YAML reference
---

# Deployment Targets YAML reference

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Available from '@site/src/components/Available';
import VideoTutorial from '@site/src/components/VideoTutorial';


The Deployment Targets YAML reference explains the YAML grammar used for
configuring deployment targets. These targets enable the enforcement of strict
conditions for triggering pipeline promotions. Those conditions allow you to
restrict **who** (person or a role) can trigger a promotion and on
**which git reference** (branch, tag, and/or pull request).

By integrating promotions with Deployment Targets, you can establish secure
Continuous Deployment pipelines that seamlessly align with your current setup.

A deployment target is created within a project and exclusively employed within
that project for multiple promotions.

## Properties

### apiVersion

The `apiVersion` property indicates the version of the YAML grammar employed
within the current YAML file. Different versions may introduce varying features.

Here is a list of valid values for the `apiVersion` property: `v1alpha`.

### kind

The `kind` property specifies the purpose of a YAML file. For YAML files
intended to define deployment targets, the value of the `kind` property should
be `DeploymentTarget`.

Here is a list of valid values for the `kind` property: `DeploymentTarget`.

### metadata

The `metadata` property defines the metadata for a Deployment Target YAML file,
supporting the following properties: `id`, `name`, `project_id`, `organization_id`,
`created_by`, `created_at`, `updated_by`, `updated_at`, `description` and `url`
properties.

#### id

The `id` property is an automatically generated unique identifier assigned by
Semaphore 2.0 to each deployment target. It should not be modified.

#### name

The `name` property is a string that represents the name of the deployment target.
This name is displayed when executing the `sem get dt -p [project-name]` command.
The name should only consist of alphanumerical characters, dashes, underscores, and dots.

#### project_id

The `project_id` property corresponds to the UUID (Universally Unique Identifier) of
the project associated with the deployment target. It should not be modified.

#### organization_id

The `organization_id` property represents the UUID of the organization linked to
the deployment target. It should not be modified.

#### created_by

The `created_by` property contains the UUID of the user who created the deployment
target. It should not be modified.

#### created_at

The `created_at` property indicates the UTC when the deployment target was created.
It should not be modified.

#### updated_by

The `updated_by` property stores the UUID of the user who last updated the deployment
target. It should not be modified.

#### updated_at

The `updated_at` property denotes the UTC when the deployment target was last
updated. It should not be modified.

#### description

The `description` property is a string that describes the deployment target.

#### url

The `url` property is a string containing the URL associated with the deployment target.

### spec

The `spec` property contains a list of deployment target properties.

#### state

The `state` property indicates the state of the deployment target, which can be
one of the following values: `SYNCING`, `USABLE`, `UNUSABLE`, or `CORDONED`. It should
not be modified.

#### state_message

The `state_message` property provides an additional message associated with
the deployment target's state. It should not be modified.

#### subject_rules

The `subject_rules` property holds a list of subject rules that determine who
can trigger promotions when the deployment target is associated with them. Each
rule must include the `type`. Depending on the rule `type`, the `subject_id`
or `git_login` may also be required.

##### type

The `type` property of a subject rule can have one of the following values: `ANY`,
`USER`, `ROLE`, or `AUTO`. Each value has a specific meaning:

- `ANY`: This rule allows any user to trigger the promotion. There are no
restrictions on who can initiate the promotion process.

- `USER`: This rule restricts the promotion to specified users who must be assigned
to the project. Only these users have the authority to trigger a promotion.

- `ROLE`: This rule limits the promotion to specific user roles defined within
the project. Only users assigned to these roles can trigger a promotion.

- `AUTO`: This rule configures the behavior of auto-promotions for the deployment
target. If this rule is not present, auto-promotions will not start even if all
the conditions are met.

Please note that these values determine the authorization requirements for
triggering promotions based on the subject rule. Choose the appropriate `type`
value based on your desired promotion workflow and access control needs.

##### subject_id

The `subject_id` property is required for `USER` and `ROLE` rule types.
For `USER`, the `subject_id` contains the UUID of the user. If the rule type is `ROLE`,
it should be the name of the project role (e.g. `Admin`, `Contributor`).

##### git_login

The `git_login` property is used only for `USER` rule types when specifying a user
by their git handle (e.g. GitHub login) instead of their UUID.

#### object_rules

The `object_rules` property contains a list of object rules that define which branches,
tags, or pull requests can trigger promotions. Each rule must include the `type`,
`match_mode`, and `pattern` properties.

##### type

The `type` property of an object rule can have the following values: `BRANCH`, `TAG`,
or `PR`.

##### match_mode

The `match_mode` property plays a crucial role in determining how the pattern matches
the name of the git reference, such as a branch or tag. There are three options available
for match_mode: `ALL`, `EXACT`, or `REGEX`. However, when it comes to object rules of
type `PR`, there is no requirement to specify the `match_mode`. This is because any
pull request will automatically trigger the promotion if there is an object rule
with the `type` set to `PR`.

##### pattern

The `pattern` property is a string used to match the name of the git reference specified
by the rule type (branch, tag, or pull request). The pattern is only used for `EXACT`
and `REGEX` match modes. In `EXACT` mode, an exact string comparison is performed between
the branch/tag name and the pattern. In `REGEX` mode, the pattern is treated as a regular
expression to match the reference name. The regular expressions are Perl-compatible, and
you can find more information about the syntax in
the [the Erlang re module documentation](https://www.erlang.org/doc/man/re.html)

#### active

The `active` property is a boolean value indicating whether the deployment target is active
or inactive. It should not be modified.

#### bookmark_parameter1, bookmark_parameter2, bookmark_parameter3

The properties `bookmark_parameter1`, `bookmark_parameter2`, and `bookmark_parameter3` are
string values that represent the names of the promotion parameters. These parameters hold
values that can be used to filter deployments in the deployment history.

Let's consider an example: suppose you create a parameterized promotion with an `environment`
parameter that can take values like `staging` and `production`. If you connect this
promotion to a deployment target where `bookmark_parameter1` is set to `environment`,
it enables you to filter the deployment history and display only those promotions where,
for instance, `staging` was passed as the value for the parameter. This feature allows you
to conveniently track deployments based on specific parameter values.

### env_vars

The `env_vars` property is a list of environment variables defined for the deployment target.
Each environment variable is defined by its `name` and `value`.

#### name

The `name` property represents the name of the environment variable.

#### value

The `value` property represents the value of the environment variable. If
the response includes the suffix [md5], this indicates that a hashed value has
been received for security reasons.

### files

The `files` property is a list of files defined for the deployment target.
Each file is defined by its path and content.

#### path

The `path` property specifies the path on the machine where the file will
be created.

#### content

The `content` property contains the base64-encoded content of the file. If
the response includes the suffix [md5], this indicates that a hashed value has
been received for security reasons.

#### source

The `source` property represents the path on your host machine of the file
you want to assign to the deployment target. It is only used when creating
or updating the files property.


## An example

The following YAML code provides an example of a deployment target
as returned by the `sem get dt 0d4d4184-c80a-4cbb-acdd-b75e3a03f795` command
(using the deployment target UUID) or the `sem get dt mytest -i a426b4db-1919-483d-926d-06ba1320b209`
command (using the deployment target name and project UUID):

``` bash
$ sem get dt my-dt -p my-project
apiVersion: v1alpha
kind: DeploymentTarget
metadata:
  id: 0d4d4184-c80a-4cbb-acdd-b75e3a03f795
  name: my-dt
  project_id: a426b4db-1919-483d-926d-06ba1320b209
  organization_id: 7304b7f9-7482-46d4-9b95-3cd5a6ef2e6f
  created_by: 02984c87-efe8-4ea1-bcac-9511a34a3df3
  updated_by: 02984c87-efe8-4ea1-bcac-9511a34a3df3
  created_at: 2023-06-09T05:46:23Z
  updated_at: 2023-06-09T07:46:49Z
  description: new description
  url: newurl321.zyx
spec:
  state: CORDONED
  state_message: ""
  subject_rules:
  - type: ROLE
    subject_id: Contributor
  - type: USER
    subject_id: 02984c87-efe8-03a2-bcac-9511a34a3df3
    git_login: example_login_24ac3
  object_rules:
  - type: BRANCH
    match_mode: EXACT
    pattern: main
  - type: TAG
    match_mode: ALL
    pattern: ""
  - type: PR
    match_mode: REGEX
    pattern: .*[feat].*
  active: false
  bookmark_parameter1: b1
  bookmark_parameter2: ""
  bookmark_parameter3: ""
  env_vars:
  - name: X
    value: ef836f1a81645fd778adb189377aed1d [md5]
  files:
  - path: /home/dev/app/my.conf
    content: 0c2606ba4ac1ee72b5cc6f91648bf28c [md5]
    source: ""

```

You can find out how to create new deployment targets by visiting our
[Deployment Targets](/essentials/deployment-targets),
and [sem command line tool](/reference/sem-command-line-tool#working-with-deployment-targets)
reference documentation.

## See Also
