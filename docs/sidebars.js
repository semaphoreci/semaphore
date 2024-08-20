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
        description: 'Your first steps with Semaphore',
        // slug: '/getting-started',
        keywords: ['quickstart'],
        // image: '/img/docusaurus.png',
      },
      items: [
          'getting-started/about-semaphore',
          {
            type: 'category',
            label: 'Guided Tour',
            link: {
              type: 'doc',
              id: 'getting-started/guided-tour'
            },
            collapsed: false,
            items: [
              'getting-started/tour/sign-up',
              'getting-started/tour/hello-world',
              'getting-started/tour/continuous-integration',
              'getting-started/tour/continuous-delivery'
            ]
          },
        ],
    },
    'getting-started/faq',
    'getting-started/changelog'
  ],
  coreSidebar: [
    {
      type: 'category',
      label: 'Using Semaphore',
      link: {
        type: 'generated-index',
        title: 'How to use Semaphore',
        description: 'Semaphore Operations Guide',
        // slug: '/using-semaphore',
        keywords: ['handbook'],
        // image: '/img/docusaurus.png',
      },
      items: [
        'using-semaphore/workflows',
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
            'using-semaphore/connect-github-oauth',
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
            'using-semaphore/rbac',
            'using-semaphore/org-preflight',
            'using-semaphore/notifications',
            'using-semaphore/okta',
            'using-semaphore/openid',
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
        {
          type: 'category',
          label: 'Self-hosted Agents',
          link: {
            type: 'doc',
            id: 'using-semaphore/self-hosted'
          },
          collapsed: false,
          items: [
            'using-semaphore/self-hosted-install',
            'using-semaphore/self-hosted-configure',
            'using-semaphore/self-hosted-aws',
          ]
        },
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
      ],
    },
  ],
  // apiSidebar: apiSidebar.sidebar,
  apiSidebar: [
    {
      type: 'category',
      label: "API Specification",
      link: {
        type: 'generated-index',
        title: 'Semaphore API',
        description: 'Semaphore API Specification',
        // slug: '/using-semaphore',
        keywords: ['api'],
        // image: '/img/docusaurus.png',
      },
      items: require("./docs/openapi-spec/sidebar.ts")
      // items: apiSidebar.sidebar
      // items: [
      //   'openapi-spec/semaphore-public-api'
      //   // {
      //   //   type: 'autogenerated',
      //   //   dirName: 'openapi-spec',
      //   // }
      // ]
    }
  ],
  refSidebar: [
    {
      type: 'category',
      label: 'Reference',
      link: {
        type: 'generated-index',
        title: 'Semaphore Reference',
        description: 'Reference for YAML resources and command line tools',
        // slug: '/using-semaphore',
        keywords: ['reference'],
        // image: '/img/docusaurus.png',
      },
      items: [
        'reference/semaphore-cli',
        'reference/env-vars',
        'reference/toolbox',
        'reference/conditions-dsl',
        'reference/machine-types',
        'reference/os-ubuntu',
        'reference/os-apple',
        'reference/audit-events',
        'reference/openid',
        'reference/self-hosted-config',
        'reference/agent-yaml',
        'reference/dashboard-yaml',
        'reference/jobs-yaml',
        'reference/deployment-target-yaml',
        'reference/notifications-yaml',
        'reference/pipeline-yaml',
        'reference/project-yaml',
        'reference/secret-yaml',
        'reference/task-api',
      ],
    },
  ],

};

export default sidebars;
