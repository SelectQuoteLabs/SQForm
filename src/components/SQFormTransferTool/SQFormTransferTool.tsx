import React from 'react';
import LoadingSpinner from '../LoadingSpinner';
import SQFormDialog from '../SQFormDialog';
import SQFormTransferProductPanels from './SQFormTransferProductPanels';
import {noop} from '../../utils';
import type {FormikHelpers, FormikValues} from 'formik';
import type {TransferProduct, OnTransfer} from './types';

export type SQFormTransferToolProps<Values extends FormikValues> = {
  initialValues: Values; // This will be removed SC3-1810
  /** boolean to indicate if the modal should show a loading indicator */
  isLoading: boolean;
  /** That data that drives the content of the modal and it's accordions */
  transferProducts: Array<TransferProduct>;
  /** The current open/closed state of the Dialog */
  isOpen: boolean;
  /** Callback function invoke when the user clicks the primary button */
  onSave: (
    values: Values,
    formikHelpers: FormikHelpers<Values>
  ) => void | Promise<unknown>;
  /** the title to display in the header of the modal */
  title?: string;
  /** Callback funciton to be invoked when the transfer button is clicked */
  onTransfer: OnTransfer;
};

export default function SQFormTransferTool<Values extends FormikValues>({
  isLoading,
  isOpen,
  onSave,
  transferProducts,
  initialValues,
  title = 'Standard Transfer Modal',
  onTransfer = alert, // TODO this placeholder alert will be replaced in SC3-1811
}: SQFormTransferToolProps<Values>): React.ReactElement {
  // TODO Validation: this will be internal and the consumer need not worry about it. It should be part of SC3-1810 processing each step
  // TODO Initial Values: like validation this will be hidden from the consumer as they should not need it. SC3-1810 steps
  // TODO Transfer: transfers will be handled via consumer supplied callback. SC3-1811
  // TODO the onSave, onClose functions seem backward, after adding some more of the required functionality re-evaluate this

  return (
    <SQFormDialog
      isOpen={isOpen}
      onSave={onSave}
      onClose={noop}
      title={title}
      initialValues={initialValues}
      shouldDisplaySaveButton={false}
      cancelButtonText="save and close"
      showSecondaryButton={!isLoading}
      disableBackdropClick={true}
    >
      {isLoading ? (
        <LoadingSpinner message="Loading transfer options" />
      ) : (
        <SQFormTransferProductPanels
          transferProducts={transferProducts}
          onTransfer={onTransfer}
        />
      )}
    </SQFormDialog>
  );
}
