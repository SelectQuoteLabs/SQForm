import React from 'react';
import {render} from '@testing-library/react';
import SQForm from '../components/SQForm/SQForm';

export const renderSQForm = (ui, options = {}) => {
  const {initialValues = {}, validationSchema} = options;

  return render(
    <SQForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={() => {}}
    >
      {ui}
    </SQForm>
  );
};
