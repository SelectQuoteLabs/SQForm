---
id: installation
title: Installation
---

### Install

```sh
$ npm install sqform
```

### Prerequisites

In order to use SQForm, you must install its peer dependencies

```sh
$ npm install react react-dom @material-ui/core @material-ui/icons @material-ui/lab @material-ui/pickers
```

### Additional Setup

In order to use the `SQFormDatePicker` component you must add the LocalizationProvider context provider.

```js
// index.js
import { LocalizationProvider } from '@material-ui/pickers';
import MomentAdapter from '@material-ui/pickers/adapter/moment';

<LocalizationProvider dateAdapter={MomentAdapter} locale={'en'}>
  <App />
</LocalizationProvider>;
```

:::tip

Visit the SCPlus Shared Components docs for setting up Material-UI
