Secret

Standard Methods:

https://semaphore.semaphoreci.com/api/v2/secrets/{name_or_id}

- list
- describe
- update
- delete
- create

Resource

```json
{
  "apiVersion": "v2",
  "kind": "Secret",
  "metadata": {
    "id": "b6654945-cf11-43a1-8e3a-f5a22c7d19fa",
    "organization": {"id": "02b7c528-b0f1-4266-8e5e-10b7b984e76a", "name": "Organization1"},
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
    "access_config": {
      "attach_access": "YES",
      "debug_access": "YES",
      "project_access": "WHITELIST",
      "projects": [
        {"id": "0e7fa31e-f974-4f57-ab99-72ac8b70df41", "name": "project-1"},
        {"id": "0e7fa31e-f974-4f57-ab99-72ac8b70df42", "name": "project-2"}
      ]
    },
    "data": {
      "env_vars": [
        {
          "name": "MY_SECRET",
          "value": "secret"
        }
      ],
      "files": [
        {
          "content": "string",
          "path": "/path/to/file"
        }
      ]
    },
  },

  "status": {
    "last_used_at": "2024-07-12T11:02:50.108Z",
    "last_used_by": { "id": "7ce0901c-84b0-4bb4-ab96-f0a4b15ae52d", "type": "JOB" }
  }
}
```
