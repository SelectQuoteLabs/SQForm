import React from 'react';
import getSizeProp from './utils/getSizeProp';
import {
  MASKS,
  SQFormMaskedReadOnlyField as SQFormMaskedReadOnlyFieldComponent,
} from '../src';
import {SQFormStoryWrapper} from './components/SQFormStoryWrapper';
import {createDocsPage} from './utils/createDocsPage';
import type {Meta} from '@storybook/react';
import type {CustomStory} from './types/storyHelperTypes';
import type {Mask} from 'types';
import type {SQFormMaskedReadOnlyFieldProps} from '../src/components/fields/SQFormMasked/SQFormMaskedReadOnlyField';

type SQFormMaskedReadOnlyFieldStory = CustomStory<
  SQFormMaskedReadOnlyFieldProps & {
    exampleMasks: Mask;
    initialValue?: string;
  }
>;

const meta: Meta = {
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

const Template: SQFormMaskedReadOnlyFieldStory = ({
  initialValue = '',
  ...args
}) => {
  const {schema, sqFormProps, exampleMasks, ...rest} = args;
  return (
    <SQFormStoryWrapper
      initialValues={{[defaultArgs.name]: initialValue}}
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
Default.args = {...defaultArgs, initialValue: '8888888888'};
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
Default.parameters = {
  controls: {exclude: 'initialValue'},
};

export default meta;
