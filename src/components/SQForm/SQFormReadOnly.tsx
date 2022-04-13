import React from 'react';
import Grid from '@material-ui/core/Grid';
import {Formik, Form} from 'formik';
import SQFormReadOnlyField from './SQFormReadOnlyField';
import SQFormMaskedReadOnlyField from './SQFormMaskedReadOnlyField';
import {noop} from '../../utils';
import type {CSSProperties} from 'react';
import type {GridProps} from '@material-ui/core';
import type {FormikValues} from 'formik';
import type {SQFormMaskedReadOnlyFieldProps} from './SQFormMaskedReadOnlyField';

export interface SQFormMaskedReadOnlyFieldWithKey
  extends SQFormMaskedReadOnlyFieldProps {
  key?: React.Key;
}

export interface SQFormReadOnlyProps<Values extends FormikValues> {
  /** Form Input(s) */
  readOnlyFields: SQFormMaskedReadOnlyFieldWithKey[];
  /** Form Entity Object */
  initialValues: Values;
  /** Any prop from https://material-ui.com/api/grid */
  muiGridProps?: GridProps;
}

const noBottomMargin: CSSProperties = {
  marginBottom: 0,
};
const noBottomMarginStyle = {style: noBottomMargin};

function SQFormReadOnly<Values extends FormikValues>({
  readOnlyFields,
  initialValues,
  muiGridProps = {},
}: SQFormReadOnlyProps<Values>): JSX.Element {
  return (
    <Formik<Values> initialValues={initialValues} onSubmit={noop}>
      {(_props) => {
        return (
          <Form>
            <Grid
              {...muiGridProps}
              container
              spacing={muiGridProps.spacing ?? 2}
            >
              {readOnlyFields.map((readOnlyField, index) => {
                const props = {
                  key: readOnlyField?.key ?? index,
                  muiFieldProps: noBottomMarginStyle,
                  ...readOnlyField,
                };

                if (readOnlyField?.mask) {
                  return <SQFormMaskedReadOnlyField {...props} />;
                }
                return <SQFormReadOnlyField {...props} />;
              })}
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
}

export default SQFormReadOnly;
