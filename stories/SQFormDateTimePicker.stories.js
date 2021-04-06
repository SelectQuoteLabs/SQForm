import React from 'react';
import * as Yup from 'yup';
import {SQFormDateTimePicker as SQFormDateTimePickerComponent} from '../src';
import {SQFormStoryWrapper} from './components/SQFormStoryWrapper';
import {createDocsPage} from './utils/createDocsPage';
import markdown from '../notes/SQFormDatePicker.md';

export default {
  title: 'Components/SQFormDateTimePicker',
  component: SQFormDateTimePickerComponent,
  argTypes: {
    onBlur: {action: 'blurred', table: {disable: true}},
    onChange: {action: 'changed', table: {disable: true}},
    name: {table: {disable: true}}
  },
  parameters: {
    docs: {page: createDocsPage({markdown})}
  }
};

const MOCK_INITIAL_STATE = {
  datetime: '09/22/2020 02:20 PM'
};

const schema = {
  datetime: Yup.date()
    .required()
    .min(new Date('2020-09-22'))
    .max(new Date('2100-10-10'))
    .typeError('Invalid date')
};

const defaultArgs = {
  label: 'Date/Time',
  name: 'datetime'
};

export const BasicDateTimePicker = args => {
  return (
    <SQFormStoryWrapper
      initialValues={MOCK_INITIAL_STATE}
      validationSchema={schema}
    >
      <SQFormDateTimePickerComponent
        name={defaultArgs.name}
        label={defaultArgs.label}
        {...args}
      />
    </SQFormStoryWrapper>
  );
};
BasicDateTimePicker.args = defaultArgs;
