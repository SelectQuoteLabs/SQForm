module.exports = {
  title: 'SQForm',
  tagline: 'SQForm is a Form Library without a catchy phrase',
  url: 'https://selectquotelabs.github.io/SQForm/',
  baseUrl: '/SQForm/',
  onBrokenLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'SelectQuoteLabs',
  projectName: 'SQForm',
  themeConfig: {
    prism: {
      theme: require('prism-react-renderer/themes/nightOwlLight'),
      darkTheme: require('prism-react-renderer/themes/nightOwl'),
    },
    navbar: {
      title: 'SQForm',
      logo: {
        alt: 'SQ Rings Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/SelectQuoteLabs/SQForm',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Learn 👨‍💻',
          items: [
            {
              label: 'SQForm Storybook',
              href: 'https://master--5f4431386ea00a00220d495c.chromatic.com/',
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2/',
            },
          ],
        },
        {
          title: 'Open Source ❤️',
          items: [
            {
              label: 'Formik',
              href: 'https://formik.org/',
            },
            {
              label: 'Yup',
              href: 'https://github.com/jquense/yup',
            },
            {
              label: 'Material UI',
              href: 'https://material-ui.com/',
            },
          ],
        },
        {
          title: 'More 💡',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/SelectQuoteLabs',
            },
            {
              label: 'Markdown Style Guide',
              to: 'docs/styleguide/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} SelectQuote`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/SelectQuoteLabs/SQForm/edit/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  themes: ['@docusaurus/theme-live-codeblock'],
};
