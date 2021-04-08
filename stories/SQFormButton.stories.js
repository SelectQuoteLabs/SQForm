import React from 'react';
import Grid from '@material-ui/core/Grid';

import {SQFormButton as SQFormButtonComponent, SQFormTextField} from '../src';
import {SQFormStoryWrapper} from './components/SQFormStoryWrapper';
import {createDocsPage} from './utils/createDocsPage';

export default {
  title: 'Components/SQFormButton',
  component: SQFormButtonComponent,
  argTypes: {
    onClick: {action: 'clicked', table: {disable: true}}
  },
  parameters: {
    docs: {
      page: createDocsPage()
    }
  }
};

const defaultArgs = {
  children: 'Submit'
};

export const Default = args => {
  return (
    <SQFormStoryWrapper initialValues={{}}>
      <SQFormButtonComponent {...args} />
    </SQFormStoryWrapper>
  );
};
Default.args = defaultArgs;

export const WithTestField = args => {
  return (
    <SQFormStoryWrapper initialValues={{testField: ''}}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <SQFormTextField name="testField" label="Test Field" />
        </Grid>
        <Grid item>
          <SQFormButtonComponent {...args} />
        </Grid>
      </Grid>
    </SQFormStoryWrapper>
  );
};
WithTestField.args = defaultArgs;
