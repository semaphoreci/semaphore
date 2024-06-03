---
description: Find unreliable tests
---

# Flaky Tests

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The flaky test dashboard shows unreliable tests in your [project](./projects). This page explains how they work and how to interpret the flaky test dashboard.

## Overview {#overview}

The flaky test tab helps you find flaky tests in your suite. Flaky tests are tests that fail seemingly random without any obvious cause. Identify flaky tests to improve the reliability of your pipeline.

<details>
<summary>What is the definition of flaky tests?</summary>
<div>

A test is considered flaky when one of these conditions happen:

- The test produces different results for the same Git commit
- A passing test that begins to behave unreliably once merged into a branch

</div>
</details>

TODO: ![Flaky Tests UI]

## How to set up flaky detection {#setup}

Flaky test detection is automatically enabled once [test reports](./test-reports) are configured.

:::note 

It may take a few pipeline runs before flaky tests begin to appear in the flaky test tab

:::


## How to view flaky tests {#view}

TODO: image tab

## Filtering the view {#filters}

## Taking actions on tests {#actions}

## Charts {#charts}

### Detailed view {#details}

## Notifications {#notifications}



