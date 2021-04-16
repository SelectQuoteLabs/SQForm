import React from 'react';

import {SQFormDropdown as SQFormDropdownComponent} from '../src';
import {SQFormStoryWrapper} from './components/SQFormStoryWrapper';
import {createDocsPage} from './utils/createDocsPage';
import markdown from '../notes/SQFormDropdown.md';

export default {
  title: 'Components/SQFormDropdown',
  component: SQFormDropdownComponent,
  argTypes: {
    children: {table: {disable: true}},
    onBlur: {action: 'blurred', table: {disable: true}},
    onChange: {action: 'changed', table: {disable: true}},
    name: {table: {disable: true}}
  },
  parameters: {
    docs: {
      page: createDocsPage({markdown}),
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
  const {validationSchema, ...dropdownProps} = args;
  return (
    <div style={{minWidth: 250}}>
      <SQFormStoryWrapper
        initialValues={{[defaultArgs.name]: ''}}
        validationSchema={validationSchema}
      >
        <SQFormDropdownComponent
          label={defaultArgs.label}
          name={defaultArgs.name}
          {...dropdownProps}
          size={args.size !== 'auto' ? Number(args.size) : args.size}
        >
          {MOCK_STATE_OPTIONS}
        </SQFormDropdownComponent>
      </SQFormStoryWrapper>
    </div>
  );
};
SQFormDropdown.storyName = 'SQFormDropdown';
SQFormDropdown.args = defaultArgs;
