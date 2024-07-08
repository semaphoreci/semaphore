---
description: OIDC secures access to cloud providers
---

# OpenID Connect

OpenID Connect (OICD) allows you to establish a more secure trust relationship between Semaphore and cloud providers such as AWS or Google Cloud.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Available from '@site/src/components/Available';
import VideoTutorial from '@site/src/components/VideoTutorial';

WIP

https://docs.semaphoreci.com/security/open-id-connect/
https://docs.semaphoreci.com/security/open-id-connect-aws/
https://docs.semaphoreci.com/security/open-id-connect-gcloud/
https://docs.semaphoreci.com/security/open-id-connect-vault/

## Overview

<Available plans={['Scaleup']}/>

Semaphore users traditionally use [secrets](./secrets) to inject credentials or API keys in jobs that need to interact with cloud providers. Every time the CI pipeline needs to deploy an application or fetch resources from a Docker registry or S3 bucket, we need to supply a secret to authorize Semaphrore to access your cloud.

These long-lived credentials present a challenge to maintain security or face exposure to security threats. Access and usage of these secrets needs to be carefully monitored. Secrets need to be regularly rotated and the provided access rights on the cloud should follow the principle of least privilege.

OpenID Connect (OIDC) provides an alternative way to interact with the cloud. Instead of secrets, OIDC uses short-lived access tokens that do not require secret maintanance.

TODO: DIAGRAM

OIDC eliminates the chore of rotations and securing secrets.

## How to configure OpenID Connect

### AWS

### Google Cloud

### HashiCorp Vault

## Implementation details / reference

See [OpenID Connect token reference page](../reference/openid).

## See also

- a
- b
- c
