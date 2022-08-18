import * as Yup from 'yup';
import React from 'react';
import markdown from '../notes/SQFormDatePicker.md';
import {SQFormDateTimePicker as SQFormDateTimePickerComponent} from '../src';
import {SQFormStoryWrapper} from './components/SQFormStoryWrapper';
import {createDocsPage} from './utils/createDocsPage';
import type {Meta} from '@storybook/react';
import type {CustomStory} from './types/storyHelperTypes';
import type {SQFormDateTimePickerProps} from 'components/SQForm/SQFormDateTimePicker';
import getSizeProp from './utils/getSizeProp';

const meta: Meta = {
  title: 'Components/SQFormDateTimePicker',
  component: SQFormDateTimePickerComponent,
  argTypes: {
    onBlur: {action: 'blurred', table: {disable: true}},
    onChange: {action: 'changed', table: {disable: true}},
    name: {table: {disable: true}},
  },
  parameters: {
    docs: {page: createDocsPage({markdown})},
  },
};

const MOCK_INITIAL_STATE = {
  datetime: '09/22/2020 02:20 PM',
};

const schema = Yup.object({
  datetime: Yup.date()
    .required()
    .min(new Date('2020-09-22'))
    .max(new Date('2100-10-10'))
    .typeError('Invalid date'),
});

const defaultArgs = {
  label: 'Date/Time',
  name: 'datetime',
};

const Template: CustomStory<SQFormDateTimePickerProps> = (args) => {
  const {schema, sqFormProps, ...rest} = args;
  return (
    <SQFormStoryWrapper
      initialValues={MOCK_INITIAL_STATE}
      validationSchema={schema}
      {...sqFormProps}
    >
      <SQFormDateTimePickerComponent {...rest} size={getSizeProp(args.size)} />
    </SQFormStoryWrapper>
  );
};

export const BasicDateTimePicker = Template.bind({});
BasicDateTimePicker.storyName = 'BasicDateTimePicker';
BasicDateTimePicker.args = defaultArgs;

export const WithValidation = Template.bind({});
WithValidation.args = {
  ...defaultArgs,
  schema,
};
WithValidation.parameters = {
  controls: {exclude: 'schema'},
};

export default meta;
