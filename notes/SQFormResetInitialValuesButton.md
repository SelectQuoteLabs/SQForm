# SQFormResetInitialValuesButton

SQFormResetInitialValuesButton is a component that is used to reset the initial values of the form. It use Formik `resetForm(nextState)` under the cover.

## Design Notes

--

## Technical Notes

`SQFormResetInitialValuesButton` provide a way to reset/clear the fields of each step. `SQFormResetInitialValuesButton` must be used in the following formate and pass a `initialValuesObject` containing new initial values to reset.

```javascript
    <SQFormResetInitialValuesButton
      tooltip="Clear Addresses"
      confirmationContent="You are about to reset this form. Any unsaved info for this customer will be removed"
      initialValuesObject={initialValuesObject}>
      {Name of button}
    </SQFormResetInitialValuesButton>
```

## Library Documentation

- [Formik](https://jaredpalmer.com/formik/docs/overview)
- [Formik resetForm(nextState) docs](https://formik.org/docs/api/formik#resetform-nextstate-partialformikstatevalues--void)
- [Yup](https://github.com/jquense/yup)
