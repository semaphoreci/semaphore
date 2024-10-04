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

Resource:

```json
{
  "apiVersion": "v2",
  "kind": "Project",
  "metadata": {
    "id": "ed12ab59-9224-45c8-82d6-79bf158aaae6",
    "organization": {"id": "02b7c528-b0f1-4266-8e5e-10b7b984e76a", "name": "organization1"},
    "name": "my-project",
    "timeline": {
      "created_at": "2024-07-12T11:02:50.108Z",
      "created_by": { "id": "18b40eaf-ce10-49c3-93f2-e4fe72d5160b", "type": "USER" },
      "updated_at": "2024-07-12T11:02:50.108Z",
      "updated_by": { "id": "18b40eaf-ce10-49c3-93f2-e4fe72d5160b", "type": "USER" },
    }
  },
  "spec": {
    "display_name": "My Project",
    "description": "My project description",
    "visibility": "PUBLIC",

    # we can have here different types of object with different fields? GitHubRepository, GitRepository, BitbucketRepository, GitlabRepository, etc
    "repository": {
      "integration_type": "GITHUB_APP", # GITHUB, GITLAB, BITBUCKET, GIT
      "url": "git@github.com:semaphoreci/toolbox.git",
      "default_branch": "master",

      # One can add deploy key to the repository in settings, not managed by Semaphore 
      # it is also possible to add it as a project/org secret and provide the name?

      "deploy_key": {
        "private_key": NAME_OF_THE_SECRET_THAT_SEMAPHORE_MANAGE?,
        "fingerprint": "SHA256:CNz2IRGey4Pum8dE1q1MyducXOQCoNM/Vdcc9NecjMg",
        "public_key": "yyy"
      }

      ## Managed is github/bitbucket/gitlab or any other known provider is used

      # managed deploy key
      "deploy_key": { # TODO we will add this field later
          "name": "semaphore-semaphoreci-toolbox",
          "fingerprint": "SHA256:CNz2IRGey4Pum8dE1q1MyducXOQCoNM/Vdcc9NecjMg",
          "message": ""
      }
      # managed webhook
      "webhook": { # TODO we will add this field later
          "enabled": true,
          "url": "https://semaphore.semaphoreci.com/webhooks/ed12ab59-9224-45c8-82d6-79bf158aaae6",
          "message": ""
      }

      # state of managed connection
      "connected": true,
      "connection_owner": {
          "id": "18b40eaf-ce10-49c3-93f2-e4fe72d5160b", type: "USER"
      },
    }
  }
}
```
