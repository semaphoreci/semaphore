Project

Standard Mehtods:

https://semaphore.semaphoreci.com/api/v2/projects/{name_or_id}

- list
- describe
- update
- delete
- create

Custom Methods: # TODO we will add this field later
- regenerate_deploy_key POST on /projects/{name_or_id}/regenerate_deploy_key + request_token in body
- regenerate_webhook POST on /projects/{name_or_id}/regenerate_webhook + request_token in body
- debug POST on /projects/{name_or_id}/debug + agent and execution_time_limit

Resource:

```json
{
  "apiVersion": "v2",
  "kind": "Project",
  "metadata": {
    "id": "ed12ab59-9224-45c8-82d6-79bf158aaae6",
    "organization": {"id": "02b7c528-b0f1-4266-8e5e-10b7b984e76a", "name": "Organization1"},
    "name": "my-secret",
    "slug": "my-secret", # TODO we will add this field later
    "timeline": {
      "created_at": "2024-07-12T11:02:50.108Z",
      "created_by": { "id": "18b40eaf-ce10-49c3-93f2-e4fe72d5160b", "type": "USER" },
      "updated_at": "2024-07-12T11:02:50.108Z",
      "updated_by": { "id": "18b40eaf-ce10-49c3-93f2-e4fe72d5160b", "type": "USER" },
    }
  },
  "spec": {
    "visibility": "PUBLIC",
    "description": "string",
    "connected": true,

    "listeners or triggers": [
      {"type": "github_hook"},

      {"type": "s3",
       "path": "/data/*.zip",
       "poll_interval": 60},

      {"type": "container_registry",
       "container": "zebra:v1.*",
       "hook_id": "1212312112"}

      {"type": "helm_registry",
       "chart": "semaphore-ce",
       "hook_id": "1212312112"}

      {"type": "pipeline",
       "project": "alles",
       "when": "pipeline_file = './s/x.yml' AND branch = 'master' AND result ='passed'",
       "trigger": {"pipeline_file": "./run.yaml",
                   "branch": "master"}}
    ]

    "repository": {
      "connection_owner": {
        "id": "18b40eaf-ce10-49c3-93f2-e4fe72d5160b", type: "USER"
      },
      "integration_type": "GITHUB_APP",
      "url": "git@github.com:semaphoreci/toolbox.git",
      "default_branch": "master",
      "webhook": { # TODO we will add this field later
        "enabled": true,
        "url": "https://semaphore.semaphoreci.com/webhooks/ed12ab59-9224-45c8-82d6-79bf158aaae6",
        "message": ""
      },
      "deploy_key": { # TODO we will add this field later
        "name": "semaphore-semaphoreci-toolbox",
        "fingerprint": "SHA256:CNz2IRGey4Pum8dE1q1MyducXOQCoNM/Vdcc9NecjMg",
        "message": ""
      },
      "paused": false, # TODO we will add this field later
      "triggers": [
          "BRANCHES", "TAGS", "FORKED_PULL_REQUESTS", "PULL_REQUESTS"
      ],
      "branches": {
        "filter": true, # TODO we will add this field later
        "only_new_branches": true, # TODO we will add this field later
        "allowed": ["string"],
        "pull_requests": true, # TODO we will add this field later
        "draft_pull_requests": false, # TODO we will add this field later
      }
      "tags": {
        "skip_ci": true, # TODO we will add this field later
        "filter": true, # TODO we will add this field later
        "allowed": ["string"],
      },
      "pull_requests": { # TODO we will add this field later
        "filter": true,
        "draft": false,
        "target": ["string"],
        "base": ["string"],
      },
      "forked_pull_requests": {
        "filter": true, # TODO we will add this field later
        "target": ["string"], # TODO we will add this field later
        "base": ["string"], # TODO we will add this field later
        "allowed_contributors": [],
        "allowed_secrets": ["my-secret"]
      },
      "pipeline_file": ".semaphore/semaphore.yml",
      "status": {
        "enabled": true, # TODO we will add this field later
        "pipeline_files": [
          {
            "level": "PIPELINE",
            "path": ".semaphore/semaphore.yml"
          }
        ]
      }
    }
  }


}
```
