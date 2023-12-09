import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Pod Arcade',
  tagline: 'Play Retro Games with your friends, directly in your browser!',
  favicon: 'img/favicon.png',

  // Set the production url of your site here
  url: 'https://www.pod-arcade.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'pod-arcade', // Usually your GitHub org/user name.
  projectName: 'website', // Usually your repo name.
  trailingSlash: true,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/pod-arcade/website/tree/main',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-85GEH9BR44'
        }
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    // Replace with your project's social card
    navbar: {
      // title: 'Pod Arcade',
      logo: {
        alt: 'Pod Arcade Logo',
        src: 'img/logo-full.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/pod-arcade/pod-arcade',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        }
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/y8aasvEMy6',
            },
            {
              label: 'Github',
              href: 'https://github.com/pod-arcade',
            },
            {
              label: 'Patreon',
              href: 'https://www.patreon.com/PodArcade',
            }
          ],
        },
        {
          title: 'Who we are',
          items: [
            {
              label: 'About Us',
              to: '/about'
            },
            {
              label: 'Community Guidelines',
              to: '/community'
            },
            {
              label: 'Privacy Policy',
              to: '/privacy'
            },
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Pod Arcade. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.nightOwl,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
