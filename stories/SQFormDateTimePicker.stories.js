import React from 'react';
import {withKnobs, boolean} from '@storybook/addon-knobs';
import {withInfo} from '@storybook/addon-info';
import * as Yup from 'yup';
import {SQForm, SQFormDateTimePicker} from '../src';
import markdown from '../notes/SQFormDatePicker.md';

export default {
  title: 'SQFormDateTimePicker',
  decorators: [withKnobs, withInfo],
  parameters: {
    notes: {markdown}
  }
};

const MOCK_INITIAL_STATE = {
  datetime: '09/22/2020 02:20 PM'
};

const handleSubmit = (values, actions) => {
  window.alert(JSON.stringify(values, null, 2));
  actions.setSubmitting(false);
  actions.resetForm();
};

const schema = {
  datetime: Yup.date()
    .required()
    .min(new Date())
    .max(new Date('2100-10-10'))
    .typeError('Invalid date')
};

export const basicDateTimePicker = () => {
  return (
    <SQForm
      initialValues={MOCK_INITIAL_STATE}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <SQFormDateTimePicker
        name="datetime"
        label="Date/Time"
        isDisabled={boolean('isDisabled')}
      />
    </SQForm>
  );
};
