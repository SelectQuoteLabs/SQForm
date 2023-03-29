import * as Yup from 'yup';
import React from 'react';
import {
  SQFormDialog,
  SQFormDatePicker,
  SQFormTextField,
  SQFormDateTimePicker,
  SQFormDatePickerWithCalendarInputOnly,
  SQFormAutocomplete,
} from '../src';
import {createDocsPage} from './utils/createDocsPage';
import type {Story, ComponentStory} from '@storybook/react';
import type {GridSpacing} from '@mui/material';
import type {FormikContextType} from 'formik';
import type {SQFormDialogProps} from 'components/SQFormDialog/SQFormDialog';

type DefaultArgsValues = {
  hello: string;
  autocompleteChildren?: string | number;
};
type SQFormDialogStory = Story<SQFormDialogProps<DefaultArgsValues>>;

type WithDatePickersValues = {
  datePicker: Date;
  dateTimePicker: Date;
  datePickerCalendarOnly: Date;
};
type SQFormDialogWithDatePickersStory = Story<
  SQFormDialogProps<WithDatePickersValues>
>;

const alignItems = 'center';
const spacing: GridSpacing = 2;

export default {
  title: 'Forms/SQFormDialog',
  component: SQFormDialog,
  argTypes: {
    onSave: {action: 'onSave', table: {disable: true}},
    onTertiaryClick: {action: 'onTertiaryClick', table: {disable: true}},
    onClose: {action: 'onClose', table: {disable: true}},
    children: {table: {disable: true}},
    validationSchema: {table: {disable: true}},
  },
  args: {
    title: 'Default',
    initialValues: {hello: '', autoComplete: ''},
    onSave: console.log,
    muiGridProps: {
      spacing,
      sx: {
        alignItems,
      },
    },
    shouldDisplaySaveButton: true,
    showSecondaryButton: true,
    isOpen: false,
  },
  parameters: {
    docs: {page: createDocsPage({showStories: false})},
  },
};

const Template: ComponentStory<typeof SQFormDialog> = (
  args
): React.ReactElement => {
  function random(length: number) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i += 1) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    return result;
  }

  const MOCK_AUTOCOMPLETE_OPTIONS = Array.from(new Array(10000))
    .map(() => {
      const randomValue = random(10 + Math.ceil(Math.random() * 20));
      return {
        label: randomValue,
        value: randomValue,
        isDisabled: Math.random() > 0.8,
      };
    })
    .sort((a, b) => a.label.toUpperCase().localeCompare(b.label.toUpperCase()));

  return (
    <>
      <h1>
        Toggle the Dialog's <code>isOpen</code> state in the Controls tab
      </h1>

      <SQFormDialog {...args}>
        <SQFormTextField name="hello" label="Hello" size={12} />
        <SQFormAutocomplete
          name="autocomplete"
          label="Auto Complete"
          size={12}
          children={MOCK_AUTOCOMPLETE_OPTIONS}
        />
      </SQFormDialog>
    </>
  );
};

export const Default = Template.bind({});

export const WithValidation = Template.bind({});
WithValidation.args = {
  title: 'With Validation',
  validationSchema: Yup.object({
    hello: Yup.string().required(),
  }),
  helperText: 'helper text',
};

export const WithAutoFocus: SQFormDialogStory = (args) => {
  return (
    <>
      <h1>
        Toggle the Dialog's <code>isOpen</code> state in the Controls tab
      </h1>

      <SQFormDialog {...args}>
        <SQFormTextField
          name="hello"
          label="Hello"
          muiFieldProps={{autoFocus: true}}
        />
      </SQFormDialog>
    </>
  );
};
WithAutoFocus.args = {
  title: 'With Auto Focus',
};

