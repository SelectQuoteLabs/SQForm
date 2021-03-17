# SQForm

SQ Form is a form component that handles all validations and state for you. Under the covers it is using Formik for most of the heavy lifting and Yup to validate fields.

## Design Notes

--

## Technical Notes

The SQ Form system leverages Formik to control the state of a form.

**SQForm**

The `onSubmit` prop is very important to understand. It is passed your forms values and the "FormikBag", which includes an object containing a subset of the injected props and methods (i.e. all the methods with names that start with set<Thing> + resetForm) and any props that were passed to the wrapped component.

```
Form Submission Handler |
@typedef onSubmit: (values: Values, formikBag: FormikBag) => void | Promise<any>
```

IMPORTANT: If onSubmit is async, then Formik will automatically set isSubmitting to false on your behalf once it has resolved.
This means you do NOT need to call formikBag.setSubmitting(false) manually.
However, if your onSubmit function is synchronous, then you need to call setSubmitting(false) on your own.
If you're still reading this, I commend you. The docs say all of this by the way :)

**SQFormCheckbox**

Use like any other checkbox. The value is provided from SQForm like the rest of the SQForm components.

**SQFormCheckboxGroup & SQFormCheckboxGroupItem**

`SQFormCheckboxGroup` formats and handles keeping track of what values in the group are checked. This component is able to be displayed vertically or in a row with a prop `shouldDisplayInRow`. A "Select All" option is also available via the prop `shouldUseSelectAll`. To properly handle resetting this form element `selectAll: <defaultValue>` must be included in your `initialValues` object supplied to the top level `SQForm` component with a boolean value.

**SQFormInclusionList & SQFormInclusionListItem**

`SQFormInclusionList` acts as `SQFieldArray` does, using render props to pass `arrayHelpers` to your array of `SQFormInclusionListItem`s. The required `name` prop must match the `initialValues` array property to store the checked items to be saved. `useSelectAll` triggers the 'Select All' checkbox at the top of the list, and if set to `true`, it must also receive an array `selectAllData` that represent the list of items to save if 'Select All' is checked. See 'Form With Checkbox Group' story for full example.

**SQFormMultiSelect**

`SQFormMultiSelect` uses Material UI's base Select input with the `multiple` flag passed in by default. The component handles the
"Select All" internally. The required `name` prop must match the `initialValues` array property to store the selected items. The
`useSelectAll` prop triggers the "Select All" select option at the top of the list.

**SQFormTextField**

The `helperText` prop defaults to an empty space it is always present in the DOM. This prevents UI bounce when the placeholder text appears, changing the calculated height of the input.

**SQFormAutocomplete**

As shown in the component prop-types, the `children` of this component must be an `Array` of objects. Each object must have the shape of `{label: String, value: String | Number}`.

**SQFormDropdown**

As shown in the component prop-types, the `children` of this component must be an `Array` of objects. Each object must have the shape of `{label: String, value: String | Number}`.

If you want an empty option in the dropdown list options, set the `displayEmpty` prop to `true`.

**SQFormMaskedTextField**

Acts as an `SQFormTextField` with the addition of a `mask` prop, which allows text masking for phone numbers, zip codes, etc. An object of common masks can be imported from `src/utils/masks.js` whose properties can be passed into the `mask` prop, e.g., `mask={MASKS.phone}`. Alternatively, a custom mask can be used - see the [`react-text-mask` docs](https://github.com/text-mask/text-mask/tree/master/react/#readme) for a reference on how the prop expects the mask to be structured.

## Library Documentation

- [Formik](https://jaredpalmer.com/formik/docs/overview)
- [Formik Validation Schema](https://jaredpalmer.com/formik/docs/guides/validation#validationschema)
- [Yup](https://github.com/jquense/yup)
- [Form Layout /w MUI Grid](https://material-ui.com/components/grid/)
