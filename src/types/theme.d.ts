import type {CSSProperties} from '@mui/styles';

// Let the MUI theme type use these extra typography properties
// Can expand upon as needed
// Should hopefully be done in SSC eventually
declare module '@mui/material/styles/createTypography' {
  export interface Typography {
    helper: CSSProperties;
  }
}
