---
description: Connect Git repositories with Semaphore
---

# Projects

Projects connect your Git repositories with Semaphore. This page explains how to set up projects and what settings are available.

## Create a project

TODO: do it with the CLI

edit: the edit command is used for editing existing projects, secrets, notifications, dashboards and deployment-targets using your configured text editor.
apply: the apply command is used for updating existing projects, secrets, dashboards, notifications and deployment-targets using a corresponding YAML file, and requires the use of the -f flag.

TODO: project-level secrets - https://docs.semaphoreci.com/essentials/using-secrets/
    CLI
    https://docs.semaphoreci.com/essentials/using-secrets/#project-level-secrets_3


Project roles: https://docs.semaphoreci.com/security/default-roles/

## Manage project ownership {#manage-ownership}

## Settings {#settings}

## Mapping roles to repositories

Users on Semaphore are always mapped to GitHub or Bitbucket repositories. Semaphore keeps track of all linked accounds that have access to the repositories.

Permission levels on GitHub

Repository-to-role mappings#
On Semaphore, each project has to stem from a code base on a remote repository, like GitHub or Bitbucket. Semaphore keeps track of all accounts that have access to those remote repositories (collaborators), and if any of them is associated with a Semaphore account, that Semaphore user is given access to the project (if he is a member of the organization which owns it).

Rules for assigning project roles#
Depending on user's premissions within the remote repository, a different role is assigned to them on the Semaphore project.

Repository permission level Semaphore project role
Admin Contributor
Push Contributor
Pull Reader
Bitbucket:#
Repository permission level Semaphore project role
Admin Contributor
Write Contributor
Read Reader

Members can access the organization's homepage and the projects they are assigned to. However, they are not able to modify settings.

https://docs.semaphoreci.com/security/repository-to-role-mappings/


