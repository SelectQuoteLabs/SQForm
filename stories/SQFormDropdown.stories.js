import React from 'react';

import {SQFormDropdown as SQFormDropdownComponent} from '../src';
import {SQFormStoryWrapper} from './components/SQFormStoryWrapper';
import {createDocsPage} from './utils/createDocsPage';
import getSizeProp from './utils/getSizeProp';
import markdown from '../notes/SQFormDropdown.md';

export default {
  title: 'Components/SQFormDropdown',
  component: SQFormDropdownComponent,
  argTypes: {
    children: {table: {disable: true}},
    onBlur: {action: 'blurred', table: {disable: true}},
    onChange: {action: 'changed', table: {disable: true}},
    name: {table: {disable: true}},
    SQFormProps: {table: {disable: true}},
  },
  parameters: {
    docs: {
      page: createDocsPage({markdown}),
      source: {
        type: 'code',
      },
    },
  },
};

const MOCK_STATE_OPTIONS = [
  {label: 'Arizona', value: 'AZ'},
  {label: 'Kansas', value: 'KS', isDisabled: true},
  {label: 'Missouri', value: 'MO'},
];

const defaultArgs = {
  label: 'State',
  name: 'state',
  children: MOCK_STATE_OPTIONS,
  SQFormProps: {
    initialValues: {state: ''},
  },
};

const Template = (args) => {
  const {SQFormProps, schema, size, ...dropdownProps} = args;
  return (
    <div style={{minWidth: 250}}>
      <SQFormStoryWrapper
        {...defaultArgs.SQFormProps}
        validationSchema={schema}
        {...SQFormProps}
      >
        <SQFormDropdownComponent {...dropdownProps} size={getSizeProp(size)} />
      </SQFormStoryWrapper>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = defaultArgs;
Default.storyName = 'SQFormDropdown';
