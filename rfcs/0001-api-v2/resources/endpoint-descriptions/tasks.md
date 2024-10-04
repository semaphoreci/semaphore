Tasks

# Will be replaces with project triggers

Standard Methods

https://semaphore.semaphoreci.com/api/v2/projects/{name_or_id}/tasks/{name_or_id}
https://semaphore.semaphoreci.com/api/v2/tasks/{id}

- list
- describe
- update
- delete
- create

Resource

```json
{
  "apiVersion": "v2",
  "kind": "Task",
  "metadata": {
    "id": "49f06438-9c54-4d1d-9e4a-76faa292b150",
    "organization": {"id": "02b7c528-b0f1-4266-8e5e-10b7b984e76a", "name": "Organization1"},
    "project": {"id": "726dbefd-b30c-4c80-bc9a-c0613968a2ca", "name": "project1", "type": "PROJECT", "url": "https://semaphore.semaphoreci.com/api/v2/projects/project1"},
    "name": "periodic-task",
    "timeline": {
      "created_at": "2024-07-12T11:02:50.108Z",
      "created_by": { "id": "18b40eaf-ce10-49c3-93f2-e4fe72d5160b", "type": "USER" },
      "updated_at": "2024-07-12T11:02:50.108Z",
      "updated_by": { "id": "18b40eaf-ce10-49c3-93f2-e4fe72d5160b", "type": "USER" },
    }
  },
  "spec": {
    "display_name": "Periodic task",
    "description": "Periodic task description",

    "cron_schedule": "0 0 * * *",
    "scheduled": false,
    "suspended": false,
    "paused": false,

    "branch": "master",
    "pipeline_file": ".semaphore/pipeline.yml",

    "parameters": [
      {
        "name": "PARAM_NAME",
        "description": "Parameter description",
        "required": true
        "default_value": "Default value",
        "options": [
          "string"
        ],
      }
    ]
  }

  "status": {
    "timeline": {
      "paused_at": "2024-07-12T11:02:50.100Z",
      "paused_by": {"id": "18b40eaf-ce10-49c3-93f2-e4fe72d5160b", "type": "USER"}
    }
  }
}
```
