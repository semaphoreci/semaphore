/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable global-require */

import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import Image from '@theme/IdealImage';
import Heading from '@theme/Heading';

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

const Playgrounds = [
  {
    name: '👁️ Visual Editor',
    image: require('@site/static/img/workflow-editor-animation.gif'),
    url: 'using-semaphore/workflows#workflow-editor',
    description: (
      <Translate id="homepage.visualeditor.description">
        Create your workflows visually. Finally WYSYGYG for CI!
        No need to learn yet another YAML syntax just to run your tests.
      </Translate>
    ),
  },
  {
    name: '❅ Flaky Test Detector',
    image: require('@site/static/img/docusaurus.png'),
    url: 'using-semaphore/tests/flaky-tests',
    description: (
      <Translate id="playground.codesandbox.description">
        Built-in test reports and flaky test detector.
        Semaphore will let you know when a a tests begins to flake.
      </Translate>
    ),
  },
  {
    name: '☁ Self-hosted Agents',
    image: require('@site/static/img/docusaurus.png'),
    url: 'using-semaphore/self-hosted',
    description: (
      <Translate id="playground.codesandbox.description">
        Run the workflows on your own hardware. 
        Or mix and match Semaphore Cloud machines with your own.
      </Translate>
    ),
  },
  {
    name: '💻 SSH Debugging',
    image: require('@site/static/img/docusaurus.png'),
    url: 'using-semaphore/jobs#debug-jobs',
    description: (
      <Translate id="playground.codesandbox.description">
        If a job is giving trouble, just jump into an interactive
        SSH session. Debug your CI on the spot and quickly solve issues.
      </Translate>
    ),
  },
  {
    name: '🏢 Enterprise Ready',
    image: require('@site/static/img/docusaurus.png'),
    url: 'using-semaphore/github-sso',
    description: (
      <Translate id="playground.stackblitz.description">
        Everything for your Enterprise needs: 
        GitHub SSO, Okta Integration via SCIM/SAML, OpenID Integration
      </Translate>
    ),
  },
  {
    name: '🌐 On Premise',
    image: require('@site/static/img/docusaurus.png'),
    url: 'https://semaphoreci.com/pricing',
    description: (
      <Translate id="playground.codesandbox.description">
        Run Semaphore on your hardware with the On-Premise Edition.
        CI/CD workflows completely behind your firewall.
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

function PlaygroundCard({name, image, url, urlTS, description}: Props) {
  return (
    <div className="col col--4 margin-bottom--lg">
      <div className={clsx('card')}>
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

export function PlaygroundCardsRow(): JSX.Element {
  return (
    <div className="row">
      {Playgrounds.map((playground) => (
        <PlaygroundCard key={playground.name} {...playground} />
      ))}
    </div>
  );
}