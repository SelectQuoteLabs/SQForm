import '@mui/material/styles';

// TODO: Remove if upgrade to React 18
// See: https://github.com/mui/material-ui/issues/35287#issuecomment-1337250566
declare global {
  namespace React {
    interface DOMAttributes<T> {
      onResize?: ReactEventHandler<T> | undefined;
      onResizeCapture?: ReactEventHandler<T> | undefined;
      nonce?: string | undefined;
    }
  }
}
