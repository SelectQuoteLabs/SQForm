import React from 'react';
import * as Yup from 'yup';

import {SQFormMultiSelect as SQFormMultiSelectComponent} from '../src';
import {
  SQFormStoryWrapper,
  SQFormStoryWrapperProps,
} from './components/SQFormStoryWrapper';
import {createDocsPage} from './utils/createDocsPage';
import type {Story} from '@storybook/react';
import type {SQFormMultiSelectProps} from 'components/SQForm/SQFormMultiSelect';
import type {GridSizeOptions} from './types/storyHelperTypes';
import getSizeProp from './utils/getSizeProp';

type MultiSelectStoryType = Story<
  Omit<SQFormMultiSelectProps, 'size' | 'name' | 'label'> & {
    size?: GridSizeOptions;
    sqFormProps?: Omit<SQFormStoryWrapperProps, 'children'>;
    validationSchema: SQFormStoryWrapperProps['validationSchema'];
  }
>;

export default {
  title: 'Components/SQFormMultiSelect',
  component: SQFormMultiSelectComponent,
  argTypes: {
    children: {table: {disable: true}},
    onChange: {action: 'changed', table: {disable: true}},
    name: {table: {disable: true}},
  },
  parameters: {
    docs: {
      page: createDocsPage(),
      source: {
        type: 'code',
      },
    },
  },
};

const MOCK_FRIENDS_OPTIONS = [
  {label: 'Joe', value: 1},
  {label: 'Jane', value: 2},
  {label: 'Jack', value: random(10 + Math.ceil(Math.random() * 20))},
  {label: 'Jill', value: random(10 + Math.ceil(Math.random() * 20))},
  {label: 'John', value: random(10 + Math.ceil(Math.random() * 20))},
  {label: 'Jocelyn', value: random(10 + Math.ceil(Math.random() * 20))},
  {label: 'Jacob', value: random(10 + Math.ceil(Math.random() * 20))},
  {label: 'Jackson', value: random(10 + Math.ceil(Math.random() * 20))},
  {label: 'Josh', value: random(10 + Math.ceil(Math.random() * 20))},
  {label: 'Joseph', value: random(10 + Math.ceil(Math.random() * 20))},
  {label: 'Jeremy', value: random(10 + Math.ceil(Math.random() * 20))},
  {label: 'Joel', value: random(10 + Math.ceil(Math.random() * 20))},
  {label: 'Jonah', value: random(10 + Math.ceil(Math.random() * 20))},
  {label: 'Judah', value: random(10 + Math.ceil(Math.random() * 20))},
  {label: 'Jimmy', value: random(10 + Math.ceil(Math.random() * 20))},
  {label: 'Jessica', value: random(10 + Math.ceil(Math.random() * 20))},
];

const defaultArgs = {
  label: 'Friends',
  name: 'friends',
  children: MOCK_FRIENDS_OPTIONS,
};

const Template: MultiSelectStoryType = (args) => {
  const {sqFormProps, validationSchema, size, ...rest} = args;
  return (
    <div style={{minWidth: 250}}>
      <SQFormStoryWrapper
        initialValues={{[defaultArgs.name]: []}}
        validationSchema={validationSchema}
        {...sqFormProps}
      >
        <SQFormMultiSelectComponent
          name={defaultArgs.name}
          label={defaultArgs.label}
          {...rest}
          size={getSizeProp(size)}
        />
      </SQFormStoryWrapper>
    </div>
  );
};

export const SQFormMultiSelect = Template.bind({});
SQFormMultiSelect.args = defaultArgs;

export const WithValidation = Template.bind({});
WithValidation.args = {
  ...defaultArgs,
  validationSchema: Yup.object({
    friends: Yup.array().required().min(1, 'Required'),
  }),
  sqFormProps: {
    initialValues: {friends: []},
  },
};

function random(length: number) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}
