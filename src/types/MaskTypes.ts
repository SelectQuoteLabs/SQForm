import type {maskArray as MaskArray} from 'react-text-mask';
type Mask = MaskArray | ((value: string) => MaskArray);

export default Mask;
