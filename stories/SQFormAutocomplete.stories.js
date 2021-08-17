import React from 'react';
import * as Yup from 'yup';

import {SQFormAutocomplete} from '../src';
import {SQFormStoryWrapper} from './components/SQFormStoryWrapper';
import {createDocsPage} from './utils/createDocsPage';

export default {
  title: 'Components/SQFormAutocomplete',
  component: SQFormAutocomplete,
  argTypes: {
    onBlur: {action: 'blurred', table: {disable: true}},
    onChange: {action: 'changed', table: {disable: true}},
    onInputChange: {action: 'inputChanged', table: {disable: true}},
    name: {table: {disable: true}}
  },
  parameters: {
    docs: {
      page: createDocsPage(),
      source: {
        type: 'code'
      }
    }
  }
};

const defaultArgs = {
  name: 'autocomplete',
  label: 'Autocomplete',
  children: [
    {
      label: 'First',
      value: 'first'
    },
    {
      label: 'Second',
      value: 'second'
    },
    {
      label: 'Third',
      value: 'third'
    },
    {
      label: 'Fourth',
      value: 'fourth'
    },
    {
      label: 'Fifth',
      value: 'fifth'
    }
  ]
};

const Template = args => {
  const {schema, SQFormProps, ...rest} = args;
  return (
    <div style={{minWidth: 250}}>
      <SQFormStoryWrapper
        initialValues={{[defaultArgs.name]: ''}}
        validationSchema={schema}
        {...SQFormProps}
      >
        <SQFormAutocomplete
          {...rest}
          size={args.size !== 'auto' ? Number(args.size) : args.size}
        />
      </SQFormStoryWrapper>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const WithValidation = Template.bind({});
WithValidation.args = {
  ...defaultArgs,
  isRequired: true,
  schema: {
    [defaultArgs.name]: Yup.string().required('Required')
  }
};
WithValidation.parameters = {
  controls: {exclude: 'schema'}
};

export const WithAutoSizePopper = Template.bind({});
WithAutoSizePopper.args = {
  ...defaultArgs,
  lockWidthToField: false
};
