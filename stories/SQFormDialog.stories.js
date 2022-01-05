import React from 'react';
import * as Yup from 'yup';

import {
  SQFormDialog,
  SQFormDatePicker,
  SQFormTextField,
  SQFormDateTimePicker,
  SQFormDatePickerWithCalendarInputOnly
} from '../src';
import {createDocsPage} from './utils/createDocsPage';

export default {
  title: 'Forms/SQFormDialog',
  component: SQFormDialog,
  argTypes: {
    onSave: {action: 'onSave', table: {disable: true}},
    onClose: {action: 'onClose', table: {disable: true}},
    children: {table: {disable: true}},
    validationSchema: {table: {disable: true}}
  },
  parameters: {
    docs: {page: createDocsPage({showStories: false})}
  }
};

const defaultArgs = {
  title: 'Default',
  initialValues: {hello: ''},
  muiGridProps: {
    spacing: 2,
    alignItems: 'center'
  },
  showSecondaryButton: true
};

const Template = args => {
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
  validationSchema: {
    hello: Yup.string().required()
  }
};

export const WithAutoFocus = args => {
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
  title: 'With Auto Focus'
};

export const WithDatePickers = args => {
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
    datePickerCalendarOnly: ''
  }
};
