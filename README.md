# SQ Form Library

SQ Form Library aims to offer reusable form components to unify the UI for all SelectQuote applications.

---

## Viewing the Storybook

The latest version of the Shared Component Library Storybook can be viewed at:

`https://scplus-shared-components.selectquotelabs.com/`

## Contributing

When you make changes to this repo, you must adhere to the [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/#summary) standard.

If you are unfamiliar with writing [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/#summary) style messages, you can use the [commitizen](https://commitizen.github.io/cz-cli/) to guide you through creating the commit message

```sh
git add .
npx git-cz
```

> You can also use `npm run commit` instead of `npx git-cz` if that's easier to remember.

When you are familiar with how commits should be structured, feel free to use `git commit -m` for quick things, for example:

```sh
git commit -m “chore(rounded button): added boilerplate”
```

The commit will be validated through a linter pre-commit hook and will reject any commit messages that do not properly adhere to the convention.

[Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/#summary) formatted messages are required for proper versioning and automatic generation of release notes / CHANGELOG. Check out the documentation if you want to learn more about what commits trigger a version change.

## Consuming

### Initial Setup

To use a component from the shared components library, add the library as a dependency in the package.json.

Ideally, the SSC version consumed is managed by the technical lead. Replace the X.X.X at the end of the URL below with the version you are wanting to consume. You can look at the Changelog.md for a full list of all versions and what was in each.

```json
"scplus-shared-components": "https://npm-public.selectquotelabs.com/scplus-shared-components/X.X.X",
```

### Using a SQForm Component

From the file you want to consume a shared component, import the component:

```js
import {SQForm} from 'sqform';
```

---

## Development

### Prerequisites

This project leverages Docker and docker-compose. Docker and docker-compose must be installed installed to run this project.

### Local Development

Install Visual Studio Code and the Remote Development Extension

```sh
$ npm run storybook
```

## Contributing

To contribute documentation for future components you can [clone this JIRA](https://selectquote.atlassian.net/browse/SSC-1).

For adding new components to the library follow this order:

1. Make changes locally on a feature branch following the [PR process.](https://selectquote.atlassian.net/wiki/spaces/SE/pages/839516288/Pull+Requests)
2. Run the storybook site locally (`npm run storybook`) and confirm all changes.
3. Add complete story to properly document component.
4. Open a PR targeting the master branch.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://bitbucket.org/SelectQuote/scplus-shared-components/src/master/).
