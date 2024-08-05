---
description: Ubuntu Image Reference
---

# Linux Ubuntu Images

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Available from '@site/src/components/Available';
import VideoTutorial from '@site/src/components/VideoTutorial';

<Available/>

This page describes the Ubuntu images supported on Semaphore Cloud.

## Overview

The Operating System image defines what OS and software is pre-installed in you [agents](../using-semaphore/pipelines#agents). 

This page describes OS images to run on Linux-based Semaphore Cloud [machines](./machine-types). You can add more OS options using [self-hosted agents](../using-semaphore/self-hosted).

### Installing packages {#install}

You have full `sudo` passworldless permissions to install and modify OS packages as needed. Ubuntu package manager is [apt](https://ubuntu.com/server/docs/package-management).

To install a package, run:

```shell
sudo apt-get update
sudo apt-get install -y <package-name>
```

:::info

Packages are installed from a package repository located near the machines for more performance.

:::

### Disabled repositories {#disabled-repos}

Due to occasional issues with some of the repositories that break the pipeline during the `apt-get update` command, the following package sources repositories have been disabled and moved to `/etc/apt/sources.list.d/disabled`:

- `azure-cli.list`
- `devel_kubic_libcontainers_stable.list`
- `docker.list`
- `firefox.list`
- `git.list`
- `google-cloud-sdk.list`
- `gradle.list`
- `helm.list`
- `pypy.list`
- `python.list`
- `yarn.list`

If you need any of these package repositories, execute the following command:

```shell
sudo mv /etc/apt/sources.list.d/disabled/<package-repository-file.list> /etc/apt/sources.list.d/
sudo apt-get update
```

### Nested virtualization {#nested-virtualization}

Linux-based machine support nested virtualization. You can create virtual machines inside the virtual machine running your agent using [libvirt]

Follow these commands to use nested virtualization:

1. Check that nested virtualization is supported. The output should be `0`
    ```shell
    grep -cw vmx /proc/cpuinfo
    ```
2. Install the required packages
    ```shell
    sudo apt-get install -y uvtool sshpass net-tools netcat-openbsd
    ```
3. Download prebuilt Ubuntu cloud image
    ```shell
    uvt-simplestreams-libvirt --verbose sync --source http://cloud-images.ubuntu.com/daily release=focal arch=amd64
    uvt-simplestreams-libvirt query
    ```
4. Create a new SSH keypair
    ```shell
    rm -rf ~/.ssh/id_rsa
    echo | ssh-keygen -t rsa  -f ~/.ssh/id_rsa
    ```
5. Create the VM
    ```shell
    uvt-kvm create vm1 --memory 1024 --cpu 1 --disk 4 --password ubuntu --bridge virbr0
    uvt-kvm list
    ```
6. Wait for machine to be up and IP to be available
    ```shell
    IP=""
    while [ -z $IP ];do IP=$(arp -an | grep $(virsh dumpxml vm1| grep "mac address" | cut -d"'" -f2)|cut -d"(" -f2|cut -d")" -f1);done
    echo $IP
    while ! nc -w5 -z $IP 22; do  echo "Sleep while $IP is up";sleep 1; done
    ```
7. Run the commands in the VM using SSH. For example, this runs `uname -a`
    ```shell
    sshpass -p "ubuntu" -v  ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no ubuntu@$IP -t 'uname -a'
    ```

The predefined default network for nested virtualization is 192.168.123.0/24. The base VM provides virbr0 interface with the IP address: 192.168.123.1.

## Ubuntu 22.04 (x86_64) {#ubuntu2204-x86}

### Version control

Following version control tools are pre-installed:

- Git 2.43.0
- Git LFS (Git Large File Storage) 3.4.1
- GitHub CLI 2.44.1
- Mercurial 6.1.1
- Svn 1.14.1

### Browsers

The following browsers and headless browsers are pre-installed. Chrome and Firefox support headless mode.

- Firefox 102.11.0 (`102`, `default`, `esr`)
- Geckodriver 0.33.0
- Google Chrome 121
- ChromeDriver 121
- Xvfb (X Virtual Framebuffer)
- Phantomjs 2.1.1

### Docker

Docker toolset is installed and the following versions are available:

- Docker 25.0.2
- Docker-compose 1.29.2 (used as `docker-compose --version`)
- Docker-compose 2.24.5 (used as `docker compose version`)
- Docker-buildx 0.12.1
- Docker-machine 0.16.2
- Dockerize 0.7.0
- Buildah 1.23.1
- Podman 3.4.4
- Skopeo 1.4.1

### Cloud CLIs

The following cloud tools are pre-installed:

- Aws-cli 2.15.17 (used as `aws`)
- Azure-cli 2.57.0
- Eb-cli 3.20.10
- Ecs-cli 1.21.0
- Doctl 1.104.0
- Gcloud 425.0.0
- Gke-gcloud-auth-plugin 425.0.0
- Kubectl 1.29.1
- Heroku 8.7.1
- Terraform 1.7.2
- Helm 3.14.0

### Utilites

The following utilities are pre-installed:

- Httpie 3.2.2
- Curl 7.81.0
- Rsync 3.2.7
- gcc 11 (default), and gcc 12

### Languages

The following languages and toolsets are pre-installed.

<details>
<summary>JavaScript and Node</summary>
<div>

Node.js versions are managed by [nvm](https://github.com/nvm-sh/nvm).  

You can install any version you need with `nvm install <version>`. 

Pre-installed tools:

- v20.11.0 includes npm 10.2.4
- Yarn: 1.22.19

</div>
</details>

<details>
<summary>Python</summary>
<div>


Python versions are installed and managed by
[virtualenv](https://virtualenv.pypa.io/en/stable/). Installed versions:

- 3.10.12
- 3.11.7
- 3.12.1

Supporting libraries:

- pypy: 7.3.9
- pypy3: 7.3.15
- pip: 24.0
- venv: 20.25.0


</div>
</details>

<details>
<summary>Ruby</summary>
<div>

Available versions:

- 3.0.0 to 3.0.7
- 3.1.0 to 3.1.6
- 3.2.0 to 3.2.4
- 3.3.0 to 3.3.4
- jruby-9.4.1.0

The default installed Ruby version is `3.2.3`.

</div>
</details>

<details>
<summary>Erlang and Elixir</summary>
<div>

Erlang versions are installed and managed via [kerl](https://github.com/kerl/kerl).
Elixir versions are installed with [kiex](https://github.com/taylor/kiex).

- Erlang: 24.3, 25.0, 25.1, 25.2, 25.3 (default), 26.0, 26.1, 26.2, 27.0
- Elixir: 1.9.x, 1.10.x, 1.11.x, 1.12.x, 1.13.x, 1.14.x (1.14.5 as default), 1.15.x, 1.16.x, 1.17.x

Additional libraries:

- Rebar3: 3.22.1

</div>
</details>

<details>
<summary>Go</summary>
<div>

- 1.10.x
- 1.11.x
- 1.12.x
- 1.13.x
- 1.14.x
- 1.15.x
- 1.16.x
- 1.17.x
- 1.18.x
- 1.19.x
- 1.20.x
- 1.21.x (1.21.6 as default)
- 1.22.x
- 
</div>
</details>

<details>
<summary>Java and JVM languages</summary>
<div>

- Java: 11.0.21, 17.0.9 (default)
- Scala: 3.2.2
- Leiningen: 2.11.1 (Clojure)
- Sbt 1.9.8

Build tools:

- Maven: 3.9.6
- Gradle: 8.3
- Bazel: 7.0.2

</div>
</details>


<details>
<summary>PHP</summary>
<div>

PHP versions are managed by [phpbrew](https://github.com/phpbrew/phpbrew).
Available versions:

- 8.1.20 and above
- 8.2.x
- 8.3.x

The default installed PHP version is `8.1.27`.

Additional tools:

- PHPUnit: 9.5.28

</div>
</details>

<details>
<summary>Rust</summary>
<div>

- 1.75.0

</div>
</details>

## Ubuntu 22.04 (ARM) {#ubuntu2204-arm}

### Version control

### Browsers

### Docker

### Cloud CLIs

### Utilites

### Languages


## See also

