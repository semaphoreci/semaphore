---
description: Feature comparison between Semaphore editions
---

# Feature Comparison

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Available from '@site/src/components/Available';
import VideoTutorial from '@site/src/components/VideoTutorial';
import Steps from '@site/src/components/Steps';
import FeatureNotAvailable from '@site/src/components/FeatureNotAvailable';

This page compares the features available across all [Semaphore editions](./about-semaphore).

## CI/CD Workflows

Legends: ? (unknown), p (pending/planned), x (deleted pages/content), c (confirmed live)

| Feature | Semaphore Cloud | Semaphore CE |
|--|--|--|
| Visual editor | Yes | Yes |
| Artifacts | Yes | Yes |
| Tasks | Yes | Yes |
| SSH Debug | Yes | Yes |
| Cache | Yes | Yes |
| Monorepo support | Yes | Yes |
| Initialization jobs | Yes | Yes |
| Self-hosted agents | Yes | Yes |
| GitHub support | Yes | Yes |
| BitBucket support | Yes | Yes |
| Promotions | Yes | No |
| Parameterized promotions | Yes | No |
| Deployment targets | Yes | No |
| Pre-flight checks | Yes | No |
| sem-service & sem-version | Yes | No |


## Dashboards

| Feature | Semaphore Cloud | Semaphore CE |
|--|--|--|
| Test reports | Yes | Yes |
| Activity monitor | Yes | Yes |
| CustomeDashboards | Yes | No |
| Flaky tests | Yes | No |
| Project insights | Yes | No |
| Organization health | Yes | No |


## Security and compliance

| Feature | Semaphore Cloud | Semaphore CE |
|--|--|--|
| Project-level secrets | Yes | Yes |
| Organization secrets | Yes | Yes |
| Policies for accessing secrets | Yes | No |
| Audit logs | Yes | No |


## User and permissions management 

| Feature | Semaphore Cloud | Semaphore CE |
|--|--|--|
| Multiple organizations | Yes | No | 
| Invite users to your organization | Yes | Yes |
| Organization roles | Yes | Yes |
| Project roles | Yes | Yes (*) |
| User groups | Yes | No |
| xCustom Roles | Yes | No |

(*) Project roles exist but cannot be manually assigned to individual users. The role is assigned based on project-membership and org-wide user roles.

## Integrations 

| Feature | Semaphore Cloud | Semaphore CE |
|--|--|--|
| Repository status checks | Yes | Yes |
| Repository badges | Yes | Yes |
| Slack notifications | Yes | Yes |
| Webhook notifications | Yes | Yes |
| SAML/SCIM integrations | Yes | No |
| Okta integration | Yes | No |
| OpenID Connect | Yes | No |
| GitHub SSO | Yes | No |

## See also

- [Guided tour](./guided-tour)
- [Migration guides](./migration/overview)
- [Install Semaphore CE](./install)

