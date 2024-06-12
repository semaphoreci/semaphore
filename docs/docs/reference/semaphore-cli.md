---
description: Semaphore command line reference
---

# Semaphore Command Line

WIP

this is about sem cli

## Set up notifications {#notifications}


You can set up more complex notifications by creating a YAML resource. This option is only available with the command line.

To create an advanced notification, install and connect the [Semaphore command line](../reference/semaphore-cli).

Next, create a YAML resource:

```yaml title="notify.yml"
# Slack notification for failures
apiVersion: v1alpha
kind: Notification
metadata:
  name: notify-on-fail
spec:
  rules:
    - name: "Example"
      filter:
        projects:
          - example-project
        results:
          - failed
          - stopped
          - canceled
      notify:
        slack:
          endpoint: https://hooks.slack.com/services/xxx/yyy/zzz
```

You can create a notification using the file above with the following command:

```shell
sem create -f notify.yml
```

The available values for `filter.results` are:

- `passed`
- `failed`
- `stopped`
- `canceled`

Here is a more comprehensive example sending notifications to two teams:

```yaml title="notify.yml"
# release-cycle-notifications.yml

apiVersion: v1alpha
kind: Notification
metadata:
  name: release-cycle-notifications
spec:
  rules:
    - name: "On staging branches"
      filter:
        projects:
          - /.*/
        branches:
          - staging
        results:
          - passed
      notify:
        slack:
          endpoint: https://hooks.slack.com/XXXXXXXXXXX/YYYYYYYYYYYY/ZZZZZZZZZZ
          channels:
            - "#qa-team"

    - name: "On master branches"
      filter:
        projects:
          - /.*/
        branches:
          - master
      notify:
        slack:
          endpoint: https://hooks.slack.com/XXXXXXXXXXX/YYYYYYYYYYYY/ZZZZZZZZZZ
          channels:
            - "#devops-team"
            - "#secops-team"
```

You can set up more complex notifications by creating a YAML resource. This option is only available with the command line.

To create an advanced notification, install and connect the [Semaphore command line](../reference/semaphore-cli)

Next, create a YAML resource:

```yaml title="notify.yml"
# webhook notification on failure
apiVersion: v1alpha
kind: Notification
metadata:
  name: notify-on-fail
spec:
  rules:
    - name: "Example"
      filter:
        projects:
          - example-project
        results:
          - failed
          - stopped
          - cancelled
      notify:
        webhook:
          endpoint: https://example.org/postreceiver
```

You can create a notification using the file above with the following command:

```shell
sem create -f notify.yml
```

The available values for `filter.results` are:

- `passed`
- `failed`
- `stopped`
- `canceled`


