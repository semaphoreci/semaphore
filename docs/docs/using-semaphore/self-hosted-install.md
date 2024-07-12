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

## How to register agent type {#register-agent}

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
- A local user with sudo powers and Docker management permissions (Linux or macOS)
- A user with sudo powers (Linux and macOS)
- Docker [running as non-root](https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user) (Linux and macOS)
- Docker Compose (Linux and macOS)

Scroll down to learn how to install the stack in your hardware.

### Kubernetes {#kubernetes}

### Ubuntu/Debian {#ubuntu}

Follow these steps to install self-hosted agent in Ubuntu or Debian:

1. Create a user to run the agent service with sudo permissions, e.g. `semaphore`
2. Log in or switch to the agent service user

    ```shell
    su - semaphore
    ```
3. Prepare the machine

    ```shell title="Prepare machine"
    sudo mkdir -p /opt/semaphore/agent
    sudo chown $USER:$USER /opt/semaphore/agent/
    cd /opt/semaphore/agent
    ```
4. Download the agent package. Find the [latest release](https://github.com/semaphoreci/agent/releases/) for your platform and architecture

    ```shell title="Download agent package"
    curl -L https://github.com/semaphoreci/agent/releases/download/v2.2.23/agent_Linux_x86_64.tar.gz -o agent.tar.gz
    tar -xf agent.tar.gz
    ```

5. Install the agent and follow the prompts. Type the [organization URL](./organizations#general-settings), the registration token and the name of the local service user. The registration token is the one revealed during [agent registration](#register-agent)

    ```shell title="Install agent"
    $ sudo ./install.sh
    Enter organization: my-org.semaphoreci.com
    Enter registration token: <access token>
    Enter user [root]: <local-service-user>
    Downloading toolbox from https://github.com/semaphoreci/toolbox/releases/latest/download/self-hosted-linux.tar...
    [sudo] password for semaphore: 
    Creating agent config file at /opt/semaphore/agent/config.yaml...
    Creating /etc/systemd/system/semaphore-agent.service...
    Starting semaphore-agent service...
    ```

6. Add GitHub and BitBucket SSH fingerprints

    ```shell
    sudo mkdir -p /home/$USER/.ssh
    sudo chown -R $USER:$USER /home/$USER/.ssh

    curl -sL https://api.github.com/meta | jq -r ".ssh_keys[]" | sed 's/^/github.com /' | tee -a /home/$USER/.ssh/known_hosts
    curl -sL https://bitbucket.org/site/ssh | tee -a /home/$USER/.ssh/known_hosts

    chmod 700 /home/$USER/.ssh
    chmod 600 /home/$USER/.ssh/known_hosts
    ```

7. Add your SSH private keys into the `~/.ssh/` folder
8. Test SSH connection to GitHub or BitBucket

    ```shell title="Testing SSH connection"
    ssh -T git@bitbucket.org
    ssh -T git@github.com
    ```

9. Restart the agent service

    ```shell title="Restart agent service"
    sudo systemctl restart semaphore-agent
    ```

See [self-hosted agent configuration](./self-hosted-configure) to see the next steps in the setup. If the installation fails, try the [Generic Linux installation](#linux)

### Generic Linux {#linux}

Follow these steps to install self-hosted agent in any Linux distribution:

1. Create a user to run the agent service with sudo permissions, e.g. `semaphore`
2. Log in or switch to the agent service user

    ```shell
    su - semaphore
    ```
3. Prepare the machine

    ```shell title="Prepare machine"
    sudo mkdir -p /opt/semaphore/agent
    sudo chown $USER:$USER /opt/semaphore/agent/
    cd /opt/semaphore/agent
    ```

4. Create the configuration file for the agent. Replace the endpoint with your [organization URL](./organizations#general-settings) (without HTTPS), and the registration token revealed during [agent registration](#register-agent)

    ```shell title="Create config file"
    cat > config.yaml <<EOF
    endpoint: "my-org.semaphoreci.com"
    token: "[token]"
    EOF
    ```

5. Download and install the [Semaphore toolbox](../reference/toolbox)

    ```shell title="Install Semaphore toolbox"
    curl -L "https://github.com/semaphoreci/toolbox/releases/latest/download/self-hosted-linux.tar" -o toolbox.tar
    tar -xf toolbox.tar
    mv toolbox ~/.toolbox
    bash ~/.toolbox/install-toolbox
    source ~/.toolbox/toolbox
    echo "source ~/.toolbox/toolbox" >> ~/.bash_profile
    ```

6. Download the agent package. Find the [latest release](https://github.com/semaphoreci/agent/releases/) for your platform and architecture

    ```shell title="Download agent package"
    curl -L https://github.com/semaphoreci/agent/releases/download/v2.2.23/agent_Linux_x86_64.tar.gz -o agent.tar.gz
    tar -xf agent.tar.gz
    ```

7. Add GitHub and BitBucket SSH fingerprints

    ```shell
    sudo mkdir -p /home/$USER/.ssh
    sudo chown -R $USER:$USER /home/$USER/.ssh

    curl -sL https://api.github.com/meta | jq -r ".ssh_keys[]" | sed 's/^/github.com /' | tee -a /home/$USER/.ssh/known_hosts
    curl -sL https://bitbucket.org/site/ssh | tee -a /home/$USER/.ssh/known_hosts

    chmod 700 /home/$USER/.ssh
    chmod 600 /home/$USER/.ssh/known_hosts
    ```

8. Add your SSH private keys into the `~/.ssh/` folder
9. Test SSH connection to GitHub or BitBucket

    ```shell title="Testing SSH connection"
    ssh -T git@bitbucket.org
    ssh -T git@github.com
    ``` 

10. Start the agent

    ```shell title="Start the agent"
    agent start --config-file config.yaml
    ```

See [self-hosted agent configuration](./self-hosted-configure) to see the next steps in the setup.

### Red Hat Enterprise Linux (RHEL) {#rhel}

### macOS {#macos}

### Windows {#windows}

### AWS {#aws}

## See also
