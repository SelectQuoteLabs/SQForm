export type StepCondition = {
  logicalOperator: 'or' | 'and' | null;
  answers: {questionId: number; answerId: number}[];
} | null;

export type Option = {value: number; label: string};

export type Step = {
  type: 'question' | 'script';
  id: number;
  questionText: string;
  options: Array<Option>;
  condition: StepCondition;
};

export type TransferProduct = {
  productID: number;
  productTag: string;
  productDisplayName: string;
  modalLinkText: string;
  transferLine: string;
  enabled: boolean;
  steps: Array<Step>;
};

export type OnTransfer = (msg: string) => void; // TODO this type will be defined in SC3-1811
