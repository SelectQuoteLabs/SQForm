import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Grid,
  Slide,
  makeStyles
} from '@material-ui/core';
import {useTheme} from '@material-ui/core/styles';
import {Form, useFormikContext} from 'formik';
import {RoundedButton, DialogAlert, useDialog} from 'scplus-shared-components';
import SQFormButton from '../SQForm/SQFormButton';

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />;
});

const stickyStyles = {
  position: 'sticky',
  background: ({palette}) => palette.background.paper,
  zIndex: 1
};

const useTitleStyles = makeStyles({
  root: {
    ...stickyStyles,
    top: 0,
    borderBottom: ({palette}) => `1px solid ${palette.divider}`
  }
});
const useActionsStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    flex: '1 1 100%',
    padding: '16px 24px',
    ...stickyStyles,
    bottom: 0,
    borderTop: ({palette}) => `1px solid ${palette.divider}`
  }
});

function SQFormDialogInner({
  cancelButtonText,
  children,
  disableBackdropClick,
  isDisabled = false,
  isOpen,
  maxWidth,
  onClose,
  onSave,
  saveButtonText,
  shouldRequireFieldUpdates = false,
  title,
  muiGridProps
}) {
  const theme = useTheme();
  const titleClasses = useTitleStyles(theme);
  const actionsClasses = useActionsStyles(theme);
  const {resetForm, dirty: isDirty} = useFormikContext();

  const [
    isDialogAlertOpen,
    {openDialog: openDialogAlert, closeDialog: closeDialogAlert}
  ] = useDialog();

  const handleCancel = () => {
    if (!isDirty) {
      onClose();
    } else {
      openDialogAlert();
    }
  };

  const confirmCancel = () => {
    resetForm();
    onClose();
    closeDialogAlert();
  };

  return (
    <>
      <Dialog
        disableBackdropClick={disableBackdropClick}
        maxWidth={maxWidth}
        open={isOpen}
        TransitionComponent={Transition}
        onClose={handleCancel}
      >
        <Form>
          <DialogTitle disableTypography={true} classes={titleClasses}>
            <Typography variant="h4">{title}</Typography>
          </DialogTitle>
          <DialogContent style={{overflowY: 'visible'}}>
            <Grid
              {...muiGridProps}
              container
              spacing={muiGridProps.spacing ?? 2}
            >
              {children}
            </Grid>
          </DialogContent>
          <DialogActions classes={actionsClasses}>
            <RoundedButton
              title={cancelButtonText}
              onClick={handleCancel}
              color="secondary"
              variant="outlined"
            >
              {cancelButtonText}
            </RoundedButton>
            {onSave && (
              <SQFormButton
                title={saveButtonText}
                isDisabled={isDisabled}
                shouldRequireFieldUpdates={shouldRequireFieldUpdates}
              >
                {saveButtonText}
              </SQFormButton>
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

SQFormDialogInner.propTypes = {
  /** The secondary button text (Button located on left side of Dialog) */
  cancelButtonText: PropTypes.string,
  /** The content to be rendered in the dialog body */
  children: PropTypes.node.isRequired,
  /** If true, clicking the backdrop will not fire the onClose callback. */
  disableBackdropClick: PropTypes.bool,
  /** The current disabled state of the Dialog Save Button */
  isDisabled: PropTypes.bool,
  /** The current open/closed state of the Dialog */
  isOpen: PropTypes.bool.isRequired,
  /** Determine the max-width of the dialog. The dialog width grows with the size of the screen. Set to false to disable maxWidth. */
  maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', false]),
  /** Callback function invoked when the user clicks on the secondary button or outside the Dialog */
  onClose: PropTypes.func.isRequired,
  /** Callback function invoke when the user clicks the primary button */
  onSave: PropTypes.func,
  /** The primary button text (Button located on right side of Dialog) */
  saveButtonText: PropTypes.string,
  /** Whether or not the dialog form requires updates to the form to enable the submit button */
  shouldRequireFieldUpdates: PropTypes.bool,
  /** Title text at the top of the Dialog */
  title: PropTypes.string.isRequired,
  /** Any prop from https://material-ui.com/api/grid */
  muiGridProps: PropTypes.object
};

export default SQFormDialogInner;
