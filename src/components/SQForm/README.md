# SQForm

The main form component.

![SQForm Example](../../../images/SQForm.png)

<br />

## How to Use

```js
import {SQForm, SQFormDropdown} from '@selectquotelabs/sqform';

return (
  <SQForm initialValues={{recording: ''}} onSubmit={noop}>
    <SQFormDropdown
      label="Recording"
      name="recording"
      onChange={handleRecordingChange}
      size={12}
    >
      {playlistOptions}
    </SQFormDropdown>
  </SQForm>
);
```

See [Storybook](https://master--5f4431386ea00a00220d495c.chromatic.com/?path=/story/forms-sqform--basic-form) for more examples

<br />

## Props

Takes a Generic type for the values

`SQFormProps<Values extends FormikValues>`

| Prop Name          | Required | Type      | Default | Description                                                                            |
| ------------------ | -------- | --------- | ------- | -------------------------------------------------------------------------------------- |
| children           | true     | ReactNode |         | All the fields and other UI elements that are part of the form                         |
| initialValues      | true     | Values    |         | Base / starting values for the form object that determines if a field has been updated |
| onSubmit           | true     | function  |         | The callback function that runs when you submit the form                               |
| enableReinitialize | false    | boolean   | false   | Control whether Formik should reset the form if initialValues changes                  |
| muiGridProps       | false    | object    | {}      | Props that will be pass on to the internal Grid                                        |
| validationSchema   | false    | object    |         | Yup validation schema shape                                                            |
| validateOnBlur     | false    | boolean   | true    | Should validation occur onBlur                                                         |
| validateOnChange   | false    | boolean   | true    | Should validation occur onChange                                                       |

<br/>
<br/>
<hr/>
<br/>
<br/>

# SQFormAsyncAutocomplete

A dropdown field that can handle a large option data set. Allows user to start typing in value to filter down options.

![SQFormAsyncAutocomplete](../../../images/SQFormAsyncAutocomplete.png)

## How to Use

```js
import {SQForm, SQFormAsyncAutocomplete} from '@selectquotelabs/sqform';

const initialValues = {
    example: ''
}

const options = [
  {
    label: 'First',
    value: 'first',
  },
  {
    label: 'Second',
    value: 'second',
  },
];

const handleSubmit = () => {
    // save data
}

return (
  <SQForm initialValues={initialValues} onSubmit={}>
    <SQFormAsyncAutocomplete name="example" label="Example">
      {options}
    </SQFormAsyncAutocomplete>
  </SQForm>
);
```

<br/>

## Props

All the props from `SQFormAutocomplete` plus the following:

| Prop Name              | Required | Type     | Default | Description                                                        |
| ---------------------- | -------- | -------- | ------- | ------------------------------------------------------------------ |
| handleAsyncInputChange | true     | function |         | Updates local state value for input then passed to a useQuery hook |
| loading                | false    | boolean  | false   | Whether the component is loading                                   |
| open                   | false    | boolean  |         | Whether the popup is open                                          |
| onOpen                 | false    | function |         | Callback when the popup requests to open                           |
| onClose                | false    | function |         | Callback when the popup requests to close                          |
