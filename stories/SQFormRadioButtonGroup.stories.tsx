import React from 'react';
import * as Yup from 'yup';

import {SQFormRadioButtonGroup as SQFormRadioButtonGroupComponent} from '../src';
import getSizeProp from './utils/getSizeProp';
import {createDocsPage} from './utils/createDocsPage';
import {
  SQFormStoryWrapper,
  SQFormStoryWrapperProps,
} from './components/SQFormStoryWrapper';
import type {Story} from '@storybook/react';
import type {SQFormRadioButtonGroupProps} from 'components/SQForm/SQFormRadioButtonGroup';
import type {GridSizeOptions} from './types/storyHelperTypes';
import type {AnySchema} from 'yup';

type RadioButtonGroupType = Story<
  Omit<SQFormRadioButtonGroupProps, 'size'> & {
    size?: GridSizeOptions;
    sqFormProps: Partial<SQFormStoryWrapperProps>;
    schema: Record<string, AnySchema>;
  }
>;

export default {
  title: 'Components/SQFormRadioButtonGroup',
  component: SQFormRadioButtonGroupComponent,
  argTypes: {
    name: {table: {disable: true}},
    children: {table: {disable: true}},
    SQFormProps: {table: {disable: true}},
    onChange: {action: 'changed', table: {disable: true}},
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

const PANDA_GROUP_OPTIONS = [
  {label: 'Giant Panda', value: 'giant panda'},
  {label: 'Red Panda', value: 'red panda'},
  {label: 'Kung Fu Panda', value: 'kung fu panda'},
];

const defaultArgs = {
  groupLabel: 'Pandas',
  name: 'pandas',
  children: PANDA_GROUP_OPTIONS,
  sqFormProps: {
    initialValues: {pandas: ''},
  },
};

const Template: RadioButtonGroupType = (args) => {
  const {sqFormProps, schema, size, ...componentProps} = args;
  return (
    <SQFormStoryWrapper
      {...defaultArgs.sqFormProps}
      {...sqFormProps}
      validationSchema={schema}
    >
      <SQFormRadioButtonGroupComponent
        {...componentProps}
        size={getSizeProp(size)}
      />
    </SQFormStoryWrapper>
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
