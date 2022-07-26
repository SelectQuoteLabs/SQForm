import * as Yup from 'yup';
import React from 'react';
import {withKnobs, boolean} from '@storybook/addon-knobs';
import {Card, Grid} from '@material-ui/core';
import {
  SQFormButton,
  SQFormAutocomplete,
  SQFormDatePicker,
  SQFormDatePickerWithCalendarInputOnly,
  SQFormDropdown,
  SQFormMaskedTextField,
  MASKS,
  SQFormMultiSelect,
  SQFormTextField,
  SQFormTextarea,
  SQFormCheckbox,
  SQForm,
} from '../src';

export default {
  title: 'Forms/SQFormDisableableComponents',
  decorators: [withKnobs],
};

export const disableableComponents = (): React.ReactElement => {
  const initialValues = {
    autoComplete: 'test1',
    datePicker: '12/01/1990',
    calendarInputOnly: '12/01/1990',
    dropDown: 'test3',
    maskedTextField: '913-867-5309',
    multiSelect: ['test1', 'test2'],
    textField: 'someString',
    textArea: 'someBigString?',
    checkbox: true,
  };

  const validationSchema = Yup.object({
    autoComplete: Yup.string(),
    datePicker: Yup.date(),
    calendarInputOnly: Yup.date(),
    dropDown: Yup.string(),
    maskedTextField: Yup.string(),
    multiSelect: Yup.array(),
    textField: Yup.string(),
    textArea: Yup.string(),
    checkbox: Yup.boolean(),
  });

  const onSubmit = (formValues: typeof initialValues) => {
    window.alert(JSON.stringify(formValues, null, 2));
  };

  const options = [
    {label: 'Test1', value: 'test1'},
    {label: 'Test2', value: 'test2', isDisabled: true},
    {label: 'Test3', value: 'test3'},
  ];

  return (
    <Card raised style={{padding: 16}}>
      <SQForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <SQFormAutocomplete
          name="autoComplete"
          label="Auto Complete"
          isDisabled={boolean('Auto Complete Disabled', true)}
          size={4}
        >
          {options}
        </SQFormAutocomplete>
        <SQFormDatePicker
          name="datePicker"
          label="Date Picker"
          isDisabled={boolean('Date Picker Disabled', true)}
          size={4}
        />
        <SQFormDatePickerWithCalendarInputOnly
          name="calendarInputOnly"
          label="Calendar Input Only"
          isDisabled={boolean('Calendar Input Only Disabled', true)}
          size={4}
        />
        <SQFormDropdown
          name="dropDown"
          label="Dropdown"
          isDisabled={boolean('Dropdown Disabled', true)}
          size={4}
        >
          {options}
        </SQFormDropdown>
        <SQFormMaskedTextField
          name="maskedTextField"
          label="Masked Text Field"
          mask={MASKS.phone}
          isDisabled={boolean('Masked Text Field Disabled', true)}
          size={4}
        />
        <SQFormMultiSelect
          name="multiSelect"
          label="Multiselect"
          isDisabled={boolean('Multiselect Disabled', true)}
          size={4}
        >
          {options}
        </SQFormMultiSelect>
        <SQFormTextField
          name="textField"
          label="Text Field"
          isDisabled={boolean('Text Field Disabled', true)}
          size={4}
        />
        <SQFormTextarea
          name="textArea"
          label="Text Area"
          isDisabled={boolean('Text Area Disabled', true)}
          size={4}
        />
        <SQFormCheckbox
          name="checkbox"
          label="Checkbox"
          isDisabled={boolean('Checkbox Disabled', true)}
          size={4}
        />
        <Grid item sm={12}>
          <SQFormButton>Submit</SQFormButton>
        </Grid>
      </SQForm>
    </Card>
  );
};
