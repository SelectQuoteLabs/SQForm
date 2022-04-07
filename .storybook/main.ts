module.exports = {
  stories: ['../stories/*.stories.{js,mdx,tsx}'],
  addons: [
    '@storybook/preset-create-react-app',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
      },
    },
    '@storybook/addon-controls',
    '@storybook/addon-actions',
    '@storybook/addon-knobs',
    'storybook-addon-material-ui',
  ],
  webpackFinal: (config) => {
    config.module.rules = [
      ...config.module.rules,
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript',
              '@babel/preset-react',
            ],
          },
        },
      },
    ];

    return config;
  },
};
