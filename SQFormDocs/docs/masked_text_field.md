---
id: masked_text_field
title: Masked Text Field
---

## Description

A text field that forces the user input text to follow a defined pattern. The enforced pattern is called a mask. In addition to limiting the input, masks also help with how the field is displayed. Examples include zip codes and phone numbers. For a phone number the `(` `)` and `-` will be added to the field without the user needing to type those characters.

## Props

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| mask | object, array, or function | yes | Valid mask array. Custom or from utils/masks.js |
| name | string | yes | Name of the field will be the Object key of the key/value pair form payload |
| label | string | yes | Descriptive label of the input |
| placeholder | string | no | Placeholder text used inside the input field to provide hints to the user |
| isDisabled | boolean | no | Disabled property to disable the input if true |
| size | 'auto' or a number 1 - 12 | no | Size of the input given full-width is 12. |
| onBlur | function | no | Custom onBlur event callback |
| onChange | function | no | Custom onChange event callback |
| startAdornment | node | no | Adornment that appears at the start of the input |
| endAdornment | node | no | Adornment that appears at the end of the input |
| type | string | no | Defines the input type for the text field. Must be a valid HTML5 input type |
| InputProps | object | no | Props applied to the Input element |
| inputProps | object | no | Attributes applied to the `input` element |
| muiFieldProps | object | no | Any valid prop for MUI text input child component https://material-ui.com/api/text-field/#props |
| stripNonNumeric | boolean | no | The submitted value from the input will have all non-numeric characters removed |

## Masks

For convenience several common masks are provided.

- phone: US Phone numbers \*\*Will allow invalid phone numbers see note below
- zip: US address zip codes
- currency: a number only mask that allows decimal values.
- percent: a number mask that adds a `%` as a suffix
- email: provided from the [text-mask module](https://github.com/text-mask/text-mask/tree/master/addons/#emailmask)
- date: a mask to allow the date form of `MM/DD/YYYY`
- ssn: a mask to include the dashes in the xxx-xx-xxxx form of social security numbers.

:::note

The included phone mask is to get the correct format not to force a valid phone number. Historically it had prevented a `1` in the fourth position. For example: `(555) 155-5555`

For US phone numbers the fourth digit cannot be a one. Use Yup to validate your phone numbers and do not rely on the mask for validation.

:::

## Example

Using the phone mask for a fax number field:

```js
import {
  SQFormMaskedTextField,
  MASKS
} from '@selectquotelabs/sqform

/* omitted code for brevity */

   <SQFormMaskedTextField
     name="faxNumber"
     label="Fax number"
     size={12}
     mask={MASKS.phone}
   />
```
