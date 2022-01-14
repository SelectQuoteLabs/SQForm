import {action} from '@storybook/addon-actions';
import React from 'react';
import * as Yup from 'yup';

import {SQFormAsyncAutocomplete} from '../src';
import getSizeProp from './utils/getSizeProp';
import {createDocsPage} from './utils/createDocsPage';
import {SQFormStoryWrapper} from './components/SQFormStoryWrapper';
import type {Story, Meta} from '@storybook/react';
import type {SQFormAsyncAutocompleteProps} from 'components/SQForm/SQFormAsyncAutocomplete';
import type {GridSizeOptions} from './types/storyHelperTypes';
import type {SQFormStoryWrapperProps} from './components/SQFormStoryWrapper';

type FormProps = {
  initialValues?: SQFormStoryWrapperProps['initialValues'];
} & Omit<SQFormStoryWrapperProps, 'initialValues' | 'children'>;

type SQFormAsyncAutocompleteStory = Story<
  Omit<SQFormAsyncAutocompleteProps, 'size'> & {
    size?: GridSizeOptions;
    sqFormProps?: FormProps;
    schema: Record<string, Yup.AnySchema>;
  }
>;

const meta: Meta = {
  title: 'Components/SQFormAsyncAutocomplete',
  component: SQFormAsyncAutocomplete,
  argTypes: {
    onBlur: {action: 'blurred', table: {disable: true}},
    onChange: {action: 'changed', table: {disable: true}},
    onInputChange: {action: 'inputChanged', table: {disable: true}},
    onOpen: {action: 'opened', table: {disable: true}},
    onClose: {action: 'closed', table: {disable: true}},
    name: {table: {disable: true}},
    handleAsyncInputChange: {table: {disable: true}},
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

const defaultArgs = {
  name: 'asyncAutocomplete',
  label: 'Async Autocomplete',
  children: [
    {
      label: 'First',
      value: 'first',
    },
    {
      label: 'Second',
      value: 'second',
    },
    {
      label: 'Third',
      value: 'third',
    },
    {
      label: 'Fourth',
      value: 'fourth',
    },
    {
      label: 'Fifth',
      value: 'fifth',
    },
  ],
  handleAsyncInputChange: action('handleAsyncInputChange'),
};

const Template: SQFormAsyncAutocompleteStory = (args) => {
  const {schema, sqFormProps, size, ...rest} = args;
  return (
    <div style={{minWidth: 250}}>
      <SQFormStoryWrapper
        initialValues={{[defaultArgs.name]: ''}}
        validationSchema={schema}
        {...sqFormProps}
      >
        <SQFormAsyncAutocomplete {...rest} size={getSizeProp(size)} />
      </SQFormStoryWrapper>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const WithValidation = Template.bind({});
WithValidation.args = {
  ...defaultArgs,
  schema: {
    [defaultArgs.name]: Yup.string().required(),
  },
};
WithValidation.parameters = {
  controls: {exclude: 'schema'},
};

export default meta;
