Pipelines

Standard Methods:

https://semaphore.semaphoreci.com/api/v2/pipelines

- list + filter project_id = , workflow_id = , created_at > <, done_at > <, pipeline_file = , reference = 
  pr_head_branch = , pr_target_branch = 
- describe

Custom Methods:

- partial_rebuild POST on /pipelines/{id}/partial_rebuild + request_token in body
- topology GET on /pipelines/{id}/topology
- terminate POST on /pipelines/{id}/terminate (stop or cancel)?

- validate POST on /pipelines/validate + yaml in body and content-type set to application/yaml
    what we need to fully validate a pipeline file?

Resource:

```json
{
 "apiVersion": "v2",
  "kind": "Pipeline",
  "metadata": {
    "id": "f850cdcf-d3de-4d50-91bf-b6190fa5f9c0",
    "organization": {"id": "02b7c528-b0f1-4266-8e5e-10b7b984e76a", "name": "organization1"},
    "project": {"id": "726dbefd-b30c-4c80-bc9a-c0613968a2ca", "name": "project1"},
    "workflow":{ "id": "52f2847c-1817-48f2-95a8-b7e6b98c65e0" },
    "timeline": {
      "created_at": "2024-07-12T11:02:50.108Z",
      "created_by": { "id": "18b40eaf-ce10-49c3-93f2-e4fe72d5160b", "type": "USER" },
      "updated_at": "2024-07-12T11:02:50.108Z",
      "updated_by": { "id": "18b40eaf-ce10-49c3-93f2-e4fe72d5160b", "type": "USER" },
    }
  },

  "spec": {
    "name": "Pipeline",

    "git or payload or something": {
      "reference": "refs/heads/master",
      "commit_sha": "ac3f9796df42db976814e3fee670e11e3fd4b98a",
      "pr_head_branch": "refs/heads/feature-branch",
      "pr_target_branch": "refs/heads/master",
      "pipeline_file": ".semaphore/semaphore.yml"
    }  
    
    "queue": {
        "type": 0, # this looks like enum
        "scope": "project",
        "id": "8d17eb69-b841-4b69-9e12-f43a535d54a5",
        "name": "master-.semaphore/repohub-prod.yml"
    },

    # Optional
    "pipeline_yml": "YAML or JSON of pipeline"
  },

  "status": {

    "timeline": {
      "pending_at": "2024-07-12T11:02:50.045Z",
      "queuing_at": "2024-07-12T11:02:50.045Z",
      "running_at": "2024-07-12T11:02:50.045Z",
      "stopping_at": "2024-07-12T11:02:50.045Z",
      "done_at": "2024-07-12T11:02:50.045Z",
      "terminated_by": {
        "id": "18b40eaf-ce10-49c3-93f2-e4fe72d5160b"
      }
    }

    "state": "INITIALIZING",
    "result": "PASSED",
    "result_reason": "TEST",
    "error_description": "",
    "terminate_request": "",

    "blocks": [{
      "id": "484e263a-424a-4820-bff0-bba436c54042",
      "error_description": "string",
      "name": "string",
      "result": "PASSED",
      "result_reason": "TEST",
      "state": "WAITING",
      "jobs": [
        {
          "index": 0,
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "name": "string",
          "result": "string",
          "status": "string"
        }
      ]
    }],
  }

}
```
