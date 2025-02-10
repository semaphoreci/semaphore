---
description: Semaphore Public API
---

# Semaphore API

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Available from '@site/src/components/Available';
import VideoTutorial from '@site/src/components/VideoTutorial';
import Steps from '@site/src/components/Steps';
import FeatureNotAvailable from '@site/src/components/FeatureNotAvailable';

This document describes all the resources that make up Semaphore API version `v1alpha`. If you have any problems or requests please [contact support](mailto:support@semaphoreci.com).

The root of the API can be found at:

- `https://<semaphore-server-url>/api/v1alpha`

For example: `https://semaphore.example.com/api/v1alpha`

## Overview

Every API request and response must satisfy the following constraints:

- All requests must use HTTPS.
- All data is sent and received as JSON.
- Blank fields are included as `null` instead of being omitted.
- Timestamps are in different formats due to the historical circumstances of how these public APIs appeared. In the next release of the API, they will be standardized. Currently, there are the following formats:
  - Unixtime Epoch time: `"create_time": "1571083003"`
  - Unixtime Epoch time with nanoseconds: `"created_at": {"seconds": 1571063401, "nanos": 559492000}`
  - Custom format: `YYYY-MM-DD HH:MM:SS.ffffffZ`, e.g.,`"2019-10-14 12:11:47.824128Z"`
  - All API requests must set the User-Agent to `SemaphoreCI v2.0 Client`.

### Authentication

