---
description: A dest
---

# Install Agents

## Overview

## How to register an agent

https://docs.semaphoreci.com/ci-cd-environment/self-hosted-agent-types/

## How to install an agent

https://docs.semaphoreci.com/ci-cd-environment/install-self-hosted-agent/

### Kubernetes

### Ubuntu/Debian


Finish by configuring the SSH keys for GitHub...

```shell
# Create the ~/.ssh folder for the user
# running the agent, if it doesn't exist yet.
mkdir -p /home/$USER/.ssh

# Fetch GitHub SSH keys from api.github.com/meta
# and put them into ~/.ssh/known_hosts
curl -sL https://api.github.com/meta | jq -r ".ssh_keys[]" | sed 's/^/github.com /' | sudo tee -a /home/$USER/.ssh/known_hosts
sudo chown $USER:$USER /home/$USER/.ssh
```

### RHEL (Fips)

### Generic Linux


### MacOS

Finish by configuring the SSH keys for GitHub...
```shell
# Create the ~/.ssh folder for the user
# running the agent, if it doesn't exist yet.
mkdir -p /home/$USER/.ssh

# Fetch GitHub SSH keys from api.github.com/meta
# and put them into ~/.ssh/known_hosts
curl -sL https://api.github.com/meta | jq -r ".ssh_keys[]" | sed 's/^/github.com /' | sudo tee -a /home/$USER/.ssh/known_hosts
sudo chown $USER: /home/$USER/.ssh
```

### Windows {#windows}

### AWS

## See also
