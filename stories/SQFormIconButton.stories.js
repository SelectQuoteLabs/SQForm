import React from 'react';
import Grid from '@material-ui/core/Grid';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Close from '@material-ui/icons/Close';
import AddCircle from '@material-ui/icons/AddCircle';
import History from '@material-ui/icons/History';

import {
  SQFormIconButton as SQFormIconButtonComponent,
  SQFormTextField
} from '../src';
import {SQFormStoryWrapper} from './components/SQFormStoryWrapper';
import {createDocsPage} from './utils/createDocsPage';

const icons = {CheckCircle, Close, AddCircle, History};

export default {
  title: 'Components/SQFormIconButton',
  component: SQFormIconButtonComponent,
  argTypes: {
    onClick: {action: 'clicked', table: {disable: true}},
    IconComponent: {table: {disable: true}}
  },
  parameters: {
    docs: {
      page: createDocsPage()
    }
  }
};

// prevents synthetic event warnings
const handleClick = event => event.persist();

export const Default = args => {
  const {exampleIcons, ...rest} = args;

  return (
    <SQFormStoryWrapper initialValues={{}} showSubmit={false}>
      <SQFormIconButtonComponent
        IconComponent={CheckCircle}
        onClick={handleClick}
        {...rest}
      />
    </SQFormStoryWrapper>
  );
};
Default.argTypes = {
  exampleIcons: {
    name: 'Example icons:',
    options: Object.keys(icons),
    mapping: icons,
    control: {
      type: 'radio',
      labels: {
        CheckCircle: 'CheckCircle',
        Close: 'Close',
        AddCircle: 'AddCircle',
        History: 'History'
      }
    },
    defaultValue: 'CheckCircle'
  }
};

export const WithTestField = args => {
  return (
    <SQFormStoryWrapper initialValues={{testField: ''}} showSubmit={false}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <SQFormTextField name="testField" label="Test Field" />
        </Grid>
        <Grid item>
          <SQFormIconButtonComponent
            {...args}
            isIconTeal={true}
            IconComponent={CheckCircle}
            onClick={handleClick}
          />
        </Grid>
      </Grid>
    </SQFormStoryWrapper>
  );
};
