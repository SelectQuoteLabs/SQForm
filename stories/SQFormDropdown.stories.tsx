import React from 'react';
import type {AnySchema} from 'yup'; 

import {SQFormDropdown as SQFormDropdownComponent} from '../src';
import type {SQFormDropdownProps} from 'components/SQForm/SQFormDropdown';
import {SQFormStoryWrapper} from './components/SQFormStoryWrapper';
import type {SQFormStoryWrapperProps} from './components/SQFormStoryWrapper';
import getSizeProp from './utils/getSizeProp';
import type {gridOptions} from './utils/getSizeProp';
import type { Meta, Story } from '@storybook/react';
import {createDocsPage} from './utils/createDocsPage';
import * as markdown from '../notes/SQFormDropdown.md';

type FormProps = {
  initalValues?: SQFormStoryWrapperProps['initialValues'];
} & Omit<SQFormStoryWrapperProps, 'initalValues' | 'children'>;

type DropdownStoryType = Story<
  Omit<SQFormDropdownProps, 'size'> &
  {
   size?: gridOptions,
   SQFormProps?: FormProps,
   schema: Record<string, AnySchema>
  }
>

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
} as Meta;

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

const Template: DropdownStoryType = (args) => {
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
