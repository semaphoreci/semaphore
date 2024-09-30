/**
 * This code is based on Docusarus Playgrounds component: https://github.com/facebook/docusaurus/edit/main/website/docs/playground.mdx
 * 
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */

/* eslint-disable global-require */

import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import Image from '@theme/IdealImage';
import Heading from '@theme/Heading';
import { Icon } from '@iconify-icon/react';


const Features = [
  {
    name: (
      <span>
        <Icon icon="eos-icons:job" width="1.2em" height="1.2em" />
        <Translate id='features.workflows.title'>Workflows</Translate>
      </span>
    ),
    image: require('@site/static/img/wf1.gif'),
    url: 'using-semaphore/workflows',
    description: (
      <Translate id="features.workflows.description">
        Workflows can build, test, release and deploy your code. Learn how to create workflows using the visual editor.
      </Translate>
    ),
  },
  {
    name: (
      <span>
        <Icon icon="carbon:batch-job" width="1.2em" height="1.2em" />
        <Translate id='features.jobs.title'>Jobs</Translate>
        </span>
    ),
    image: require('@site/static/img/job.jpg'),
    url: 'using-semaphore/jobs',
    description: (
      <Translate id="feature.jobs.description">
        Jobs are the basic unit of work. Read about jobs, blocks and pipelines.
      </Translate>
    ),
  },
  {
  name: (
    <span>
      <Icon icon="carbon:batch-job" width="1.2em" height="1.2em" />
      <Translate id='features.projects.title'>Projects</Translate>
      </span>
  ),
  image: require('@site/static/img/projects.jpg'),
  url: 'using-semaphore/projects',
  description: (
    <Translate id="feature.projects.description">
      Use projects to connect your GitHub or BitBucket repositories to Semaphore.
    </Translate>
  ),
  },
  
  {
    name: (
      <span>
        <Icon icon="carbon:migrate" width="1.2em" height="1.2em" />
        <Translate id='features.migration.title'>Migration Guides</Translate>
      </span>
    ),
    image: require('@site/static/img/migration.jpg'),
    url: 'getting-started/migration/overview',
    description: (
      <Translate id="features.migration.description">
        Check out the migration guides if you are using other CI provider like as Jenkins or CircleCI.
      </Translate>
    ),
  },
  {
    name: (
      <span>
        <Icon icon="et:linegraph" width="1.2em" height="1.2em" />
        <Translate id='features.metrics.title'>Dashboards</Translate>
      </span>
    ),
    image: require('@site/static/img/metrics.jpg'),
    url: 'using-semaphore/insights',
    description: (
      <Translate id="features.metrics.description">
        Create dashboards to track the performance and reliability of your CI.
      </Translate>
    ),
  },
  {
    name: (
      <span>
        <Icon icon="grommet-icons:test" width="1.2em" height="1.2em" />
        <Translate id='features.tests.title'>Test reports</Translate>
      </span>
    ),
    image: require('@site/static/img/tests.jpg'),
    url: 'using-semaphore/tests/test-reports',
    description: (
      <Translate id="features.tests.description">
        Configure test reports to view all the errors and flaky tests in a single place.
      </Translate>
    ),
  },
  {
    name: (
      <span>
        <Icon icon="icon-park-outline:api" width="1.2em" height="1.2em" />
        <Translate id='features.api.title'>Public API</Translate>
      </span>
    ),
    image: require('@site/static/img/api.jpg'),
    url: 'reference/api',
    description: (
      <Translate id="features.api.description">
        Make your custom integrations using the API. Manage Semaphore using the CLI.
      </Translate>
    ),
  },
  {
    name: (
      <span>
        <Icon icon="fluent-mdl2:permissions" width="1.2em" height="1.2em" />
        <Translate id='features.orgs.title'>Organizations</Translate>
      </span>
    ),
    image: require('@site/static/img/rbac.jpg'),
    url: 'using-semaphore/organizations',
    description: (
      <Translate id="features.orgs.description">
        Invite your team, set up roles and groups, manage secrets, and create notifications.
      </Translate>
    ),
  },
  {
    name: (
      <span>
        <Icon icon="hugeicons:web-design-01" width="1.2em" height="1.2em" />
        <Translate id='features.debug.title'>Language Guides</Translate>
      </span>
    ),
    image: require('@site/static/img/code.jpg'),
    url: 'using-semaphore/languages/javascript',
    description: (
      <Translate id="features.debug.description">
        Learn how to build and test your project in your language of choice.
      </Translate>
    ),
  },
  {
    name: (
      <span>
        <Icon icon="solar:server-2-broken" width="1.2em" height="1.2em" />
        <Translate id='features.selfhosted.title'>Self-hosted Agents</Translate>
      </span>
    ),
    image: require('@site/static/img/self-hosted.jpg'),
    url: 'using-semaphore/self-hosted',
    description: (
      <Translate id="features.selfhosted.description">
        Learn how to set up self-hosted agents to run jobs in your own infrastructure.
      </Translate>
    ),
  },
  {
    name: (
      <span>
        <Icon icon="ri:speed-mini-line" width="1.2em" height="1.2em" />
        <Translate id='features.optimization.title'>Optimization Guide</Translate>
      </span>
    ),
    image: require('@site/static/img/optimization.jpg'),
    url: 'using-semaphore/optimization/cache',
    description: (
      <Translate id="features.optimization.description">
        Learn how to speed up workflows using the cache and container registry.
      </Translate>
    ),
  },
  {
    name: (
      <span>
        <Icon icon="humbleicons:arrow-side-join-main" width="1.2em" height="1.2em" />
        <Translate id='features.monorepo.title'>Monorepo Workflows</Translate>
      </span>
    ),
    image: require('@site/static/img/monorepo.jpg'),
    url: 'using-semaphore/monorepo',
    description: (
      <Translate id="features.monorepo.description">
        Read how to use change detection to speed up monorepo workflows.
      </Translate>
    ),
  },
  
];

function FeatureCard({name, image, url, urlTS, description}) {
  return (
    <div className="col col--4 margin-bottom--lg">
      <div className={clsx('card')} style={{height: "460px"}}>
        <div className={clsx('card__image')}>
          <Link to={url}>
            <Image img={image} alt={`${name}'s image`} />
          </Link>
        </div>
        <div className="card__body" >
          <Heading as="h3">{name}</Heading>
          <p>{description}</p>
        </div>
        <div className="card__footer">
          <div className="button-group button-group--block">
            <Link className="button button--secondary" to={url}>
              Learn more →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeatureCardsRow() {
  return (
    <div className="row">
      {Features.map((feature) => (
        <FeatureCard key={feature.name} {...feature} />
      ))}
    </div>
  );
}