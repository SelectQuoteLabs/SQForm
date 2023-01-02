# Upgrade Guide / Breaking Changes

## Version 10

This version of SQForm stops using Material UI v4 and upgrades to v5. Most of the breaking changes are related to breaking changes in MUI v5. If you're looking for additional information about those changes apart form what is outlined here you can find them in [MUI's v4 -> v5 upgrade guide](https://mui.com/material-ui/migration/migration-v4/).

Due to the amount of changes, and how integrated MUI is with SQForm and most consuming projects, it's advised that you reference MUI's upgrade regularly to ensure you don't miss anything for components you might be using.

### Upgrade/Update package versions

- Replace all MUI v4 packages with the v5 equivalent. The following are the ones used in SQForm
  ```
     "@mui/icons-material": "^5.8.4",
     "@mui/lab": "^5.0.0-alpha.92",
     "@mui/material": "^5.9.2",
     "@mui/styles": "^5.9.2",
     "@mui/x-date-pickers": "^5.0.0-beta.2",
  ```
- Upgrade [SCPlus-Shared-Components](https://bitbucket.org/SelectQuote/scplus-shared-components/src/master/) library to at least v10.1.0 (be sure to follow any upgrade guides for that repo)

### New Peer Dependencies

- `@emotion/styled`
- `@emotion/react`

### Update Imports

- [Replace MUI imports](https://mui.com/material-ui/migration/migration-v4/#replace-all-imports)
- [Replace MUIThemeProvider imports](https://mui.com/material-ui/migration/v5-style-changes/#✅-update-muithemeprovider-import)
- [Replace StylesProvider imports](https://mui.com/material-ui/migration/v5-style-changes/#✅-update-stylesprovider-import)

### Styles

- MUI v5 makes heavy changes to the styling engine. Be sure to review [MUI's breaking changes related to styles](https://mui.com/material-ui/migration/v5-style-changes/)
- Importantly, any styles that require units (rm, em, px, %, etc) no longer default to `px`.
- Replace `makeStyles` and `className` prop with `sx`

  ```jsx
  // Old
  import {makeStyles} from '@material-ui/core';

  const useStyles = makeStyles({
    container: {
      height: '100%',
      width: '100%',
      padding: 20,
    },
  });

  function SomeComponent() {
    const classes = useStyles();
    return <span className={classes.container}>Hello, World!</span>;
  }

  // ---------
  // New

  // Replace html components with `Box` for styling
  import {Box} from '@mui/material';

  const classes = {
    container: {
      height: '100%',
      width: '100%',
      // Added units
      padding: '20px',
    },
  };

  function SomeComponent() {
    return (
      <Box component="span" sx={classes.container}>
        Hello, World!
      </Box>
    );
  }
  ```

### Component specific changes

- SQFormTextarea

  - Renamed `rows` to `minRows`
  - Renamed `rowsMax` to `maxRows`

- SQFormDialogStepper
  - SQFormDialogStepper now validates on mount
  - Previously the Next/Submit button was disabled if not all fields had a value, regardless of validation schema. We've updated this component to not care about each individual field's value and instead only take into account the validation schema, the dirty status, and `isDisabled` prop

## [Version 9](CHANGELOG.md#900-2022-05-04)

### Component specific changes

- SQFormDialog
  - Replaced `isTertiaryDisabled` and `showTertiaryButton` prop with a new prop called `tertiaryStatus`

## [Version 8](CHANGELOG.md#800-2022-04-07)

### SQFormScrollableCard no longer accepts titleVariant as a prop

- No changes are required if the consumer application is a JS application
- Consumer applications that use TypeScript will require this prop to be removed if present to resolve the type error.

### SQForm components no longer accept POJO validation schemas

- SQForm components now _only_ accept validation schema objects that are of type `Yup.AnyObjectSchema`. You can create these types of schema using `Yup.object()`. Supplying any other type of object will have unexpected results and validation will fail to work.
- This is an intentional design to facilitate using Yup to create models to be shared between servers and clients.

```jsx
// ⛔️ Example
const validationSchema = {
  friends: Yup.array().required('Required'),
};

// ✅  Example
// Addition of `Yup.object` wrapping our validation object
const validationSchema = Yup.object({
  friends: Yup.array().required('Required').min(1, 'Atleast one required'),
});
```

<em>Note: `Yup.object().shape({})` may fail to provide the correct type and cause issues in Typescript projects. `.shape()` is advised to be used only to extend or modify already existing schemas. `const newSchema = existingSchema.shape({ newKey: ... })`</em>

### Upgraded `Yup` peer dependency version

- Yup was upgraded from `^0.28.3` to `^0.32.9`, see [Yup's breaking changes](https://github.com/jquense/yup/blob/master/CHANGELOG.md)
  - `array().required()` will no longer consider an empty array missing and required checks will pass.

```jsx
// ⛔️ Example
const validationSchema = Yup.object({
  friends: Yup.array().required('Required'),
});

// ✅  Example
const validationSchema = Yup.object({
  friends: Yup.array().required('Required').min(1, 'Atleast one required'),
});
```

## SQFormDialog changes

- `onSave` is now a required prop
- New prop `shouldDisplaySaveButton` dictates whether the "Save" button will be shown in the dialog footer. Previously that was handled by the truthiness of `onSave`

```jsx
// ⛔️ Example
return (
 // "Save" button is not displayed
 <SQFormDialog
   isOpen={true}
   onClose={closeSQFormDialog}
   title="Title"
   initialValues={{}}
   {/* Missing `onSave`*/}
 >
   {...}
 </SQFormDialog>
)
```

```jsx
// ✅  Example
return (
  // "Save" button is not displayed
  <SQFormDialog
    isOpen={true}
    onClose={closeSQFormDialog}
    title="Title"
    initialValues={{}}
    onSave={() => {}} /* `onSave` supplied */
    shouldDisplaySaveButton={false} /* Prevents save button from being displayed */
  >
    {...}
  </SQFormDialog>
)
```

### SQFormGuidedWorkflow changes

- Removed TaskModule properties: `isPanelExpanded` and `expandPanel`

- In SQForm v8 `actionButton` was renamed to `actions` as part of the taskModule definitions. Functionality remains the same.

```jsx
// ⛔️ Example
const taskModules = [
  { ... },
  { ... },
  {
    ...
    scriptedTextProps: {
      text: `Stuff about policy cancellation documents`,
      title: 'Agent Script',
      actionButton: <TextButton tooltip="View">View Doc</TextButton>, // This prop was renamed
    },
  }
]

// ✅ Example
const taskModules = [
  { ... },
  { ... },
  {
    ...
    scriptedTextProps: {
      text: `Stuff about policy cancellation documents`,
      title: 'Agent Script',
      actions: <TextButton tooltip="View">View Doc</TextButton>, // This prop was renamed
    },
  }
]
```

### SQForm no longer allows `boolean`s as dropdown options

- In SQForm v8 support for `boolean` valued dropdown options was removed. Material-UI and HTML Select components do not support options with `boolean`s as values and causes type conflicts with our own library. Therefore, if you're upgrading this version and you using `boolean` values options you'll need to take care to update those. Below is our recommended changes.

```js
// ⛔️ Example
const YES_NO_DROPDOWN_OPTIONS = [
  {label: 'Yes', value: true},
  {label: 'No', value: false},
];

// ✅ Example
const YES_NO_DROPDOWN_OPTIONS = [
  {label: 'Yes', value: 1},
  {label: 'No', value: 0},
];
```

- Be sure that when you change your dropdown options that you take care to update your submit, onChange, and onBlur handlers such that you're taking into account that the values for the affected forms will no longer be `boolean`s. Using `1` and `0` will still allow for `if(dropdownValue)` to evaluate correctly. However, if you're expecting your values to be passed as booleans outside of any event handlers you'll need to use `Boolean(dropdownValue)`. See an example below of how one might update an SQForm submit handler to comply with this breaking change.

```ts
const updateSurveyAnswer = (surveyAnswer: boolean) => {
  // Example
  sendNetworkRequest({
    url,
    method: 'GET',
    body: {
      questionID: 1,
      answer: surveryAnswer,
    }
  });
};

// ⛔️ Outdated submit handler
type FormValues = {
  surveyAnswer: boolean;
};

const handleSubmit = (formValues: FormValues) => {
  updateSurveryAnswer(formValues.surveryAnswer);
};

// ✅ Updated submit handler
type FormValues = {
  // Now is `number` or whatever new type your dropdown options will be
  surveryAnswer: number;
}

const handleSubmit = (formValues: FormValues) => {
  updateSurveryAnswer(Boolean(formValues.surveryAnswer));
});
```

- Lastly, you'll also need to make sure you update your Yup validation for the affected form fields from `Yup.boolean()` to `Yup.number()` or whatever new value type you're using for your affected dropdown options.

## [Version 7](CHANGELOG.md#700-2022-01-07)

In SQForm v7, we have removed the SQFormIconButton in favor of the SQFormButton where the text says either "Submit" or "Save". Please replace all occurrences of SQFormIconButton with SQFormButton in the consuming application.

## [Version 6](CHANGELOG.md#600-2021-12-08)

In SQForm v6, we no longer need to pass the `isRequired` prop to any form components. The components now derive whether or not they are a required field based on the Yup validation schema of the form.

While removing this boilerplate is nice, this allows us to handle situations where a fields `required` attribute is conditional. We can fully rely on the validation schema rather than also creating a mechanism to make `isRequired` conditional and keeping the `isRequired` prop in sync with the validation schema.

We ALWAYS want a required field to say `Required` in the fields helper text. We are no longer required to specify the `Required` text within our validation schemas as long as we follow the setup below in the consumer app. Otherwise, you'll still need to say for example: `foo: Yup.string().required('Required')`

When updating the consuming applications version of SQForm to v6, please add this code to the root of the client:

```js
// root of the consumer app such as index.js
import {setLocale} from 'yup';

setLocale({
  mixed: {
    required: 'Required',
  },
});
```

During this time, please search the project for validation schemas that use `array()`. If they are `required`.
Please ensure `.required()` is the FIRST validation method in the chain.

```js
// ✅ Example
options: Yup.array()
  .required()
  .min(1, 'Please choose one option'),
```

```js
// ⛔️ Example
options: Yup.array()
  .min(1, 'Please choose one option')
  .required(),
```

When upgrading the consumer application to SQForm v6, we should also cleanup any use of the `isRequired` prop. While this is optional in JavaScript projects, this is extra noise and a possible spot of confusion for future new developers. The `isRequired` prop does nothing in v6.

For TypeScript, please remove the `isRequired` property from any TypeScript `types` and `interfaces`.

## Migration from SC+ Shared Components Library

- `> npm install @selectquotelabs/sqform`

- Update all SQForm related imports from `scplus-shared-components` to `@selectquotelabs/sqform`

- SQDialogForm was renamed to SQFormDialog (fix where imported)

- SQDialogStepper was renamed to SQFormDialogStepper (fix where imported)

- SQDialogStep was renamed to SQFormDialogStep (fix where imported)
