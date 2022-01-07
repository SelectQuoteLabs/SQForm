import React from 'react';
import Grid from '@material-ui/core/Grid';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Close from '@material-ui/icons/Close';
import AddCircle from '@material-ui/icons/AddCircle';
import History from '@material-ui/icons/History';
import type {Story, Meta} from '@storybook/react';

import {
  SQFormIconButton as SQFormIconButtonComponent,
  SQFormTextField,
} from '../src';
import {SQFormStoryWrapper} from './components/SQFormStoryWrapper';
import {createDocsPage} from './utils/createDocsPage';
import type {SQFormIconButtonProps} from 'components/SQForm/SQFormIconButton';

const icons = {CheckCircle, Close, AddCircle, History};

export default {
  title: 'Components/SQFormIconButton',
  component: SQFormIconButtonComponent,
  argTypes: {
    onClick: {action: 'clicked', table: {disable: true}},
    IconComponent: {table: {disable: true}},
  },
  parameters: {
    docs: {
      page: createDocsPage(),
    },
  },
} as Meta;

// prevents synthetic event warnings
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
  event.persist();

export const Default: Story<SQFormIconButtonProps> = (args) => {
  const {IconComponent, ...rest} = args;

  return (
    <SQFormStoryWrapper initialValues={{}} showSubmit={false}>
      <SQFormIconButtonComponent
        IconComponent={IconComponent}
        onClick={handleClick}
        {...rest}
      />
    </SQFormStoryWrapper>
  );
};
Default.argTypes = {
  IconComponent: {
    name: 'Example icons:',
    options: Object.keys(icons),
    mapping: icons,
    control: {
      type: 'radio',
      labels: {
        CheckCircle: 'CheckCircle',
        Close: 'Close',
        AddCircle: 'AddCircle',
        History: 'History',
      },
    },
    defaultValue: 'CheckCircle',
  },
};

export const WithTestField: Story<SQFormIconButtonProps> = (args) => {
  return (
    <SQFormStoryWrapper initialValues={{testField: ''}} showSubmit={false}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <SQFormTextField name="testField" label="Test Field" />
        </Grid>
        <Grid item>
          <SQFormIconButtonComponent
            {...args}
            IconComponent={CheckCircle}
            onClick={handleClick}
          />
        </Grid>
      </Grid>
    </SQFormStoryWrapper>
  );
};
