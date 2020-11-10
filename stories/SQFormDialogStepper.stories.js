import React from 'react';
import {mixed, number, object, string} from 'yup';
import {withKnobs, boolean} from '@storybook/addon-knobs';
import {withInfo} from '@storybook/addon-info';
import {action} from '@storybook/addon-actions';
import markdown from '../notes/SQFormDialogStepper.md';

import {
  SQFormTextField,
  SQFormCheckbox,
  SQFormDialogStep,
  SQFormDialogStepper
} from '../src';

export default {
  title: 'SQFormDialogStepper',
  decorators: [withKnobs, withInfo],
  parameters: {
    notes: {markdown}
  }
};

const handleSubmit = (values, actions) => {
  window.alert(JSON.stringify(values, null, 2));
};

export const SQFormDialogStepperWithValidationAndHeightStyle = () => {
  return (
    <>
      <h3>Toggle the isOpen checkbox in the Knobs tab to view the Stepper</h3>
      <SQFormDialogStepper
        title="SQ Stepper Form"
        isOpen={boolean('isOpen', false, 'Open/Close Dialog')}
        onClose={action('Close button clicked')}
        contentHeight="25rem"
        contentStyle={{height: '30rem'}}
        fullWidth
        muiGridProps={{
          justify: 'space-between',
          alignItems: 'center'
        }}
        initialValues={{
          firstName: '',
          lastName: '',
          newAccount: false,
          accountID: '',
          description: '',
          age: ''
        }}
        setValues={() => {
          console.log('values set');
        }}
        onSubmit={handleSubmit}
      >
        <SQFormDialogStep
          label="Personal Data"
          validationSchema={object({
            firstName: string().required('Required'),
            lastName: string().required('Required name.')
          })}
        >
          <SQFormTextField fullWidth name="firstName" label="First Name" />
          <SQFormTextField fullWidth name="lastName" label="Last Name" />
          <SQFormTextField fullWidth name="middleI" label="Middle Initial" />
          <SQFormTextField fullWidth name="nickname" label="Nick-name" />
          <SQFormTextField fullWidth name="alias" label="Alias" />
          <SQFormCheckbox
            name="newAccount"
            type="checkbox"
            label="New Account"
          />
        </SQFormDialogStep>
        <SQFormDialogStep
          label="Account Info"
          validationSchema={object({
            accountID: mixed().when('newAccount', {
              is: true,
              then: number()
                .required()
                .min(100, 'Since this is a new account we need the number')
            })
          })}
        >
          <SQFormTextField
            fullWidth
            name="accountID"
            type="number"
            label="Account ID"
          />
          <SQFormTextField name="age" label="Age" size={2} />
        </SQFormDialogStep>
        <SQFormDialogStep
          label="More Info"
          validationSchema={object({
            description: string().required('Required')
          })}
        >
          <SQFormTextField fullWidth name="description" label="Description" />
        </SQFormDialogStep>
      </SQFormDialogStepper>
    </>
  );
};

export const SQDialogStepperWithValidation = () => {
  return (
    <>
      <h3>Toggle the isOpen checkbox in the Knobs tab to view the Stepper</h3>
      <SQFormDialogStepper
        title="SQ Stepper Form"
        isOpen={boolean('isOpen', false, 'Open/Close Dialog')}
        onClose={action('Close button clicked')}
        contentHeight="25rem"
        fullWidth
        muiGridProps={{
          justify: 'space-between',
          alignItems: 'center'
        }}
        initialValues={{
          firstName: '',
          lastName: '',
          newAccount: false,
          accountID: '',
          description: '',
          age: ''
        }}
        setValues={() => {
          console.log('values set');
        }}
        onSubmit={handleSubmit}
      >
        <SQFormDialogStep
          label="Personal Data"
          validationSchema={object({
            firstName: string().required('Required'),
            lastName: string().required('Required name.')
          })}
        >
          <SQFormTextField fullWidth name="firstName" label="First Name" />
          <SQFormTextField fullWidth name="lastName" label="Last Name" />
          <SQFormTextField fullWidth name="middleI" label="Middle Initial" />
          <SQFormTextField fullWidth name="nickname" label="Nick-name" />
          <SQFormTextField fullWidth name="alias" label="Alias" />
          <SQFormCheckbox
            name="newAccount"
            type="checkbox"
            label="New Account"
          />
        </SQFormDialogStep>
        <SQFormDialogStep
          label="Account Info"
          validationSchema={object({
            accountID: mixed().when('newAccount', {
              is: true,
              then: number()
                .required()
                .min(100, 'Since this is a new account we need the number')
            })
          })}
        >
          <SQFormTextField
            fullWidth
            name="accountID"
            type="number"
            label="Account ID"
          />
          <SQFormTextField name="age" label="Age" size={2} />
        </SQFormDialogStep>
        <SQFormDialogStep
          label="More Info"
          validationSchema={object({
            description: string().required('Required')
          })}
        >
          <SQFormTextField fullWidth name="description" label="Description" />
        </SQFormDialogStep>
      </SQFormDialogStepper>
    </>
  );
};
