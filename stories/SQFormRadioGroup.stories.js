import React from 'react';
import {SQForm} from 'scplus-shared-components';
import * as Yup from 'yup';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import {SQFormButton, SQFormRadioButtonGroup} from '../src';

export default {
  title: 'SQFormRadioGroup'
};

export const radioGroup = () => {
  const initialValues = {
    testGroup: 'test1'
  };

  const validationSchema = {
    testGroup: Yup.string().required('Required')
  };

  const onSubmit = formValues => {
    const selectedRadioValue = formValues.testGroup;
    window.alert(`Selected Radio Value: ${selectedRadioValue}`);
  };

  const radioOptions = [
    {label: 'Test1', value: 'test1'},
    {label: 'Test2', value: 'test2', isDisabled: true},
    {label: 'Test3', value: 'test3'}
  ];

  return (
    <Card raised style={{padding: 16}}>
      <SQForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <SQFormRadioButtonGroup
          name="testGroup"
          groupLabel="Radio Group"
          isRequired
        >
          {radioOptions}
        </SQFormRadioButtonGroup>
        <Grid item sm={12}>
          <SQFormButton>Submit</SQFormButton>
        </Grid>
      </SQForm>
    </Card>
  );
};
