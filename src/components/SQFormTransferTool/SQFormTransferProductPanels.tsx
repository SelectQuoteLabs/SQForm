import React from 'react';
import {Box} from '@mui/material';
import {Accordion} from 'scplus-shared-components';
import type {AccordionPanelType} from 'scplus-shared-components';
import type {TransferProduct} from './types';

export type SQFormTransferProductPanelsProps = {
  transferProducts: TransferProduct[];
};

function getPanel(
  transferProducts: TransferProduct[]
): AccordionPanelType[] {
  if (!transferProducts?.length) {
    return [];
  }

  return transferProducts.map(({productID, productDisplayName, enabled}) => {
    return {
      body: <>TO BE IMPLEMENTED SC3-1809 (accordions) and SC3-1810 (steps)</>,
      name: `${productID}`,
      title: productDisplayName,
      isDisabled: !enabled,
    };
  });
}

export default function SQFormTransferProductPanels({
  transferProducts,
}: SQFormTransferProductPanelsProps): React.ReactElement | null {
  const panels = getPanel(transferProducts) ?? [];
  if (!panels.length) {
    return null;
    // TODO ??
    // Is this valid? DO we want some sort of loading indicator?
    // or will be not opening the modal until the data has loaded?
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
