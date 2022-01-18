import React from 'react';
import type {Meta} from '@storybook/react';
import type {CustomStory} from './types/storyHelperTypes';

import {
  MASKS,
  SQFormMaskedReadOnlyField as SQFormMaskedReadOnlyFieldComponent,
} from '../src';
import type { maskProp } from 'types';
import { SQFormMaskedReadOnlyFieldProps } from '../src/components/SQForm/SQFormMaskedReadOnlyField';
import {SQFormStoryWrapper} from './components/SQFormStoryWrapper';
import {createDocsPage} from './utils/createDocsPage';
import getSizeProp from './utils/getSizeProp';

type SQFormMaskedReadOnlyFieldStory = CustomStory<
  SQFormMaskedReadOnlyFieldProps & {
    exampleMasks: maskProp;
  }
> 

const meta: Meta ={ 
  title: 'Components/SQFormMaskedReadOnlyField',
  component: SQFormMaskedReadOnlyFieldComponent,
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

const defaultArgs = {
  label: 'Masked Read Only Field',
  name: 'maskedReadOnlyField',
};

const Template: SQFormMaskedReadOnlyFieldStory = (args) => {
  const {schema, sqFormProps, exampleMasks, ...rest} = args;
  return (
    <SQFormStoryWrapper
      initialValues={{[defaultArgs.name]: '8168675309'}}
      validationSchema={schema}
      showSubmit={false}
      {...sqFormProps}
    >
      <SQFormMaskedReadOnlyFieldComponent
        {...rest}
        size={getSizeProp(args.size)}
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

export default meta;

