import React from 'react';
import {MuiThemeProvider, StylesProvider} from '@material-ui/core/styles';
import {LocalizationProvider} from '@material-ui/pickers';
import MomentAdapter from '@material-ui/pickers/adapter/moment';
import {muiTheme} from 'scplus-shared-components';
import type {ThemeProviderProps} from '@material-ui/core';

import './styles/index.css';

// https://github.com/mswjs/examples/blob/master/examples/with-storybook/.storybook/preview.js
// Storybook executes this module in both bootstap phase (Node)
// and a story's runtime (browser). However, we cannot call `setupWorker`
// in Node environment, so need to check if we're in a browser.
if (typeof global.process === 'undefined') {
  const { worker } = require('../src/mocks/browser')

  // Start the mocking when each story is loaded.
  // Repetitive calls to the `.start()` method do not register a new worker,
  // but check whether there's an existing once, reusing it, if so.
  worker.start()
}

// For Storybook usage ONLY
const centerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  padding: '48px',
};
const CenterComponentsInStorybook = ({children}) => {
  return <div style={centerStyle}>{children}</div>;
};

// Provides Material UI Theme to all stories
const withTheme = (storyFn: () => ThemeProviderProps['children']) => {
  return (
    <StylesProvider injectFirst>
      <LocalizationProvider dateAdapter={MomentAdapter} locale={'en'}>
        <MuiThemeProvider theme={muiTheme}>{storyFn()}</MuiThemeProvider>
      </LocalizationProvider>
    </StylesProvider>
  );
};

// Visually centers the component for every story
const withCenteredComponents = (
  storyFn: () => ThemeProviderProps['children']
) => {
  return <CenterComponentsInStorybook>{storyFn()}</CenterComponentsInStorybook>;
};

export const decorators = [withTheme, withCenteredComponents];

export const parameters = {
  options: {
    storySort: {
      order: ['Welcome', ['Intro']],
    },
  },
};
