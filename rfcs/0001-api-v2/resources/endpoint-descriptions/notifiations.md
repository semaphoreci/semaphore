Notification

Standard Mehtods:

https://semaphore.semaphoreci.com/api/v2/notifications

- list
- describe
- update
- delete
- create

Custom Methods:

Resource:

```json
{
  "apiVersion": "v2",
  "kind": "Notification",
  "metadata": {
    "id": "ee251df7-6946-4544-840d-b8ac7c02c3e3",
    "organization": {"id": "02b7c528-b0f1-4266-8e5e-10b7b984e76a", "name": "organization1"},
    "name": "notification1",
    "timeline": {
      "created_at": "2024-07-12T11:02:50.108Z",
      "created_by": { "id": "18b40eaf-ce10-49c3-93f2-e4fe72d5160b", "type": "USER" },
      "updated_at": "2024-07-12T11:02:50.108Z",
      "updated_by": { "id": "18b40eaf-ce10-49c3-93f2-e4fe72d5160b", "type": "USER" },
    }
  },
  "spec": {
    "rules": [
      {
        "name": "Rule1",
        "filter": {
          "projects": ["string"],
          "branches": ["string"],
          "pipelines": ["string"],
          "results": ["PASSED"]
        },
        "notify": {
          "slack": {
            "endpoint": "string",
            "channels": ["string"]
          },
          "webhook": {
            "method": "POST",
            "url": "string",
            "retries": 3,
            "timeout": 500,
            "secret": "string"
          }
        }
      }
    ]
  }
}
```
