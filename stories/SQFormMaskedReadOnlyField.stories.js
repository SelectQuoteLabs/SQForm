import React from 'react';

import {
  MASKS,
  SQFormMaskedReadOnlyField as SQFormMaskedReadOnlyFieldComponent
} from '../src';
import {SQFormStoryWrapper} from './components/SQFormStoryWrapper';
import {createDocsPage} from './utils/createDocsPage';

export default {
  title: 'Components/SQFormMaskedReadOnlyField',
  component: SQFormMaskedReadOnlyFieldComponent,
  argTypes: {
    onBlur: {action: 'blurred', table: {disable: true}},
    onChange: {action: 'changed', table: {disable: true}},
    name: {table: {disable: true}}
  },
  parameters: {
    docs: {
      page: createDocsPage()
    }
  }
};

const defaultArgs = {
  label: 'Masked Read Only Field',
  name: 'maskedReadOnlyField'
};

const Template = args => {
  const {schema, SQFormProps, exampleMasks, ...rest} = args;
  return (
    <SQFormStoryWrapper
      initialValues={{[defaultArgs.name]: '8168675309'}}
      validationSchema={schema}
      showSubmit={false}
      {...SQFormProps}
    >
      <SQFormMaskedReadOnlyFieldComponent
        {...rest}
        size={getSizeProp(args.size)}
        mask={exampleMasks}
      />
    </SQFormStoryWrapper>
  );
};

const getSizeProp = size => {
  switch (size) {
    case true:
    case false:
    case 'auto':
      return size;
    case undefined:
      return 'auto';
    default:
      return Number(size);
  }
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
      type: 'select'
    },
    defaultValue: 'phone'
  }
};
