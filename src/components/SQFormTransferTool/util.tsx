import type {Answer, FormValues, Step} from './types';

export function checkAnswer(answer: Answer, values: FormValues) {
  return values[answer.questionId] === answer.answerId;
}

export function getIsConditionMet(
  condition: Step['condition'],
  values: FormValues
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
