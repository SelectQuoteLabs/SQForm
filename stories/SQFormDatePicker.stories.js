import React from 'react';
import {withKnobs, boolean} from '@storybook/addon-knobs';
import * as Yup from 'yup';
import {SQForm, SQFormDatePicker} from '../src';
import {createDocsPage} from './utils/createDocsPage';
import markdown from '../notes/SQFormDatePicker.md';

export default {
  title: 'Components/SQFormDatePicker',
  decorators: [withKnobs],
  parameters: {
    docs: {page: createDocsPage({markdown})}
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

const schemaBefore2024 = {
  date: Yup.date()
    .required()
    .max(new Date('2024-01-01'), 'Date must be before 2024')
    .typeError('Invalid date')
};

export const datePickerBefore2024 = () => {
  return (
    <SQForm
      initialValues={MOCK_INITIAL_STATE}
      onSubmit={handleSubmit}
      validationSchema={schemaBefore2024}
    >
      <SQFormDatePicker
        name="date"
        label="Date"
        isDisabled={boolean('isDisabled')}
      />
    </SQForm>
  );
};
