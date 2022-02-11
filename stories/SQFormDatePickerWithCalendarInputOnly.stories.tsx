import {Meta} from '@storybook/react';
import type {SQFormDatePickerWithCalendarInputOnlyProps} from 'components/SQForm/SQFormDatePickerWithCalendarInputOnly';
import type {Moment} from 'moment';
import React from 'react';
import * as Yup from 'yup';
import {SQFormDatePickerWithCalendarInputOnly as SQFormDatePickerWithCalendarInputOnlyComponent} from '../src';
import {SQFormStoryWrapper} from './components/SQFormStoryWrapper';
import type {CustomStory} from './types/storyHelperTypes';
import {createDocsPage} from './utils/createDocsPage';
import getSizeProp from './utils/getSizeProp';

const meta: Meta = {
  title: 'Components/SQFormDatePickerWithCalendarInputOnly',
  component: SQFormDatePickerWithCalendarInputOnlyComponent,
  argTypes: {
    onBlur: {action: 'blurred', table: {disable: true}},
    onChange: {action: 'changed', table: {disable: true}},
    name: {table: {disable: true}},
  },
  parameters: {
    docs: {page: createDocsPage()},
  },
};

const MOCK_INITIAL_STATE = {
  date: '12/01/1990',
};

const basicSchema = {
  date: Yup.date().required().typeError('Invalid date'),
};

const defaultArgs = {
  label: 'Date',
  name: 'date',
};

const Template: CustomStory<SQFormDatePickerWithCalendarInputOnlyProps> = (
  args
) => {
  return (
    <SQFormStoryWrapper
      initialValues={MOCK_INITIAL_STATE}
      validationSchema={basicSchema}
    >
      <SQFormDatePickerWithCalendarInputOnlyComponent
        {...args}
        size={getSizeProp(args.size)}
      />
    </SQFormStoryWrapper>
  );
};

export const BasicDatePicker = Template.bind({});
BasicDatePicker.args = defaultArgs;

export const DisableWeekendsDatePicker = Template.bind({});
DisableWeekendsDatePicker.args = {
  ...defaultArgs,
  setDisabledDate: (date) => {
    const inputDate = date as Moment;
    if (inputDate.day() === 0 || inputDate.day() === 6) {
      return true;
    }
    return false;
  },
};

export const OnlyEnableFirstDayOfMonthDatePicker = Template.bind({});
OnlyEnableFirstDayOfMonthDatePicker.args = {
  ...defaultArgs,
  setDisabledDate: (date) => {
    // disable all days EXCEPT first day of the month
    const inputDate = date as Moment;
    if (inputDate.date() !== 1) {
      return true;
    }
    return false;
  },
};

export default meta;
