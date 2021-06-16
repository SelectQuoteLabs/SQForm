import React from 'react';
import * as Yup from 'yup';

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
    name: {table: {disable: true}},
    SQFormProps: {table: {disable: true}}
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
  name: 'state',
  children: MOCK_STATE_OPTIONS,
  SQFormProps: {
    initialValues: {state: ''}
  }
};

const YES_NO_OPTIONS = [
  {label: 'Yes', value: true},
  {label: 'No', value: false}
];

const booleanValueArgs = {
  label: 'Opt in?',
  name: 'isOptIn',
  children: YES_NO_OPTIONS,
  schema: {isOptIn: Yup.bool().required('Required')},
  SQFormProps: {
    initialValues: {isOptIn: false}
  }
};

const Template = args => {
  const {SQFormProps, schema, ...dropdownProps} = args;
  return (
    <div style={{minWidth: 250}}>
      <SQFormStoryWrapper
        {...defaultArgs.SQFormProps}
        {...SQFormProps}
        validationSchema={schema}
      >
        <SQFormDropdownComponent
          {...dropdownProps}
          size={args.size !== 'auto' ? Number(args.size) : args.size}
        />
      </SQFormStoryWrapper>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = defaultArgs;
Default.storyName = 'SQFormDropdown';

export const BooleanValued = Template.bind({});
BooleanValued.args = booleanValueArgs;
BooleanValued.storyName = 'BooleanValues';
