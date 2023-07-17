export type Answer = {
  questionId: number;
  answerId: number;
};

export type StepCondition = {
  logicalOperator: 'or' | 'and' | null;
  answers: Answer[];
} | null;

export type Option = {value: number; label: string};

export type BaseStep = {
  id: number;
  condition: StepCondition | null;
};

export type TransferStep = BaseStep & {
  type: 'transfer';
  text: null;
  options: null;
};

export type QuestionStep = BaseStep & {
  type: 'question';
  text: string;
  options: Option[];
};

export type ScriptingStep = BaseStep & {
  type: 'scripting';
  text: string;
  options: null;
};

export type Step = TransferStep | QuestionStep | ScriptingStep;

export type TransferProduct = {
  productID: number;
  productTag: string;
  productDisplayName: string;
  modalLinkText: string;
  transferLine: string;
  enabled: boolean;
  steps: Step[];
};

export type CallBackData = {
  /** the id of the transferproduct for which the transfer button was clicked */
  productID: TransferProduct['productID'];
  /** number provided for transfer */
  transferLine: string | null;
  /** An array of form values, in the same form that the step's conditions are supplied with
   * While the questions Ids should be globally unique, but do include questions from all
   * produducts.
   */
  questionAnswers: Array<{questionId: number; answerId: number | null}>;
  // TODO We will also include a log of opened panels
};

export type OnTransfer = (callBackData: CallBackData) => void;

export type FormValues = Record<string, number | ''>;