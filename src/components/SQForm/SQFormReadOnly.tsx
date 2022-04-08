import React from 'react';
import Grid from '@material-ui/core/Grid';
import {Formik, Form} from 'formik';
import SQFormReadOnlyField from './SQFormReadOnlyField';
import {noop} from '../../utils';
import type {CSSProperties} from 'react';
import type {GridProps} from '@material-ui/core';
import type {FormikValues} from 'formik';
import type {SQFormReadOnlyFieldProps} from './SQFormReadOnlyField';

export interface SQFormReadOnlyProps<Values extends FormikValues> {
  /** Form Input(s) */
  readOnlyFields: SQFormReadOnlyFieldProps[];
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
                return (
                  <SQFormReadOnlyField
                    key={index}
                    muiFieldProps={noBottomMarginStyle}
                    {...readOnlyField}
                  />
                );
              })}
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
}

export default SQFormReadOnly;
