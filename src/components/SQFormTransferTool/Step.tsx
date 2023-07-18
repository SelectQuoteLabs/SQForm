import React from 'react';
import {ScriptedText} from 'scplus-shared-components';
import SQFormDropdown from '../../components/fields/SQFormDropdown';
import {useSQFormContext} from '../../../src';
import {getIsConditionMet} from './util';
import type {Step} from './types';

type Props = {
  step: Step;
};

const styles = {
  script: {
    paddingBottom: '16px',
  },
};

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
