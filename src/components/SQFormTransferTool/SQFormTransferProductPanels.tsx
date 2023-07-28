import React from 'react';
import {Box} from '@mui/material';
import {Accordion} from 'scplus-shared-components';
import AccordionBody from './AccordionBody';
import {useSQFormContext} from '../../index';
import type {AccordionPanelType} from 'scplus-shared-components';
import type {TransferProduct, OnTransfer, FormContext} from './types';

export type SQFormTransferProductPanelsProps = {
  transferProducts: TransferProduct[];
  onTransfer: OnTransfer;
};

function getPanels(
  transferProducts: TransferProduct[],
  onTransfer: OnTransfer,
  onPanelClick: (id: TransferProduct['productID']) => void
): AccordionPanelType[] {
  if (!transferProducts?.length) {
    return [];
  }

  return transferProducts.map((transferProduct) => {
    const {productID, productDisplayName, enabled} = transferProduct;

    return {
      body: (
        <AccordionBody
          transferProduct={transferProduct}
          onTransfer={onTransfer}
          key={productID}
        />
      ),
      name: `${productID}`,
      title: productDisplayName,
      isDisabled: !enabled,
      onClick: () => onPanelClick(transferProduct.productID),
    };
  });
}

export default function SQFormTransferProductPanels({
  transferProducts,
  onTransfer,
}: SQFormTransferProductPanelsProps): React.ReactElement | null {
  const panels = getPanels(
    transferProducts,
    onTransfer,
    updateViewedProductIDs
  );
  const {setFieldValue, values: context} = useSQFormContext<FormContext>();

  function updateViewedProductIDs(newId: TransferProduct['productID']) {
    const viewedIds = context.viewedProductIDs;
    setFieldValue('viewedProductIDs', [...new Set([...viewedIds, newId])]);
  }

  return (
    <Box
      sx={{
        minWidth: '600px',
        padding: '16px',
        paddingBottom: '0px',
      }}
    >
      <Accordion accordionPanels={panels} />
    </Box>
  );
}
