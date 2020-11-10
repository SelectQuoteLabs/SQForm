import React from 'react';
import {addDecorator, addParameters} from '@storybook/react';
import {MuiThemeProvider, StylesProvider} from '@material-ui/core/styles';
import {LocalizationProvider} from '@material-ui/pickers';
import MomentAdapter from '@material-ui/pickers/adapter/moment';

import selectQuoteTheme from './selectQuoteTheme';

import {muiTheme} from 'scplus-shared-components';

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
    <StylesProvider injectFirst>
      <LocalizationProvider dateAdapter={MomentAdapter} locale={'en'}>
        <MuiThemeProvider theme={muiTheme}>{storyFn()}</MuiThemeProvider>
      </LocalizationProvider>
    </StylesProvider>
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
