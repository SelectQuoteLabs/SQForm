import React from 'react';
import {ThemeProvider, StyledEngineProvider} from '@mui/material/styles';
import {LocalizationProvider} from '@material-ui/pickers';
import MomentAdapter from '@material-ui/pickers/adapter/moment';
import {muiTheme} from 'scplus-shared-components';
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
const withTheme = (storyFn) => {
  return (
    <StyledEngineProvider injectFirst>
      <LocalizationProvider dateAdapter={MomentAdapter} locale={'en'}>
        <ThemeProvider theme={muiTheme}>{storyFn()}</ThemeProvider>
      </LocalizationProvider>
    </StyledEngineProvider>
  );
};

// Visually centers the component for every story
const withCenteredComponents = (storyFn) => {
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
