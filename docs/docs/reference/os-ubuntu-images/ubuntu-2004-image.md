---
description: Ubuntu 20.04 Image Reference
---

# Ubuntu 20.04 (x86_64)

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Available from '@site/src/components/Available';
import VideoTutorial from '@site/src/components/VideoTutorial';
import Steps from '@site/src/components/Steps';

<Available/>

This is a customized x86_64 image based on [Ubuntu 20.04](https://wiki.ubuntu.com/FocalFossa/ReleaseNotes) (Focal Fossa LTS).

<Tabs groupId="editor-yaml">
<TabItem value="editor" label="Editor">

To use this operating system, choose `ubuntu2004` in the **OS Image** selector. This OS can be paired with any Intel-x86_64 [Linux Machine](../machine-types#linux).

![Selecting the Ubuntu 20.04 using the workflow editor](./img/ubuntu2004-selector.jpg)

</TabItem>
<TabItem value="yaml" label="YAML">

To use this operating system, use `ubuntu2004` as the `os_image`. This OS can be paired with any [Linux Machine](../machine-types#linux).

```yaml
version: v1.0
name: Initial Pipeline
agent:
  machine:
  # highlight-start
    type: e1-standard-1
    os_image: ubuntu2004
  # highlight-end
```

</TabItem>
</Tabs>

The following section describes the software pre-installed on the image.

## Toolbox

The image comes with the following [toolbox utilities](../toolbox) preinstalled:

- [sem-version](../toolbox#sem-version): manage language versions on Linux
- [sem-service](../toolbox#sem-service): manage databases and services on Linux

## Version control

Following version control tools are pre-installed:

- Git 2.46.0
- Git LFS (Git Large File Storage) 3.5.1
- GitHub CLI 2.55.0
- Mercurial 5.3.1
- Svn 1.13.0

### Browsers and Headless Browser Testing

- Firefox 68.9 (`68`, `esr-old`), 78.1 (`78`, `default`, `esr`), 102.11.0 (`102`, `esr-new`, `esr-latest`)
- Geckodriver 0.33.0
- Google Chrome 128
- ChromeDriver 128
- Xvfb (X Virtual Framebuffer)
- Phantomjs 2.1.1

Chrome and Firefox both support headless mode. You shouldn't need to do more than install and use the relevant Selenium library for your language. Refer to the documentation of associated libraries when configuring your project.

### Docker

Docker toolset is installed and the following versions are available:

- Docker 27.2.0
- Docker-compose 1.29.2 (used as `docker-compose --version`)
- Docker-compose 2.29.2 (used as `docker compose version`)
- Docker-buildx 0.16.2
- Docker-machine 0.16.2
- Dockerize 0.7.0
- Buildah 1.22.3
- Podman 3.4.2
- Skopeo 1.5.0

### Cloud CLIs

- Aws-cli v1 (used as `aws`) 1.34.10
- Aws-cli v2 (used as `aws2`) 2.17.40
- Azure-cli 2.64.0
- Eb-cli 3.20.10
- Ecs-cli 1.21.0
- Doctl 1.111.0
- Gcloud 490.0.0
- Gke-gcloud-auth-plugin 490.0.0
- Kubectl 1.29.1
- Heroku 9.2.0
- Terraform 1.9.5
- Helm 3.15.4

### Network utilities

- Httpie 3.2.2
- Curl 7.68.0
- Rsync 3.1.3

## Compilers

- gcc: 9, 10 (default)

## Languages

### Erlang and Elixir

Erlang versions are installed and managed via [kerl](https://github.com/kerl/kerl).
Elixir versions are installed with [kiex](https://github.com/taylor/kiex).

- Erlang: 22.3, 23.3, 24.1, 24.2, 24.3 (default), 25.0, 25.1, 25.2, 25.3, 26.0, 26.1, 26.2, 27.0
- Elixir: 1.9.x, 1.10.x, 1.11.x, 1.12.x, 1.13.x (1.13.4 as default), 1.14.x, 1.15.x, 1.16.x, 1.17.x

Additional libraries:

- Rebar: 2.6.4
- Rebar3: 3.22.1

### Go

Versions:

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
- 1.21.x
- 1.22.x
- 1.23.x (1.23.0 as default)

### Java and JVM languages

- Java: 11.0.24 (default), 17.0.12
- Scala: 2.12.15, 3.1.3
- Leiningen: 2.11.2 (Clojure)
- Sbt 1.10.1

### Additional Java build tools

- Maven: 3.9.6
- Gradle: 8.10
- Bazel: 7.3.1

### JavaScript via Node.js

Node.js versions are managed by [nvm](https://github.com/nvm-sh/nvm).
You can install any version you need with `nvm install [version]`.
Installed version:

- v20.17.0 (set as default, with alias 20.17), includes npm 10.8.2

### Additional JS tools

- Yarn: 1.22.22

### PHP

PHP versions are managed by [phpbrew](https://github.com/phpbrew/phpbrew).
Available versions:

- 7.4.x
- 8.0.x
- 8.1.x
- 8.2.x
- 8.3.x

The default installed PHP version is `7.4.33`.

### Additional PHP libraries

PHPUnit: 7.5.20

### Python

Python versions are installed and managed by
[virtualenv](https://virtualenv.pypa.io/en/stable/). Installed versions:

- 3.8.10 (default)
- 3.9.19
- 3.10.14
- 3.11.9
- 3.12.5

Supporting libraries:

- pypy: 7.3.9
- pypy3: 7.3.16
- pip: 24.2
- venv: 20.26.3

### Ruby

Available versions:

- 2.6.x
- 2.7.x
- 3.0.x
- 3.1.x
- 3.2.x
- 3.3.x
- jruby-9.2.11.1
- jruby-9.3.9.0
- jruby-9.4.0.0

The default installed Ruby version is `2.7.8`.

## See also

- [Installing packages on Ubuntu](../os-ubuntu)
- [Machine types](../machine-types)
- [Semaphore Toolbox](../toolbox)
- [Pipeline YAML refence](../pipeline-yaml)
