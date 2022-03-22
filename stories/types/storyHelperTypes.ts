import type {SQFormStoryWrapperProps} from '../components/SQFormStoryWrapper';
import type {Story} from '@storybook/react';

/** String 'undefined' has to be added due to the way
 * Storybook handles `undefined` in dropdown options.
 * Weird, I know. Otherwise we get console errors.
 */
export type GridSizeOptions =
  | 'auto'
  | 'undefined'
  | undefined
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12';

type FormProps = {
  initialValues?: SQFormStoryWrapperProps['initialValues'];
} & Omit<SQFormStoryWrapperProps, 'initialValues' | 'children'>;

export type CustomStory<TComponentProps> = Story<
  Omit<TComponentProps, 'size'> & {
    size?: GridSizeOptions;
    sqFormProps?: FormProps;
    schema: SQFormStoryWrapperProps['validationSchema'];
  }
>;
