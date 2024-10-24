SelfHostedAgentType

Standard Methods:

https://semaphore.semaphoreci.com/api/v2/self_hosted_agent_types/{name_or_id}

- list
- describe
- update
- delete
- create

Custom Methods

- reset token POST on /self_hosted_agent_types/{name_or_id}/reset_token

Resource:

```json
{
  "apiVersion": "v2",
  "kind": "SelfHostedAgentType",
  "metadata": {
    "id": "ed12ab59-9224-45c8-82d6-79bf158aaae6",
    "organization": {"id": "02b7c528-b0f1-4266-8e5e-10b7b984e76a", "name": "Organization1"},
    "name": "my-agent-type"
    "timeline": {
      "created_at": "2024-07-12T11:02:50.108Z",
      "created_by": { "id": "18b40eaf-ce10-49c3-93f2-e4fe72d5160b", "type": "USER" },
      "updated_at": "2024-07-12T11:02:50.108Z",
      "updated_by": { "id": "18b40eaf-ce10-49c3-93f2-e4fe72d5160b", "type": "USER" },
    }
  },
  "spec": {
    "agent_name_settings": {
      "assignment_origin": "AWS_STS",
      "aws": {
        "account_id": "123456789012",
        "role_name_patterns": "my-role-name"
      },
      "release_after": 0
    },
  }
}
```
