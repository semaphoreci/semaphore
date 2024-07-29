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

The cache tool lets you interact with your project's [Semaphore cache](../using-semaphore/optimization/cache).

The syntax is:

```shell
cache <command> <keys> [path] [flags]
```

The available commands are:

- `clear`: remove all keys in the cache.
- `delete`: delete a key from the cache.
- `has_key`: check if a key is present in the cache. Exits with non-zero status if key is not found.
- `is_not_empty`: check if the cache is not empty.
- `list`: list all keys in the cache.
- `restore`: restore keys from the cache.
- `store`: store keys in the cache.
- `usage`: get a summary of cache usage.

### Keys

The cache keys are a comma-separated list of strings to label or select cached items.

The following examples show different ways to store and identify Ruby Gems in the `vendor/bundle` directory:

```shell
cache store our-gems vendor/bundle
cache store gems-$SEMAPHORE_GIT_BRANCH vendor/bundle
cache store gems-$SEMAPHORE_GIT_BRANCH-revision-$(checksum Gemfile.lock) vendor/bundle
```

To restore counterparts for the example above are:

```shell
cache restore our-gems
cache restore gems-$SEMAPHORE_GIT_BRANCH
cache restore gems-$SEMAPHORE_GIT_BRANCH-revision-$(checksum Gemfile.lock),gems-master
```

`cache restore` always retrieves the first item that matches a key found in the cache. The rest are ignored. If no archives are restored the command exits with exit status 0.

:::note

As cache store uses tar, which automatically removes any leading / from a given path value, any further changes of path after the store command completes will not be automatically propagated to cache.

:::

### Space management {#cache-storage}

The `cache store` command automatically deletes older files when the cache is full. You can change the deletion criteria using the `--cleanup-by` or `-c` argument. For example:

```shell
cache store our-gems vendor/bundle --cleanup-by SIZE
```

The supported options for `--cleanup-by` are:

- `SIZE`: delete biggest files first
- `STORE_TIME`: (default) delete oldest files first
- `ACCESS_TIME`: delete oldest accessed files first


### Environment variables {#cache-env-vars}

The cache tool depends on the following environment variables:

