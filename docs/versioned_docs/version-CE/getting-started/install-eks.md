---
description: Install Semaphore on Amazon Elastic Kubernetes (EKS)
---

# Amazon Elastic Kubernetes Service (EKS)

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Available from '@site/src/components/Available';
import VideoTutorial from '@site/src/components/VideoTutorial';
import Steps from '@site/src/components/Steps';
import FeatureNotAvailable from '@site/src/components/FeatureNotAvailable';

This page explains how to create a Kubernetes cluster using [AWS Elastic Kubernetes Service](https://aws.amazon.com/eks/) and install Semaphore Community Edition.

## Overview

If this is your first time using Semaphore we suggest trying out [Semaphore Cloud](../../../docs/getting-started/guided-tour.md) to see if the platform fits your needs. You can create a free trial account without a credit card and use every feature.

The self-hosted installation is recommended for users and teams familiar with Semaphore.

:::note macOS users

There is a known issue that blocks Docker on macOS. If you have trouble running Helm and you're using macOS, check the following [outstanding issue](https://github.com/docker/for-mac/issues/7520#issuecomment-2593247448) for a workaround.

:::

## Step 1 - Install dependencies {#dependencies}

Install the following tools before starting the installation:

- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html): to manage your AWS resources
- [Terraform](https://developer.hashicorp.com/terraform/install): to create the Kubernetes cluster
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/): to manage your Kubernetes installation
- [Helm](https://helm.sh/docs/intro/install/): to install Semaphore

In addition, you need to configure [Route53 DNS](https://aws.amazon.com/route53/) for your domain. Take note of the hosted Zone ID for your domain within Route 53, for example `Z05666441V6R4KFL4MJAA`, since it is used to create Semaphore infrastructure.

## Step 2 - Clone the Semaphore repository {#clone}

Clone the Semaphore repository to your machine with:

```shell
git clone https://github.com/semaphoreio/semaphore.git
```

Next, navigate to the EKS Terraform folder:

```shell
cd semaphore/ephemeral_environment/terraform/eks
```

## Step 3 - Initialize your configuration {#configure}

Initialize your AWS CLI configuration with:

```shell
aws configure
```

Create a configuration file called `aws-config` with the following values:

```shell
export DOMAIN="<domain-to-install-semaphore>"
export AWS_REGION="<your-aws-region>"
export ZONE_ID="<your-route53-zone-id>"
```

:::info Important

We highly recommend **installing Semaphore on a subdomain**, e.g. `semaphore.example.com`. Installing Semaphore on your main domain is discouraged as its operation might interfere with other services running on the same domain.

For example, if your domain is `example.com`, consider installing Semaphore on `semaphore.example.com`. See the example below.

```shell title="example DOMAIN variable"
export DOMAIN="semaphore.example.com"
```

:::

Once you are done with the configuration, it should look like this:

```shell
export DOMAIN="semaphore.example.com"
export AWS_REGION="eu-north-1"
export ZONE_ID="Z05198331K5V9MQ90PSP4"
```

## Step 4 - Create the Kubernetes cluster {#cluster}

Load your configuration file with:

```shell
source aws-config
```

Create the EKS cluster using Terraform:

```shell
TF_VAR_aws_region=$AWS_REGION TF_VAR_route53_zone_id=$ZONE_ID TF_VAR_domain=$DOMAIN terraform apply
```

Once Terraform is done, retrieve the TLS certificate ARN with:

```shell
export CERT_NAME=$(terraform output ssl_cert_name)
```

Check the Terraform output for the name of the cluster and save the value in an environment variable:

```shell
export EKS_CLUSTER_NAME="<the-name-of-your-cluster>"
```

Save both new values to the `aws-config` file:

```shell
echo export CERT_NAME=${CERT_NAME} >> aws-config
echo export EKS_CLUSTER_NAME=${EKS_CLUSTER_NAME} >> aws-config
```

## Step 5 - Install CRDs {#crds}

Connect to the newly created cluster with:

```shell
aws eks update-kubeconfig --name "${EKS_CLUSTER_NAME}" --region "${AWS_REGION}"
```

Semaphore requires the [Emissary CRDs] to be installed on the cluster. Install the Custom Resource Definitions (CRDs) with the following commands:

```shell title="Install CRDs"
kubectl apply -f https://app.getambassador.io/yaml/emissary/3.9.1/emissary-crds.yaml
kubectl wait --timeout=90s --for=condition=available deployment emissary-apiext -n emissary-system
```

## Step 6 - Install Semaphore {#install}


Sanity check that the environment is ready for the installation. The commands should not fail and return valid values:

```shell
source aws-config
echo "DOMAIN=${DOMAIN}"
echo "CERT_NAME=${CERT_NAME}"
```

Install Semaphore with Helm:

```shell
helm upgrade --install --debug semaphore oci://ghcr.io/semaphoreio/semaphore \
  --version v1.0.0-rc.1 \
  --timeout 20m \
  --set global.domain.name="${DOMAIN}" \
  --set ingress.ssl.certName="${CERT_NAME}" \
  --set ingress.className=alb \
  --set ssl.type=alb
```


## Step 7 - First login {#login}

:::note

On new installations, the system may take up to 30 minutes to finish all setup tasks. If you cannot login right away, wait a few minutes and try again.

:::

Open a browser and navigate to the domain to `id.<your-domain>/login`. For example: `id.semaphore.example.com/login`

Fill in the username and password obtained at the end of [step 7](#semaphore).

![Log in screen for Semaphore](./img/first-login.jpg)

Once logged in, select the Semaphore organization to continue.

![Select your organization screen](./img/first-login-organization.jpg)

You should be greeted with the onboarding guide.

![Onboarding guide screen](./img/on-boarding-guide.jpg)

## Post installation tasks

Once your have Semaphore up and running, check out the following pages to finish setting up:

- [Connect with GitHub](../using-semaphore/connect-github.md): connect your instance with GitHub to access your repositories
- [Invite users](../using-semaphore/organizations#people): invite users to your instance so they can start working on projects
- [Guided tour](./guided-tour): complete the guided tour to get familiarized with Semaphore Community Edition
- [Add self-hosted agents](../using-semaphore/self-hosted): add more machines to scale up the capacity of your CI/CD platform

## How to Uninstall Semaphore from EKS

If you want to completely uninstall Semaphore, follow these steps.

:::danger

If you uninstall Semaphore you will lose access to all your projects, workflows and logs. You cannot undo this action.

:::

First, uninstall Semaphore with the following command:

```shell title="Uninstall Semaphore"
source aws-config
helm uninstall semaphore
```

Delete the persistent volume claims:

```shell
kubectl delete pvc \
  minio-artifacts-storage-minio-artifacts-0 \
  minio-cache-storage-minio-cache-0 \
  minio-logs-storage-minio-logs-0 \
  postgres-storage-postgres-0 \
  rabbitmq-storage-rabbitmq-0 \
  redis-data-redis-0
```

Finally, if you are no longer using the Kubernetes cluster, you may delete it with the following command. This completely destroys the Kubernetes cluster with any other things you might be running there.

```shell
cd semaphore/ephemeral_environment/terraform/eks
terraform destroy
```

You will be prompted to confirm the deletion of the AWS resources.


## See also

- [Installation guide](./install.md)
- [Getting started guide](./guided-tour)
- [Migration guide](./migration/overview)

