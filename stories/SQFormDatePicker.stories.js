import React from 'react';
import * as Yup from 'yup';
import {SQFormDatePicker as SQFormDatePickerComponent} from '../src';
import {createDocsPage} from './utils/createDocsPage';
import {SQFormStoryWrapper} from './components/SQFormStoryWrapper';
import markdown from '../notes/SQFormDatePicker.md';

export default {
  title: 'Components/SQFormDatePicker',
  component: SQFormDatePickerComponent,
  argTypes: {
    onBlur: {action: 'blurred', table: {disable: true}},
    onChange: {action: 'changed', table: {disable: true}},
    schema: {table: {disable: true}},
    name: {table: {disable: true}}
  },
  parameters: {
    docs: {page: createDocsPage({markdown})}
  }
};

const MOCK_INITIAL_VALUE = {
  date: '09/22/2020'
};

const defaultArgs = {
  label: 'Date',
  name: 'date'
};

const Template = args => {
  const {schema, SQFormProps, ...rest} = args;

  return (
    <SQFormStoryWrapper
      initialValues={MOCK_INITIAL_VALUE}
      validationSchema={schema}
      {...SQFormProps}
    >
      <SQFormDatePickerComponent
        name={defaultArgs.name}
        label={defaultArgs.label}
        {...rest}
      />
    </SQFormStoryWrapper>
  );
};

export const BasicDatePicker = Template.bind({});
BasicDatePicker.args = {
  ...defaultArgs,
  schema: {
    date: Yup.date()
      .required()
      .min(new Date('2020-09-22'))
      .max(new Date('2100-10-10'))
      .typeError('Invalid date')
  }
};

export const DatePickerBefore2024 = Template.bind({});
DatePickerBefore2024.args = {
  ...defaultArgs,
  schema: {
    date: Yup.date()
      .required()
      .max(new Date('2024-01-01'), 'Date must be before 2024')
      .typeError('Invalid date')
  }
};
