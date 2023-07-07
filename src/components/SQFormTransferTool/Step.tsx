import React from 'react';
import {ScriptedText} from 'scplus-shared-components';
import SQFormDropdown from 'components/fields/SQFormDropdown/SQFormDropdown';
import {useSQFormContext} from 'index';
import type {Answer, Step} from './types';

type Props = {
  step: Step;
};

const styles = {
  script: {
    paddingBottom: '16px',
  },
};

function checkAnswer(answer: Answer, values: Record<string, number | ''>) {
  return values[answer.questionId] === answer.answerId;
}

function getIsConditionMet(
  condition: Step['condition'],
  values: Record<string, number | ''>
) {
  if (condition === null) {
    return true;
  }

  const {logicalOperator, answers} = condition;

  if (logicalOperator === 'and') {
    return answers.every((answer) => checkAnswer(answer, values));
  }

  if (logicalOperator === 'or') {
    return answers.some((answer) => checkAnswer(answer, values));
  }
}

export default function StepRendering({
  step,
}: Props): React.ReactElement | null {
  const {id, type, text, options, condition} = step;
  const {values} = useSQFormContext<Record<string, number | ''>>();
  const isConditionMet = getIsConditionMet(condition, values);

  if (type === 'question') {
    return (
      <SQFormDropdown
        label={text}
        name={`${id}`}
        // For question steps, if the condition is not met we should disable the dropdown
        isDisabled={!isConditionMet}
        displayEmpty={true}
      >
        {options}
      </SQFormDropdown>
    );
  }

  // for scripting steps, if the condition is not met we do not want to render anything
  if (type === 'scripting' && isConditionMet) {
    return <ScriptedText text={text} key={`script_${id}`} sx={styles.script} />;
  }

  return null;
}
