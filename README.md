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

## Consuming

Coming soon...

## Migration from SC+ Shared Components Library

- `> npm install @selectquotelabs/sqform`

- Update all SQForm related imports from `scplus-shared-components` to `@selectquotelabs/sqform`

- SQDialogForm was renamed to SQFormDialog (fix where imported)

- SQDialogStepper was renamed to SQFormDialogStepper (fix where imported)

- SQDialogStep was renamed to SQFormDialogStep (fix where imported)

### Initial Setup

Coming Soon...

## Development

### Running Storybook locally

```sh
$ npm run storybook
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://bitbucket.org/SelectQuote/scplus-shared-components/src/master/).
