---
description: Deploy an autoscaling fleet of self-hosted agents in AWS
---

# Autoscaling with AWS

WIP: in progress

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Available from '@site/src/components/Available';
import VideoTutorial from '@site/src/components/VideoTutorial';

<Available plans={['Startup (Hybrid)', 'Scaleup (Hybrid)']}/>

Semaphore provides the open-source [AWS agent stack](https://github.com/renderedtext/agent-aws-stack) to help you deploy an autoscaling fleet of self-hosted agents in AWS.

## Overview

The AWS agent stack lets you autoscale EC2 instances on demand. Running cloud instances only when they are needed can help you gracefully manage bursts of activity and save costs when there is no work being done.

The AWS agent stack provides the following features:

- run self-hosted agents for Linux, macOS, and Windows
- [scale up and down](#scale) the number of agents based on demand
- manage [multiple stacks](#stacks) of agents using different agent types
- access agents EC2 instances [with SSH](#ssh) or using [AWS Session Manager](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html)
- use S3 buckets to provide cache storage
- fine-grained control for the size of your agent instances and your agent pool

## Prerequisites

The AWS agent stack requires the following:

- Access credentials for your AWS account
- [AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/home.html)
- [Make](https://www.gnu.org/software/make/)
- [Packer.io](https://www.packer.io/)
- Node v18 and npm or greater
- Python 3.9 or greater

## How to scale on demand {#scale}

## How to use multiple stacks {#stacks}

## How to access EC2 instances {#ssh}

## See also