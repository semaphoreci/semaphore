---
description: Semaphore Cloud Machines Specifications
---

# Machine Types

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Available from '@site/src/components/Available';
import VideoTutorial from '@site/src/components/VideoTutorial';

<Available/>

This page gives technical specifications for the machines available on Semaphore Cloud.

## Overview

A machine type defines what virtualized hardware to use in your [agents](../using-semaphore/pipelines#agents). 

The machines described in this page only apply to Semaphore Cloud. You can add more types of machines using [self-hosted agents](../using-semaphore/self-hosted).

## Linux machines {#linux}

Linux machines are provided in four generations. The following table shows what operating systems each generation supports and if they support [Docker environments](../using-semaphore/pipelines#docker-environments).

| Generation | OS Supported | Docker environments |
|--|--|--|
| [E1](#e1) | Ubuntu 20.04 |  Yes |
| [E2](#e2) | Ubuntu 22.04<br/>Ubuntu 20.04 | Yes |
| [F1](#f1) |  Ubuntu 22.04<br/>Ubuntu 20.04 | Yes |
| [R1](#r1) | Ubuntu 20.04 | No |

### E1 generation {#e1}

This is the entry-level, cost-effective machine type. E1s are a good choice for less compute and memory intensive tasks.

Implementation details:
- **CPU**: hyperthreaded on a 3.4GHz Max Turbo 4.0GHz Intel® Core™ i7
- **Memory**: DDR4 RAM
- **Disk**: RAM drive (DDR4)

The E1 generation is presented in the following types:

| Type | Virtual CPUs | Memory (GB) | Disk (GB) |
|--|--|--|--|
| `e1-standard-2` | 2 | 4 | 25 |
| `e1-standard-4` | 4 | 8 | 35 |
| `e1-standard-8` | 8 | 16 | 45 |

### E2 generation {#e2}

The E2 generation balances power with cost. It is a good choice for most tasks.

Implementation details:

- **CPU**: hyperthreaded on a 3.6GHZ [AMD Ryzen 5 3600](https://www.amd.com/en/product/8456)
- **Memory**: DDR4 RAM
- **Disk**: NvME storage

The E2 generation is presented in the following types:

| Type | Virtual CPUs | Memory (GB) | Disk (GB) |
|--|--|--|--|
| `e2-standard-2` | 2 | 8 | 45 |
| `e2-standard-4` | 4 | 16 | 65 |

### F1 generation {#f1}

This generation is intended for compute-intensive tasks. They provide the most performance amongst the machines offered in Semaphore Cloud.

Implementation details:

- **CPU**: hyperthreaded on a 4.6GHz 12th generation [Intel i5 125000](https://ark.intel.com/content/www/us/en/ark/products/96144/intel-core-i512500-processor-18m-cache-up-to-4-60-ghz.html)
- **Memory**: DDR4 RAM
- **Disk**: NvME storage


The F1 generation is presented in the following types:

| Type | Virtual CPUs | Memory (GB) | Disk (GB) |
|--|--|--|--|
| `f1-standard-2` | 2 | 8 | 45 |
| `f1-standard-4` | 4 | 16 | 65 |

### R1 generation {#r1}

These are ARM machines. They currently in the **Technical Preview stage**. If you're interested in trying them out, please contact our support team.

Implementation details:

- **CPU**: emulated ARM on [Ampere Altra Q80-30](https://amperecomputing.com/briefs/ampere-altra-family-product-brief)
- **Memory**: DDR4 RAM
- **Disk**: NvME storage

The r1 generation is presented in the following types:

| Type | Virtual CPUs | Memory (GB) | Disk (GB) |
|--|--|--|--|
| `r1-standard-4` | 4 | 10 | 65 |

## Apple machines {#macos}

Semaphore Cloud provides the following Apple machine types:

| Type | Virtual CPUs | Architecture | OS Supported | Memory | Disk |
|--|--|--|--|--|--|
| `a1-standard-4` | 4 | x86_64 (AMD) | macOS Monterrey<br/>macOS Sonoma | 8 | 150 |
| `a2-standard-4` | 4 | Apple Silicon | macOS Sonoma | 8 | 150 |

## See also