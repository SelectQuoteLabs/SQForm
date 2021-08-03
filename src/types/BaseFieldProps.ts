import {GridSize} from '@material-ui/core';

interface BaseFieldProps {
  /** Name identifier of the input field */
  name: string;
  /** Label text */
  label: string;
  /** Size of the input given full-width is 12. */
  size?: GridSize;
}

export default BaseFieldProps;
