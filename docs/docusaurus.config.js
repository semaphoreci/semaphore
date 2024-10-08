// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';
import * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";

/** @type {import('@docusaurus/types').Config} */
const config = {
  // this setting controls if pages can be indexed by search engines
  // https://docusaurus.io/docs/next/api/docusaurus-config#noIndex
  noIndex: false,
  title: 'Semaphore',
  tagline: 'A CI/CD solution to elevate developer workflows',
  favicon: 'img/favicon.ico',

  // extra themes
  themes: [
    'docusaurus-theme-openapi-docs',
    '@docusaurus/theme-mermaid',
  ],
  // mermaid support doesn't work with canary version
  markdown: {
    mermaid: true,
  },

  // Production url of your site here
  // url: 'https://docs.semaphoreci.com',
  url: 'https://docs-v2.sxmoon.com/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: process.env.BASE_URL ? process.env.BASE_URL : '/',

  // GitHub org and project. Needed for Github Pages.
  organizationName: 'semaphoreci',
  projectName: 'semaphore',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/', // move docs to the website root
          sidebarPath: './sidebars.js',
          docItemComponent: "@theme/ApiItem", // Derived from docusaurus-theme-openapi
          editUrl:
            'https://github.com/semaphoreci/semaphore/tree/main/docs/'
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: [
      '@docusaurus/plugin-ideal-image',
    // 'docusaurus-lunr-search', // this works when the hash router is disabled
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: "api", // plugin id
        docsPluginId: "classic", // configured for preset-classic
        config: {
          semaphoreAPI: {
            specPath: "https://docs.semaphoreci.com/v2/api-spec/openapi.yaml",
            outputDir: "docs/openapi-spec",
            downloadUrl: "https://docs.semaphoreci.com/v2/api-spec/openapi.json",
            sidebarOptions: {
              categoryLinkSource: "tag",
              groupPathsBy: "tag",
            },
          },
        }
      },
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Social card image
      image: 'img/semaphore-social-card.jpg',

      // FontAwesome imports
      // scripts: [
      //   {
      //     src: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css',
      //     async: true,
      //   },
      // ],
      algolia: {
        // The application ID provided by Algolia
        appId: 'CWC61UM3R2',

        // Public API key: it is safe to commit it
        apiKey: '0d549865930d2c9ed8170f2087eb87ab',

        indexName: 'semaphore-docs-sxmoon',

        // Optional: see doc section below
        contextualSearch: true,
      },
      navbar: {
        title: 'Semaphore Docs',
        logo: {
          alt: 'Semaphore Logo',
          src: 'img/logo.svg',
          srcDark: 'img/logo-white.svg'
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'startSidebar',
            position: 'left',
            label: 'Get Started',
          },
          {
            type: 'docSidebar',
            sidebarId: 'coreSidebar',
            position: 'left',
            label: 'Using Semaphore',
          },
          {
            type: 'docSidebar',
            sidebarId: 'refSidebar',
            position: 'left',
            label: 'Reference',
          },
          // {
          //   type: 'docSidebar',
          //   sidebarId: 'apiSidebar',
          //   position: 'left',
          //   label: 'API Specification',
          // },
          {
            href: 'https://github.com/semaphoreci/semaphore/tree/main/docs',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
            // label: 'GitHub',
            position: 'right',

          },
          // {
          //   type: 'html',
          //   position: 'right',
          //   value: '<button>Give feedback</button>',
          // },
          {
            type: 'search',
            position: 'right',
          },
        ],
      },

      // This is an optional announcement bar. It goes on the top of the page
      announcementBar: {
        id: `announcementBar-1`,
        content: `⭐️ If you like Semaphore, <b>give it a star</b> on <a target="_blank" rel="noopener noreferrer" href="https://github.com/semaphoreci/semaphore">GitHub</a> and follow us on <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/semaphoreci">X (Twitter)</a>`,
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Get Started',
                to: 'category/getting-started',
              },
              {
                label: 'Using Semaphore',
                to: 'category/using-semaphore',
              },
              {
                label: 'Reference',
                to: 'category/reference',
              },
              {
                label: 'API',
                to: 'reference/api',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'YouTube',
                href: 'https://www.youtube.com/c/SemaphoreCI',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/aBqJDR8ADH',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/semaphoreci',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/semaphoreci',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/company/rendered-text/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Semaphore Blog',
                href: 'https://semaphoreci.com/blog',
              },
              {
                label: 'Guides and E-Books',
                href: 'https://semaphoreci.com/resources',
              },
              {
                label: 'CI/CD Learning Tool',
                href: 'https://semaphoreci.com/cicd-learning-hub',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Semaphore Technologies doo. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['elixir', 'java', 'groovy'],
      },
    })
  // future: {
  //   experimental_router: 'hash', // default to "browser", comment this line to enable search
  //   experimental_storage: {
  //     type: 'localStorage',
  //     namespace: true,
  //   },
  // }
};

export default config;
