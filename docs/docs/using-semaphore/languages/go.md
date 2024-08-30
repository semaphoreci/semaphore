---
description: Go (Golang) Guide
sidebar_position: 6
---

# Go

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Available from '@site/src/components/Available';
import VideoTutorial from '@site/src/components/VideoTutorial';
import Steps from '@site/src/components/Steps';

## Overview

The Go toolchain is pre-installed in Linux machines. You can switch the active compiler using [sem-version](../../reference/toolbox#sem-version).

## How to compile Go binaries {#compiling-go}

You can compile a Go binary in a Linux job with:

```shell
checkout
go build -o my-app main.go
```

See [artifacts](../artifacts) to learn how to save and persist the built binary.

## How to switch Go versions {#versions}

Use [sem-version](../../reference/toolbox#sem-version) to switch between Go versions. This only works on Linux machines.

```shell
checkout
sem-version go 1.22
go version
```

### Using Docker containers {#containers}

The `sem-version` tool does not work on Docker containers. You must use a pre-built Docker image with the language versions you need and run the job using [Docker environments](../../using-semaphore/pipelines#docker-environments).

You can use the pre-build [Go images](../../using-semaphore/optimization/container-registry#go) or build your own. Find Dockerfiles to build your custom images in the [semaphoreci/docker-images](https://github.com/semaphoreci/docker-images) repository.

## How to use GOPATH {#gopath}

For Go versions 1.11 and below you have to prepare the GOPATH directory structure that Go expects. Run this commands before using Go in the CI environment if you're using Go 1.11 of lower:

```shell
export "SEMAPHORE_GIT_DIR=$(go env GOPATH)/src/github.com/${SEMAPHORE_PROJECT_NAME}"
export "PATH=$(go env GOPATH)/bin:${PATH}"
mkdir -vp "${SEMAPHORE_GIT_DIR}" "$(go env GOPATH)/bin"
```

## How to cache Go dependencies {#cache}

The [cache](../../reference/toolbox#cache) tool automatically detects the presence of `go.mod` and caches all Go modules.

The first job in the pipeline must cache the dependencies:

```shell
checkout
cache restore
go get
cache store
go build
```

The rest of the jobs can use the cachre directly:

```shell
checkout
cache restore
go build
```

## How to configure test reports {#test}