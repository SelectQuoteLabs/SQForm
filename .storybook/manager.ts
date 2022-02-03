import addons from '@storybook/addons';
import selectQuoteTheme from './selectQuoteTheme';

addons.setConfig({
  theme: selectQuoteTheme,
  panelPosition: 'right',
});
