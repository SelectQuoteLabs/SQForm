# SQFormMultiValue

This component is best used when you a user can select multiple values from a large amount of options _and_ allowed to supply their own values.

## Technical Notes

### Children

The children of this component should be in the "options" format, that is an array of objects where the object take the following schema. An empty array, `[]`, can be passed to provide no options.

```ts
{
  label: string,
  value: string | number,
  isDisabled?: boolean,
}

```

### Field Value

The value of this field is an array of `string | number` values. For instance, if the user has chosen "Red" and "Green" as their options then the value of the field will be `['Red', 'Green']`.

Therefore, to provide an initialValue for this component it should be an array. If there are no default options selected then an empty array, `[]`, can be used.

#### User Defined Values

If a user defines a value then the value that will be used in the field is simply whatever `string` the user inputted into the field. For example, if the user selected one of the provided options, "Green" (`{label: 'Green', value: 'green'}`), and inputs a custom value, "Pink", then the value of the field will be `["green", "Pink"]`.

User defined values will _always_ have a `string` value whereas the provided options can have `string | number` values. As a result the field's value can be an array of both `string` and `number`. Keep this in mind when defining your predefined options.

### Validation

This component supports validation like most other SQForm form components. To properly support user defined options the validation must accept values that are `string | number`. Yup, as of this writing, does not support something akin to `oneOfType` so we have use `.lazy()`. Below is validation used in the SQFormMultiValue/WithValidation storybook example.

In english this validation says "nameOfField's value must be an array of numbers or strings, there must be at least one option selected, and the field is required."

```js
{
  nameOfField: Yup.array()
    .of(
      Yup.lazy(value => {
        // Custom validation allows for number or stirng
        return typeof value === 'number' ? Yup.number() : Yup.string();
      })
    )
    // Minimum one selection required
    .min(1)
    // Ensures this field is filled before submission
    .required('Required'),
}
```
