module.exports = {
  stories: ['../stories/*.stories.js'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-notes/register',
    'storybook-addon-material-ui/register',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true
      }
    }
  ],
  webpackFinal: config => {
    config.module.rules = [
      ...config.module.rules,
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ];

    return config;
  }
};
