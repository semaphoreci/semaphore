Job Access

Standard Methods

https://semaphore.semaphoreci.com/api/v2/job_access

- describe
- update

 Resource

 ```json
{
  "apiVersion": "v2",
  "kind": "JobAccess",
  "metadata": {
    "organization": {"id": "02b7c528-b0f1-4266-8e5e-10b7b984e76a", "name": "Organization1"}
  },
  "spec": {
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
