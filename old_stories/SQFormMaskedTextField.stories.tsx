import React from 'react';

import {
  MASKS,
  SQFormMaskedTextField as SQFormMaskedTextFieldComponent,
} from '../src';
import getSizeProp from './utils/getSizeProp';
import {createDocsPage} from './utils/createDocsPage';
import {SQFormStoryWrapper} from './components/SQFormStoryWrapper';
import type {SQFormStoryWrapperProps} from './components/SQFormStoryWrapper';
import type {Story} from '@storybook/react';
import type {SQFormMaskedTextFieldProps} from 'components/SQForm/SQFormMaskedTextField';
import type {GridSizeOptions} from './types/storyHelperTypes';
import type {Mask} from 'types';

export default {
  title: 'Components/SQFormMaskedTextField',
  component: SQFormMaskedTextFieldComponent,
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
};

type MaskedTextFieldStoryType = Story<
  Omit<SQFormMaskedTextFieldProps, 'size'> & {
    size?: GridSizeOptions;
    sqFormProps?: SQFormStoryWrapperProps;
    schema: SQFormStoryWrapperProps['validationSchema'];
    exampleMasks: Mask;
  }
>;

const defaultArgs = {
  label: 'Masked Text Field',
  name: 'maskedTextField',
};

const Template: MaskedTextFieldStoryType = (args) => {
  const {schema, sqFormProps, exampleMasks, size, ...rest} = args;
  return (
    <SQFormStoryWrapper
      initialValues={{[defaultArgs.name]: ''}}
      validationSchema={schema}
      {...sqFormProps}
    >
      <SQFormMaskedTextFieldComponent
        {...rest}
        size={getSizeProp(size)}
        mask={exampleMasks}
      />
    </SQFormStoryWrapper>
  );
};

export const Default = Template.bind({});
Default.storyName = 'SQFormMaskedTextField';
Default.args = defaultArgs;
Default.argTypes = {
  exampleMasks: {
    name: 'Example masks',
    options: Object.keys(MASKS),
    mapping: MASKS,
    control: {
      type: 'select',
    },
    defaultValue: 'phone',
  },
};
