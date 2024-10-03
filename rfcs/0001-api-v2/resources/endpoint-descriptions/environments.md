Environments

Standard Methods:

https://semaphore.semaphoreci.com/api/v2/projects/{name_or_id}/environments
https://semaphore.semaphoreci.com/api/v2/projects/{name_or_id}/environments/{name_or_id}

https://semaphore.semaphoreci.com/api/v2/environments
https://semaphore.semaphoreci.com/api/v2/environments/{id}

- list
- describe
- update
- delete
- create

Custom Methods

- cordon POST on /projects/{name_or_id}/environments/{name_or_id}/cordon
- uncordon POST on /projects/{name_or_id}/environments/{name_or_id}/uncordon

Resource:

```json
{
  "apiVersion": "v2",
  "kind": "Environment",
  "metadata": {
    "id": "9c777b65-213f-4fe1-bc6b-727d2cdde97d",
    "organization": {"id": "02b7c528-b0f1-4266-8e5e-10b7b984e76a", "name": "Organization1"},
    "project": {"id": "726dbefd-b30c-4c80-bc9a-c0613968a2ca", "name": "Project1"},
    "name": "production",
    "timeline": {
      "created_at": "2024-07-12T11:02:50.108Z",
      "created_by": { "id": "18b40eaf-ce10-49c3-93f2-e4fe72d5160b", "type": "USER" },
      "updated_at": "2024-07-12T11:02:50.108Z",
      "updated_by": { "id": "18b40eaf-ce10-49c3-93f2-e4fe72d5160b", "type": "USER" },
    }
  },
  "spec": {
    "description": "string",
    "url": "string",

    "subject_rules": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "type": "USER", # USER, ROLE, ANY, AUTO
      },
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "type": "ROLE",
        "name": "Contributor"
      }
    ],
    "object_rules": [
      {
       "type": "BRANCH", # BRANCH, PR, TAG
       "match_mode": "ALL", # REGEX
       "pattern": ""
      }
    ],

    "bookmark_parameters": ["string"],
    "secrets": {}
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
      ],
    }
    
  }

  "status": {
    "state": "SYNCING",

    "last_deployment": {
      "id": "a0424427-ff28-4f77-a893-0fdf5f50c380",
      "deployment_pipeline": {"id": "adc5a26f-4077-47bc-8d4f-cb4467f2c103" }
    },

  }
}
```
