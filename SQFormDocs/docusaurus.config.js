module.exports = {
  title: 'SQForm',
  tagline: 'SelectQuote Form Library',
  url: 'https://selectquotelabs.github.io/SQForm/',
  baseUrl: '/SQForm/',
  onBrokenLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'SelectQuoteLabs',
  projectName: 'SQForm',
  themeConfig: {
    navbar: {
      title: 'SQForm',
      logo: {
        alt: 'SQ Rings Logo',
        src: 'img/logo.svg'
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left'
        },
        {
          href: 'https://github.com/SelectQuoteLabs/SQForm',
          label: 'GitHub',
          position: 'right'
        }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Style Guide',
              to: 'docs/'
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2/'
            }
          ]
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus'
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus'
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus'
            }
          ]
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog'
            },
            {
              label: 'GitHub',
              href: 'https://github.com/SelectQuoteLabs/SQForm'
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} SelectQuote, Inc. Built with Docusaurus.`
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: 'doc1',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/SelectQuoteLabs/SQForm/edit/master/'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      }
    ]
  ]
};
