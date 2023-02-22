import * as Yup from 'yup';
import React from 'react';
import * as markdown from '../notes/SQFormDatePicker.md';
import {SQFormDatePicker as SQFormDatePickerComponent} from '../src';
import {createDocsPage} from './utils/createDocsPage';
import {SQFormStoryWrapper} from './components/SQFormStoryWrapper';
import type {Story, Meta} from '@storybook/react';
import type {SQFormDatePickerProps} from 'components/fields/SQFormDatePicker/SQFormDatePicker';
import type {SQFormStoryWrapperProps} from './components/SQFormStoryWrapper';

export type FormProps = {
  initialValues?: SQFormStoryWrapperProps['initialValues'];
} & Omit<SQFormStoryWrapperProps, 'initialValues' | 'children'>;

export type SQFormDatePickerStory = Story<
  Omit<SQFormDatePickerProps, 'label' | 'name'> & {
    sqFormProps?: FormProps;
    schema: SQFormStoryWrapperProps['validationSchema'];
  }
>;

const meta: Meta = {
  title: 'Components/SQFormDatePicker',
  component: SQFormDatePickerComponent,
  argTypes: {
    onBlur: {action: 'blurred', table: {disable: true}},
    onChange: {action: 'changed', table: {disable: true}},
    schema: {table: {disable: true}},
    name: {table: {disable: true}},
  },
  parameters: {
    docs: {page: createDocsPage({markdown})},
  },
};

const MOCK_INITIAL_VALUE = {
  date: '09/22/2020',
};

const defaultArgs = {
  label: 'Date',
  name: 'date',
};

const Template: SQFormDatePickerStory = (args) => {
  const {schema, sqFormProps, ...rest} = args;

  return (
    <SQFormStoryWrapper
      initialValues={MOCK_INITIAL_VALUE}
      validationSchema={schema}
      {...sqFormProps}
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
  schema: Yup.object({
    date: Yup.date()
      .required()
      .min(new Date('2020-09-22'))
      .max(new Date('2100-10-10'))
      .typeError('Invalid date'),
  }),
};

export const DatePickerBefore2024 = Template.bind({});
DatePickerBefore2024.args = {
  ...defaultArgs,
  schema: Yup.object({
    date: Yup.date()
      .required()
      .max(new Date('2024-01-01'), 'Date must be before 2024')
      .typeError('Invalid date'),
  }),
};

export default meta;
