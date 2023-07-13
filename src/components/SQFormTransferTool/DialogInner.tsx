import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Grid,
  Slide,
  useTheme,
} from '@mui/material';
import {Form} from 'formik';
import SQFormButton from '../buttons/SQFormButton';
import SQFormHelperText from '../SQFormHelperText/SQFormHelperText';
import {noop} from '../../utils';
import type {DialogProps, GridProps} from '@mui/material';
import type {Theme} from '@mui/material/styles';
import type {TransitionProps} from '@mui/material/transitions';

export type DialogInnerProps = {
  /** The content to be rendered in the dialog body */
  children: React.ReactNode;
  /** The current disabled state of the Dialog Save Button */
  isSaveButtonDisabled?: boolean;
  /** The current open/closed state of the Dialog */
  isOpen: boolean;
  /** Determine the max-width of the dialog. The dialog width grows with the size of the screen. Set to false to disable maxWidth. */
  maxWidth?: DialogProps['maxWidth'];
  /** The primary button text (Button located on right side of Dialog) */
  saveButtonText?: string;
  /** Whether or not the dialog form requires updates to the form to enable the submit button */
  shouldRequireFieldUpdates?: boolean;
  /** Title text at the top of the Dialog */
  title: string;
  /** Any prop from https://material-ui.com/api/grid */
  muiGridProps?: GridProps;
  /** text to pass to SQFormHelperText component */
  helperText?: string;
  /** helper text type to pass to SQFormHelperText component */
  helperTextType?: 'fail' | 'error' | 'valid';
};

/*
const Transition = React.forwardRef<HTMLDivElement>((props, ref) => {
  return <Slide direction="down" ref={ref} {...props}>{undefined}</Slide>;
});
*/
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {children: React.ReactElement<unknown, string>},
  ref: React.Ref<unknown>
) {
  const {children, ...rest} = props;
  return (
    <Slide direction="down" ref={ref} {...rest}>
      {children}
    </Slide>
  );
});

const stickyStyles = (theme: Theme) => ({
  position: 'sticky' as React.CSSProperties['position'],
  background: theme.palette.background.paper,
  Index: 1,
});

const actionStyles = (theme: Theme) => ({
  display: 'flex',
  justifyContent: 'space-between',
  flex: '1 1 100%',
  ...stickyStyles(theme),
  bottom: 0,
  borderTop: `1px solid #B3B3B3`,
  padding: '8px 16px',
  height: '47px',
});

const useClasses = (theme: Theme) => ({
  sticky: stickyStyles(theme),
  title: {
    ...stickyStyles(theme),
    top: 0,
    borderBottom: `1px solid #B3B3B3`,
    padding: '12px 16px',
    height: '49px',
  },
  action: actionStyles(theme),
  primaryAction: {
    ...actionStyles(theme),
    justifyContent: 'flex-end',
  },
  dialogContent: {
    overflowY: 'visible',
    padding: '16px 16px 32px 16px',
  },
});

function DialogInner({
  children,
  isSaveButtonDisabled = false,
  isOpen,
  maxWidth,
  saveButtonText = 'save and close',
  shouldRequireFieldUpdates = false,
  title,
  muiGridProps,
  helperText,
  helperTextType = 'error',
}: DialogInnerProps): React.ReactElement {
  const theme = useTheme();
  const classes = useClasses(theme);

  const renderHelperText = () => {
    switch (helperTextType) {
      case 'fail':
        return (
          <Grid item={true}>
            <SQFormHelperText isFailedState={true} failText={helperText} />
          </Grid>
        );
      case 'valid':
        return (
          <Grid item={true}>
            <SQFormHelperText isValidState={true} validText={helperText} />
          </Grid>
        );
      default:
        return (
          <Grid item={true}>
            <SQFormHelperText isValidState={false} errorText={helperText} />
          </Grid>
        );
    }
  };

  return (
    <Dialog
      maxWidth={maxWidth}
      open={isOpen}
      TransitionComponent={Transition}
      onClose={noop}
    >
      <Form>
        <DialogTitle sx={classes.title}>
          <Typography variant="h5">{title}</Typography>
        </DialogTitle>
        <DialogContent
          // DialongContent paddingTop is overwritten by some title styling. Applying directly
          // See: https://github.com/mui/material-ui/issues/27851#issuecomment-998996294
          // Known problem in MUI v5, as of @mui/material@5.9.2
          style={{
            paddingTop: '24px',
          }}
          sx={classes.dialogContent}
        >
          <Grid
            {...muiGridProps}
            container
            spacing={muiGridProps?.spacing ?? 2}
          >
            {children}
          </Grid>
        </DialogContent>
        <DialogActions sx={classes.primaryAction}>
          <>
            {helperText && renderHelperText()}
            <SQFormButton
              title={saveButtonText}
              isDisabled={isSaveButtonDisabled}
              shouldRequireFieldUpdates={shouldRequireFieldUpdates}
            >
              {saveButtonText}
            </SQFormButton>
          </>
        </DialogActions>
      </Form>
    </Dialog>
  );
}

export default DialogInner;
