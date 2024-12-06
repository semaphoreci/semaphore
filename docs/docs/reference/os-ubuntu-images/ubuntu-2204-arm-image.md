---
description: Ubuntu 22.04 (ARM) Image Reference
---

# Ubuntu 22.04 (ARM)

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Available from '@site/src/components/Available';
import VideoTutorial from '@site/src/components/VideoTutorial';
import Steps from '@site/src/components/Steps';

<Available/>

This is a customized ARM image based on [Ubuntu 22.04](https://wiki.ubuntu.com/JammyJellyfish/ReleaseNotes) (Jammy Jellyfish LTS).

This OS can only be paired with [R1 ARM machines](../machine-types#r1).

The following section describes the software pre-installed on the image.

## Version control

Following version control tools are pre-installed:

- Git 2.42.0
- Git LFS (Git Large File Storage) 3.4.1
- GitHub CLI 2.42.1
- Mercurial 6.1.1
- Svn 1.14.1

## Browsers

The following browsers and headless browsers are pre-installed. Chrome and Firefox support headless mode.

- Firefox 115.7.0 (`115`, `default`, `esr`)
- Geckodriver 0.33.0
- Chromium 120
- Chromium Driver 120
- Xvfb (X Virtual Framebuffer)

## Docker

The Docker toolset is installed and the following versions are available:

- Docker 24.0.7
- Docker-compose 2.24.2 (used as `docker compose version`)
- Docker-buildx 0.12.1
- Docker-machine 0.16.2
- Dockerize 0.7.0
- Buildah 1.23.1
- Podman 3.4.4
- Skopeo 1.4.1

## Cloud CLIs

The following cloud CLIs are pre-installed:

- Aws-cli 2.15.11 (used as `aws`)
- Azure-cli 2.56.0
- Eb-cli 3.20.10
- Ecs-cli 1.21.0
- Doctl 1.102.0
- Gcloud 425.0.0
- Gke-gcloud-auth-plugin 425.0.0
- Kubectl 1.29.1
- Terraform 1.7.0
- Helm 3.13.3

## Utilities

The following utilities are pre-installed:

- Httpie 3.2.2
- Curl 7.81.0
- Rsync 3.2.7
- gcc 11 (default) and gcc 12

## Languages


<details>
<summary>JavaScript and Node</summary>
<div>

Node.js versions are managed by [nvm](https://github.com/nvm-sh/nvm).  

You can install any version you need with `nvm install <version>`. 

Pre-installed tools:

- Node.js: v20.11.0 (set as default, with alias 20.11), includes npm 10.2.4
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

- 2.7.0 to 2.7.8
- 3.0.0 to 3.0.7
- 3.1.0 to 3.1.6
- 3.2.0 to 3.2.4
- 3.3.0 to 3.3.4
- jruby-9.3.10.0
- jruby-9.4.2.0

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

- 1.19.x
- 1.20.x
- 1.21.x (1.21.6 as default)
- 1.22.x

</div>
</details>

<details>
<summary>Java and JVM languages</summary>
<div>

- Java: 11.0.21, 17.0.9 (default)
- Scala: 3.2.2
- Leiningen: 2.10.0 (Clojure)
- Sbt 1.9.7

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
  
- 8.1.x
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

