# SQ Form Library

SQ Form Library aims to offer reusable form components to unify the UI for all SelectQuote applications.

---

## Documentation

Visit [https://selectquotelabs.github.io/SQForm/docs/](https://selectquotelabs.github.io/SQForm/docs/)

## Viewing the Storybook

The latest version of the SQForm Library Storybook can be viewed [here](https://master--5f4431386ea00a00220d495c.chromatic.com).

## Contributing

When you make changes to this repo, you must adhere to the [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/#summary) standard.

If you are unfamiliar with writing [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/#summary) style messages, you can use the [commitizen](https://commitizen.github.io/cz-cli/) to guide you through creating the commit message

```sh
git add .
npm run commit
```

The commit will be validated through a linter pre-commit hook and will reject any commit messages that do not properly adhere to the convention.

[Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/#summary) formatted messages are required for proper versioning and automatic generation of release notes / CHANGELOG. Currently, only `feat` and `fix` will bump the version.

Your first commit should use the type relevant to what you're working on, e.g., `feat` or `fix`, then if you receive feedback in a PR requiring another commit, choose `chore`; this will prevent those extra commits cluttering the changelog.

For **BREAKING CHANGES** Type a brief description of the breaking change when asked if there is a breaking change. Otherwise, press the `ENTER` key to skip over the breaking change optional question.

- A breaking change will cause a `MAJOR` SemVer bump. Ex: 3.0.5 -> 4.0.0

## Consuming

This is a Typescript library and therefore relies on Typescript types from libraries other than this one. The libraries who's types SQForm relies on are marked as a [peer dependency](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#peerdependencies) if the library is also required for non-type imports. Otherwise, they're marked as an [optional dependency](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#optionaldependencies).

By default in NPM v7 and above peer dependencies will be installed automatically. You can check your npm version using `npm --version` to determine the version you are using. If your version is not at least v7 you must install the peer dependencies manually.

Optional dependencies are always installed but can be omitted by using `npm install --no-optional` when installing this package.

- Using NPM v7 or greater
  - `> npm install @selectquotelabs/sqform`

- Using NPM v6 and below
  - `> npm install @selectquotelabs/sqform`
  - Install peer dependencies manually

- To omit optional dependencies
  - `> npm install @selectquotelabs/sqform --no-optional`

## Breaking Changes

### Version `[Typescript Version]`

#### SQFormGuidedWorkflow changes
 - Removed TaskModule properties: `isPanelExpanded` and `expandPanel`

 - In SQForm v`[Typescript Version]` `actionButton` was renamed to `actions` as part of the taskModule definitions. Functionality remains the same.

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

#### SQForm no longer allows `boolean`s as dropdown options
In SQForm v`[Typescript Version]` support for `boolean` valued dropdown options was removed. Material-UI and HTML Select components do not support options with `boolean`s as values and causes type conflicts with our own library. Therefore, if you're upgrading this version and you using `boolean` values options you'll need to take care to update those. Below is our recommended changes.

```js
// ⛔️ Example
const YES_NO_DROPDOWN_OPTIONS = [
  {label: 'Yes', value: true},
  {label: 'No', value: false}
];

// ✅ Example
const YES_NO_DROPDOWN_OPTIONS = [
  {label: 'Yes', value: 1},
  {label: 'No', value: 0}
]
```

Be sure that when you change your dropdown options that you take care to update your submit, onChange, and onBlur handlers such that you're taking into account that the values for the affected forms will no longer be `boolean`s. Using `1` and `0` will still allow for `if(dropdownValue)` to evaluate correctly. However, if you're expecting your values to be passed as booleans outside of any event handlers you'll need to use `Boolean(dropdownValue)`. See an example below of how one might update an SQForm submit handler to comply with this breaking change.

```js
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

Lastly, you'll also need to make sure you update your Yup validation for the affected form fields from `Yup.boolean()` to `Yup.number()` or whatever new value type you're using for your affected dropdown options.
### Version 7

In SQForm v7, we have removed the SQFormIconButton in favor of the SQFormButton where the text says either "Submit" or "Save". Please replace all occurrences of SQFormIconButton with SQFormButton in the consuming application.

### Version 6

In SQForm v6, we no longer need to pass the `isRequired` prop to any form components. The components now derive whether or not they are a required field based on the Yup validation schema of the form.

While removing this boilerplate is nice, this allows us to handle situations where a fields `required` attribute is conditional. We can fully rely on the validation schema rather than also creating a mechanism to make `isRequired` conditional and keeping the `isRequired` prop in sync with the validation schema.

We ALWAYS want a required field to say `Required` in the fields helper text. We are no longer required to specify the `Required` text within our validation schemas as long as we follow the setup below in the consumer app. Otherwise, you'll still need to say for example: `foo: Yup.string().required('Required')`

When updating the consuming applications version of SQForm to v6, please add this code to the root of the client:

```
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

```
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

### Initial Setup

Coming Soon...

## Development

To get started first install the projects dependencies

```sh
$ npm install
```

It's recommended to use the Node version specified in the `.nvmrc` file. If you have [nvm](https://github.com/nvm-sh/nvm#about) installed execute the following terminal command:

```sh
$ nvm use
```

> Note: If you run `nvm use` and don't have that version of Node installed, `nvm` will tell you how to install it

### Running Storybook locally

```sh
$ npm run storybook
```

## Running the Docs Page Locally

1. Install Doc page dependencies

```sh
$ cd SQFormDocs && npm i
```

2. Run the docs page

```sh
$ npm run docs
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://bitbucket.org/SelectQuote/scplus-shared-components/src/master/).
