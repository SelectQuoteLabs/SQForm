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

export type OnTransfer = (msg: string) => void; // TODO this type will be defined in SC3-1811

export type FormValues = Record<string, number | ''>;
