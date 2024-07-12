---
description: Deploy an autoscaling fleet of self-hosted agents in AWS
---

# Autoscaling Agents in AWS

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Available from '@site/src/components/Available';
import VideoTutorial from '@site/src/components/VideoTutorial';

<Available plans={['Startup (Hybrid)', 'Scaleup (Hybrid)']}/>
https://docs.semaphoreci.com/ci-cd-environment/aws-support/

## Overview

 This section describes how to use the auto-scaling feature.

The official [Semaphore AWS stack](https://github.com/renderedtext/agent-aws-stack) features:

- self-hosted agents for Linux, macOS, and Windows
- scale up and down the number of agents based on demand
- manage multiple stack of agents using different agent types
- access agents EC2 instances with SSH or using [AWS Session Manager](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html)
Run self-hosted agents in Linux, Windows and MacOS machines
Dynamically increase and decrease the number of agents available based on your job demand
Deploy multiple stacks of agents, one for each self-hosted agent type
Access agent EC2 instances via SSH or using AWS Systems Manager Session Manager
Use an S3 bucket to cache the dependencies needed for your jobs
Control the size of your agent instances and your agent pool
https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html


## See also