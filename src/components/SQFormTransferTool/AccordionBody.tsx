import React from 'react';
import {
  Section,
  SectionBody,
  SectionHeader,
  TextButton,
} from 'scplus-shared-components';
import Step from './Step';
import {useSQFormContext} from '../../../src';
import {getIsConditionMet} from './util';
import type {
  OnTransfer,
  TransferProduct,
  FormValues,
  CallBackData,
} from './types';

export type AccordionBodyProps = {
  transferProduct: TransferProduct;
  onTransfer: OnTransfer;
};

/**
 * Transforms the form values into a more friendly format. Specifically the
 * same form that the step condition uses to define questions and answers
 * with the exception that the value can be null, representing an empty value
 */
function transformValues(values: FormValues): CallBackData['questionAnswers'] {
  return Object.entries(values).map(([key, value]) => {
    return {
      questionId: Number(key),
      answerId: value === '' ? null : Number(value),
    };
  });
}

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
  const {values} = useSQFormContext<FormValues>();

  function handleTransfer() {
    const questionAnswers = transformValues(values);
    const {productID, transferLine} = transferProduct;
    // TODO we will also include a log of open panels

    onTransfer({transferLine, questionAnswers, productID});
  }

  const isTransferConditionMet = getIsTransferConditionMet(
    transferProduct,
    values
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
