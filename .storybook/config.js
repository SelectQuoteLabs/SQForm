import {configure, addDecorator, addParameters} from '@storybook/react';
import React from 'react';
import {MuiThemeProvider as V0MuiThemeProvider} from 'material-ui'; // v0.x
import {MuiThemeProvider, StylesProvider} from '@material-ui/core/styles';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import 'storybook-addon-material-ui/register';
import {cssVars, muiTheme} from 'scplus-shared-components';
import 'scplus-shared-components/dist/index.css';

import selectQuoteTheme from './selectQuoteTheme';

const {richBlack, teal} = cssVars.colors;

const theme = {
  fontFamily: 'Open Sans, sans-serif',
  palette: {
    textColor: richBlack,
    accent1Color: teal
  },
  tabs: {
    backgroundColor: 'white',
    textColor: teal,
    selectedTextColor: teal
  },
  svgIcon: {
    color: teal
  }
};

// https://material-ui.com/guides/migration-v0x/
const muiThemeV0 = getMuiTheme(theme);

// For Storybook usage ONLY
const centerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  padding: '15rem'
};
const CenterComponentsInStorybook = ({children}) => {
  return <div style={centerStyle}>{children}</div>;
};

// Provides Material UI Theme to all stories
addDecorator(storyFn => {
  return (
    <V0MuiThemeProvider muiTheme={muiThemeV0}>
      {/* https://material-ui.com/guides/interoperability/#plain-css */}
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={muiTheme}>{storyFn()}</MuiThemeProvider>
      </StylesProvider>
    </V0MuiThemeProvider>
  );
});

// Visually centers the component for every story
addDecorator(storyFn => {
  return <CenterComponentsInStorybook>{storyFn()}</CenterComponentsInStorybook>;
});

addParameters({
  options: {
    theme: selectQuoteTheme
  }
});

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.js$/), module);