All API requests require authentication. To authenticate, you need an API Token. You can find your token by visiting your [account settings](https://me.semaphore.example.com/account).

Your API Token must be sent as an HTTP header in all requests, as shown below:

```shell
curl -H "Authorization: Token {api_token}" "https://<semaphore-server-url>/api/v1alpha/{resource_name}"
```

### Errors

You can receive several errors as a response to an API request

| Error Message | Meaning |
|--|--|
| `HTTP/1.1 401 Unauthorized`| Failure to authenticate|
| `HTTP/1.1 404 Not Found` |  Resource doesn't exist or is not visible to user |

## Pagination

Every request that that returns more than 30 items will be paginated. To avoid this, you should form calls with `link` header values instead of constructing your own URLs.

A `link` header includes information about pagination, as shown below:

```text
link: <http://<semaphore-server-url>/api/v1alpha/?PAGE_PARAMS>; rel="first",
      <http://<semaphore-server-url/api/orgs?PAGE_PARAMS>; rel="next"
```

The possible `rel` values are:

- **next** - The link for the next page of results.
- **prev** - The link for the previous page of results.
- **first** - The link for the first page of results.

## Stability

There are two types of changes:

- Compatible and emergency changes may be made with no advanced notice
- Disruptive changes will not occur without advanced notice. In the event that a disruptive change is needed, a new major version will be developed
- Emergency changes happen without notice. We will, however, try to notify users as best as possible

## Compatible changes

Small in scope and unlikely to break or change semantics of existing methods.

- Adding nested resources, methods, and attributes.
- Change of documentation.
- Change of undocumented behavior.

### Disruptive changes

May have a larger impact and effort will be made to provide migration paths as needed.

- Changing semantics of existing methods.
- Removing resources, methods, and attributes.

### Emergency change

- May have larger impact, but is unavoidable due to legal compliance, security vulnerabilities, or violation of specification.

## Workflows

### Run workflow

Request:

```text
POST <semaphore-server-url>/api/v1alpha/plumber-workflows
```

Parameters:

- `project_id` (**required**) - ID of a project.
- `reference` (**required**) - git reference for the desired branch, tag, or pull request--e.g. *refs/heads/master*, *refs/tags/v1.0*, or *refs/pull/123*.
- `commit_sha` (*optional*) - Commit sha of the desired commit.
- `pipeline_file` (*optional*) - The path within the repository to the YAML file that contains the pipeline definition. The default value is *.semaphore/semaphore.yml*.

Response:

```json
HTTP status: 200

{
  "workflow_id": "32a689e0-9082-4c5b-a648-bb3dc645452d",
  "pipeline_id": "2abeb1a9-eb4a-4834-84b8-cb7806aec063",
  "hook_id": "ff7d57ef-92c5-4fcd-9c0c-6ae9e24bfcec"
}
```

Example:

```shell
curl -i -H "Authorization: Token {api_token}" \
     -d "project_id={project_id}&reference={reference}" \
     -X POST  "https://<semaphore-server-url>/api/v1alpha/plumber-workflows"
```

### Describe a workflow

Request:

```text
GET <semaphore-server-url>/api/v1alpha/plumber-workflows/:workflow_id
```

Parameters:

- `workflow_id` (**required**) - ID of a workflow.

Response:

```json
HTTP status: 200

{
  "workflow": {
    "wf_id": "72c434c4-6589-493d-97cd-22f46681c893",
    "requester_id": "d32141ca-1552-4370-b0d4-4030aa9cf524",
    "project_id": "adaede30-9de5-471f-9f95-b7d437170f10",
    "initial_ppl_id": "f86b3b5e-c3de-4f77-849f-39e080374ce4",
    "hook_id": "6d7ed9d3-3047-4d5e-9b27-f0b68b228409",
    "created_at": {
      "seconds": 1571063401,
      "nanos": 559492000
    },
    "commit_sha": "6fe03f118b7aa7b8ea1a983c3faee4f8b54213a5",
    "branch_name": "master",
    "branch_id": "e8a4ad3b-4951-4520-aed7-6292ebd70076"
  }
}
```

Example:

```shell
curl -i -H "Authorization: Token {api_token}" \
     "https://<semaphore-server-url>/api/v1alpha/plumber-workflows/:workflow_id"
```

### List workflows

Request:

```text
GET https://<semaphore-server-url>/api/v1alpha/plumber-workflows?project_id=:project_id
```

Parameters:

- `project_id` (**required**) - ID of a project.
- `branch_name` (*optional*) - Name of branch (used as a filter).

Response:

```json
HTTP status: 200

[
  {
    "wf_id": "a99a75c3-f921-4fa9-a43f-69b2cede6274",
    "requester_id": "fcd7fe34-f73f-4686-821b-ce02cb970b22",
    "project_id": "c394d20b-b3c6-4c90-b743-a9a65fa95a78",
    "initial_ppl_id": "e1a678ba-ed2d-412f-b350-7333579bb0d3",
    "hook_id": "4a1d3cf7-c3d5-42ec-aa22-c31dffa9f05d",
    "created_at": {
      "seconds": 1570792145,
      "nanos": 544028000
    },
    "commit_sha": "cac345d0a7d425e23e18f7be33e9b441f95c65f5",
    "branch_name": "gallery",
    "branch_id": "70f52bdd-2dab-427a-81b1-d2999bc8c2a8"
  },
  {
    "wf_id": "e08a7a60-413c-4224-a208-9c67302d3ba1",
    "requester_id": "fcd7fe34-f73f-4686-821b-ce02cb970b22",
    "project_id": "c394d20b-b3c6-4c90-b743-a9a65fa95a78",
    "initial_ppl_id": "64dc1837-aaad-4907-a7db-aedfe091a987",
    "hook_id": "84de6482-8f5b-4f31-996f-528b6d8fa771",
    "created_at": {
      "seconds": 1570715702,
      "nanos": 345824000
    },
    "commit_sha": "aa292a7a8de08bc6246de697b84d2531fc64a43b",
    "branch_name": "gallery",
    "branch_id": "70f52bdd-2dab-427a-81b1-d2999bc8c2a8"
  }
]
```

Example:

```shell
curl -i -H "Authorization: Token {api_token}" \
     "https://<semaphore-server-url>/api/v1alpha/plumber-workflows\?project_id\=:project_id"
```

### Rerun a workflow

```text
POST <semaphore-server-url>/api/v1alpha/plumber-workflows/:workflow_id/reschedule?request_token=:request_token
```

Parameters:

- `workflow_id` (**required**) - ID of the workflow that you want to rerun.
- `request_token` (**required**) - Idempotency token (can be any string).

Response:

```json
HTTP status: 200

{
  "wf_id": "965d3c3d-bbe6-4ff7-b62a-1ff51a92bdc0",
  "ppl_id": "6cf4569c-f76c-4dea-b293-3e4282ba1153"
}
```

Example:

```shell
curl -i -X POST -H "Authorization: Token {api_token}" \
        "https://<semaphore-server-url>/api/v1alpha/plumber-workflows/:workflow_id/reschedule\?request_token\=:request_token"
```

### Stop a workflow

```text
POST <semaphore-server-url>/api/v1alpha/plumber-workflows/:workflow_id/terminate
```

Parameters:

- `workflow_id` (**required**) - ID of the workflow that you want to stop.

Response:

```text
HTTP status: 200
```

Example:

```shell
curl -i -X POST -H "Authorization: Token {api_token}" \
        "https://<semaphore-server-url>/api/v1alpha/plumber-workflows/:workflow_id/terminate"
```

## Pipelines

### Describe a pipeline

```text
GET <semaphore-server-url>/api/v1alpha/pipelines/:pipeline_id
```

Parameters:

- `pipeline_id` (**required**) - ID of a pipeline.
- `detailed` (*optional*) - Default: `false`, which includes all information about all blocks and jobs. This option is much more expensive—if you are only interested in the status of a pipeline, don't set detailed to `true`.

Response:

```json
HTTP status: 200

{
  "pipeline": {
    "yaml_file_name": "semaphore.yml",
    "working_directory": ".semaphore",
    "wf_id": "965d3c3d-bbe6-4ff7-b62a-1ff51a92bdc0",
    "state": "done",
    "result": "passed",
    "name": "First pipeline example",
    "branch_name": "master",
    "created_at": "2019-10-14 18:31:17.293456Z"
  },
  "blocks": []
}
```

Response with `detailed=true`:

```json
HTTP status: 200

{
  "pipeline": {
    "yaml_file_name": "semaphore.yml",
    "working_directory": ".semaphore",
    "wf_id": "965d3c3d-bbe6-4ff7-b62a-1ff51a92bdc0",
    "state": "done",
    "result": "passed",
    "name": "First pipeline example",
    "branch_name": "master",
    "created_at": "2019-10-14 18:31:17.293456Z"
  },
  "blocks": [
    {
      "state": "done",
      "result": "passed",
      "name": "RSpec",
      "jobs": [
        {
          "status": "FINISHED",
          "result": "PASSED",
          "name": "Push results - 2/11",
          "job_id": "31094182-03bf-4e39-acfe-ed1058d7eb6c"
        }
      ]
    }
  ]
}
```

Example:

```shell
curl -i -H "Authorization: Token {api_token}" \
     "https://<semaphore-server-url>/api/v1alpha/pipelines/:pipeline_id"
```

### List pipelines

```text
GET <semaphore-server-url>/api/v1alpha/pipelines?project_id=:project_id
```

Parameters:

- `project_id` (**required, optional if** `wf_id` **is present**) - ID of a project.
- `wf_id` (**required, optional if** `project_id` **is present**) - ID of a workflow.
- `branch_name` (*optional*) - Name of a branch.
- `yml_file_path` (*optional*) - YML file that contains the pipeline definition.
- `created_after` (*optional*) - Only pipelines created after this Unix timestamp will be returned.
- `created_before` (*optional*) - Only pipelines created before this Unix timestamp will be returned.
- `done_after` (*optional*) - Only pipelines finished after this Unix timestamp will be returned.
- `done_before` (*optional*) - Only pipelines finished before this Unix timestamp will be returned.

Response:

```json
HTTP status: 200

[
  {
    "yaml_file_name": "semaphore.yml",
    "working_directory": ".semaphore",
    "wf_id": "484e263a-424a-4820-bff0-bba436c54042",
    "state": "DONE",
    "result": "FAILED",
    "name": "Pipeline",
    "branch_name": "ms/another-test-branch",
    "created_at": {
      "seconds": 1571076843,
      "nanos": 537730000
    }
  }
]
```

Example:

```shell
curl -i -H "Authorization: Token {api_token}" \
     "https://<semaphore-server-url>/api/v1alpha/pipelines\?project_id\=:project_id"
```

### Stop a pipeline

```text
PATCH <semaphore-server-url>/api/v1alpha/pipelines/:pipeline_id
```

Parameters:

- `pipeline_id` (**required**) - ID of a pipeline.
- `terminate_request` (**required**) - Must be set to `true`.

Response:

```text
HTTP status: 200
```

Example:

```shell
curl -i -X PATCH  -H "Authorization: Token {api_token}" \
     --header "Accept: application/json"  --header "Content-Type: application/json" \
     --data '{"terminate_request": true}' \
     "https://<semaphore-server-url>/api/v1alpha/pipelines/:pipeline_id"
```

### Validate a pipeline YAML

```text
POST <semaphore-server-url>/api/v1alpha/yaml
```

Parameters:

- `yaml_definition` (**required**) - The YAML document for the pipeline.

Response:

```json
HTTP status: 200
{"pipeline_id":"","message":"YAML definition is valid."}
```

Example:

```shell
curl -i -X POST \
        -H "Authorization: Token {api_token}" \
        -H "Content-Type: application/json" \
        --data "{\"yaml_definition\": \"$(cat .semaphore/semaphore.yml | sed 's/\"/\\\"/g')\"}" \
        "https://<semaphore-server-url>/api/v1alpha/yaml"
```

## Promotions

<FeatureNotAvailable/>

## Tasks {#tasks}

[Tasks](../using-semaphore/tasks) can be triggered via the API.

To trigger a task with its default parameters:

```shell
curl -X POST --location "https://<semaphore-server-url>/api/v1alpha/tasks/{task_id}/run_now" \
    -H "Authorization: Token {api_token}" \
    -H "Content-Type: application/json"
```

You can pass any of the following options when you trigger the task:

- `branch`: (string) specify the branch where the task runs
- `pipeline_file`: (string) specify the [pipeline file](../using-semaphore/pipelines#yaml-path) to execute

The following example uses all these options:

```shell
curl -X POST --location "https://<semaphore-server-url>/api/v1alpha/tasks/{task_id}/run_now" \
    -H "Authorization: Token {api_token}" \
    -H "Content-Type: application/json" \
    -d $'{
    "branch": "master",
    "pipeline_file": ".semaphore/semaphore.yml",
    "parameters": {
        "PARAM_NAME": "PARAM_VALUE",
        "PARAM_NAME_2": "PARAM_VALUE_2"
    }
}'
```

## Jobs

### Describe a job

```text
GET <semaphore-server-url>/api/v1alpha/jobs/:job_id
```

Response:

```json
HTTP status: 200

{
  "metadata": {
    "name": "Job #1",
    "id": "bc8826bd-dbb2-4d28-8c90-7f370ce478fe",
    "create_time": "1571083003",
    "start_time": "1571083006",
    "finish_time": "1571083507"
  },
  "status": {
    "result": "STOPPED",
    "state": "FINISHED"
  }
}
```

Example:

```shell
curl -i -H "Authorization: Token {api_token}" \
     "https://<semaphore-server-url>/api/v1alpha/jobs/:job_id"
```

### Stop a job

```text
POST <semaphore-server-url>/api/v1alpha/jobs/:job_id/stop
```

Response:

```json
HTTP status: 200
```

Example:

```shell
curl -i -X POST -H "Authorization: Token {api_token}" \
     "https://<semaphore-server-url>/api/v1alpha/jobs/:job_id/stop"
```

### Get job logs

:::note

Instead of using the API to fetch job logs, you can also use [Semaphore CLI tool](./semaphore-cli#sem-logs) to perform the same action.

:::

```text
GET https://<semaphore-server-url>/api/v1alpha/logs/:job_id
```

Response:

```json
HTTP status: 200

{
  "events": [
    {
      "event": "job_started",
      "timestamp": 1719979253
    },
    {
      "event": "cmd_started",
      "timestamp": 1719979253,
      "directive": "Exporting environment variables"
    },
    {
      "event": "cmd_output",
      "timestamp": 1719979253,
      "output": "Exporting CI\n"
    },
    {
      "event": "cmd_output",
      "timestamp": 1719979253,
      "output": "Exporting DISPLAY\n"
    },
    {
      "event": "cmd_output",
      "timestamp": 1719979253,
      "output": "Exporting PAGER\n"
    },
    {
      "event": "cmd_finished",
      "timestamp": 1719979255,
      "directive": "Exporting environment variables",
      "exit_code": 0,
      "started_at": 1719979255,
      "finished_at": 1719979255
    },
    {
      "event": "job_finished",
      "timestamp": 1719979255,
      "result": "passed"
    }
  ]
}
```

Example:

```shell
curl -H "Authorization: Token {api_token}" \
     "https://<semaphore-server-url>/api/v1alpha/logs/:job_id"
```

### Self-hosted agent types

#### Listing agent types

```text
GET <semaphore-server-url>/api/v1alpha/self_hosted_agent_types
```

Response:

```json
HTTP status: 200

{
  "agent_types": [
    {
      "status": {
        "total_agent_count": 0
      },
      "spec": {
        "agent_name_settings": {
          "assignment_origin": "assignment_origin_agent",
          "release_after": 0
        }
      },
      "metadata": {
        "update_time": 1644963451,
        "name": "s1-aws-small",
        "create_time": 1632129338
      }
    },
    {
      "status": {
        "total_agent_count": 0
      },
      "spec": {
        "agent_name_settings": {
          "assignment_origin": "assignment_origin_aws_sts",
          "release_after": 0,
          "aws": {
            "account_id": "1234567890",
            "role_name_patterns": "role1,role2"
          }
        }
      },
      "metadata": {
        "update_time": 1641302626,
        "name": "s1-aws-large",
        "create_time": 1638470284
      }
    }
  ]
}
```

Example:

```shell
curl -i \
  -H "Authorization: Token {api_token}" \
  "https://<semaphore-server-url>/api/v1alpha/self_hosted_agent_types"
```

#### Create an agent type

```text
POST <semaphore-server-url>/api/v1alpha/self_hosted_agent_types
```

Parameters:

- `metadata.name` (**required**) - the name of the agent type to be created.
- `spec.agent_name_settings.assignment_origin` (*optional*) - the origin of the agent name assignment during its registration. The possible values are: `assignment_origin_agent` (*default*) and `assignment_origin_aws_sts`.
- `spec.agent_name_settings.release_after` (*optional*) - how long to hold the agent name after its disconnection, not allowing other agents to register with its name. By default, this is 0.
- `spec.agent_name_settings.aws.account_id` (**required** if `assignment_origin_aws_sts` is used).
- `spec.agent_name_settings.aws.role_name_patterns` (**required** if `assignment_origin_aws_sts` is used) - comma-separated list of AWS role names. Wildcards (*) can be used too.

Response:

```json
HTTP status: 200

{
  "metadata": {
    "update_time": 1668626650,
    "name": "s1-aws-small",
    "create_time": 1668626650
  },
  "spec": {
    "agent_name_settings": {
      "assignment_origin": "assignment_origin_aws_sts",
      "release_after": 0,
      "aws": {
        "account_id": "1234567890",
        "role_name_patterns": "role1,role2,role3*"
      }
    }
  },
  "status": {
    "total_agent_count": 0,
    "registration_token": "..."
  }
}
```

Example:

```shell
curl -i \
  -H "Authorization: Token {api_token}" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  --data '{"metadata": {"name": "s1-aws-small"}, "spec": {"agent_name_settings": {"assignment_origin": "assignment_origin_agent", "release_after": 0}}}' \
  "https://<semaphore-server-url>/api/v1alpha/self_hosted_agent_types"
```

#### Update an agent type

```text
PATCH <semaphore-server-url>/api/v1alpha/self_hosted_agent_types/:agent_type_name
```

Parameters:

- `agent_type_name` (**required**) - the name of the agent type to describe.

Request body:

The request body should be a JSON object, encapsulating details about the agent type to be updated. The available fields are the same as those for creating an agent type.

Response:

```json
HTTP status: 200

{
  "metadata": {
    "update_time": 1668626650,
    "name": "s1-aws-small",
    "create_time": 1668626650
  },
  "spec": {
    "agent_name_settings": {
      "assignment_origin": "assignment_origin_aws_sts",
      "release_after": 0,
      "aws": {
        "account_id": "1234567890",
        "role_name_patterns": "role1,role2,role3*"
      }
    }
  },
  "status": {
    "total_agent_count": 0
  }
}
```

Example:

```shell
curl -X PATCH -i \
  -H "Authorization: Token {api_token}" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  --data '{"metadata": {"name": "s1-aws-small"}, "spec": {"agent_name_settings": {"assignment_origin": "assignment_origin_agent", "release_after": 0}}}' \
  "https://<semaphore-server-url>/api/v1alpha/self_hosted_agent_types/s1-aws-small"
```

#### Describe an agent type

```text
GET <semaphore-server-url>/api/v1alpha/self_hosted_agent_types/:agent_type_name
```

Parameters:

- `agent_type_name` (**required**) - the name of the agent type to describe.

Response:

```json
HTTP status: 200

{
  "status": {
    "total_agent_count": 0
  },
  "spec": {
    "agent_name_settings": {
      "assignment_origin": "assignment_origin_agent",
      "release_after": 0
    }
  },
  "metadata": {
    "update_time": 1644963451,
    "name": "s1-aws-small",
    "create_time": 1632129338
  }
}
```

Example:

```shell
curl -i \
  -H "Authorization: Token {api_token}" \
  "https://<semaphore-server-url>/api/v1alpha/self_hosted_agent_types/s1-aws-small"
```

#### Delete an agent type

```text
DELETE <semaphore-server-url>/api/v1alpha/self_hosted_agent_types/:agent_type_name
```

Parameters:

- `agent_type_name` (**required**) - the name of the agent type to delete.

Response:

```json
HTTP status: 200
{}
```

Example:

```shell
curl -i -X DELETE \
  -H "Authorization: Token {api_token}" \
  "https://<semaphore-server-url>/api/v1alpha/self_hosted_agent_types/s1-aws-small"
```

#### Disable agents for an agent type

```text
POST <semaphore-server-url>/api/v1alpha/self_hosted_agent_types/:agent_type_name/disable_all
```

Parameters:

- `agent_type_name` (**required**) - the name of the agent type to disable agents for.
- `only_idle` (*optional*) - a boolean flag that controls whether all agents are disabled or only idle ones. By default, this is set to `true`.

Response:

```json
HTTP status: 200
{}
```

Example:

```shell
curl -i \
  -H "Authorization: Token {api_token}" \
  -d 'only_idle=false' \
  "https://<semaphore-server-url>/api/v1alpha/self_hosted_agent_types/s1-aws-small/disable_all"
```

### Self-hosted agents

#### List agents for an agent type

```text
GET <semaphore-server-url>/api/v1alpha/agents?agent_type=:agent_type&page_size=:page_size&cursor=:cursor
```

Parameters:

- `agent_type` (*optional*) - the name of the agent type to filter for. If not specified, agents for all agent types will be returned.
- `page_size` (*optional*) - the number of agents to return per page. By default, this is 200. If the current number of agents is more than the page size, the response will contain a non-empty `cursor` field.
- `cursor` (*optional*) - a cursor used to return agents for the next page.

Response:

```json
HTTP status: 200

{
  "agents": [
    {
      "status": {
        "state": "waiting_for_job"
      },
      "metadata": {
        "version": "v2.2.6",
        "type": "s1-my-type",
        "pid": 14,
        "os": "Ubuntu 20.04.6 LTS",
        "name": "JE1wNRR53A9IORQTMQhb",
        "ip_address": "XXX.XXX.XXX.XXX",
        "hostname": "myhost",
        "connected_at": 1686917254,
        "arch": "x86"
      }
    },
    {
      "status": {
        "state": "waiting_for_job"
      },
      "metadata": {
        "version": "v2.2.6",
        "type": "s1-my-type",
        "pid": 14,
        "os": "Ubuntu 20.04.6 LTS",
        "name": "tE77rxu2gHy2clIe4tHV",
        "ip_address": "XXX.XXX.XXX.XXX",
        "hostname": "myhost",
        "connected_at": 1686917261,
        "arch": "x86"
      }
    }
  ],
  "cursor": ""
}
```

Example:

```shell
curl -i \
  -H "Authorization: Token {api_token}" \
  "https://<semaphore-server-url>/api/v1alpha/agents"
```

### Describe an agent

```text
GET <semaphore-server-url>/api/v1alpha/agents/:agent_name
```

Parameters:

- `agent_name` (**required**) - the name of the agent to describe.

Response:

```json
HTTP status: 200

{
  "status": {
    "state": "waiting_for_job"
  },
  "metadata": {
    "version": "v2.2.6",
    "type": "s1-my-type",
    "pid": 14,
    "os": "Ubuntu 20.04.6 LTS",
    "name": "tE77rxu2gHy2clIe4tHV",
    "ip_address": "XXX.XXX.XXX.XXX",
    "hostname": "myhost",
    "connected_at": 1686917261,
    "arch": "x86"
  }
}
```

Example:

```shell
curl -i \
  -H "Authorization: Token {api_token}" \
  "https://<semaphore-server-url>/api/v1alpha/agents/{agent_name}"
```

## Deployment targets

<FeatureNotAvailable/>

## Artifact retention policies

### Configure retention policy

This API endpoint allows you to configure the artifact retention policy for a project with the given UUID.

By default, artifacts are persisted and never automatically deleted. The artifact retention policy allows you to configure the lifetime of artifacts in your projects.

```text
POST <semaphore-server-url>/api/v1alpha/artifacts_retention_policies
```

Request Body:

The request body should be a JSON object, encapsulating details about the artifact retention policies to be configured. The available fields are as follows:

- `project_id` (**required**) - UUID of the project.
- `project_level_retention_policies` (*optional*) - List of retention rules for project-level artifacts.
- `workflow_level_retention_policies` (*optional*) - List of retention rules for workflow-level artifacts.
- `job_level_retention_policies` (*optional*) - List of retention rules for job-level artifacts.

At least one of the `project_level_retention_policies`, `workflow_level_retention_policies`, and `job_level_retention_policies` lists needs to contain valid list items for a request to be valid.

The list items for each of the retention policy fields from above should be JSON objects with the following properties:

- `selector` (**required**) - a double-star glob pattern used for identifying the artifacts paths.
- `age` (**required**) - the time after which the artifacts on the path from the `selector` field should be automatically deleted. Values should consist of a number from 1 to 12 followed by a space and one of the following: week(s), month(s), or year(s). Examples: 1 week, 2 weeks, 3 months, 4 years.

When evaluating retention policies for an artifact on a particular path, the system will iterate through the list of the policy rules and apply the first one with a selector that matches the path of that artifact.

You can find more details about artifacts retention policy in the [Artifact Retention Policies Reference](../using-semaphore/artifacts#retention).

Response:

```json
HTTP status: 200

{
  "workflow_level_retention_policies": [],
  "project_level_retention_policies": [
    {
      "selector": "/**/*",
      "age": "1 year"
    }
  ],
  "job_level_retention_policies":[
    {
      "selector": "/screenshots/**/*.png",
      "age": "2 weeks"
    },
    {
      "selector": "/logs/**/*.txt",
      "age": "3 months"
    }
  ]
}
```

Example request:

```shell
curl -X POST -H "Authorization: Token {api_token}" \
     "https://<semaphore-server-url>/api/v1alpha/artifacts_retention_policies" \
     -H "Content-Type: application/json" \
     -d '<json object>' 
```

```shell
curl -X POST -H "Authorization: Token {api_token}" \ 
     "https://<semaphore-server-url>/api/v1alpha/artifacts_retention_policies" \
     -H "Content-Type: application/json" \
     -d '{"project_id":"3796efe0-81a0-4157-8774-7ad72d41ac28","job_level_retention_policies":[{"selector":"/screenshots/**/*.png","age":"2 weeks"},{"selector":"/logs/**/*.txt","age":"3 months"}]}'
```

### Describe retention policy

This API endpoint retrieves the details about an artifacts retention policy that is configured for a project with the given UUID.

By default, projects do not have an artifacts retention policy configured so a response in this case will have a policy with an empty set of retention rules for all artifacts levels.

```text
GET <semaphore-server-url>/api/v1alpha/artifacts_retention_policies/:project_id
```

Parameters:

- `project_id` (**required**) - The UUID of the project

Response:

```json
HTTP status: 200

{
  "workflow_level_retention_policies": [],
  "project_level_retention_policies": [
    {
      "selector": "/**/*",
      "age": "1 year"
    }
  ],
  "job_level_retention_policies":[
    {
      "selector": "/screenshots/**/*.png",
      "age": "2 weeks"
    },
    {
      "selector": "/logs/**/*.txt",
      "age": "3 months"
    }
  ]
}
```

Example:

```shell
curl -i -H "Authorization: Token {api_token}" \
     "https://<semaphore-server-url>/api/v1alpha/artifacts_retention_policies/:project_id"
```
