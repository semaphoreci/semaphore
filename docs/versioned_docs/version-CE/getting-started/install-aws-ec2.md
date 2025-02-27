---
description: Install Semaphore on AWS EC2 Instance (VM)
---

# AWS Compute Instance (EC2)

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Available from '@site/src/components/Available';
import VideoTutorial from '@site/src/components/VideoTutorial';
import Steps from '@site/src/components/Steps';
import FeatureNotAvailable from '@site/src/components/FeatureNotAvailable';

This page explains how to install Semaphore Community Edition on a [AWS Elastic Compute Cloud (EC2)](https://aws.amazon.com/ec2/).

## Overview

If this is your first time using Semaphore we suggest trying out [Semaphore Cloud](../../../docs/getting-started/guided-tour.md) to see if the platform fits your needs. You can create a free trial account without a credit card and use every feature.

The self-hosted installation is recommended for users and teams familiar with Semaphore.

## Prerequisites {#prerequisites}

- A DNS domain
- An Amazon AWS account

## Step 1 - Install dependencies {#dependencies}

Install the AWS CLI to manage your EC2 instances:

- [AWS CLI](https://aws.amazon.com/cli): command line tools to manage your AWS services

## Step 2 - Create security group {#security}

Create a configuration file to store your AWS parameters. We'll call this file `aws-config`.

```shell title="contents of aws-config"
export AWS_SSH_KEY=<your-ssh-key-name>
export AWS_SECURITY_GROUP=<your-security-group-name>
```

For example:

```shell title="contents of aws-config"
export AWS_SSH_KEY=semaphore-instance-key pair
export AWS_SECURITY_GROUP=semaphore-instance-sg
```

Next, create a security group to control access to your EC2 machine:

```shell
source aws-config
export SECURITY_GROUP_ID=$(aws ec2 create-security-group \
  --group-name ${AWS_SECURITY_GROUP} \
  --description "Security group for Semaphore instance" \
  --output text \
  --query 'GroupId')
echo export SECURITY_GROUP_ID=${SECURITY_GROUP_ID} >> aws-config
```

Open ports for HTTP (80) and HTTPS (443):

```shell
aws ec2 authorize-security-group-ingress --group-id $SECURITY_GROUP_ID --protocol tcp --port 80 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-id $SECURITY_GROUP_ID --protocol tcp --port 443 --cidr 0.0.0.0/0
```

Open SSH port (22) to access your EC2 instance. You can either open the port to all IP addresses or only for your machine's IP address.

<Tabs groupId="editor-yaml">
<TabItem value="editor" label="Allow all IPs">

You can allow SSH access to all IPs with the following command:

```shell
aws ec2 authorize-security-group-ingress --group-id $SECURITY_GROUP_ID --protocol tcp --port 22 --cidr 0.0.0.0/0
```

</TabItem>
<TabItem value="yaml" label="Allow only your IP">

You can only allow SSH from your machine's IP address with the following command:

```shell
export MY_IP=$(curl -s https://checkip.amazonaws.com)
aws ec2 authorize-security-group-ingress --group-id $SECURITY_GROUP_ID --protocol tcp --port 22 --cidr ${MY_IP}/32
```

</TabItem>
</Tabs>

## Step 3 - Create SSH keys {#key}

Create key pair for accessing the instance with SSH.

```shell
source aws-config
aws ec2 create-key-pair --key-name $AWS_SSH_KEY --query 'KeyMaterial' --output text > $AWS_SSH_KEY.pem
chmod 600 $AWS_SSH_KEY.pem
```

## Step 4 - Create or select a subnet {#subnet}

You may skip this step if you already have a subnet configured for your EC2 instance. In that case, ensure the `aws-config` file is exporting the variable `SUBNET_ID`.


First, check what subnets you have configured:

```shell
aws ec2 describe-subnets
```

If required, create a subnet. The following example creates a subnet on the default CIDR block. Replace `vpc-8eb123f4` with your VPC ID, adjust the `--cidr-block as needed`, and choose an appropriate `--availability-zone` for your region.


```shell
aws ec2 create-subnet \
  --vpc-id vpc-8eb123f4 \
  --cidr-block 172.31.1.0/24 \
  --availability-zone us-east-1a
```


## Step 4 - Create EC2 instance {#instance}

Run the following commands to create your EC2 instance:

```shell
export INSTANCE_ID=$(aws ec2 run-instances \
  --image-id resolve:ssm:/aws/service/canonical/ubuntu/server/24.04/stable/current/amd64/hvm/ebs-gp3/ami-id \
  --instance-type t2.2xlarge \
  --security-group-ids $SECURITY_GROUP_ID \
  --key-name $AWS_SSH_KEY \
  --subnet-id $SUBNET_ID \
  --count 1 \
  --associate-public-ip-address \
  --output text \
  --query 'Instances[0].InstanceId')
```

Save your instance id in the AWS configuration file:

```shell
echo export INSTANCE_ID=$INSTANCE_ID >> aws-config
```

## Step 5 - Retrieve IP address {#ip}

Run the following command to store the IP address assigned to your instance in the configuration file:

```shell
export IP_ADDRESS=$(aws ec2 describe-instances --instance-ids $instance_id \
  --query 'Reservations[0].Instances[0].PublicIpAddress' \
  --output text)
echo export IP_ADDRESS=${IP_ADDRESS} >> aws-config
```

Take note of the public IP address of your instance:

```shell
echo IP_ADDRESS
```

## Step 6 - Update DNS records {#dns}

Configure your DNS by creating two A records that point to the reserved IP:

<Steps>

1. Go to your domain provider's DNS settings
2. Create root domain A record

      - Type: A
      - Name: `semaphore` (e.g. `semaphore.example.com`)
      - Value: the public IP address of your Linux machine

3. Create a wildcard record

      - Type: A
      - Name: `*.semaphore` (e.g. `*.semaphore.example.com`)
      - Value: the public IP address of your Linux machine

4. Wait for DNS propagation (typically a few minutes)

    You can verify the creation of the TXT record in the [Online Dig Tool](https://toolbox.googleapps.com/apps/dig/#A/) for:

      - `semaphore.example.com`
      - `*.semaphore.example.com`

</Steps>

## Step 7 - Log into the instance {#env}

Login into your EC2 instance:

```shell title="Connect to your EC2 instance"
source aws-config
ssh -i ${AWS_SSH_KEY}.pem ubuntu@${IP_ADDRESS}
```

Create a folder to store the configuration and certificates:

```shell title="remote shell - create install folder"
mkdir semaphore-install
cd semaphore-install
```

Create a file with the following environment variables. For the rest of the guide, we'll call this file `semaphore-config`. Change the values as needed:

```shell title="contents of semaphore-config file"
export DOMAIN="<your-domain>"
export IP_ADDRESS=<public-IP-address-of-machine>
```

:::info Important

We highly recommend **installing Semaphore on a subdomain**, e.g. `semaphore.example.com`. Installing Semaphore on your main domain is discouraged as its operation might interfere with other services running on the same domain.

For example, if your domain is `example.com`, consider installing Semaphore on `semaphore.example.com`. See the example below.

```shell title="example of semaphore-config file"
export DOMAIN="semaphore.example.com"
export IP_ADDRESS=1.2.3.4
```

:::

## Step 8 - Create TLS certificates {#certs}

:::note

You may skip this section if you already have wildcard certificates, e.g. `*.semaphore.example.com` for the domain where you are installing Semaphore.

:::

We can use [certbot](https://certbot.eff.org/) to create a free wildcard TLS certificate. Install certbot with the following command:


```shell title="remote shell - install tools"
sudo apt-get update
sudo apt-get -y install certbot
```

Next, create the certificates with the following command:

```shell title="remote shell - create certificates with certbot"
source semaphore-config
mkdir -p certs
certbot certonly --manual --preferred-challenges=dns \
    -d "*.${DOMAIN}" \
    --register-unsafely-without-email \
    --work-dir certs \
    --config-dir certs \
    --logs-dir certs
```

When you are prompted to create a DNS TXT record to verify domain ownership. For example:

```text
Please deploy a DNS TXT record under the name:

_acme-challenge.semaphore.example.com.

with the following value:

EL545Zty7vUUvIHQRSkwxXTWsirldw91enasgB5uOHs
```

Create the DNS TXT record before continuing the certificate generation. Follow the instructions on the terminal.

:::tip

You can verify the creation of the TXT record in the [Google Dig Tool](https://toolbox.googleapps.com/apps/dig/#TXT/). Type the challenge DNS TXT record and check if its value corresponds to the correct value.

:::

Once done, you should get a message like this:

```shell
Successfully received certificate.
Certificate is saved at: certs/live/semaphore.example.com/fullchain.pem
Key is saved at:         certs/live/semaphore.example.com/privkey.pem
This certificate expires on 2025-02-27.
These files will be updated when the certificate renews.
```

Check the existence of the certificate files on the following paths. You will require both files during the Semaphore installation.

- **Full chain certificate**: `./certs/live/$DOMAIN/fullchain.pem`
- **Private key certificate**: `./certs/live/$DOMAIN/privkey.pem`

You may delete the TXT record from your domain at this point. It's no longer needed.

## Step 9 - Install k3s and Helm {#k3s}

Still inside the remote shell in your AWS instance, install Helm with:

```shell title="remote shell - install Helm"
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 && chmod 700 get_helm.sh && ./get_helm.sh
```

Next, install k3s:

```shell title="remote shell - install k3s"
curl -sfL https://get.k3s.io | K3S_KUBECONFIG_MODE="644" sh -
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
```

## Step 10 - Install Semaphore {#install}


We recommend running the following sanity checks to confirm you're ready for installation. The commands should not fail and return valid values.

```shell title="remote shell - check if ready to install"
source semaphore-config
echo "DOMAIN=${DOMAIN}"
echo "IP_ADDRESS=${IP_ADDRESS}"
ls certs/live/${DOMAIN}/fullchain.pem certs/live/${DOMAIN}/privkey.pem
```

Install the Emissary CRD:

```shell
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
kubectl apply -f https://app.getambassador.io/yaml/emissary/3.9.1/emissary-crds.yaml
kubectl wait --timeout=90s --for=condition=available deployment emissary-apiext -n emissary-system
```

Finally, install the Semaphore with Helm:

```shell
helm upgrade --install --debug semaphore oci://ghcr.io/semaphoreio/semaphore \
  --version v1.0.1 \
  --timeout 20m \
  --set global.domain.ip=${IP_ADDRESS} \
  --set global.domain.name=${DOMAIN} \
  --set ingress.enabled=true \
  --set ingress.ssl.enabled=true \
  --set ingress.className=traefik \
  --set ingress.ssl.type=custom \
  --set ingress.ssl.crt=$(cat certs/live/${DOMAIN}/fullchain.pem | base64 -w 0) \
  --set ingress.ssl.key=$(cat certs/live/${DOMAIN}/privkey.pem | base64 -w 0)
```

Once the installation is done, the following command should appear in the terminal:

```text
=============================================================================================
Congratulations, Semaphore has been installed successfully!

To start using the app, go to https://id.semaphore.example.com/login

You can fetch credentials for the login by running this command:

echo "Email: $(kubectl get secret user-creds -n default -o jsonpath='{.data.email}' | base64 -d)"; echo "Password: $(kubectl get secret user-creds -n default -o jsonpath='{.data.password}' | base64 -d)"
=============================================================================================
```

Execute the shown command to retrieve the login credentials.

```shell title="remote shell - get login credentials"
$ echo "Email: $(kubectl get secret user-creds -n default -o jsonpath='{.data.email}' | base64 -d)"; echo "Password: $(kubectl get secret user-creds -n default -o jsonpath='{.data.password}' | base64 -d)"

Email: root@example.com
Password: AhGg_2v6uHuy7hqvNmeLw0O4RqI=
API Token: nQjnaPKQvW6TqXtpTNSx
```

## Step 11 - First login {#login}

:::note

On new installations, the system may take up a few minutes to finish all setup tasks. If you cannot login right away, wait a few minutes and try again.

:::

Open a browser and navigate to the domain to `id.<your-domain>/login`. For example: `id.semaphore.example.com/login`

Fill in the username and password obtained at the end of [step 10](#install).

![Log in screen for Semaphore](./img/first-login.jpg)

Once logged in, select the Semaphore organization to continue.

![Select your organization screen](./img/first-login-organization.jpg)

You should be greeted with the onboarding guide.

![Onboarding guide screen](./img/on-boarding-guide.jpg)

## Post installation tasks

Once your have Semaphore up and running, check out the following pages to finish setting up:

- [Connect with GitHub](../using-semaphore/connect-github.md): connect your instance with GitHub to access your repositories
- [Guided tour](./guided-tour): complete the guided tour to get familiarized with Semaphore Community Edition
- [Invite users](../using-semaphore/organizations#people): invite users to your instance so they can start working on projects
- [Add self-hosted agents](../using-semaphore/self-hosted): add more machines to scale up the capacity of your CI/CD platform

## How to Uninstall Semaphore from AWS EC2

If you want to completely uninstall Semaphore, follow these steps.

:::danger

If you uninstall Semaphore you will lose access to all your projects, workflows and logs. You cannot undo this action.

:::

First, login into your compute instance:

```shell title="Connect with your EC2 instance"
source aws-config
ssh -i ${AWS_SSH_KEY}.pem ubuntu@${IP_ADDRESS}
```

Uninstall Semaphore with the following command:

```shell title="Uninstall Semaphore"
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
helm uninstall semaphore
```

Finally, delete the persistent volume claims:

```shell
kubectl delete pvc \
  minio-artifacts-storage-minio-artifacts-0 \
  minio-cache-storage-minio-cache-0 \
  minio-logs-storage-minio-logs-0 \
  postgres-storage-postgres-0 \
  rabbitmq-storage-rabbitmq-0 \
  redis-data-redis-0
```

To completely delete the EC2 instance, run the following command:

```shell title="Destoy EC2 instance"
source aws-config
aws ec2 terminate-instances --instance-ids $INSTANCE_ID
```

## See also

- [Installation guide](./install.md)
- [Getting started guide](./guided-tour)
- [Migration guide](./migration/overview)

