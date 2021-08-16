import {GridSize} from '@material-ui/core';

/** String 'undefined' has to be added due to the way
 * Storybook handles `undefined` in dropdown options.
 * Weird, I know. Otherwise we get console errors.
 */
export type gridOptions =
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

const getSizeProp = (size: gridOptions): GridSize => {
  switch (size) {
    case undefined:
    case 'undefined':
    case 'auto':
      return 'auto';
    default:
      return Number(size) as Exclude<GridSize, 'auto'>;
  }
};

export default getSizeProp;
