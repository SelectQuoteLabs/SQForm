import {maskArray} from 'react-text-mask';
type maskProp = maskArray | ((value: string) => maskArray);

export default maskProp;
