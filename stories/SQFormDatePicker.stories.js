import React from 'react';
import {withKnobs, boolean} from '@storybook/addon-knobs';
import {withInfo} from '@storybook/addon-info';
import * as Yup from 'yup';
import {SQForm, SQFormDatePicker} from '../src';
import markdown from '../notes/SQFormDatePicker.md';

export default {
  title: 'SQFormDatePicker',
  decorators: [withKnobs, withInfo],
  parameters: {
    notes: {markdown}
  }
};

const MOCK_INITIAL_STATE = {
  date: '09/22/2020'
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

const schema = {
  date: Yup.date()
    .required()
    .min(new Date())
    .max(new Date('2100-10-10'))
    .typeError('Invalid date')
};

export const basicDatePicker = () => {
  return (
    <SQForm
      initialValues={MOCK_INITIAL_STATE}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <SQFormDatePicker
        name="date"
        label="Date"
        isDisabled={boolean('isDisabled')}
      />
    </SQForm>
  );
};

export const onlyEnableFirstDayOfMonthDatePicker = () => {
  const setDisabledDates = date => {
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
      <SQFormDatePicker
        name="date"
        label="Date"
        setDisabledDates={setDisabledDates}
      />
    </SQForm>
  );
};

export const disableWeekendsDatePicker = () => {
  const setDisabledDates = date => {
    if (date.day() === 0 || date.day() === 6) {
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
      <SQFormDatePicker
        name="date"
        label="Date"
        setDisabledDates={setDisabledDates}
      />
    </SQForm>
  );
};
