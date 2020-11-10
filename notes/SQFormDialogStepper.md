# SQFormDialogStepper

SQ Dialog Stepper is a dialog form component that handles all validations and state for you. Under the covers it is using Formik for most of the heavy lifting and Yup to validate fields.

## Design Notes

--

## Technical Notes

The SQ Form system leverages Formik to control the state of a form. `SQFormDialogStep` must be used as a child component with `SQFormDialogStepper` in the folowing format. This example will create 2 steps with multiple components in each step.

```javascript
<SQFormDialogStepper>
  <SQFormDialogStep>
    <TextField>
    <TextField>
    <TextField>
    <CheckBox>
  <SQFormDialogStep />
  <SQFormDialogStep>
    <RadioButton>
    <TextField>
  <SQFormDialogStep />
<SQFormDialogStepper />
```

Each SQFormDialogStep provides it's own validationSchema to be used in that step. This prevents users from proceeding to the next steps without first completing the current required fields.

The `setValues` callback allows you to get values from the current state to show/hide fields in the following steps.

## Library Documentation

- [Formik](https://jaredpalmer.com/formik/docs/overview)
- [Formik Validation Schema](https://jaredpalmer.com/formik/docs/guides/validation#validationschema)
- [Yup](https://github.com/jquense/yup)
- [Form Layout /w MUI Grid](https://material-ui.com/components/grid/)
