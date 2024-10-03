Init Jobs

Standard Methods

https://semaphore.semaphoreci.com/api/v2/init_job

- describe
- update

Resource

```json
{
  "apiVersion": "v2",
  "kind": "InitJob",
  "metadata": {
    "organization": {"id": "02b7c528-b0f1-4266-8e5e-10b7b984e76a", "name": "Organization1"},
  },
  "spec": {
    "agent": {
      "os_image": "ubuntu2004",
      "machine_type": "e1-standard-2"
    }
  }
```
