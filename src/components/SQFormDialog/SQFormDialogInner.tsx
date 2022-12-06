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
import {Form, useFormikContext} from 'formik';
import {useDialog} from '@selectquotelabs/sqhooks';
import {RoundedButton, DialogAlert} from 'scplus-shared-components';
import SQFormButton from '../SQForm/SQFormButton';
import SQFormHelperText from '../SQForm/SQFormHelperText';
import type {DialogProps, GridProps, ButtonProps} from '@mui/material';
import type {Theme} from '@mui/material/styles';
import type {TransitionProps} from '@mui/material/transitions';
import type {FormikContextType, FormikValues} from 'formik';
import type {SQFormDialogTertiaryValue} from './types';

type SQFormDialogInnerProps<Values extends FormikValues> = {
  /** The secondary button text (Button located on left side of Dialog) */
  cancelButtonText?: string;
  /** The content to be rendered in the dialog body */
  children: React.ReactNode;
  /** If true, clicking the backdrop will not fire the onClose callback. */
  disableBackdropClick?: boolean;
  /** The current disabled state of the Dialog Save Button */
  isDisabled?: boolean;
  /** The current open/closed state of the Dialog */
  isOpen: boolean;
  /** Determine the max-width of the dialog. The dialog width grows with the size of the screen. Set to false to disable maxWidth. */
  maxWidth?: DialogProps['maxWidth'];
  /** Callback function invoked when the user clicks on the secondary button or outside the Dialog */
  onClose: (
    event: Record<string, unknown>,
    reason: 'backdropClick' | 'escapeKeyDown' | 'cancelClick'
  ) => void;
  /** Whether to show save/submit button (default: true) */
  shouldDisplaySaveButton: boolean;
  /** The primary button text (Button located on right side of Dialog) */
  saveButtonText?: string;
  /** Whether or not the dialog form requires updates to the form to enable the submit button */
  shouldRequireFieldUpdates?: boolean;
  /** Title text at the top of the Dialog */
  title: string;
  /**
   * determine the status of the tertiary button
   * can be one of'HIDE_BUTTON'|'NO_VALIDATION'|'IS_DISABLED'|'IS_ENABLED'|'FORM_VALIDATION_ONLY'|'IS_DISABLED_AND_FORM_VALIDATION',
   * this will determine if the button is rendered, as well as if the button is disabled and if it uses form validation.
   */
  tertiaryStatus: SQFormDialogTertiaryValue;
  /** Any prop from https://material-ui.com/api/grid */
  muiGridProps?: GridProps;
  /** Determine if the secondary action button should be displayed */
  showSecondaryButton?: boolean;
  /** The tertiary button text */
  tertiaryButtonText?: string;
  /** Callback function invoked when the user clicks the tertiary button */
  onTertiaryClick?: (formikContext: FormikContextType<Values>) => void;
  /** Variant to be used for the tertiary button. Defaults to 'outlined' */
  tertiaryButtonVariant?: ButtonProps['variant'];
  /** text to pass to SQFormHelperText component */
  helperText?: string;
  /** helper text type to pass to SQFormHelperText component */
  helperTextType?: 'fail' | 'error' | 'valid';
  /** option to throw an Are You Sure alert when hitting cancel while in the middle of filling out a the form.  true by default. */
  throwAlertOnCancel?: boolean;
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
    height: '48px',
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

function SQFormDialogInner<Values extends FormikValues>({
  cancelButtonText,
  children,
  disableBackdropClick,
  isDisabled = false,
  isOpen,
  maxWidth,
  onClose,
  saveButtonText,
  tertiaryButtonText,
  shouldRequireFieldUpdates = false,
  title,
  muiGridProps,
  shouldDisplaySaveButton = true,
  showSecondaryButton = true,
  tertiaryStatus = 'HIDE_BUTTON',
  onTertiaryClick,
  tertiaryButtonVariant,
  helperText,
  helperTextType = 'error',
  throwAlertOnCancel = true,
}: SQFormDialogInnerProps<Values>): React.ReactElement {
  const theme = useTheme();
  const classes = useClasses(theme);
  const formikContext = useFormikContext<Values>();

  function getIsDisabled() {
    switch (tertiaryStatus) {
      case 'IS_DISABLED':
        return true;
      case 'FORM_VALIDATION_ONLY':
        return !formikContext.isValid;
      default:
        return false;
    }
  }

  const {
    isDialogOpen: isDialogAlertOpen,
    openDialog: openDialogAlert,
    closeDialog: closeDialogAlert,
  } = useDialog();

  const handleCancel = (
    event: Record<string, unknown>,
    reason: 'backdropClick' | 'escapeKeyDown' | 'cancelClick'
  ) => {
    if (disableBackdropClick && reason === 'backdropClick') {
      return;
    }

    if (!formikContext.dirty || !throwAlertOnCancel) {
      onClose && onClose(event, reason);
    } else {
      openDialogAlert();
    }
  };

  const confirmCancel = () => {
    formikContext.resetForm();
    onClose && onClose({}, 'escapeKeyDown');
    closeDialogAlert();
  };

  const renderTertiaryButton = () => {
    return (
      <Grid
        container={true}
        justifyContent={showSecondaryButton ? 'space-between' : 'flex-end'}
      >
        {showSecondaryButton && (
          <Grid item={true}>
            <RoundedButton
              title={cancelButtonText}
              onClick={(event: Record<string, unknown>) =>
                handleCancel(event, 'cancelClick')
              }
              color="secondary"
              variant="outlined"
            >
              {cancelButtonText}
            </RoundedButton>
          </Grid>
        )}

        {helperText && renderHelperText()}
        <Grid item={true}>
          <span style={{paddingRight: '20px'}}>
            <RoundedButton
              title={tertiaryButtonText}
              isDisabled={getIsDisabled()}
              onClick={() => onTertiaryClick?.(formikContext)}
              type="button"
              variant={tertiaryButtonVariant}
            >
              {tertiaryButtonText}
            </RoundedButton>
          </span>
          {shouldDisplaySaveButton && (
            <SQFormButton
              title={saveButtonText}
              isDisabled={isDisabled}
              shouldRequireFieldUpdates={shouldRequireFieldUpdates}
            >
              {saveButtonText}
            </SQFormButton>
          )}
        </Grid>
      </Grid>
    );
  };

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
    <>
      <Dialog
        maxWidth={maxWidth}
        open={isOpen}
        TransitionComponent={Transition}
        onClose={
          showSecondaryButton || disableBackdropClick ? handleCancel : undefined
        }
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
              paddingTop: '20px',
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
          <DialogActions
            sx={showSecondaryButton ? classes.action : classes.primaryAction}
          >
            {tertiaryStatus !== 'HIDE_BUTTON'
              ? renderTertiaryButton()
              : showSecondaryButton && (
                  <RoundedButton
                    title={cancelButtonText}
                    onClick={(event: Record<string, unknown>) =>
                      handleCancel(event, 'cancelClick')
                    }
                    color="secondary"
                    variant="outlined"
                  >
                    {cancelButtonText}
                  </RoundedButton>
                )}
            {tertiaryStatus === 'HIDE_BUTTON' && shouldDisplaySaveButton && (
              <>
                {helperText && renderHelperText()}
                <SQFormButton
                  title={saveButtonText}
                  isDisabled={isDisabled}
                  shouldRequireFieldUpdates={shouldRequireFieldUpdates}
                >
                  {saveButtonText}
                </SQFormButton>
              </>
            )}
          </DialogActions>
        </Form>
      </Dialog>

      <DialogAlert
        isOpen={isDialogAlertOpen}
        primaryButtonText="Continue"
        secondaryButtonText="Go Back"
        onPrimaryButtonClick={confirmCancel}
        onSecondaryButtonClick={closeDialogAlert}
        title={`Cancel Changes`}
      >
        You currently have unsaved changes which will be lost if you continue.
      </DialogAlert>
    </>
  );
}

export default SQFormDialogInner;
