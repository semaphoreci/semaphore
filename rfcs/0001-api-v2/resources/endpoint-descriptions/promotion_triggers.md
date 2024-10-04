PromotionTriggers

Standard Methods

https://semaphore.semaphoreci.com/api/v2/promotion_triggers

- list
- create

Resource:

```json
{
  "apiVersion": "v2",
  "kind": "PromotionTrigger",
  "metadata": {
    "id": "d605c1ed-5664-4ce3-8419-14d3d7337c35",
    "organization": {"id": "02b7c528-b0f1-4266-8e5e-10b7b984e76a", "name": "Organization1"},
    "project": {"id": "726dbefd-b30c-4c80-bc9a-c0613968a2ca", "name": "Project1"},
    "pipeline": { "id": "f850cdcf-d3de-4d50-91bf-b6190fa5f9c0" },
    "timeline": {
      "created_at": "2024-07-12T11:02:50.108Z",
      "created_by": { "id": "18b40eaf-ce10-49c3-93f2-e4fe72d5160b", "type": "USER" },
      "updated_at": "2024-07-12T11:02:50.108Z",
      "updated_by": { "id": "18b40eaf-ce10-49c3-93f2-e4fe72d5160b", "type": "USER" },
    }
  },

  "spec": {
    "promotion_name": "Sxmoon",
    "override": false,
    "parameters": [
      {
        "name": "Parameter name",
        "value": "Parameter value"
      }
    ]
  },
  "status": {
    "status": "PASSED",
    "triggered_pipeline": { "id": "d605c1ed-5664-4ce3-8419-14d3d7337c35" },
    "timeline": {
      "triggered_at": "2024-07-12T11:02:50.116Z"
    }
  }
}
```
