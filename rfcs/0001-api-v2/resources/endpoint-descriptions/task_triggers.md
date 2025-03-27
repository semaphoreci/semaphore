TaskTriggers

# Will be replaces with project triggers calls

Standard Methods

https://semaphore.semaphoreci.com/api/v2/projects/{name_or_id}/tasks/{name_or_id}/triggers
https://semaphore.semaphoreci.com/api/v2/tasks/{id}/triggers

- create

Resource

```json
{
  "apiVersion": "v2",
  "kind": "TaskTrigger",
  "metadata": {
    "organization": {"id": "02b7c528-b0f1-4266-8e5e-10b7b984e76a", "name": "Organization1"},
    "project": {"id": "726dbefd-b30c-4c80-bc9a-c0613968a2ca", "name": "project1", "type": "PROJECT", "url": "https://semaphore.semaphoreci.com/api/v2/projects/project1"},
    "task": {"id": "a3fa7cf5-0fee-4a76-ab75-f1a57f1316c1" },
    "workflow": {"id": "33c93e7e-5239-4b80-8d86-1cdcc0a15087" }
    "timeline": {
      "created_at": "2024-07-12T11:02:50.108Z",
      "created_by": { "id": "18b40eaf-ce10-49c3-93f2-e4fe72d5160b", "type": "USER" },
      "updated_at": "2024-07-12T11:02:50.108Z",
      "updated_by": { "id": "18b40eaf-ce10-49c3-93f2-e4fe72d5160b", "type": "USER" },
    }
  },
  "spec": {
    "reference": "refs/heads/master", # or keep it branch?
    "parameters": [
      {
        "name": "Parameter name",
        "value": "Parameter value"
      }
    ],
    "pipeline_file": ".semaphore/semaphore.yml",
    
  },

  "status": {
    "status": "PASSED"
    "timeline": {
      "scheduled_at": "2024-07-12T11:02:50.106Z",
    }
  }
}
```