export const WithDatePickers: SQFormDialogWithDatePickersStory = (args) => {
  return (
    <>
      <h1>
        Toggle the Dialog's <code>isOpen</code> state in the Controls tab
      </h1>

      <SQFormDialog {...args}>
        <SQFormDatePicker name="datePicker" label="DatePicker" />
        <SQFormDateTimePicker name="dateTimePicker" label="DateTimePicker" />
        <SQFormDatePickerWithCalendarInputOnly
          name="datePickerCalendarOnly"
          label="DatePickerWithCalendarInputOnly"
        />
      </SQFormDialog>
    </>
  );
};
WithDatePickers.args = {
  //...defaultArgs,
  title: 'With Date Pickers',
  initialValues: {
    datePicker: new Date(),
    dateTimePicker: new Date(),
    datePickerCalendarOnly: new Date(),
  },
  validationSchema: Yup.object({
    datePicker: Yup.date()
      .required()
      .min(new Date('2020-09-22'), 'Date must be after 09/22/20')
      .max(new Date('2100-10-10'), 'Date must be after 10/10/2100')
      .typeError('Invalid date'),
    dateTimePicker: Yup.date()
      .required()
      .min(new Date('2020-09-22'), 'Date must be after 09/22/20')
      .max(new Date('2100-10-10'), 'Date must be after 10/10/2100')
      .typeError('Invalid date'),
    datePickerCalendarOnly: Yup.date()
      .required()
      .min(new Date('2020-09-22'), 'Date must be after 09/22/20')
      .max(new Date('2100-10-10'), 'Date must be after 10/10/2100')
      .typeError('Invalid date'),
  }),
};

export const WithOnBlurValidation: SQFormDialogWithDatePickersStory = (
  args
) => {
  return (
    <>
      <h1>
        Toggle the Dialog's <code>isOpen</code> state in the Controls tab
      </h1>

      <SQFormDialog {...args}>
        <SQFormDatePicker name="datePicker" label="DatePicker" />
        <SQFormDateTimePicker name="dateTimePicker" label="DateTimePicker" />
        <SQFormDatePickerWithCalendarInputOnly
          name="datePickerCalendarOnly"
          label="DatePickerWithCalendarInputOnly"
        />
      </SQFormDialog>
    </>
  );
};

WithOnBlurValidation.args = {
  title: 'With Date Pickers',
  initialValues: {
    datePicker: new Date(),
    dateTimePicker: new Date(),
    datePickerCalendarOnly: new Date(),
  },
  validationSchema: Yup.object({
    datePicker: Yup.date()
      .required()
      .min(new Date('2020-09-22'), 'Date must be after 09/22/20')
      .max(new Date('2100-10-10'), 'Date must be after 10/10/2100')
      .typeError('Invalid date'),
    dateTimePicker: Yup.date()
      .required()
      .min(new Date('2020-09-22'), 'Date must be after 09/22/20')
      .max(new Date('2100-10-10'), 'Date must be after 10/10/2100')
      .typeError('Invalid date'),
    datePickerCalendarOnly: Yup.date()
      .required()
      .min(new Date('2020-09-22'), 'Date must be after 09/22/20')
      .max(new Date('2100-10-10'), 'Date must be after 10/10/2100')
      .typeError('Invalid date'),
  }),
  validateOnBlur: true,
  validateOnChange: false,
};

export const WithTertiaryButton: SQFormDialogStory = (args) => {
  return (
    <>
      <h1>
        Toggle the Dialog's <code>isOpen</code> state in the Controls tab
      </h1>

      <SQFormDialog {...args}>
        <SQFormTextField name="hello" label="Hello" />
      </SQFormDialog>
    </>
  );
};

export const WithTertiaryButtonDefinedVariant: SQFormDialogStory = (args) => {
  return (
    <>
      <h1>
        Toggle the Dialog's <code>isOpen</code> state in the Controls tab
      </h1>

      <SQFormDialog {...args}>
        <SQFormTextField name="hello" label="Hello" />
      </SQFormDialog>
    </>
  );
};

const handleTertiaryClick = (
  formikContext: FormikContextType<DefaultArgsValues>
) => {
  formikContext.resetForm();
  console.log('formikContext', formikContext);
};

WithTertiaryButton.args = {
  initialValues: {
    hello: '',
  },
  title: 'With Tertiary Button',
  tertiaryStatus: 'IS_ENABLED',
  tertiaryButtonText: 'Tertiary',
  onTertiaryClick: handleTertiaryClick,
};

WithTertiaryButtonDefinedVariant.args = {
  title: 'With Tertiary Button',
  tertiaryStatus: 'IS_ENABLED',
  tertiaryButtonText: 'Tertiary',
  onTertiaryClick: handleTertiaryClick,
  tertiaryButtonVariant: 'contained',
};
