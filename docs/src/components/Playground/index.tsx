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
// import { Icon } from '@iconify/react';
import { Icon } from '@iconify-icon/react';

/* 

Features to highlight:
- Visual Editor
- Flaky Tests
- Self hosted agents
- SSH Debugging
- Okta Integration
- OpenID Connect

*/

// 320x170

const Features = [
  {
    name: (
      <span>
        <Icon icon="eva:eye-outline" width="1.2em" height="1.2em" />
        <Translate id='features.visualeditor.title'>Visual Editor</Translate>
        </span>
    ),
    image: require('@site/static/img/workflow-editor-animation.gif'),
    url: 'using-semaphore/workflows#workflow-editor',
    description: (
      <Translate id="landing.visualeditor.description">
        Create workflows visually. No need to learn yet another YAML syntax. Use the shell commands you know and love directly in your jobs.
      </Translate>
    ),
  },
  {
    name: (
      <span>
        <Icon icon="f7:logo-github" width="1.2em" height="1.2em" />
        <Icon icon="devicon:bitbucket" width="1.2em" height="1.2em" />
        <Translate id='features.gitvendor.title'>GitHub and BitBucket</Translate>
      </span>
    ),
    image: require('@site/static/img/metrics.jpg'),
    url: 'using-semaphore/tests/test-reports',
    description: (
      <Translate id="features.gitvendor.description">
        Seamless connection with GitHub and BitBucket. Authorize Semaphore and get your projects going.
      </Translate>
    ),
  },
  {
    name: (
      <span>
        <Icon icon="et:linegraph" width="1.2em" height="1.2em" />
        <Translate id='features.metrics.title'>Metrics and test reports</Translate>
      </span>
    ),
    // image: require('@site/static/img/security.jpg'),
    image: require('@site/static/img/metrics.jpg'),
    url: 'using-semaphore/self-hosted',
    description: (
      <Translate id="features.metrics.description">
        Track the performance and reliability of your CI. Create custom dashboards, get detailed test reports, and identify flaky tests.
      </Translate>
    ),
  },
  {
    name: (
      <span>
        <Icon icon="icon-park-outline:api" width="1.2em" height="1.2em" />
        <Translate id='features.api.title'>Make it yours with the API</Translate>
      </span>
    ),
    image: require('@site/static/img/api.jpg'),
    url: 'https://semaphoreci.com/pricing',
    description: (
      <Translate id="features.api.description">
        Make your custom integrations using the API. 
        Create and manage every aspect of Semaphore with our API and CLI tool.
      </Translate>
    ),
  },
  {
    name: (
      <span>
        <Icon icon="streamline:bug-antivirus-debugging" width="1.2em" height="1.2em" />
        <Translate id='features.debug.title'>Debug with SSH</Translate>
      </span>
    ),
    image: require('@site/static/img/ssh-debugging.png'),
    url: 'using-semaphore/jobs#debug-jobs',
    description: (
      <Translate id="features.debug.description">
        If a job is giving trouble, just jump into an interactive
        SSH session. Debug your CI on the spot and quickly solve issues.
      </Translate>
    ),
  },
  {
    name: (
      <span>
        <Icon icon="fluent-mdl2:permissions" width="1.2em" height="1.2em" />
        <Translate id='features.rbac.title'>RBAC and Compliance</Translate>
      </span>
    ),
    image: require('@site/static/img/ssh-debugging.png'),
    url: 'using-semaphore/jobs#debug-jobs',
    description: (
      <Translate id="features.rbac.description">
        Set-up roles and access levels to your engineering teams.
        Gain regulatory compliance with audit trails for system-wide actions.
      </Translate>
    ),
  },
];

interface Props {
  name: string;
  image: string;
  url: string;
  urlTS: string;
  description: JSX.Element;
}

function LandingPageCard({name, image, url, urlTS, description}: Props) {
  return (
    <div className="col col--4 margin-bottom--lg">
      <div className={clsx('card')} style={{height: "500px"}}>
        <div className={clsx('card__image')}>
          <Link to={url}>
            <Image img={image} alt={`${name}'s image`} />
          </Link>
        </div>
        <div className="card__body">
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

export function LandingPageCardsRow(): JSX.Element {
  return (
    <div className="row">
      {Features.map((playground) => (
        <LandingPageCard key={playground.name} {...playground} />
      ))}
    </div>
  );
}