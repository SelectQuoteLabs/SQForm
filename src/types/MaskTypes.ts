import type {maskArray} from 'react-text-mask';
type Mask = maskArray | ((value: string) => maskArray);

export default Mask;
