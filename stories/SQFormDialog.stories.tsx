import React from 'react';
import * as Yup from 'yup';
import type {Story, Meta} from '@storybook/react';
import type {GridItemsAlignment, GridSpacing} from '@material-ui/core';
import type {FormikContextType} from 'formik';

import {
  SQFormDialog,
  SQFormDatePicker,
  SQFormTextField,
  SQFormDateTimePicker,
  SQFormDatePickerWithCalendarInputOnly,
} from '../src';
import type {SQFormDialogProps} from 'components/SQFormDialog/SQFormDialog';
import {createDocsPage} from './utils/createDocsPage';

type DefaultArgsValues = {hello: string};
type SQFormDialogStory = Story<SQFormDialogProps<DefaultArgsValues>>;

type WithDatePickersValues = {
  datePicker: string;
  dateTimePicker: string;
  datePickerCalendarOnly: string;
};
type SQFormDialogWithDatePickersStory = Story<
  SQFormDialogProps<WithDatePickersValues>
>;

const meta: Meta = {
  title: 'Forms/SQFormDialog',
  component: SQFormDialog,
  argTypes: {
    onSave: {action: 'onSave', table: {disable: true}},
    onTertiaryClick: {action: 'onTertiaryClick', table: {disable: true}},
    onClose: {action: 'onClose', table: {disable: true}},
    children: {table: {disable: true}},
    validationSchema: {table: {disable: true}},
  },
  parameters: {
    docs: {page: createDocsPage({showStories: false})},
  },
};

const alignItems: GridItemsAlignment = 'center';
const spacing: GridSpacing = 2;
const defaultArgs = {
  title: 'Default',
  initialValues: {hello: ''},
  muiGridProps: {
    spacing,
    alignItems,
  },
  shouldDisplaySaveButton: true,
  showSecondaryButton: true,
  isOpen: false,
};

const Template: SQFormDialogStory = (args): React.ReactElement => {
  return (
    <>
      <h1>
        Toggle the Dialog's <code>isOpen</code> state in the Controls tab
      </h1>

      <SQFormDialog {...args}>
        <SQFormTextField name="hello" label="Hello" />
      </SQFormDialog>
    </>
  );
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const WithValidation = Template.bind({});
WithValidation.args = {
  ...defaultArgs,
  title: 'With Validation',
  validationSchema: Yup.object({
    hello: Yup.string().required(),
  }),
};

export const WithAutoFocus: SQFormDialogStory = (args) => {
  return (
    <>
      <h1>
        Toggle the Dialog's <code>isOpen</code> state in the Controls tab
      </h1>

      <SQFormDialog {...args}>
        <SQFormTextField
          name="hello"
          label="Hello"
          muiFieldProps={{autoFocus: true}}
        />
      </SQFormDialog>
    </>
  );
};
WithAutoFocus.args = {
  ...defaultArgs,
  title: 'With Auto Focus',
};

export const WithDatePickers: SQFormDialogWithDatePickersStory = (args) => {
  return (
    <>
      <h1>
        Toggle the Dialog's <code>isOpen</code> state in the Controls tab
      </h1>

      <SQFormDialog {...args}>
        <SQFormDatePicker name="datePicker" label="DatePicker" />
        <SQFormDateTimePicker name="dateTimePicker" label="DateTimePicker" />
        <SQFormDatePickerWithCalendarInputOnly
          name="datePickerCalendarOnly"
          label="DatePickerWithCalendarInputOnly"
        />
      </SQFormDialog>
    </>
  );
};
WithDatePickers.args = {
  ...defaultArgs,
  title: 'With Date Pickers',
  initialValues: {
    datePicker: '',
    dateTimePicker: '',
    datePickerCalendarOnly: '',
  },
};

export const WithTertiaryButton: SQFormDialogStory = (args) => {
  return (
    <>
      <h1>
        Toggle the Dialog's <code>isOpen</code> state in the Controls tab
      </h1>

      <SQFormDialog {...args}>
        <SQFormTextField name="hello" label="Hello" />
      </SQFormDialog>
    </>
  );
};

const handleTertiaryClick = (
  formikContext: FormikContextType<DefaultArgsValues>
) => {
  formikContext.resetForm();
  console.log('formikContext', formikContext);
};

WithTertiaryButton.args = {
  ...defaultArgs,
  initialValues: {
    hello: '',
  },
  title: 'With Tertiary Button',
  showTertiaryButton: true,
  tertiaryButtonText: 'Tertiary',
  onTertiaryClick: handleTertiaryClick,
};

export default meta;
