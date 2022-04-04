import React from 'react';
import {SQFormDropdown as SQFormDropdownComponent} from '../src';
import type {SQFormDropdownProps} from 'components/SQForm/SQFormDropdown';
import {SQFormStoryWrapper} from './components/SQFormStoryWrapper';
import type {SQFormStoryWrapperProps} from './components/SQFormStoryWrapper';
import getSizeProp from './utils/getSizeProp';
import type {GridSizeOptions} from './types/storyHelperTypes';
import type {Meta, Story} from '@storybook/react';
import {createDocsPage} from './utils/createDocsPage';
import * as markdown from '../notes/SQFormDropdown.md';

type FormProps = {
  initalValues?: SQFormStoryWrapperProps['initialValues'];
} & Omit<SQFormStoryWrapperProps, 'initalValues' | 'children'>;

type DropdownStoryType = Story<
  Omit<SQFormDropdownProps, 'size'> & {
    size?: GridSizeOptions;
    sqFormProps?: FormProps;
    schema: SQFormStoryWrapperProps['validationSchema'];
  }
>;

const meta: Meta = {
  title: 'Components/SQFormDropdown',
  component: SQFormDropdownComponent,
  argTypes: {
    children: {table: {disable: true}},
    onBlur: {action: 'blurred', table: {disable: true}},
    onChange: {action: 'changed', table: {disable: true}},
    name: {table: {disable: true}},
    sqFormProps: {table: {disable: true}},
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
  sqFormProps: {
    initialValues: {state: ''},
  },
};

const Template: DropdownStoryType = (args) => {
  const {sqFormProps, schema, size, ...dropdownProps} = args;
  return (
    <div style={{minWidth: 250}}>
      <SQFormStoryWrapper
        {...defaultArgs.sqFormProps}
        validationSchema={schema}
        {...sqFormProps}
      >
        <SQFormDropdownComponent {...dropdownProps} size={getSizeProp(size)} />
      </SQFormStoryWrapper>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = defaultArgs;
Default.storyName = 'SQFormDropdown';

export default meta;
