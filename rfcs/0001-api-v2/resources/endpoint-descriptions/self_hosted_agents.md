SelfHostedAgent

Standard Methods:

https://semaphore.semaphoreci.com/api/v2/self_hosted_agents/{name_or_id}

- list + filter status = "WAITING_FOR_JOB" AND type = "s1-my-type"
- describe

Custom Methods

- disconnect POST on /self_hosted_agents/{name_or_id}/disconnect
- disconnect POST on /self_hosted_agents/disconnect + filter (status = "WAITING_FOR_JOB" AND type = "s1-my-type")

Resource:

```json
{
  "apiVersion": "v2",
  "kind": "SelfHostedAgent",
  "metadata": {
    "id": "ed12ab59-9224-45c8-82d6-79bf158aaae6",
    "organization": {"id": "02b7c528-b0f1-4266-8e5e-10b7b984e76a", "name": "Organization1"},
    "name": "string",
    "timeline": {
      "created_at": "2024-07-12T11:02:50.092Z",
    }
  },

  "spec": {
   "arch": "string",
   "hostname": "string",
   "os": "Ubuntu 20.04.6 LTS",
   "type": "s1-my-type",
   "version": "v2.2.6"
  }

  # Not sure what goes to spec and what goes to status. Lucas should help
  "status": {
    "timeline": {
      "connected_at": "2024-07-12T11:02:50.092Z"
    }
    "status": "WAITING_FOR_JOB",
    "ip_address": "string",
    "pid": 0,
  }
}
```
