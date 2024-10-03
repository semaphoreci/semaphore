Jobs

Standard Methods

https://semaphore.semaphoreci.com/api/v2/jobs

- list filter state = , project_id = 
- describe
- create

Custom Methods

- terminate POST on /jobs/{id}/terminate
- log_events GET on /jobs/{id}/log_events
- debug_ssh_key GET on /jobs/{id}/debug_ssh_key
- debug POST on /jobs/{id}/debug + agent and execution_time_limit

Resource

```json
HTTP status: 200

{
  "metadata": {
    "id": "bc8826bd-dbb2-4d28-8c90-7f370ce478fe",
    "organization": {"id": "02b7c528-b0f1-4266-8e5e-10b7b984e76a", "name": "Organization1"},
    "project": {"id": "726dbefd-b30c-4c80-bc9a-c0613968a2ca", "name": "Project1"},
    "workflow": {"id": "52f2847c-1817-48f2-95a8-b7e6b98c65e0" },
    "pipeline": {"id": "f850cdcf-d3de-4d50-91bf-b6190fa5f9c0" },
    "name": "Job #1",
    "timeline": {
      "created_at": "2024-07-12T11:02:50.108Z",
      "created_by": { "id": "18b40eaf-ce10-49c3-93f2-e4fe72d5160b", "type": "USER" },
      "updated_at": "2024-07-12T11:02:50.108Z",
      "updated_by": { "id": "18b40eaf-ce10-49c3-93f2-e4fe72d5160b", "type": "USER" },
    }
  },
  "spec": {
    "agent": {
      "ports": [{
        "name": "ssh",
        "number": 30000
      }],
      "containers": [],
      "machine": {
        "type": "e1-standard-2",
        "os_image": "ubuntu2004"
      }
    },
    "env_vars": [
      {
        "name": "SEMAPHORE_WORKFLOW_ID",
        "value": "59b32e16-3c4a-4940-899e-348c28396884"
      },
      {
        "name": "SEMAPHORE_WORKFLOW_NUMBER",
        "value": "2"
      },
      {
        "name": "SEMAPHORE_PIPELINE_ARTEFACT_ID",
        "value": "abb4fb87-309d-490a-bf0d-84972641b130"
      },
      {
        "name": "SEMAPHORE_PIPELINE_ID",
        "value": "abb4fb87-309d-490a-bf0d-84972641b130"
      },
      {
        "name": "SEMAPHORE_PIPELINE_0_ARTEFACT_ID",
        "value": "abb4fb87-309d-490a-bf0d-84972641b130"
      }
    ],
    "secrets": [
      {"name": "DOCKERHUB_USERNAME"},
      {"name": "DOCKERHUB_PASSWORD"}
    ],
    "commands": [
      "sleep 3600"
    ],
    "epilogue_always_commands": [
      "echo 'Job finished'"
    ],
    "epilogue_on_fail_commands": [
      "echo 'Job failed'"
    ],
    "epilogue_on_pass_commands": [
      "echo 'Job passed'"
    ],
    "execution_time_limit": 3600,

  },

  "status": {

    "agent": {
      "name": "",
      "ip": "88.212.212.212"
    }

    "result": "STOPPED",
    "state": "FINISHED"

    "timeline": {
      "created_at": "2024-07-12T11:02:50.116Z",
      "enqueued_at": "2024-07-12T11:02:50.045Z",
      "scheduled_at": "2024-07-12T11:02:50.045Z",
      "started_at": "2024-07-12T11:02:50.045Z",
      "finished_at": "2024-07-12T11:02:50.045Z"
    }

  }
}
```
