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

### Maintenance Releases

Maintenance releases are for when we want to release a new version of the library that is _not_ of the latest major version. This can happen when we notice a bug in a heavily used older version, or we have a request for a new feature that needs to be in an older version.

Maintenance releases are released off any branch that includes the string `"maintenance-release"` such as `"maintenance-release-9.8.x"`. This branch naming convention is protected in repo settings.

- Create a branch off whatever your base version is with the branch naming mentioned
  - Push it to remove
- Create a feature branch off that branch for your code changes
- Create a PR following normal procedures to merge your feature branch into your maintenance-release branch
  - Address PR feedback and get approvals
- When the PR is merged it should automatically kick off the release Github Action. This can be verified in the actions tab on Github
  - When the action is finished a new version should be available to download on [NPM]() for consumption.

## Consuming

By default in NPM v7 and above peer dependencies will be installed automatically. You can check your npm version using `npm --version` to determine the version you are using. If your version is not at least v7 you must install the peer dependencies manually.

Optional dependencies are always installed but can be omitted by using `npm install --no-optional` when installing this package.

- Using NPM v7 or greater

  - `> npm install @selectquotelabs/sqform`

- Using NPM v6 and below

  - `> npm install @selectquotelabs/sqform`
  - Install peer dependencies manually

- Using TypeScript
  - `> npm install -D @types/react @types/react-dom @types/react-text-mask @types/yup`

> Note: Ensure the types package major version number matches the package of your project. ex: React 16 should use v16 of @types/react.

## Breaking Changes / Upgrade Guide

An upgrade guide and accompanying breaking changes can be found in the [upgrade guide file](UPGRADE.md).

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
