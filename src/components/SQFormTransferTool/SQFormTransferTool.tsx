import React from 'react';
import SQFormDialog from 'components/SQFormDialog/SQFormDialog';
import SQFormTransferProductPanels from './SQFormTransferProductPanels';
import {noop} from 'utils';
import type {FormikHelpers, FormikValues} from 'formik';
import type {TransferProduct} from './types';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';

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
};

export default function SQFormTransferTool<Values extends FormikValues>({
  isLoading,
  isOpen,
  onSave,
  transferProducts,
  initialValues,
}: SQFormTransferToolProps<Values>): React.ReactElement {
  // TODO Validation: this will be internal and the consumer need not worry about it. It should be part of SC3-1810 processing each step
  // TODO Initial Values: like validation this will be hidden from the consumer as they should not need it. SC3-1810 steps
  // TODO Transfer: transfers will be handled via consumer supplied callback. SC3-1811

  return (
    <SQFormDialog
      isOpen={isOpen}
      onSave={onSave}
      onClose={noop}
      title="Standard Transfer Modal"
      initialValues={initialValues}
      shouldDisplaySaveButton={false}
      cancelButtonText="save and close"
      showSecondaryButton={!isLoading}
      disableBackdropClick={true}
    >
      {isLoading ? (
        <LoadingSpinner message="Loading transfer options" />
      ) : (
        <SQFormTransferProductPanels transferProducts={transferProducts} />
      )}
    </SQFormDialog>
  );
}
