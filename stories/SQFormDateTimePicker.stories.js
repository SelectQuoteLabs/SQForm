import React from 'react';
import * as Yup from 'yup';
import {SQFormDateTimePicker as SQFormDateTimePickerComponent} from '../src';
import {createDocsPage} from './utils/createDocsPage';
import markdown from '../notes/SQFormDatePicker.md';
import {SQFormStoryWrapper} from './components/SQFormStoryWrapper';

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

export const BasicDateTimePicker = args => {
  return (
    <SQFormStoryWrapper
      initialValues={MOCK_INITIAL_STATE}
      validationSchema={schema}
    >
      <SQFormDateTimePickerComponent
        name="datetime"
        label="Date/Time"
        {...args}
      />
    </SQFormStoryWrapper>
  );
};
