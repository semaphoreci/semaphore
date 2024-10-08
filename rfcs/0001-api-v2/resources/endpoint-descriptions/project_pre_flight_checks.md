Project Pre Fligh Checks

Standard Methods:

https://semaphore.semaphoreci.com/api/v2/projects/{name_or_id}/pre_flight_checks

- describe
- update

Resource

```json
{
  "apiVersion": "v2",
  "kind": "ProjectPreFlightChecks",
  "metadata": {
    "organization": {"id": "02b7c528-b0f1-4266-8e5e-10b7b984e76a", "name": "Organization1"},
    "project": {"id": "726dbefd-b30c-4c80-bc9a-c0613968a2ca", "name": "Project1", "url": "https://semaphore.semaphoreci.com/api/v2/projects/project1"},
  },
  "spec": {
    "overwritten": true,
    "commands": [],
    "secrets": []
  }
```
