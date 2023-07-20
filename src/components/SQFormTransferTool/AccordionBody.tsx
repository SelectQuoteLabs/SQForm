import React from 'react';
import {
  Section,
  SectionBody,
  SectionHeader,
  TextButton,
} from 'scplus-shared-components';
import Step from './Step';
import {useSQFormContext} from '../../../src';
import {getIsConditionMet, transformForm} from './util';
import type {
  OnTransfer,
  TransferProduct,
  FormValues,
  FormContext,
} from './types';

export type AccordionBodyProps = {
  transferProduct: TransferProduct;
  onTransfer: OnTransfer;
};

function getIsTransferConditionMet(
  transferProduct: TransferProduct,
  values: FormValues
) {
  // There can be only one transferStep in a Transfer Product
  const transferStep = transferProduct.steps.find(
    ({type}) => type === 'transfer'
  );

  if (transferStep?.condition === undefined) {
    console.warn('Malformed data, missing transfer step');
    return false;
  }

  return getIsConditionMet(transferStep.condition, values);
}

export default function AccordionBody({
  transferProduct,
  onTransfer,
}: AccordionBodyProps): React.ReactElement {
  const {productDisplayName, modalLinkText} = transferProduct;
  /* while the name formik Helpers is slightly misleading as it contains more
   * than that, it is at least safe given that the rest is inclusive of the helpers
   */
  const {values, ...formikHelpers} = useSQFormContext<FormContext>();

  function handleTransfer() {
    const {productID, transferLine} = transferProduct;
    onTransfer(
      {transferLine, productID, ...transformForm(values)},
      formikHelpers
    );
  }

  const isTransferConditionMet = getIsTransferConditionMet(
    transferProduct,
    values.questionValues
  );

  const tooltip = isTransferConditionMet ? modalLinkText : 'Condition Not Met';

  return (
    <Section sx={{marginBottom: '0px'}}>
      <SectionHeader title={productDisplayName}>
        <TextButton
          onClick={handleTransfer}
          tooltip={tooltip}
          isDisabled={!isTransferConditionMet}
        >
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
