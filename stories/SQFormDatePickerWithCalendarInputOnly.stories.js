import React from 'react';
import {withKnobs, boolean} from '@storybook/addon-knobs';
import {withInfo} from '@storybook/addon-info';
import * as Yup from 'yup';
import {SQForm, SQFormDatePickerWithCalendarInputOnly} from '../src';

export default {
  title: 'SQFormDatePickerWithCalendarInputOnly',
  decorators: [withKnobs, withInfo]
};

const MOCK_INITIAL_STATE = {
  date: '12/01/1990'
};

const handleSubmit = (values, actions) => {
  window.alert(JSON.stringify(values, null, 2));
  actions.setSubmitting(false);
  actions.resetForm();
};

const basicSchema = {
  date: Yup.date()
    .required()
    .typeError('Invalid date')
};

export const basicDatePicker = () => {
  return (
    <SQForm
      initialValues={MOCK_INITIAL_STATE}
      onSubmit={handleSubmit}
      validationSchema={basicSchema}
    >
      <SQFormDatePickerWithCalendarInputOnly
        name="date"
        label="Date"
        isDisabled={boolean('Date Picker Disabled', false)}
      />
    </SQForm>
  );
};

export const disableWeekendsDatePicker = () => {
  const setDisabledDate = date => {
    if (date.day() === 0 || date.day() === 6) {
      return true;
    }
    return false;
  };

  return (
    <SQForm
      initialValues={MOCK_INITIAL_STATE}
      onSubmit={handleSubmit}
      validationSchema={basicSchema}
    >
      <SQFormDatePickerWithCalendarInputOnly
        name="date"
        label="Date"
        setDisabledDate={setDisabledDate}
      />
    </SQForm>
  );
};

export const onlyEnableFirstDayOfMonthDatePicker = () => {
  const setDisabledDate = date => {
    // disable all days EXCEPT first day of the month
    if (date.date() !== 1) {
      return true;
    }
    return false;
  };

  return (
    <SQForm
      initialValues={{date: ''}}
      onSubmit={handleSubmit}
      validationSchema={basicSchema}
    >
      <SQFormDatePickerWithCalendarInputOnly
        name="date"
        label="Date"
        setDisabledDate={setDisabledDate}
      />
    </SQForm>
  );
};
