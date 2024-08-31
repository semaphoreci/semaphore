---
description: Java Guide
sidebar_position: 5
---

# Java

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Available from '@site/src/components/Available';
import VideoTutorial from '@site/src/components/VideoTutorial';
import Steps from '@site/src/components/Steps';


This guide will help build Java projects on Semaphore.

## Overview

Java and related tools are pre-installed in Linux machines. You can switch the active compiler using [sem-version](../../reference/toolbox#sem-version).

### How to change Java versions {#versions}


Java is available on Linux [Ubuntu](../../reference/os-ubuntu) machines. To change active Java versions use `sem-version`. For example to switch to v11:

```shell
sem-version java 11
```

### Using Docker containers {#containers}

Semaphore does not distribute pre-build images for Java. You, can however, build your own images and use them with [Docker Environments](../../using-semaphore/pipelines#docker-environments).

See the [semaphoreci/docker-images](https://github.com/semaphoreci/docker-images) repository for examples of Dockerfiles.

## How to cache dependencies in Java {#cache}

The [cache](../../reference/toolbox#cache) tool automatically detects the presence Maven directories and caches dependencies.

The first job in the pipeline must cache the dependencies:

```shell
export MAVEN_OPTS=-Dmaven.repo.local=.m2
checkout
cache restore
mvn -q dependency:go-offline test-compile
cache store
```

The rest of the jobs can use the cache directly to retrieve dependencies and compiled code:

```shell
export MAVEN_OPTS=-Dmaven.repo.local=.m2
checkout
cache restore
```

## Complete example

The following pipeline builds and tests a Java project.

<details>
<summary>Show me</summary>
<div>

```yaml
version: v1.0
name: Java & Maven Example
agent:
  machine:
    type: e1-standard-2
    os_image: ubuntu2004

blocks:
  - name: Setup
    task:
      env_vars:
        # Set maven to use a local directory. This is required for
        # the cache util. It must be set in all blocks.
        - name: MAVEN_OPTS
          value: "-Dmaven.repo.local=.m2"
      jobs:
        - name: Dependencies
          commands:
            - checkout
            - cache restore
            # Download all JARs possible and compile as much as possible
            # Use -q to reduce output spam
            - mvn -q dependency:go-offline test-compile
            - cache store
  - name: Tests
    task:
      env_vars:
        - name: MAVEN_OPTS
          value: "-Dmaven.repo.local=.m2"
      prologue:
        commands:
          - checkout
          - cache restore
      jobs:
        - name: Everything
          commands:
            # Again, -q to reduce output spam. Replace with command
            # that executes tests
            - mvn -q package
```

</div>
</details>
