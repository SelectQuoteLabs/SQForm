import React from 'react';

import {SQForm, SQFormDropdown as SQFormDropdownComponent} from '../src';

export default {
  title: 'Components/SQFormDropdown',
  component: SQFormDropdownComponent,
  argTypes: {
    children: {
      control: null
    }
  },
  parameters: {
    docs: {
      source: {
        type: 'code'
      }
    }
  }
};

const MOCK_STATE_OPTIONS = [
  {label: 'Arizona', value: 'AZ'},
  {label: 'Kansas', value: 'KS', isDisabled: true},
  {label: 'Missouri', value: 'MO'}
];

const defaultArgs = {
  label: 'State',
  name: 'state'
};

export const SQFormDropdown = args => {
  const {validationSchema} = args;
  return (
    <div style={{minWidth: 250}}>
      <SQForm
        initialValues={{[defaultArgs.name]: ''}}
        onSubmit={() => {}}
        validationSchema={validationSchema}
      >
        <SQFormDropdownComponent
          label={defaultArgs.label}
          name={defaultArgs.name}
          {...args}
        >
          {MOCK_STATE_OPTIONS}
        </SQFormDropdownComponent>
      </SQForm>
    </div>
  );
};
SQFormDropdown.storyName = 'SQFormDropdown';
SQFormDropdown.args = defaultArgs;
