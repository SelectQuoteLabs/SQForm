import React from 'react';
import {
  Section,
  SectionBody,
  SectionHeader,
  TextButton,
} from 'scplus-shared-components';
import type {OnTransfer, TransferProduct} from './types';

export type AccordionBodyProps = {
  transferProduct: TransferProduct;
  onTransfer: OnTransfer;
};

export default function AccordionBody({
  transferProduct,
  onTransfer,
}: AccordionBodyProps): React.ReactElement {
  const {productDisplayName, modalLinkText} = transferProduct;

  function handleTransfer() {
    onTransfer('TODO this needs implemented');
  }

  return (
    <Section>
      <SectionHeader title={productDisplayName}>
        <TextButton onClick={handleTransfer} tooltip={modalLinkText}>
          {modalLinkText}
        </TextButton>
      </SectionHeader>
      <SectionBody>TODO implement step rendering on SC3-1810</SectionBody>
    </Section>
  );
}
