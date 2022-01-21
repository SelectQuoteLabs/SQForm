import React from 'react';
import * as Yup from 'yup';
import type {Story, Meta} from '@storybook/react';

import {SQFormTextField as SQFormTextFieldComponent} from '../src';
import getSizeProp from './utils/getSizeProp';
import type {GridSizeOptions} from './types/storyHelperTypes';
import {createDocsPage} from './utils/createDocsPage';
import {SQFormStoryWrapper} from './components/SQFormStoryWrapper';
import type {SQFormStoryWrapperProps} from './components/SQFormStoryWrapper';
import type {SQFormTextFieldProps} from 'components/SQForm/SQFormTextField';

type SQFormTextFieldStoryType = Story<
  Omit<SQFormTextFieldProps, 'size'> & {
    size?: GridSizeOptions;
    SQFormProps?: {
      initialValues?: SQFormStoryWrapperProps['initialValues'];
    } & Omit<SQFormStoryWrapperProps, 'initialValues' | 'children'>;
  }
>;

export default {
  title: 'Components/SQFormTextField',
  component: SQFormTextFieldComponent,
  argTypes: {
    onBlur: {action: 'blurred', table: {disable: true}},
    onChange: {action: 'changed', table: {disable: true}},
    name: {table: {disable: true}},
  },
  parameters: {
    docs: {
      page: createDocsPage(),
    },
  },
} as Meta;

const defaultArgs = {
  label: 'Text Field',
  name: 'textField',
};

const Template: SQFormTextFieldStoryType = (args) => {
  const {SQFormProps, size, ...rest} = args;
  return (
    <SQFormStoryWrapper
      initialValues={{[defaultArgs.name]: ''}}
      {...SQFormProps}
    >
      <SQFormTextFieldComponent {...rest} size={getSizeProp(size)} />
    </SQFormStoryWrapper>
  );
};

export const Default: SQFormTextFieldStoryType = Template.bind({});
Default.args = defaultArgs;

export const WithValidation: SQFormTextFieldStoryType = Template.bind({});
WithValidation.args = {
  ...defaultArgs,
  isRequired: true,
  SQFormProps: {
    validationSchema: {
      [defaultArgs.name]: Yup.string().required('Required'),
    },
  },
};
WithValidation.parameters = {
  controls: {exclude: 'schema'},
};
