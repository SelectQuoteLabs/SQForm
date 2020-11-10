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

**SQFormTextField**

The `helperText` prop defaults to an empty space it is always present in the DOM. This prevents UI bounce when the placeholder text appears, changing the calculated height of the input.

**SQFormAutocomplete**

As shown in the component prop-types, the `children` of this component must be an `Array` of objects. Each object must have the shape of `{label: String, value: String | Number}`.

**SQFormDropdown**

As shown in the component prop-types, the `children` of this component must be an `Array` of objects. Each object must have the shape of `{label: String, value: String | Number}`.

If you want an empty option in the dropdown list options, set the `displayEmpty` prop to `true`.

## Library Documentation

- [Formik](https://jaredpalmer.com/formik/docs/overview)
- [Formik Validation Schema](https://jaredpalmer.com/formik/docs/guides/validation#validationschema)
- [Yup](https://github.com/jquense/yup)
- [Form Layout /w MUI Grid](https://material-ui.com/components/grid/)
