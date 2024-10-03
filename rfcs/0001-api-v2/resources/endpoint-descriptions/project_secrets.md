ProjectSecrets

Standard Methods

https://semaphore.semaphoreci.com/api/v2/projects/{name_or_id}/secrets

- list
- describe
- update
- delete
- create

Resource

```json
{
  "apiVersion": "v2",
  "kind": "ProjectSecret",
  "metadata": {
    "id": "abbb5683-9310-49bb-9fd2-ac69486a4c6d",
    "organization": {"id": "02b7c528-b0f1-4266-8e5e-10b7b984e76a", "name": "Organization1"},
    "project": {"id": "726dbefd-b30c-4c80-bc9a-c0613968a2ca", "name": "Project1"},
    "name": "my-secret",
    "timeline": {
      "created_at": "2024-07-12T11:02:50.108Z",
      "created_by": { "id": "18b40eaf-ce10-49c3-93f2-e4fe72d5160b", "type": "USER" },
      "updated_at": "2024-07-12T11:02:50.108Z",
      "updated_by": { "id": "18b40eaf-ce10-49c3-93f2-e4fe72d5160b", "type": "USER" },
    }
  },
  "spec": {
    "description": "string",
    "data": {
      "env_vars": [
        {
          "name": "ENV_VAR_NAME",
          "value": "string"
        }
      ],
      "files": [
        {
          "content": "string",
          "path": "/path/to/file"
        }
      ]
    }
  },

  # not sure about this
  "status": {
    "last_used_at": "2024-07-12T11:02:50.119Z",
    "last_used_by": {
      "id": "7ce0901c-84b0-4bb4-ab96-f0a4b15ae52d", "type": "JOB"
    }
  }
}
```
