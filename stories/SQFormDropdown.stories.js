import React from 'react';

import {SQForm, SQFormDropdown as SQFormDropdownComponent} from '../src';
import {createDocsPage} from './utils/createDocsPage';
import markdown from '../notes/SQFormDropdown.md';

export default {
  title: 'Components/SQFormDropdown',
  component: SQFormDropdownComponent,
  argTypes: {
    children: {table: {disable: true}},
    onBlur: {action: 'blurred', table: {disable: true}},
    onChange: {action: 'changed', table: {disable: true}}
  },
  parameters: {
    docs: {page: createDocsPage({markdown})}
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

export const SQFormDropdown = args => (
  <div style={{minWidth: 250}}>
    <SQForm initialValues={{[defaultArgs.name]: ''}} onSubmit={() => {}}>
      <SQFormDropdownComponent
        label={defaultArgs.label}
        name={defaultArgs.name}
        {...args}
        size={Number(args.size)}
      >
        {MOCK_STATE_OPTIONS}
      </SQFormDropdownComponent>
    </SQForm>
  </div>
);
SQFormDropdown.storyName = 'SQFormDropdown';
SQFormDropdown.args = defaultArgs;
