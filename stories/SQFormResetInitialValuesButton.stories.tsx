import {
  SQFormResetInitialValuesButton as SQFormResetInitialValuesButtonComponent,
  SQFormTextField,
} from '../src';
import {SQFormStoryWrapper} from './components/SQFormStoryWrapper';
import type {CustomStory} from './types/storyHelperTypes';
import {createDocsPage} from './utils/createDocsPage';
import Grid from '@material-ui/core/Grid';
import type {Meta} from '@storybook/react';
import type {SQFormResetInitialValuesButtonProps} from 'components/SQForm/SQFormResetInitialValuesButton';
import React from 'react';

const meta: Meta = {
  title: 'Components/SQFormResetInitialValuesButton',
  component: SQFormResetInitialValuesButtonComponent,
  parameters: {
    docs: {
      page: createDocsPage(),
    },
  },
};

const initialValues = {test: '👁 👄 👁 👍'};

const defaultArgs = {
  initialValuesObject: initialValues,
  children: 'Reset',
  confirmationContent: (
    <img
      src="https://media.giphy.com/media/oGO1MPNUVbbk4/giphy.gif"
      alt="good job"
    />
  ),
};

const Template: CustomStory<SQFormResetInitialValuesButtonProps> = (args) => {
  const {sqFormProps, ...rest} = args;
  return (
    <SQFormStoryWrapper
      initialValues={initialValues}
      showSubmit={false}
      {...sqFormProps}
    >
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <SQFormTextField name="test" label="Test Field" />
        </Grid>
        <Grid item>
          <SQFormResetInitialValuesButtonComponent {...rest} />
        </Grid>
      </Grid>
    </SQFormStoryWrapper>
  );
};

export const Default = Template.bind({});
Default.args = defaultArgs;
Default.storyName = 'SQFormResetInitialValuesButton';

export default meta;
