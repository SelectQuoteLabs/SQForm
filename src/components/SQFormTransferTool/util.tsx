import type {
  Answer,
  FormValues,
  Step,
  FormContext,
  CallBackData,
} from './types';

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

/**
 * Transforms the form values into a more friendly format. Specifically the
 * same form that the step condition uses to define questions and answers
 * with the exception that the value can be null, representing an empty value
 */
export function transformForm(
  form: FormContext
): Pick<CallBackData, 'viewedProductIDs' | 'questionAnswers'> {
  const {questionValues, viewedProductIDs} = form;

  const questionAnswers = Object.entries(questionValues).map(([key, value]) => {
    return {
      questionId: Number(key),
      answerId: value === '' ? null : Number(value),
    };
  });

  return {questionAnswers, viewedProductIDs};
}
