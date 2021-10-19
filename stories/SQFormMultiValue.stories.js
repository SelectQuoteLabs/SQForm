import React from 'react';
import * as Yup from 'yup';
import {SQFormMultiValue as SQFormMultiValueComponent} from '../src';
import {SQFormStoryWrapper} from './components/SQFormStoryWrapper';
import {createDocsPage} from './utils/createDocsPage';
import markdown from '../notes/SQFormMultiValue.md';

export default {
  title: 'Components/SQFormMultiValue',
  component: SQFormMultiValueComponent,
  argTypes: {
    children: {table: {disable: true}},
    onChange: {action: 'changed', table: {disable: true}},
    name: {table: {disable: true}}
  },
  parameters: {
    docs: {
      page: createDocsPage({markdown}),
      source: {
        type: 'code'
      }
    }
  }
};

const MOCK_COLOR_OPTIONS = [
  {label: 'Red', value: 'red'},
  {label: 'Orange', value: 'orange'},
  {label: 'Yellow', value: 'yellow'},
  {label: 'Green', value: 'green'},
  {label: 'Blue', value: 'blue'},
  {label: 'Indigo', value: 'indigo'},
  {label: 'Violet', value: 'violet'}
];

const defaultArgs = {
  label: 'Favorite Colors',
  name: 'favoriteColors',
  children: MOCK_COLOR_OPTIONS
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

const Template = args => {
  const {SQFormProps, validationSchema, ...componentProps} = args;

  return (
    <div style={{minWidth: 250}}>
      <SQFormStoryWrapper
        initialValues={{[defaultArgs.name]: ['red', 'green', 'Custom Option']}}
        validationSchema={validationSchema}
        {...SQFormProps}
      >
        <SQFormMultiValueComponent
          {...componentProps}
          name={defaultArgs.name}
          label={defaultArgs.label}
          size={getSizeProp(args.size)}
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
  validationSchema: {
    favoriteColors: Yup.array()
      .of(
        Yup.lazy(value => {
          return typeof value === 'number' ? Yup.number() : Yup.string();
        })
      )
      .min(1)
      .required('Required')
  },
  SQFormProps: {
    initialValues: {favoriteColors: []}
  }
};
