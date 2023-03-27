# SQFormButton

Button component used in submission and reset of our forms.
<br />

![SQForm Button Example](../../../images/SQFormButtonExample.png)

<br />

## How to Use

```js
import {SQForm, SQFormButton} from '@selectquotelabs/sqform';
return (
  <SQForm initialValues={} onSubmit={noop}>
    <SQFormButton>Submit</SQFormButton>
  </SQForm>
);
```

See [Storybook](https://master--5f4431386ea00a00220d495c.chromatic.com/?path=/story/components-sqformbutton--default) for more examples of the 'submit' button.
<br />

See [Storybook](https://master--5f4431386ea00a00220d495c.chromatic.com/?path=/story/components-sqformresetbuttonwithconfirmation--default) for examples of the 'reset' button.

<br />

## Props

`SQFormButtonProps`

| Prop Name                 | Required | Type         | Default  | Description                                                                      |
| ------------------------- | -------- | ------------ | -------- | -------------------------------------------------------------------------------- |
| children                  | true     | ReactNode    |          | The button's text                                                                |
| isDisabled                | false    | boolean      | false    | Controls whether the button is disabled                                          |
| shouldRequireFieldUpdates | false    | boolean      | false    | Controls if there must be an update to a field before the form can be submitted  |
| title                     | false    | string       |          | Title prop passed to scplus `RoundedButton`                                      |
| type                      | false    | `ButtonType` | 'submit' | Type prop passed to scplus `RoundedButton`. Opt: 'submit', 'button', and 'reset' |
| onClick                   | false    | function     |          | Callback function to be fired when button is clicked                             |
