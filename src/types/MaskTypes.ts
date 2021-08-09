import {maskArray} from 'react-text-mask';

export type maskProp = maskArray | ((value: string) => maskArray);
