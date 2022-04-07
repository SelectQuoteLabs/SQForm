import React from 'react';
import {MuiThemeProvider, StylesProvider} from '@material-ui/core/styles';
import {LocalizationProvider} from '@material-ui/pickers';
import MomentAdapter from '@material-ui/pickers/adapter/moment';
import {muiTheme} from 'scplus-shared-components';
import type {ThemeProviderProps} from '@material-ui/core';

import './styles/index.css';

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
