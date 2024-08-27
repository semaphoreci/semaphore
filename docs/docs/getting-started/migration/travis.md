---
description: Migrate from Travis CI
sidebar_position: 4
---

# Travis CI

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Available from '@site/src/components/Available';
import VideoTutorial from '@site/src/components/VideoTutorial';
import Steps from '@site/src/components/Steps';

This page explains the core concepts and feature mapping you need to migrate from Travis CI to Semaphore.

## Overview

## Travis CI vs Semaphore

### Caching

Both Travis CI and Semaphore support manually caching files. See comparison in the tabs below.

<Tabs groupId="editor-yaml">
<TabItem value="ga" label="Travis CI">

Travis CI has a cache keyword to cache files and dependencies.

The following example caches Gems in a Ruby project:

```yaml
language: ruby
cache: bundler
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

### Artifacts

Both Travis CI and Semaphore support a method to persist data between jobs called Artifacts.

<Tabs groupId="editor-yaml">
<TabItem value="ga" label="Travis CI">

In Travis CI we use the artifacts addon.

The following example uploads and downloads `test.log`

```yaml
addons:
  artifacts:
    # ⋮
    paths:
    - $HOME/project/test.log
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

### Language versions


Both Travis CI and Semaphore allow you to use specific language versions. 

<Tabs groupId="editor-yaml">
<TabItem value="ga" label="Travis CI">

Travis CI uses the a language-specific setup keyword. 

The following example sets the Ruby version to `3.3.4`

```yaml
language: ruby
rvm:
  - 3.3.4
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

### Database and services

Both Travis CI and Semaphore support starting a databases and services. Semaphore uses Docker containers for this.

<Tabs groupId="editor-yaml">
<TabItem value="ga" label="Travis CI">

Travis CI uses services keyword. The following example starts Redis on default port.

```yaml
services:
  - redis-server
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

The following comparison shows how to build and test a Ruby project on Travis CI and on Semaphore.

<Tabs groupId="editor-yaml">
<TabItem value="ga" label="Travis CI">

On Travis CI, we need several actions to start services, manage Gems, and run the build and test commands.

```yaml
language: ruby
rvm:
  - 3.3.4
cache:
  - bundler
  - yarn
services:
  - postgresql
before_install:
  - nvm install --lts
before_script:
  - bundle install --jobs=3 --retry=3
  - yarn
  - bundle exec rake db:create
  - bundle exec rake db:schema:load
script:
  - bundle exec rake test
  - bundle exec rake test:system
```

</TabItem>
<TabItem value="semaphore" label="Semaphore">

We can achieve the same results in a single job on Semaphore by using these commands:

```shell
checkout
sem-version ruby 3.3.4
sem-service start postgres
cache restore
nvm install --lts
bundle install --path vendor/bundle
yarn install
cache store
bundle exec rake db:create
bundle exec rake db:schema:load
bundle exec rake test
bundle exec rake test:system
```

</TabItem>
</Tabs>

## See also

- [Migration guide for Jenkins](./jenkins)
- [Migration guide for GitHub Actions](./github-actions)
- [Migration guide for BitBucket Pipelines](./bitbucket)
