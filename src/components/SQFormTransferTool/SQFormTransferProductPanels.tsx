import React from 'react';
import {Box} from '@mui/material';
import {Accordion} from 'scplus-shared-components';
import type {AccordionPanelType} from 'scplus-shared-components';
import AccordionBody from './AccordionBody';
import type {TransferProduct, OnTransfer} from './types';

export type SQFormTransferProductPanelsProps = {
  transferProducts: TransferProduct[];
  onTransfer: OnTransfer;
};

function getPanels(
  transferProducts: TransferProduct[],
  onTransfer: OnTransfer
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
    };
  });
}

export default function SQFormTransferProductPanels({
  transferProducts,
  onTransfer,
}: SQFormTransferProductPanelsProps): React.ReactElement | null {
  const panels = getPanels(transferProducts, onTransfer);

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
