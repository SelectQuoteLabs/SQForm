import type {FormikHelpers, FormikValues} from 'formik';

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
  type: 'script';
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

type OnSaveCallBackData = {
  /** An array of form values, in the same form that the step's conditions are supplied with
   * While the questions Ids should be globally unique, but do include questions from all
   * produducts.
   */
  questionAnswers: Array<{questionId: number; answerId: number | null}>;
  /** Opened product panel ids, all products are initially not expanded */
  viewedProductIDs: Array<TransferProduct['productID']>;
};

type TransferCallBackData = OnSaveCallBackData & {
  /** the id of the transferproduct for which the transfer button was clicked */
  productID: TransferProduct['productID'];
  /** number provided for transfer */
  transferLine: string | null;
};

export type CallBackData = OnSaveCallBackData | TransferCallBackData;

export type OnTransfer = (
  callBackData: TransferCallBackData,
  formikHelpers: FormikHelpers<FormContext>
) => void;
export type OnSave = (
  callBackData: OnSaveCallBackData,
  formikHelpers: FormikHelpers<FormContext>
) => void;

export type FormValues = Record<string, number | ''>;
export type FormContext = FormikValues & {
  viewedProductIDs: number[];
  questionValues: FormValues;
};
