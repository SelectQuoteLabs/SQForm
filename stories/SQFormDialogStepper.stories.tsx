import React from 'react';
import * as Yup from 'yup';
import {createDocsPage} from './utils/createDocsPage';
import markdown from '../notes/SQFormDialogStepper.md';

import {
  SQFormTextField,
  SQFormDialogStep,
  SQFormDialogStepper as SQFormDialogStepperComponent,
  SQFormDropdown,
} from '../src';
import type {SQFormDialogStepperProps} from 'components/SQFormDialogStepper/SQFormDialogStepper';

export default {
  title: 'Forms/SQFormDialogStepper',
  component: SQFormDialogStepperComponent,
  argTypes: {
    onClose: {action: 'onClose', table: {disable: true}},
    onSubmit: {action: 'onSubmit', table: {disable: true}},
    setValues: {action: 'setValues', table: {disable: true}},
    children: {table: {disable: true}},
  },
  parameters: {
    docs: {
      page: createDocsPage({markdown, showStories: false}),
      source: {
        type: 'code',
      },
    },
  },
};

const handleSubmit = <TValues extends unknown>(values: TValues) => {
  window.alert(JSON.stringify(values, null, 2));
};

const personalDataInitialValues = {
  firstName: '',
  lastName: '',
};

const accountDetailsInitValues = {
  newPatient: '',
  accountID: '',
};
const booleanOptions = [
  {
    label: 'Yes',
    value: 'yes',
  },
  {
    label: 'No',
    value: 'no',
  },
];

const defaultArgs = {
  onSubmit: handleSubmit,
  initialValues: {...personalDataInitialValues, ...accountDetailsInitValues},
  isOpen: false,
  onClose: () => {
    /* do nothing */
  },
};

export const Default = (
  args: SQFormDialogStepperProps<typeof defaultArgs.initialValues>
): React.ReactElement => {
  return (
    <>
      <h1>
        Toggle the Dialog's <code>isOpen</code> state in the Controls tab
      </h1>

      <SQFormDialogStepperComponent {...args}>
        <SQFormDialogStep label="Personal Data">
          <SQFormTextField size={6} name="firstName" label="First Name" />
          <SQFormTextField size={6} name="lastName" label="Last Name" />
        </SQFormDialogStep>
        <SQFormDialogStep label="Account Info">
          <SQFormDropdown
            name="newPatient"
            label="New patient"
            size={4}
            children={booleanOptions}
          />
          <SQFormTextField
            size={8}
            name="accountID"
            type="number"
            label="Account ID"
          />
        </SQFormDialogStep>
      </SQFormDialogStepperComponent>
    </>
  );
};

Default.args = {
  ...defaultArgs,
  title: 'Default',
};

export const WithValidation = (
  args: SQFormDialogStepperProps<typeof defaultArgs.initialValues>
): React.ReactElement => {
  return (
    <>
      <h1>
        Toggle the Dialog's <code>isOpen</code> state in the Controls tab
      </h1>

      <SQFormDialogStepperComponent {...args}>
        <SQFormDialogStep
          label="Personal Data"
          validationSchema={Yup.object({
            firstName: Yup.string().required(),
            lastName: Yup.string().required(),
          })}
        >
          <SQFormTextField size={6} name="firstName" label="First Name" />
          <SQFormTextField size={6} name="lastName" label="Last Name" />
        </SQFormDialogStep>
        <SQFormDialogStep
          label="Account Info"
          validationSchema={Yup.object({
            accountID: Yup.mixed().when('newPatient', {
              is: (value: string) => value === 'yes',
              then: Yup.number()
                .required()
                .min(100, 'Required for new account'),
            }),
          })}
        >
          <SQFormDropdown
            name="newPatient"
            label="New patient"
            size={4}
            children={booleanOptions}
          />
          <SQFormTextField
            size={8}
            name="accountID"
            type="number"
            label="Account ID"
          />
        </SQFormDialogStep>
      </SQFormDialogStepperComponent>
    </>
  );
};

WithValidation.args = {
  ...defaultArgs,
  title: 'With Validation',
};

export const WithLoadingStep = (
  args: SQFormDialogStepperProps<typeof defaultArgs.initialValues>
): React.ReactElement => {
  return (
    <>
      <h1>
        Toggle the Dialog's <code>isOpen</code> state in the Controls tab
      </h1>

      <SQFormDialogStepperComponent {...args}>
        <SQFormDialogStep label="Personal Data">
          <SQFormTextField size={6} name="firstName" label="First Name" />
          <SQFormTextField size={6} name="lastName" label="Last Name" />
        </SQFormDialogStep>
        <SQFormDialogStep
          label="Account Info"
          isLoading={true}
          loadingMessage="Loading data for the step"
        >
          <SQFormDropdown
            name="newPatient"
            label="New patient"
            size={4}
            children={booleanOptions}
          />
          <SQFormTextField
            size={8}
            name="accountID"
            type="number"
            label="Account ID"
          />
        </SQFormDialogStep>
      </SQFormDialogStepperComponent>
    </>
  );
};

WithLoadingStep.args = {
  ...defaultArgs,
  title: 'With Loading Step',
};
