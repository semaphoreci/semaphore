---
description: Install self-hosted agent stack in your machines
---

# Install Agents

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Available from '@site/src/components/Available';
import VideoTutorial from '@site/src/components/VideoTutorial';

## Overview

<Available plans={['Startup (Hybrid)', 'Scaleup (Hybrid)']}/>

Before you can run jobs in your hardware, you need to install and register the self-hosted agent stack. This page explains how to install the stack in several platforms.

## How to register agent type

The agent type is the name assigned to agents running on the same hardware or platform. Semaphore expects all self-hosted agents to belong one agent type.

To register a self-hosted agent type, follow these steps:

1. Open the [organization](./organizations) menu on the top-right corner
2. Select **Self-hosted agents**
3. Press **Add self-hosted agent type**
4. Type the name of the agent type. Self hosted agents all begin with `s1-`, e.g. `s1-gpu-2`
5. Select **Agent name is directly assigned by the agent** unless you're using [AWS Security Tokens](#aws)
6. Select if the agent is available immediately after disconnection or not
7. Press **Looks good**

![Registering an agent type in Semaphore](./img/register-agent-type.jpg)

The next page shows detailed instructions to install and connect the self-hosted agent in the platform of choice. Press the **Reveal** button to show the registration token. Save it on a safe place for the next step.

![Instructions to install self-hosted agent](./img/self-hosted-agent-install.jpg)

## How to install agent stack {#install}

The Semaphore self-hosted agent is [open source](https://github.com/semaphoreci/agent). The prerequisites to install the self-hosted agent stack are:

- Git
- Bash (Linux and macOS) or PowerShell (Windows)
- A user with sudo powers (Linux and macOS)
- Docker [running as non-root](https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user) (Linux and macOS)
- Docker Compose (Linux and macOS)

Scroll down to learn how to install the stack in your hardware.

### Kubernetes {#kubernetes}

### Ubuntu/Debian {#ubuntu}

Follow these steps to install self-hosted agent in Ubuntu or Debian:

1. Prepare the machine

    ```shell title="Prepare machine"
    sudo mkdir -p /opt/semaphore/agent
    sudo chown $USER:$USER /opt/semaphore/agent/
    cd /opt/semaphore/agent
    ```
2. Download the agent package. Find the [latest release](https://github.com/semaphoreci/agent/releases/) for your platform and architecture

    ```shell title="Download agent package"
    curl -L https://github.com/semaphoreci/agent/releases/download/v2.2.23/agent_Linux_x86_64.tar.gz -o agent.tar.gz
    tar -xf agent.tar.gz
    ```

3. Install the agent and follow the prompts

    ```shell title="Install agent"
    $ sudo ./install.sh
    [sudo] password for semaphore:
    Enter organization: my-org
    Enter registration token: 4129164f62879d9039c78f35c365a77a3c92ef2b758915
    ```

4. Add GitHub and BitBucket SSH fingerprints

    ```shell
    mkdir -p /home/$USER/.ssh

    # Fetch GitHub SSH keys from api.github.com/meta and put them into ~/.ssh/known_hosts
    curl -sL https://api.github.com/meta | jq -r ".ssh_keys[]" | sed 's/^/github.com /' | sudo tee -a /home/$USER/.ssh/known_hosts
    # Fetch BitBucket SSH keys from bitbucket.org/site/ssh and put them into ~/.ssh/known_hosts
    curl -s https://bitbucket.org/site/ssh | grep -oE 'ssh-[a-z]{3} [A-Za-z0-9+/=]+' | sed 's/^/bitbucket.org /' | sudo tee -a /home/$USER/.ssh/known_hosts

    sudo chmod 700 /home/$USER/.ssh
    sudo chmod 600 /home/$USER/.ssh/known_hosts
    sudo chown $USER:$USER /home/$USER/.ssh
    ```
See [self-hosted agent configuration](./self-hosted-configure) to see how to configure the agent for your system.

### Generic Linux {#linux}

### Red Hat Enterprise Linux (RHEL) {#rhel}

### macOS {#macos}

### Windows {#windows}

### AWS {#aws}

## See also
