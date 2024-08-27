---
description: Migrate from Jenkins
sidebar_position: 2
---

# Jenkins

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Available from '@site/src/components/Available';
import VideoTutorial from '@site/src/components/VideoTutorial';
import Steps from '@site/src/components/Steps';

## Overview

The main difference between Jenkins and Semaphore is that Semaphore is a managed service while Jenkins is purely self-hosted.

In Jenkins you are in charge of configuring everything, installing plugins for all the functionality you need, manage the agents to run the workflows, create the connections to the Git providers, manage the Jenkins instance, the list goes on. 

Semaphore is always ready to use, once you create an account and connect your Git provider you're ready to go. There is nothing to manage and you get first-class support.

## Jenkins vs Semaphore

This section describes how to implement common Jenkins functionalities in Semaphore.

### Checkout

Checkout clones the repository in the CI system. This is usually near the beginning of every job and workflow.

<Tabs groupId="migration">
<TabItem value="old" label="Jenkins">

In Jenkins we use the the Git plugin to connect and retrieve the repository history. You need to add authentication credentials on the Jenkins instance and use them in the stage.

```groovy
stage('Checkout repository') {
    steps {
        git branch: 'main',
            credentialsId: '<my-repo-auth>',
            url: 'git@github.com:<owner>/<project-name>.git'

        sh "cat README.md"
    }
}
```

</TabItem>
<TabItem value="new" label="Semaphore">

When we create a project in Semaphore, the Git repository is automatically linked to the project. To clone the repository we only need to execute [`checkout`](../../reference/toolbox#checkout) near the beginning of the job.

```shell
checkout
cat README.md
```

</TabItem>
</Tabs>

### Artifacts

Artifacts are used to store deliverables and persist files between runs.

<Tabs groupId="migration">
<TabItem value="old" label="Jenkins">

In Jenkins we use `archiveArtifacts` to store files:

```groovy
stage('Build') {
    steps {
        // Your build steps here
        // ...
        
        // Archive artifacts
        archiveArtifacts artifacts: 'build/output/**/*.jar', fingerprint: true
    }
}
```

And `copyArtifacts` to retrieve them:

```groovy
stage('Deploy') {
    steps {
        copyArtifacts(projectName: 'MyProject', filter: '**/*.jar', target: 'deploy-directory')
    }
}
```

</TabItem>
<TabItem value="new" label="Semaphore">

Semaphore provides an integrated artifact store that can be accessed with the [`artifact`](../../reference/toolbox#artifact) tool inside any job.

To store a file we use:

```shell
artifact push workflow build
```

We can restore the folder with:

```shell
artifact pull workflow build
```

</TabItem>
</Tabs>


### Caching

The cache speeds up workflows by keeping a copy of dependencies in storage.

<Tabs groupId="migration">
<TabItem value="old" label="Jenkins">

In Jenkins we need to install the [jobcacher](https://plugins.jenkins.io/jobcacher/) plugin to enable the cache. Then, we a cache stage to the workflow before building the project.

```groovy
stage('Cache Dependencies') {
     steps {
         cache(maxCacheSize: 250, caches: [
             [$class: 'ArbitraryFileCache', 
              includes: ['**/node_modules/**'], 
              excludes: [],
              path: 'node_modules',
              fingerprintingStrategy: [$class: 'DefaultFingerprintStrategy']]
         ]) {
             // Your build steps go here
            sh 'npm install'
        }
    }
}
```

</TabItem>
<TabItem value="new" label="Semaphore">

Semaphore provides an integrated cache that can be accessed with the [cache](../../reference/toolbox#cache) cache tool.

```shell
checkout
cache restore
npm install
cache store
```

</TabItem>
</Tabs>

### Language versions

We often need to activate specific language or tool versions to ensure consistent builds.

<Tabs groupId="migration">
<TabItem value="old" label="Jenkins">


Jenkins doesn't have a native way to activate languages. That means you have to install a plugin or run the language installation commands manually in a stage.

```groovy
stage('Setup Go') {
    steps {
        sh '''
            source ~/.gvm/scripts/gvm
            gvm install go1.21.0  # or whatever version you need
            gvm use go1.21.0
            go version
        '''
    }
}

stage('Build') {
    steps {
        sh 'go build'
    }
}
```

</TabItem>
<TabItem value="new" label="Semaphore">

Semaphore provides the [sem-version](../../reference/toolbox#sem-version) tool to install and activate languages and tools.

```shell
sem-version go 1.21
checkout
go version
go build
```

</TabItem>
</Tabs>


### Databases and services

Testing sometimes require disposable databases and services in the CI environment.

<Tabs groupId="migration">
<TabItem value="old" label="Jenkins">

Jenkins has plugins for various databases and services. It also supports running services with Docker, which is often the easiest way to run disposable instances.


```groovy
stages {
    stage('Start Database') {
        steps {
            sh 'docker run --name test-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres'
            // Wait for database to be ready
            sh 'sleep 10'
        }
    }
    
    stage('Run Tests') {
        steps {
            sh 'npm test'
        }
    }
    
    stage('Cleanup') {
        steps {
            sh 'docker stop test-postgres'
            sh 'docker rm test-postgres'
        }
    }
}
```

</TabItem>
<TabItem value="new" label="Semaphore">

Semaphore provides the [sem-service](../../reference/toolbox#sem-service) tool which uses Docker containers to automatically start and manage popular databases and other services.

There is no need to clean-up or stop the service once used as the job environment is scrapped once the commands are done.

```shell
sem-service start postgres
checkout
npm test
```

</TabItem>
</Tabs>

### Secrets

Secrets inject sensitive data and credentials into the workflow securely.

<Tabs groupId="migration">
<TabItem value="old" label="Jenkins">

In Jenkins, we create the credentials at the instance level and then initialize variables using the credentials id.

```groovy
environment {
        AWS_ACCESS_KEY_ID     = credentials('jenkins-aws-secret-key-id')
        AWS_SECRET_ACCESS_KEY = credentials('jenkins-aws-secret-access-key')
}

// later in stages ...

    stage('AWS S3 Access') {
        steps {
            sh 'aws s3 ls'
        }
    }
```

</TabItem>
<TabItem value="new" label="Semaphore">

In Semaphore, we create the [secret] at the organization or project level and activate it on a block. The secret contents are automatically injected as environment variables in all jobs contained on that block.

![Using secrets on Semaphore](./img/secrets.jpg)

</TabItem>
</Tabs>


### Complete example

TODO

## See also

- [Migration guide for GitHub Actions](./github-actions)
- [Migration guide for Travis CI](./travis)
- [Migration guide for BitBucket Pipelines](./bitbucket)
