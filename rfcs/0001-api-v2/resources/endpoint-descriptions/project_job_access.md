Project Job Access

Standard Methods

https://semaphore.semaphoreci.com/api/v2/projects/{name_or_id}/job_access

- describe
- update

 Resource

 ```json
{
  "apiVersion": "v2",
  "kind": "ProjectJobAccess",
  "metadata": {
    "organization": {"id": "02b7c528-b0f1-4266-8e5e-10b7b984e76a", "name": "Organization1"},
    "project": {"id": "726dbefd-b30c-4c80-bc9a-c0613968a2ca", "name": "Project1", "url": "https://semaphore.semaphoreci.com/api/v2/projects/project1"},
  },
  "spec": {
    "overwritten": true,
    "debug": {
      "project": false,
      "default_branch": false,
      "non_default_branch": false,
      "pull_requests": false,
      "forked_pull_requests": false,
      "tags": false
    },
    "attach": {
      "default_branch": false,
      "non_default_branch": false,
      "pull_requests": false,
      "forked_pull_requests": false,
      "tags": false
    }
  }
}
```
