export type SQFormOptionValue = string | number;

interface SQFormOption {
  /** Label of the option */
  label: string;
  /** Value of the option */
  value: SQFormOptionValue;
  /** Whether the option is disabled */
  isDisabled?: boolean;
}

export default SQFormOption;