- [`SEMAPHORE_CACHE_URL`](./env-vars#cache-url)
- [`SEMAPHORE_CACHE_USERNAME`](./env-vars#cache-username)
- [`SEMAPHORE_CACHE_PRIVATE_KEY_PATH`](./env-vars#cache-private-key-path)

## checkout {#checkout}

This tool clones the repository using Git. For performance reasons, the default behavior is to perform a [shallow clone](https://git-scm.com/docs/shallow). Shallow clones only include the latest commit instead of the full repository history.

The `checkout` command takes no arguments. It also changes directory into the cloned repository. So, for example, this would work on a Node.js project:

```shell title="No need to cd into the cloned repository"
checkout
npm install
```

### Full clone {#full-clone}

If you want to do a full clone of the repository you can run the following commands to "unshallow" a repository:

```shell
checkout
git fetch --unshallow
git config remote.origin.fetch '+refs/heads/*:refs/remotes/origin/*'
git fetch --all
```

### Full clone {#cache-full-clone}

:::info

This is marked as an experimental feature

:::

If a full clone takes too long, you can use `checkout --use-cache` to save a copy of the repository in the Semaphore cache. This should speed up full clones significantly.

To perform a full repository clone with cache run:

```shell
checkout --use-cache
```

This option creates or refreshes one or more copies of the repository in the Semaphore cache. See the [environment variables](#cache-env) to learn how to control the behavior of the cached copies.

### Environment variables {#cache-env}

The checkout command uses the following environment variables

- [`SEMAPHORE_GIT_URL`](./env-vars#git-url)
- [`SEMAPHORE_GIT_DIR`](./env-vars#git-dir)
- [`SEMAPHORE_GIT_SHA`](./env-vars#git-sha)
- [`SEMAPHORE_GIT_DEPTH`](./env-vars#git-depth)
- [`SEMAPHORE_GIT_CACHE_AGE`](./env-vars#git-cache-age) (only available after using `--use-cache`)
- [`SEMAPHORE_GIT_CACHE_KEEP`](./env-vars#git-cache-keep) (only available after using `--use-cache`)

## checksum {#checksum}

This tool takes a single argument which is the file to checksum. It outputs the MD5 checksum of the file's contents. This tool is useful for tagging [artifacts](../using-semaphore/artifacts) or generating [cache keys](../using-semaphore/optimization/cache).

The syntax is:

```shell title="checksum syntax"
checksum <file>
```

Example:

```shell title="Checksumming package-lock.json"
$ checksum package-lock.json
3dc6f33834092c93d26b71f9a35e4bb3
```

## install-package {#install-package}

The `install-package` tool is used to manage Ubuntu packages you may need for your jobs. It downloads and caches packages in a way that can be quickly reinstalled over and over again in different jobs. This is a convenience tool, you can still use `sudo` to install packages using the system's package manager.


The syntax is:

```shell title="install-package syntax"
install-package <command> <pkg-name>
```

Where `<pkg-name>` is the Ubuntu package name without the `.deb` extension. In other words, you want `libc6` instead of `libc6.deb`.

Where command is one of the following:

- `update`: Retrieve new lists of packages
- `upgrade`: Perform an upgrade
- `install`: Install new packages 
- `reinstall`: Reinstall packages 
- `remove`: Remove packages
- `purge`: Remove packages and config files
- `autoremove`: Remove automatically all unused packages
- `dist-upgrade`: Distribution upgrade, see apt-get(8)
- `dselect-upgrade`: Follow dselect selections
- `build-dep`: Configure build-dependencies for source packages
- `satisfy`: Satisfy dependency strings
- `clean`: Erase downloaded archive files
- `autoclean`: Erase old downloaded archive files
- `check`: Verify that there are no broken dependencies
- `source`: Download source archives
- `download`: Download the binary package into the current directory
- `changelog`: Download and display the changelog for the given package

You can supply multiple packages with their versions in the same invocation:

```shell
 install-package install mongodb-clients=3.6.8 mysql-client=8.0.36-0ubuntu0.20.04.1
```

The tool integrates with the [Semaphore cache](../using-semaphore/optimization/cache) to save, retrieve, and update the Deb packages as needed.

You can reinstall the packages in a different job within the same project with:

```shell title="Installing packages from cache in other jobs"
install-package install
```

## retry {#retry}

The retry tool can be used to retry a command on an interval. This is useful when waiting for resources to become available or mitigate connectivity issues.

The syntax is:

```shell title="retry syntax"
retry [flags] <command>
```

Where flags are optional arguments:

- `--times` or `-t`: number of times to retry before giving up. Default is 3
- `--sleep` or `-s`: wait interval between retries in seconds. Default is 0

For example, to retry 5 times `bundle install` with a 10 second sleep use:

```shell
retry --times 5 --sleep 10 bundle install
```

## sem-service {#sem-service}

The `sem-service` tool manages databases and other useful services in Ubuntu-based environments. 

:::info

sem-service does not work on [Docker-based environments](../using-semaphore/pipelines#docker-environments).

:::

The syntax is:

```shell title="sem-service syntax"
sem-service <command> <service> [version] [flags]
```

Where `<command>` is one of the following:

- `start`: starts a service in the backgroun, returns when service is ready to accept connections
- `stop`: stops a running service
- `status`: returns non-zero exit status if service is not running

All services run locally on the agent running the job. Started services always listen on 0.0.0.0 and their default port.

### Services supported {#sem-service-services}

The `<service>` argument is one of the following:

- `mysql`
- `postgres`
- `postgis`
- `redis`
- `rabbitmq`
- `memcached`
- `mongodb`
- `elasticsearch`
- `opensearch`
- `cassandra`
- `rethinkdb`

The `<version>` argument depends on the kind of service being started. You can run `sem-service help` to see all available services and versions.

### Options for MySQL and PostgreSQL {#sem-service-options}

When starting `mysql` or `postgres` services you can provide the following optional arguments:

- `--username=<username>`: user with admin permissions on the instance
  - On `mysql` defaults to "root"
  - On `postgres` defaults to "postgres"
- `--password=<username>`: password for the admin user
  - On `mysql` defaults to "test"
  - On `postgres` defaults to a blank string
- `--db=<name>` database name to create and default to


### Container registry {#sem-service-container}

The `sem-service` tool pulls images from the [Semaphore Container Registry](../using-semaphore/optimization/container-registry).

## sem-version {#sem-version}

The `sem-version` tool manages language and utilities versions in Ubuntu environments. It provides a quick and simple way to install and switch to a version of a command line tool or programming language.

:::info

sem-version does not work on [Docker-based environments](../using-semaphore/pipelines#docker-environments).

:::

The syntax is:

```shell title="sem-version syntax"
sem-version <target> <version> [flags]
```

Where `<target>` is one of the following:

- `elixir`
- `erlang`
- `go`
- `java`
- `kubectl`
- `php`
- `ruby`
- `python`
- `scala`
- `node`

The `<version>` depends on the target used. The command fails with non-zero exit code unless the `--ignore` or `-i` flag is supplied.

For example, to download and use Go version 1.22:

```shell
sem-version go 1.22
```

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