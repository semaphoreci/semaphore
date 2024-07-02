/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  startSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      link: {
        type: 'generated-index',
        title: 'Get Started',
        description: 'Learn Semaphore in 5 minutes!',
        // slug: '/getting-started',
        keywords: ['quickstart'],
        // image: '/img/docusaurus.png',
      },
      items: [
          'getting-started/howto',
          'getting-started/guided-tour',
        ],
    },
  ],
  coreSidebar: [
    {
      type: 'category',
      label: 'Using Semaphore',
      link: {
        type: 'generated-index',
        title: 'How to use Semaphore',
        description: 'Semaphore Handbook',
        // slug: '/using-semaphore',
        keywords: ['handbook'],
        // image: '/img/docusaurus.png',
      },
      items: [
        'using-semaphore/jobs',
        'using-semaphore/pipelines',
        'using-semaphore/artifacts',
        'using-semaphore/secrets',
        'using-semaphore/promotions',
        {
          type: 'category',
          label: 'Projects',
          link: {
            type: 'doc',
            id: 'using-semaphore/projects'
          },
          collapsed: false,
          items: [
            'using-semaphore/connect-github',
            'using-semaphore/connect-bitbucket',
          ]
        },
        {
          type: 'category',
          label: 'Organizations',
          link: {
            type: 'doc',
            id: 'using-semaphore/organizations'
          },
          collapsed: false,
          items: [
            'using-semaphore/notifications',
            'using-semaphore/okta',
          ]
        },
        'using-semaphore/tasks',
        {
          type: 'category',
          label: 'Tests',
          collapsed: true,
          items: [
            {
              type: 'autogenerated',
              dirName: 'using-semaphore/tests',
            },
          ],
        },
        'using-semaphore/observability',
        'using-semaphore/self-hosted',
        {
          type: 'category',
          label: 'Optimization',
          collapsed: true,
          items: [
            {
              type: 'autogenerated',
              dirName: 'using-semaphore/optimization',
            },
          ],
        },
        'using-semaphore/preflight',
        'using-semaphore/account-and-security',
      ],
    },
  ],
  refSidebar: [
    {
      type: 'category',
      label: 'Reference',
      link: {
        type: 'generated-index',
        title: 'Semaphore Reference',
        description: 'Reference for API, YAML and CLI',
        // slug: '/using-semaphore',
        keywords: ['reference'],
        // image: '/img/docusaurus.png',
      },
      items: [
        'reference/api',
        'reference/task-api',
        'reference/toolbox',
        'reference/semaphore-cli',
        'reference/pipeline-yaml',
        'reference/conditions-dsl',
        'reference/machine-types',
        'reference/audit-events',
      ],
    },
  ],

};

export default sidebars;
