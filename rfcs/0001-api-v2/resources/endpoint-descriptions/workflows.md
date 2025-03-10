Workflows

Standard Methods:

https://semaphore.semaphoreci.com/api/v2/workflows/{id}

- list
- describe
- create project_id reference + (commit_sha pipeline_file) # or maybe remove it? and add it as a trigger?

Custom Methods

- rerun POST on /workflows/{id}/rerun + request_token in body
- terminate POST on /workflows/{id}/terminate

 Resource:

 ```json
{
  "apiVersion": "v2",
  "kind": "Workflow",
  "metadata": {
    "id": "f850cdcf-d3de-4d50-91bf-b6190fa5f9c0",
    "organization": {"id": "02b7c528-b0f1-4266-8e5e-10b7b984e76a", "name": "organization1"},
    "project": {"id": "726dbefd-b30c-4c80-bc9a-c0613968a2ca", "name": "project1", "url": "https://semaphore.semaphoreci.com/api/v2/projects/project1"},
    "timeline": {
      "created_at": "2024-07-12T11:02:50.116Z",
      "created_by": { "id": "5df2cadb-310f-4c14-8784-e27289133a78", "type": "USER" }
    }
  },
  "spec": {
    "initial_pipeline": { "id": "f850cdcf-d3de-4d50-91bf-b6190fa5f9c0" },


    # should rerun be a trigger as well?
    "rerun_of": {"id": "f850cdcf-d3de-4d50-91bf-b6190fa5f9c0" }

    # better name for this?
    "trigger_call": {
      "type": "HOOK",
      #"id": "f850cdcf-d3de-4d50-91bf-b6190fa5f9c0",

      "pipeline_file": ".semaphore/semaphore.yml",
      # user connected to SCM account
      "triggered_by": {"id": "f850cdcf-d3de-4d50-91bf-b6190fa5f9c0" }
    }

    "trigger_call": {
      "type": "TASK",
      #"id": "f850cdcf-d3de-4d50-91bf-b6190fa5f9c0",


      "task": {"id": "f850cdcf-d3de-4d50-91bf-b6190fa5f9c0" }
      "triggered_by": {"id": "f850cdcf-d3de-4d50-91bf-b6190fa5f9c0" }



      "pipeline_file": ".semaphore/semaphore.yml",

      "parameters": [
        {"key": "ENV_VAR_X", "value": "blabla"},
        {"key": "ENV_VAR_Y", "value": "blablay"}
      ],
      "reference": "refs/heads/master"
      # User/Service Account that manually triggered the task (UI or API)
    }

    "trigger_call": {
      "type": "API",
      "id": "f850cdcf-d3de-4d50-91bf-b6190fa5f9c0",
      "pipeline_file": ".semaphore/semaphore.yml"

      "reference": "refs/heads/master",
      "commit_sha": "60a2df0a7e8f27d044350cbfe12c040f36f042f2",

      # User/Service Account that manually triggered the API
      "triggered_by": {"id": "f850cdcf-d3de-4d50-91bf-b6190fa5f9c0" }
    }

    "repository": {
      "reference": "refs/heads/master",
      "commit_sha": "60a2df0a7e8f27d044350cbfe12c040f36f042f2",

      # github specific stuff
      "pr_head_branch": "feature-branch",
      "pr_target_branch": "master"
    }
  }
}
 ```
