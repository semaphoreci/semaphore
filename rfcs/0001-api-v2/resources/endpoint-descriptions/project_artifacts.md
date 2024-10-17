Project Artifacts

Standard Mehtods:

https://semaphore.semaphoreci.com/api/v2/projects/{name_or_id}/artifacts

- describe
- update

Resouce:

```json
{
  "apiVersion": "v2",
  "kind": "ProjectArtifacts",
  "metadata": {
    "organization": {"id": "02b7c528-b0f1-4266-8e5e-10b7b984e76a", "name": "Organization1"},
    "project": {"id": "726dbefd-b30c-4c80-bc9a-c0613968a2ca", "name": "Project1", "url": "https://semaphore.semaphoreci.com/api/v2/projects/project1"},
    "timeline": {
      "created_at": "2024-07-12T11:02:50.108Z",
      "created_by": { "id": "18b40eaf-ce10-49c3-93f2-e4fe72d5160b", "type": "USER" },
      "updated_at": "2024-07-12T11:02:50.108Z",
      "updated_by": { "id": "18b40eaf-ce10-49c3-93f2-e4fe72d5160b", "type": "USER" },
    }
  },
  "spec": {
    "project_retention_policies": [
      { "selector": "/example/path/**/*", "age": "7d" }
    ],
    "workflow_retention_policies": [
      { "selector": "/example/path/**/*", "age": "1d" }
    ],
    "job_retention_policies": [
      { "selector": "/example/path/**/*", "age": "1w" }
    ]
  }
}
```
