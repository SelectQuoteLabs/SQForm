import type {GridSize} from '@mui/material';
import type {GridSizeOptions} from '../types/storyHelperTypes';

const getSizeProp = (size: GridSizeOptions): GridSize => {
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
