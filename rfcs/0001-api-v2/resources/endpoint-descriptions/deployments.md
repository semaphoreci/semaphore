Deployments

Standard Methods

https://semaphore.semaphoreci.com/api/v2/projects/{name_or_id}/deployment_targets/{name_or_id}/deployments
https://semaphore.semaphoreci.com/api/v2/deployment_targets/{id}/deployments

https://semaphore.semaphoreci.com/api/v2/deployments

- list filter deployment_target_id =, reference = "refs/heads/master" "refs/heads/*", triggered_by.id = ""

Resource

```json
{
  "apiVersion": "v2",
  "kind": "Deployment",
  "metadata": {
    "id": "a0424427-ff28-4f77-a893-0fdf5f50c380",
    "organization": {"id": "02b7c528-b0f1-4266-8e5e-10b7b984e76a", "name": "organization1"},
    "project": {"id": "726dbefd-b30c-4c80-bc9a-c0613968a2ca", "name": "project1"},
    "environment": {"id": "9c777b65-213f-4fe1-bc6b-727d2cdde97d" },
    "timeline": {
      "created_at": "2024-07-12T11:02:50.108Z",
      "created_by": { "id": "18b40eaf-ce10-49c3-93f2-e4fe72d5160b", "type": "USER" },
      "updated_at": "2024-07-12T11:02:50.108Z",
      "updated_by": { "id": "18b40eaf-ce10-49c3-93f2-e4fe72d5160b", "type": "USER" },
    }
  },

  "spec": {
    "git": {
      "reference": "refs/heads/master",
    }
    "env_vars": [
      {
        "name": "NAME",
        "value": "VALUE"
      }
    ],

    "origin_pipeline": {"id": "97ba55d1-90d7-40b9-a2dd-bdbd02389b58" },
    "promotion_name": "Sxmoon"
  },

  "status": {
    "state": "PENDING",
    "state_message": "",
    "deployment_pipeline": {"id": "adc5a26f-4077-47bc-8d4f-cb4467f2c103" },
    "timeline": {
      "triggered_at": "2024-07-12T11:02:50.058Z",
      "triggered_by": { "id": "18b40eaf-ce10-49c3-93f2-e4fe72d5160b", "name": "User1" }
    }
  }
}
```
