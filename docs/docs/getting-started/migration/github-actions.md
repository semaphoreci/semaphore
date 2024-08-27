---
description: Migrate from GitHub Actions
sidebar_position: 3
---

# GitHub Actions

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Available from '@site/src/components/Available';
import VideoTutorial from '@site/src/components/VideoTutorial';
import Steps from '@site/src/components/Steps';

This page explains the core concepts and feature mapping you need to migrate from GitHub Actions to Semaphore.

## Overview

### Caching: GitHub Actions vs Semaphore

Both Github Actions and Semaphore support manually caching files. See comparison in the tabs below.

<Tabs groupId="editor-yaml">
<TabItem value="ga" label="GitHub Actions">

GitHub Actions has a cache action to cache files. 

The following example caches Gems in a Ruby project:

```yaml
- name: Cache gems
  uses: actions/cache@v2
  with:
    path: vendor/bundle
    key: bundle-gems-${{ hashFiles('**/Gemfile.lock') }}
    restore-keys: bundle-gems-${{ hashFiles('**/Gemfile.lock') }}
```

</TabItem>
<TabItem value="semaphore" label="Semaphore">

In Semaphore, we use the [cache](../../reference/toolbox#cache) command to cache dependencies and files.

The following commands, when added to a job downloads, caches, and installs Gems in a Ruby project:

```shell
checkout
cache restore
bundle install
cache store
```

See [caching](../../using-semaphore/optimization/cache) for more details.

</TabItem>
</Tabs>

### Artifacts: GitHub Actions vs Semaphore

Both Github Actions and Semaphore support a method to persist data between jobs called Artifacts.

<Tabs groupId="editor-yaml">
<TabItem value="ga" label="GitHub Actions">

In GitHub Actions we use the actions `upload-artifact` and `download-artifact` to manage artifacts.

The following example uploads and downloads `test.log`

```yaml
- name: Upload test.log
  uses: actions/upload-artifact@v2
  with:
    name: Make
    path: test.log
- name: Download test.log
  uses: actions/download-artifact@v2
  with:
    name: Unit tests
```

</TabItem>
<TabItem value="semaphore" label="Semaphore">

In Semaphore, we use the [artifact](../../reference/toolbox#artifact) command to download and upload files to the artifact store.

The following command stores `test.log` from any job:

```shell
artifact push workflow test.log
```

To retrieve the file from any other job, we use:

```shell
artifact pull workflow test.log
```

See [artifacts](../../using-semaphore/artifacts) for more details.

</TabItem>
</Tabs>

### Language versions: GitHub Actions vs Semaphore

Both Github Actions and Semaphore allow you to use specific language versions. 

<Tabs groupId="editor-yaml">
<TabItem value="ga" label="GitHub Actions">

Github Actions uses the a language-specific setup action. 

The following example sets the Ruby version to `3.3.4`

```yaml
steps:
- uses: ruby/setup-ruby@v1
  with:
    ruby-version: '3.3.4'
```
</TabItem>
<TabItem value="semaphore" label="Semaphore">

Semaphore uses [sem-version](../../reference/toolbox#sem-version) to activate or switch language versions in the CI environment. 

The following example activates Ruby v3.3.4, any commands after the example run on this Ruby version.

```shell
sem-version ruby 3.3.4
```

</TabItem>
</Tabs>

### Database and Services: GitHub Actions vs Semaphore

Both Github Actions and Semaphore support starting a databases and services via Docker containers.

<Tabs groupId="editor-yaml">
<TabItem value="ga" label="GitHub Actions">

Github Actions uses service containers. The following example starts Redis on port 6379

```yaml
jobs:
  runner-job:
    runs-on: ubuntu-latest
    services:
      redis:
        image: redis
        ports:
          - 6379:6379
```

</TabItem>
<TabItem value="semaphore" label="Semaphore">

On Semaphore, we use [sem-service](../../reference/toolbox#sem-service) to start and stop services in the CI environment.

The following example starts Redis on the default port (6379)

```shell
sem-service start redis
```
    
</TabItem>
</Tabs>

### Complete example

The following comparison shows how to build and test a Ruby project on GitHub Actions and on Semaphore.

<Tabs groupId="editor-yaml">
<TabItem value="ga" label="GitHub Actions">

On GitHub Actions, we need several actions to start services, manage Gems, and run the build and test commands.

```yaml
name: Containers
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    env:
      PGHOST: localhost
      PGUSER: administrate
      RAILS_ENV: test
    services:
      postgres:
        image: postgres:16.4-alpine
        env:
          POSTGRES_USER: administrate
          POSTGRES_DB: ruby25
          POSTGRES_PASSWORD: ""
        ports:
          - 5432:5432
    steps:
      - uses: actions/checkout@v2
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: ‘3.3.4’
      - name: Cache dependencies
        uses: actions/cache@v2
        with:
          path: vendor/bundle
          key: bundle-gems-${{ hashFiles('**/Gemfile.lock') }}
      - name: Install postgres headers
        run: |
          sudo apt-get update
          sudo apt-get install libpq-dev
      - name: Install dependencies
        run: bundle install --path vendor/bundle
      - name: Setup environment configuration
        run: cp .sample.env .env
      - name: Setup database
        run: bundle exec rake db:setup
      - name: Run tests
        run: bundle exec rake
```

</TabItem>
<TabItem value="semaphore" label="Semaphore">

We can achieve the same results in a single job on Semaphore by using these commands:

```shell
checkout
cache restore
sem-version ruby 3.3.4
sem-service start postgres 16.4
sudo apt-get update
sudo apt-get install libpq-dev
bundle install --path vendor/bundle
cp .sample.env .env
bundle exec rake db:setup
bundle exec rake
```

</TabItem>
</Tabs>


## See also

- [Migration guide for Jenkins](./jenkins)
- [Migration guide for Travis CI](./travis)
- [Migration guide for BitBucket Pipelines](./bitbucket)
- 
