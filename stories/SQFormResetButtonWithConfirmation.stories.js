import React from 'react';
import Grid from '@material-ui/core/Grid';

import {
  SQFormResetButtonWithConfirmation as SQFormResetButtonWithConfirmationComponent,
  SQFormTextField
} from '../src';
import {SQFormStoryWrapper} from './components/SQFormStoryWrapper';
import {createDocsPage} from './utils/createDocsPage';

export default {
  title: 'Components/SQFormResetButtonWithConfirmation',
  component: SQFormResetButtonWithConfirmationComponent,
  argTypes: {
    onReset: {action: 'reset', table: {disable: true}}
  },
  parameters: {
    docs: {
      page: createDocsPage()
    }
  }
};

const defaultArgs = {
  children: 'Reset',
  confirmationContent: (
    <img
      src="https://media.giphy.com/media/LMQ9c65BnD2gzMiJWg/giphy.gif"
      alt="press reset"
    />
  )
};

const Template = args => {
  const {SQFormProps, ...rest} = args;
  return (
    <SQFormStoryWrapper
      initialValues={{test: ''}}
      showSubmit={false}
      {...SQFormProps}
    >
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <SQFormTextField name="test" label="Test Field" />
        </Grid>
        <Grid item>
          <SQFormResetButtonWithConfirmationComponent {...rest} />
        </Grid>
      </Grid>
    </SQFormStoryWrapper>
  );
};

export const Default = Template.bind({});
Default.args = defaultArgs;
Default.storyName = 'SQFormResetButtonWithConfirmation';
