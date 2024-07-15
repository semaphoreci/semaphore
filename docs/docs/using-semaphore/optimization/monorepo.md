---
description: Use change detection to speed up large repositories
sidebar_position: 3
---

# Monorepos

WIP

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Available from '@site/src/components/Available';
import VideoTutorial from '@site/src/components/VideoTutorial';

Semaphore features a repository change detection strategy to optimize monorepo pipelines. This page explains how to configure monorepo pipelines to reduce time and costs.

## Overview

A [monorepo](https://semaphoreci.com/blog/what-is-monorepo) is a repository that holds many projects. While these projects may be related, they are often logically independent, uncoupled, and even managed by different teams.

Semaphore can detect changes between commits. This allows you to create fine-grained jobs that only run when the underlying code changes. Skipping jobs covering unchanged code can greatly speed up testing and reduce costs on big codebases.

## Change detection strategies

<!-- Semaphore takes into account a range of commits for a given branch, Git tags, or pull request to decide when to run or skip a block of jobs or a promotion.  -->

When change detection is enabled, Semaphore takes into account two variables to decide which jobs to run: a file/glob pattern and a commit range. If one or more of the commits in the range changed at least one file matching the pattern, the job runs. Otherwise, it is skipped.

The default commit range used depends on a few conditions:

| Condition | Range Start | Range End |
|--|--|--|
| Branch is master | First commit in push | Last commit in push |
| Branch is not master | Common ancestor between master and pushed branch | Head of pushed branch |
| Pull requests | Common ancestor between branch to merge and pushed branch | Head of pushed branch |

TODO: used mermaid graphics for git ranges?

In addition, these conditions force the job to run even when no files where changed:

- [Pipeline changes](../pipelines#overview): if the pipeline YAML changes, all jobs run by default
- **Pushed tags**: all jobs run by default is the push includes Git tags

## How to use change detection in jobs {#jobs}

To enable change detection

### Configuration options {#config}

## How to use change detection in promotions {#promotions}

## See also

optimized workflows for monorepos. 

By detecting changes in your repository, Semaphore can skip jobs related to unchanged code.

 This page explains how to reduce time and costs for pipelines running on monorepos.

A monorepo is a repository that holds many projects. While these projects may be related, they are often logically independent and run by different teams. 



this page is all about monorepo setup and optimizations