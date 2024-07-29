---
description: Semaphore toolbox reference
---

# Semaphore Toolbox

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Available from '@site/src/components/Available';
import VideoTutorial from '@site/src/components/VideoTutorial';

The toolbox is an [open source](https://github.com/semaphoreci/toolbox) package of command line tools available in every Semaphore job. It provides utility functions to clone, cache data, run test services, or change language versions. This page explains all the available tools

## Overview

The Semaphore toolbox is preinstalled in all Semaphore jobs. It is also installed in [self-hosted agents](../using-semaphore/self-hosted), so you can assume that all the tools described in this page are available for use.

## artifact {#artifact}

This is the command line tool to access the [Semaphore artifacts](../using-semaphore/artifacts).

The usage is:

```shell
artifact <command> <namespace> <file_or_directory> [flags]
```

The available commands are:

- `help`: print help on the terminal
- `pull`: pull a file or directory from the artifact store
- `yank`: pull and delete a file or directory from the artifact store

The available namespaces are:

- `job`: storage available only to current job
- `workflow`: storage available to jobs in all pipelines in the workflow
- `project`: global storage for the project

See [artifact namespaces](../using-semaphore/artifacts#namespaces) for more details.

The optional flags are:
- `--force` or `-f`: overwrite file or directory if already exists
- `--destination` of `-d`: pull or yank the file into a different path
- `--verbose` or `-v`: verbose logging

### Supported filenames

The uploaded files must meet the following requirements:

- Unicode characters are supported
- File name lengths must be bewteen 1-1024 bytes when UTF-8 encoded
- File names cannot contain end of line characters (carraige return or line feed)
- File names cannot start with `.well-known/acme-challenge/`
- File names cannot contain non URI-encodable characters like `{, }, |, \, ^, ~, [, ]`
- Files cannot be named `.` or `...`

You can workaround these limitations by compressing the file with tar before pushing it to the artifact store. For example: 

```shell title="Creating a tarball before storing the artifact"
tar -czvf example.tar.gz ~/example
artifact push workflow example.tar.gz
```

To retrieve the files, use:

```shell title="Retrieving the tarball"
artifact pull workflow example.tar.gz
tar -xzf example.tar.gz
```

### Examples

```shell title="Artifact usage examples"
# force push a final deliverable to the project level
artifact push project app-v1.tar.gz --force

# push a screenshot to the job level
artifact push job screenshots/app.png

# push a binary to the workflow level 
artifact push workflow build/app

# pull a binary from the workflow level 
artifact pull workflow build/app

# delete a binary from the workflow level 
artifact yank workflow build/app
```

## cache {#cache}

## checkout {#checkout}

This tool clones the repository using Git. For performance reasons, the default behavior is to perform a [shallow clone](https://git-scm.com/docs/shallow). Shallow clones only include the latest commit instead of the full repository history.

The `checkout` command takes no arguments. It also changes directory into the cloned repository. So, for example, this would work on a Node.js project:

```shell title="No need to cd into the cloned repository"
checkout
npm install
```

### Full clone {#cache-full-clone}

To perform a full repository clone add `--use-cache` to the command.

```shell
checkout --use-cache
```

This option creates or refreshes a Semaphore-maintained cache for your repository. Note that using the option redirects the clone from GitHub or BitBucket to the Semaphore Git Cache, as a result you may not get the latest revision of your code. See the [environment variables](#cache-env for more details.

If you prefer to avoid using the Semaphore Git Cache, you can run the following commands to "unshallow" a repository:

```shell
checkout
git fetch --unshallow
git config remote.origin.fetch '+refs/heads/*:refs/remotes/origin/*'
git fetch --all
```



Examples:


checkout
Notice that the checkout command automatically changes the current working directory in the Operating System of the VM to the directory defined in the SEMAPHORE_GIT_DIR environment variable.

The following command will tell checkout to use the Semaphore Cache server to get the contents of the repository, instead of using git server:


checkout --use-cache
If you set SEMAPHORE_GIT_CACHE_KEEP to 1, it will keep two copies in the Semaphore Cache server: the active one and its antecedent.

If you set SEMAPHORE_GIT_CACHE_AGE=86400, the cache for the repository will be updated after 1 day.

### Environment variables {#cache-env}

The checkout command uses the following environment variables

- [`SEMAPHORE_GIT_URL`](./env-vars#git-url)
- [`SEMAPHORE_GIT_DIR`](./env-vars#git-dir)
- [`SEMAPHORE_GIT_SHA`](./env-vars#git-sha)
- [`SEMAPHORE_GIT_DEPTH`](./env-vars#git-depth)
- [`SEMAPHORE_GIT_CACHE_AGE`](./env-vars#git-cache-age)
- [`SEMAPHORE_GIT_CACHE_KEEP`](./env-vars#git-cache-keep)

## checksum {#checksum}

This tool takes a single argument which is the file to checksum. It outputs the MD5 checksum of the file's contents. This tool is useful for tagging [artifacts](../using-semaphore/artifacts) or generating [cache keys](../using-semaphore/optimization/cache).

Example:

```shell title="Checksumming package-lock.json"
$ checksum package-lock.json
3dc6f33834092c93d26b71f9a35e4bb3
```

## install-package {#install-package}


## retry {#retry}



## sem-service {#sem-service}

## sem-version {#sem-version}

## See also

## package contents

```shell
drwxrwxr-x 2 1001 1001     4096 Jul 11 14:02 .
drwxr-xr-x 3 root root     4096 Jul 29 17:48 ..
-rw-rw-r-- 1 1001 1001      365 Jul 11 14:02 Dockerfile.dev
-rw-rw-r-- 1 1001 1001      320 Jul 11 14:02 README.md
-rwxrwxr-x 1 1001 1001  8253440 Oct 18  2023 artifact
-rw-rw-r-- 1 1001 1001 30031455 Jul 11 14:02 cache
-rwxrwxr-x 1 1001 1001     2090 Jul 11 14:02 enetwork
-rwxrwxr-x 1 1001 1001     2758 Jul 11 14:02 install-package
-rw-rw-r-- 1 1001 1001     4538 Jul 11 14:02 install-toolbox
-rwxrwxr-x 1 1001 1001     7525 Jul 11 14:02 libcheckout
-rw-rw-r-- 1 1001 1001      248 Jul 11 14:02 libchecksum
-rw-rw-r-- 1 1001 1001     1550 Jul 11 14:02 retry
-rw-rw-r-- 1 1001 1001  4879359 Jul 11 14:02 sem-context
-rw-rw-r-- 1 1001 1001      189 Jul 11 14:02 sem-dockerize
-rw-rw-r-- 1 1001 1001     7086 Jul 11 14:02 sem-install
-rw-rw-r-- 1 1001 1001     4689 Jul 11 14:02 sem-semantic-release
-rwxrwxr-x 1 1001 1001    18528 Jul 11 14:02 sem-service
-rw-rw-r-- 1 1001 1001     6712 Jul 11 14:02 sem-service-check-params
-rwxrwxr-x 1 1001 1001     9883 Jul 11 14:02 sem-version
-rwxrwxr-x 1 1001 1001  6742016 Jun  4 12:50 spc
-rw-rw-r-- 1 1001 1001     2158 Jul 11 14:02 ssh-session-cli
-rw-rw-r-- 1 1001 1001     1584 Jul 11 14:02 system-metrics-collector
-rwxrwxr-x 1 1001 1001  6774784 Nov 23  2023 test-results
-rw-rw-r-- 1 1001 1001      120 Jul 11 14:02 toolbox
-rwxrwxr-x 1 1001 1001  1635790 Jul 11 14:02 when
```