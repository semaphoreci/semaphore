Pre Fligh Checks

Standard Methods:

https://semaphore.semaphoreci.com/api/v2/pre_flight_checks

- describe
- update

Resource

```json
{
  "apiVersion": "v2",
  "kind": "PreFlightChecks",
  "metadata": {
    "organization": {"id": "02b7c528-b0f1-4266-8e5e-10b7b984e76a", "name": "Organization1"}
  },
  "spec": {
    "commands": [],
    "secrets": []
  }
```
