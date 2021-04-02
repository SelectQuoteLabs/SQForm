import React from 'react';
import {MuiThemeProvider, StylesProvider} from '@material-ui/core/styles';
import {LocalizationProvider} from '@material-ui/pickers';
import MomentAdapter from '@material-ui/pickers/adapter/moment';

import './storybook.css';

import {muiTheme} from 'scplus-shared-components';

// For Storybook usage ONLY
const centerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  padding: '48px'
};
const CenterComponentsInStorybook = ({children}) => {
  return <div style={centerStyle}>{children}</div>;
};

// Provides Material UI Theme to all stories
const withTheme = storyFn => {
  return (
    <StylesProvider injectFirst>
      <LocalizationProvider dateAdapter={MomentAdapter} locale={'en'}>
        <MuiThemeProvider theme={muiTheme}>{storyFn()}</MuiThemeProvider>
      </LocalizationProvider>
    </StylesProvider>
  );
};

// Visually centers the component for every story
const withCenteredComponents = storyFn => {
  return <CenterComponentsInStorybook>{storyFn()}</CenterComponentsInStorybook>;
};

export const decorators = [withTheme, withCenteredComponents];

export const parameters = {
  options: {
    storySort: {
      order: ['Welcome', ['Intro']]
    }
  },
  docs: {
    source: {
      type: 'code'
    }
  }
};
