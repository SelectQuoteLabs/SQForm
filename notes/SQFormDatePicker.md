# SQFormDatePickers

This is a date time field used inside our forms.

## First time setup

`> npm install @material-ui/pickers@next`

From the top of your client code add the LocalizationProvider. The same place the Material-UI theme providers are used. Then pass the MomentAdapter into the `dateAdapter` prop.

```js
import {LocalizationProvider} from '@material-ui/pickers';
import MomentAdapter from '@material-ui/pickers/adapter/moment';

<LocalizationProvider dateAdapter={MomentAdapter} locale={'en'}>
  <App />
</LocalizationProvider>;
```

## Design Notes

--

## Technical Notes

Coming soon....

### Example

Coming soon...
