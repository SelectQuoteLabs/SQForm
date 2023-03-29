import React from 'react';
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from '@mui/material/styles';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {muiTheme} from 'scplus-shared-components';
import './styles/index.css';

/**
 * This method allows us to modify the theme from SSC without having to
 * modify it in SSC and pack it. We can test theme changes in SQForm first
 * using this method.
 *
 * Before pushing this to master, we should always make sure this matches what
 * the actual theme is. Usually by just spreading the imported theme.
 */
const modifiedTheme = createTheme(
  {
    ...muiTheme,
  },
  [muiTheme]
);

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
    <StyledEngineProvider injectFirst={true}>
      {/* ^^ https://material-ui.com/guides/interoperability/#plain-css */}
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={'en'}>
        <ThemeProvider theme={modifiedTheme}>{storyFn()}</ThemeProvider>
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
  // See this comment for why we deem this necessary
  // https://github.com/storybookjs/storybook/issues/17025#issuecomment-1055654634
  docs: {
    source: {type: 'code'},
  },
  options: {
    storySort: {
      order: ['Welcome', ['Intro']],
    },
  },
};
