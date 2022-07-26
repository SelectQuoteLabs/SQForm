import React from 'react';
import {useSQFormContext} from '../../src';

export default function FormValidationMessage(): React.ReactElement {
  const {errors} = useSQFormContext();
  const invalidFieldsRemaining = Object.keys(errors).length ?? 0;
  return <div>{`${invalidFieldsRemaining} invalid fields left!`}</div>;
}
