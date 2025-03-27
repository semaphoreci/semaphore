ProjectTriggers

Standard Methods:

https://semaphore.semaphoreci.com/api/v2/projects/{name_or_id}/triggers

- list required type = 

- describe
- update
- delete
- create

Resoruce

```json
{
  "apiVersion": "v2",
  "kind": "ProjectTrigger",
  "metadata": {
    "id": "49f06438-9c54-4d1d-9e4a-76faa292b150",
    "organization": {"id": "02b7c528-b0f1-4266-8e5e-10b7b984e76a", "name": "Organization1"},
    "project": {"id": "726dbefd-b30c-4c80-bc9a-c0613968a2ca", "name": "project1", "type": "PROJECT", "url": "https://semaphore.semaphoreci.com/api/v2/projects/project1"},
    "name": "project-trigger-1",
    "timeline": {
      "created_at": "2024-07-12T11:02:50.108Z",
      "created_by": { "id": "18b40eaf-ce10-49c3-93f2-e4fe72d5160b", "type": "USER" },
      "updated_at": "2024-07-12T11:02:50.108Z",
      "updated_by": { "id": "18b40eaf-ce10-49c3-93f2-e4fe72d5160b", "type": "USER" },
    }
  },
  "spec": {
    # API type would be update only (you can pause it, but not delete or create)
    "type": "API", # TASK, HOOK #, PULL, S3, PROJECT
    "paused": false,

    "display_name": "Project Trigger",
    "description": "Project trigger description",

    # CUSTOM GITHUB HOOK - we would like to sign the payload

# repository_slug: "semaphoreci/toolbox"
settings


    # HOOK
    # URL

    "when": {
      "hook": "HOOK_ID",
      "branch": "master",
      "result": "passed"
    }

    "what": {
      "pipeline_file": ".semaphore/pipeline.yml",
      "reference": "refs/heads/master",
      "parameters": [
        {"key": "ENV_VAR_X", "value": "yq. $lookup"},
        {"key": "ENV_VAR_Y", "value": "blablay"}
      ],
    },


    "OIDC" for custom hooks?

    # TASK
    "suspended": false, # STATE, can it be for all types?

    "when": {
      "scheduled": true, # do we need it? schedule can be null
      "cron_schedule": "0 0 * * *",
    }

    "what": {
      "pipeline_file": ".semaphore/pipeline.yml",
      "reference": "refs/heads/master",
      "parameters": [
        {"key": "ENV_VAR_X", "value": "blabla"},
        {"key": "ENV_VAR_Y", "value": "blablay"}
      ]
    }

    # POOL

    "when": {
      "cron_schedule": "0 0 * * *", # or interval?
      "branch": "master"
    }

    "what": {
      "pipeline_file": ".semaphore/pipeline.yml"
      "reference": "refs/heads/master", # optional
      "parameters": [
        {"key": "ENV_VAR_X", "value": "blabla"},
        {"key": "ENV_VAR_Y", "value": "blablay"}
      ]
    }

    # PROJECT

    "when": {
      "project": {"id": "", "name:" "alles"},
      "condition": "pipeline_file = './s/x.yml' AND branch = 'master' AND result ='passed'"
    }

    "what": {
      "pipeline_definition": ".semaphore/pipeline.yml"
      "reference": "refs/heads/master",

      "parameters": [
        {"key": "ENV_VAR_X", "value": "blabla"},
        {"key": "ENV_VAR_Y", "value": "blablay"}
      ]
    }

    # S3

    "when": {
      "secret": "SECRET_WITH_S3_ACCESS",
      "cron_schedule": "0 0 * * *",
      "path": "/data/*.zip",
    }

  }
}
```

# Notes

- replace "pipeline_file" with "pipeline_definition"
- define triggers options for github triggers:

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
    },

  }
