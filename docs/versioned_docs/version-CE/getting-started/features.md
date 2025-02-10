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
| cVisual editor | Yes | Yes |
| cArtifacts | Yes | Yes |
| cTasks | Yes | Yes |
| ?SSH Debug | Yes | Yes (but SSH debugging is not available for self-hosted jobs)|
| cCache | Yes | Yes |
| pMonorepo support | Yes | Yes (depends on initialization jobs) |
| pInitialization jobs | Yes | Yes |
| cSelf-hosted agents | Yes | Yes |
| cGitHub support | Yes | Yes |
| cBitBucket support | Yes | Yes |
| cxPromotions | Yes | No |
| cxParameterized promotions | Yes | No |
| cxDeployment targets | Yes | No |
| cxPre-flight checks | Yes | No |
| cxsem-service & sem-versin | Yes | No |


## Dashboards

| Feature | Semaphore Cloud | Semaphore CE |
|--|--|--|
| pTest reports | Yes | Yes |
| cActivity monitor | Yes | Yes |
| cxCustomeDashboards | Yes | No |
| cxFlaky tests | Yes | No |
| cxProject insights | Yes | No |
| cxOrganization health | Yes | No |


## Security and compliance

| Feature | Semaphore Cloud | Semaphore CE |
|--|--|--|
| cProject-level secrets | Yes | Yes |
| cOrganization secrets | Yes | Yes |
| cxPolicies for accessing secrets | Yes | No |
| cxAudit logs | Yes | No |


## User and permissions management 

NOTE: see actual implementation to determine what needs to be deleted from organizations.md

| Feature | Semaphore Cloud | Semaphore CE |
|--|--|--|
| cMultiple organizations | Yes | No | 
| cInvite users to your organization | Yes | Yes |
| cOrganization roles | Yes | Yes |
| ?Project roles | Yes | Yes (*) |
| cxUser groups | Yes | No |
| cxCustom Roles | Yes | No |

(*) Project roles exist but cannot be manually assigned to individual users. The role is assigned based on project-membership and org-wide user roles.

## Integrations 

NOTE: what about Github SSO? affects Connect GitHub and Single Sign on GitHub pages

| Feature | Semaphore Cloud | Semaphore CE |
|--|--|--|
| cRepository status checks | Yes | Yes |
| cRepository badges | Yes | Yes |
| ?Slack notifications | Yes | Yes |
| ?Webhook notifications | Yes | Yes |
| cxSAML/SCIM integrations | Yes | No |
| cxOkta integration | Yes | No |
| cxOpenID Connect | Yes | No |
| ?GitHub SSO | Yes | ? |

## Questions

Change/forgot password?
Maintenance/upgrade Semaphore
Take backups? Restore an installation?
Renew/install certificates

Do project roles exist? or we just have to use org roles? They exist, but you cannot assign them, just view them. You can add/remove people from projects and that's it.
TODO: is oauth still supported? I can't make it work

How do project permissions work? Do I need to invite user to my org with email and then manually add them to the project? Does it check for collaborators on the repo?
How do I grant permissions to a user to a project? Do I need to give him admin on the org?
Confirm with alek: Are there any plans to sem-service or sem-version to self-hosted agent jobs? NO

Are there any plans to add SSH debugging to self-hosted jobs?
Will GitHub SSO be included in CE?

Should pull request trigger workflows?
Do status badged work?
How do I make the cache work on k8s? The docs only talk about VMs