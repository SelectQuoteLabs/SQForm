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
import {Form} from 'formik';
import {RoundedButton} from 'scplus-shared-components';
import {useSQFormContext} from '../../index';
import SQFormButton from '../SQForm/SQFormButton';

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useActionsStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    flex: '1 1 100%',
    padding: '16px 24px'
  }
});

function SQFormDialogInner({
  cancelButtonText,
  children,
  disableBackdropClick,
  isDisabled,
  isOpen,
  maxWidth,
  onClose,
  onSave,
  saveButtonText,
  title,
  muiGridProps
}) {
  const actionsClasses = useActionsStyles();
  const {resetForm} = useSQFormContext();

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog
      disableBackdropClick={disableBackdropClick}
      maxWidth={maxWidth}
      open={isOpen}
      TransitionComponent={Transition}
      onClose={handleClose}
    >
      <Form>
        <DialogTitle disableTypography={true}>
          <Typography variant="h4">{title}</Typography>
        </DialogTitle>
        <DialogContent dividers={true}>
          <Grid {...muiGridProps} container spacing={muiGridProps.spacing || 2}>
            {children}
          </Grid>
        </DialogContent>
        <DialogActions classes={actionsClasses}>
          <RoundedButton
            title={cancelButtonText}
            onClick={handleClose}
            color="secondary"
            variant="outlined"
          >
            {cancelButtonText}
          </RoundedButton>
          {onSave && (
            <SQFormButton title={saveButtonText}>{saveButtonText}</SQFormButton>
          )}
        </DialogActions>
      </Form>
    </Dialog>
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
  /** Should the loading spinner be shown */
  isLoading: PropTypes.bool,
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
  /** Title text at the top of the Dialog */
  title: PropTypes.string.isRequired,
  /** Any prop from https://material-ui.com/api/grid */
  muiGridProps: PropTypes.object
};

export default SQFormDialogInner;
