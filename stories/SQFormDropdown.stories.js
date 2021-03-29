import React from 'react';

import {SQForm, SQFormDropdown as SQFormDropdownComponent} from '../src';

export default {
  title: 'Components/SQFormDropdown',
  component: SQFormDropdownComponent,
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
  {label: 'Kansas', value: 'KS'},
  {label: 'Missouri', value: 'MO'}
];

export const SQFormDropdown = args => (
  <div style={{minWidth: 250}}>
    <SQForm initialValues={{state: ''}} onSubmit={() => {}}>
      <SQFormDropdownComponent label="State" name="state" {...args}>
        {MOCK_STATE_OPTIONS}
      </SQFormDropdownComponent>
    </SQForm>
  </div>
);
SQFormDropdown.storyName = 'SQFormDropdown';
