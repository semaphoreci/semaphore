Dashboards

Standard Methods:

https://semaphore.semaphoreci.com/api/v2/dashboards
https://semaphore.semaphoreci.com/api/v2/dashboards/{name_or_id}

- list
- describe
- create
- update
- delete

Resource

```json
{
  "apiVersion": "v2",
  "kind": "Dashboard",
  "metadata": {
    "id": "645d2d5b-603c-49b2-9022-594297b60aa1",
    "organization": {"id": "02b7c528-b0f1-4266-8e5e-10b7b984e76a", "name": "Organization1"},
    "name": "my-dashboard",
    "timeline": {
      "created_at": "2024-07-12T11:02:50.108Z",
      "created_by": { "id": "18b40eaf-ce10-49c3-93f2-e4fe72d5160b", "type": "USER" },
      "updated_at": "2024-07-12T11:02:50.108Z",
      "updated_by": { "id": "18b40eaf-ce10-49c3-93f2-e4fe72d5160b", "type": "USER" },
    }
  },
  "spec": {
    "title": "My Dashboard",
    "widgets": [
      {
        "name": "My Pipelines",
        "type": "PIPELINES", # PIPELINES, WORKFLOWS
        "filters": {
          "reference": "refs/heads/master", # suport only branches for now?
          "project": {"id": "a44db728-f627-4560-a548-9f61d61e8780", "name": "Project1"}, # required for PIPELINES
          "pipeline_file": ".semaphore/semaphore.yml"
        }
      }
    ]
  }
}
```
