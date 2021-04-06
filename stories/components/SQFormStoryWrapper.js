import React from 'react';
import {action} from '@storybook/addon-actions';
import {SQForm} from '../../src';

const withFormikActions = name => (values, formikActions) => {
  formikActions.setSubmitting(false);
  formikActions.resetForm();
  action(name)(values);
};

export const SQFormStoryWrapper = ({
  children,
  initialValues,
  validationSchema
}) => {
  return (
    <SQForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={withFormikActions('submitted')}
    >
      {children}
    </SQForm>
  );
};
