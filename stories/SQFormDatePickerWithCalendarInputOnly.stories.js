import React from 'react';
import * as Yup from 'yup';
import {SQFormDatePickerWithCalendarInputOnly as SQFormDatePickerWithCalendarInputOnlyComponent} from '../src';
import {SQFormStoryWrapper} from './components/SQFormStoryWrapper';
import {createDocsPage} from './utils/createDocsPage';

export default {
  title: 'Components/SQFormDatePickerWithCalendarInputOnly',
  component: SQFormDatePickerWithCalendarInputOnlyComponent,
  argTypes: {
    onBlur: {action: 'blurred', table: {disable: true}},
    onChange: {action: 'changed', table: {disable: true}},
    name: {table: {disable: true}}
  },
  parameters: {
    docs: {page: createDocsPage()}
  }
};

const MOCK_INITIAL_STATE = {
  date: '12/01/1990'
};

const basicSchema = {
  date: Yup.date()
    .required()
    .typeError('Invalid date')
};

const defaultArgs = {
  label: 'Date',
  name: 'date'
};

const Template = args => {
  return (
    <SQFormStoryWrapper
      initialValues={MOCK_INITIAL_STATE}
      validationSchema={basicSchema}
    >
      <SQFormDatePickerWithCalendarInputOnlyComponent
        name={defaultArgs.name}
        label={defaultArgs.label}
        {...args}
      />
    </SQFormStoryWrapper>
  );
};

export const BasicDatePicker = Template.bind({});
BasicDatePicker.args = defaultArgs;

export const DisableWeekendsDatePicker = Template.bind({});
DisableWeekendsDatePicker.args = {
  ...defaultArgs,
  setDisabledDate: date => {
    if (date.day() === 0 || date.day() === 6) {
      return true;
    }
    return false;
  }
};

export const OnlyEnableFirstDayOfMonthDatePicker = Template.bind({});
OnlyEnableFirstDayOfMonthDatePicker.args = {
  ...defaultArgs,
  setDisabledDate: date => {
    // disable all days EXCEPT first day of the month
    if (date.date() !== 1) {
      return true;
    }
    return false;
  }
};
