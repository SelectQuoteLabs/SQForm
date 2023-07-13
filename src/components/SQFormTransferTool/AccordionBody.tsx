import React from 'react';
import {
  Section,
  SectionBody,
  SectionHeader,
  TextButton,
} from 'scplus-shared-components';
import Step from './Step';
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
    <Section sx={{marginBottom: '0px'}}>
      <SectionHeader title={productDisplayName}>
        <TextButton onClick={handleTransfer} tooltip={modalLinkText}>
          {modalLinkText}
        </TextButton>
      </SectionHeader>
      <SectionBody>
        {transferProduct.steps.map((step) => (
          <Step step={step} key={step.id} />
        ))}
      </SectionBody>
    </Section>
  );
}
