---
description: Configure self-hosted agents
---

# Configure Agents

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Available from '@site/src/components/Available';
import VideoTutorial from '@site/src/components/VideoTutorial';

<Available plans={['Startup (Hybrid)', 'Scaleup (Hybrid)']}/>

Self-hosted agents allow you to run Semaphore jobs in your own hardware. This page explains the configuration settings available and how to enable additional features.

## Overview

Self-hosted agents accept configuration settings in three ways. In order of precedence:

- **command line arguments**: used when starting the agent, e.g. `agent start --endpoint my-org.semaphoreci.com`
- **environment variables**: supplied when starting the agent. All configuration variable names are prefixed with `SEMAPHORE_AGENT`. So, for example the `--disconnect-after-job` argument is transformed into `SEMAPHORE_AGENT_DISCONNECT_AFTER_JOB`
- **configuration file**: using the `--config` option when starting the agent, e.g. `agent start --config config.yml`

See the [Self-hosted agents configuration reference](../reference/self-hosted-config) to view all available settings.

## How to isolate jobs

## Kubernetes

The Helm chart provides a few additional configuration options so you can tweak your installation to best suit your needs. You can see all of them with helm show values renderedtext/controller. More information is also available in the chart repo.
https://github.com/renderedtext/helm-charts/tree/main/charts/controller

## How to set up caching 

### AWS S3 {#cache-s3}

### Google Cloud (#cache-gcp)

## See also