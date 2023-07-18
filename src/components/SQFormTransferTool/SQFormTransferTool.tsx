import React from 'react';
import {Formik} from 'formik';
import LoadingSpinner from '../LoadingSpinner';
import SQFormTransferProductPanels from './SQFormTransferProductPanels';
import DialogInner from './DialogInner';
import type {GridProps} from '@mui/material';
import type {FormikHelpers} from 'formik';
import type {TransferProduct, OnTransfer, Step, FormValues} from './types';

export type SQFormTransferToolProps = {
  /** boolean to indicate if the modal should show a loading indicator */
  isLoading: boolean;
  /** That data that drives the content of the modal and it's accordions */
  transferProducts: TransferProduct[];
  /** The current open/closed state of the Dialog */
  isOpen: boolean;
  /** Callback function invoke when the user clicks the primary button */
  onSave: (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => void | Promise<unknown>;
  /** the title to display in the header of the modal */
  title?: string;
  /** Callback funciton to be invoked when the transfer button is clicked */
  onTransfer: OnTransfer;
  /** Any prop from https://material-ui.com/api/grid applied to contents of modal */
  muiGridProps?: GridProps;
};

/** Given an array of TransferProduct produce initial values object
 * That object will take the form of [string]: number where the form field name is the
 * question id. The values in this object are initialized to '', but will be the answerIds.
 */
function getInitialValues(transferProducts: TransferProduct[]): FormValues {
  const steps = transferProducts.reduce((acc, transferProduct) => {
    return [...acc, ...transferProduct.steps];
  }, [] as Step[]);

  return steps.reduce((acc, {id, type}) => {
    if (type !== 'question') {
      return acc;
    }

    return {
      ...acc,
      [id]: '',
    };
  }, {});
}

export default function SQFormTransferTool({
  isLoading,
  isOpen,
  onSave,
  transferProducts,
  title = 'Standard Transfer Modal',
  muiGridProps = {},
  onTransfer,
}: SQFormTransferToolProps): React.ReactElement {
  const initialValues = getInitialValues(transferProducts);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={onSave}
      validateOnMount={true}
      validateOnBlur={true}
      validateOnChange={true}
    >
      <DialogInner
        isSaveButtonDisabled={false}
        isOpen={isOpen}
        maxWidth={'sm'}
        title={title}
        muiGridProps={muiGridProps}
      >
        <>
          {isLoading ? (
            <LoadingSpinner message="Loading transfer options" />
          ) : (
            <SQFormTransferProductPanels
              transferProducts={transferProducts}
              onTransfer={onTransfer}
            />
          )}
        </>
      </DialogInner>
    </Formik>
  );
}
