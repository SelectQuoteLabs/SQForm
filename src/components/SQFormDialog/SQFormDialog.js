import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import RoundedButton from 'scplus-shared-components';
import SQFormButton from '../SQForm/SQFormButton';
import './SQFormDialog.css';

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />;
});

function SQFormDialog({
  cancelButtonText = 'Cancel',
  children,
  disableBackdropClick = false,
  isDisabled = false,
  isOpen,
  maxWidth = 'sm',
  onClose,
  onSave,
  saveButtonText = 'Save',
  title,
  enableReinitialize = false,
  initialValues,
  muiGridProps = {},
  validationSchema
}) {
  const validationYupSchema = React.useMemo(() => {
    if (!validationSchema) return;

    return Yup.object().shape(validationSchema);
  }, [validationSchema]);

  return (
    <Formik
      enableReinitialize={enableReinitialize}
      initialValues={initialValues}
      onSubmit={onSave}
      validationSchema={validationYupSchema}
      validateOnMount={true}
    >
      <Dialog
        disableBackdropClick={disableBackdropClick}
        maxWidth={maxWidth}
        open={isOpen}
        TransitionComponent={Transition}
        onClose={onClose}
      >
        <Form>
          <DialogTitle disableTypography={true}>
            <Typography variant="h4">{title}</Typography>
          </DialogTitle>
          <DialogContent dividers={true}>
            <Grid
              {...muiGridProps}
              container
              spacing={muiGridProps.spacing || 2}
            >
              {children}
            </Grid>
          </DialogContent>
          <DialogActions className="sqFormDialog__actions">
            <RoundedButton
              title={cancelButtonText}
              onClick={onClose}
              color="secondary"
              variant="outlined"
            >
              {cancelButtonText}
            </RoundedButton>
            {onSave && (
              <SQFormButton title={saveButtonText}>
                {saveButtonText}
              </SQFormButton>
            )}
          </DialogActions>
        </Form>
      </Dialog>
    </Formik>
  );
}

SQFormDialog.propTypes = {
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
  /** Title text at the top of the Dialog */
  title: PropTypes.string.isRequired,
  /** Form Entity Object */
  initialValues: PropTypes.object.isRequired,
  /** Any prop from https://material-ui.com/api/grid */
  muiGridProps: PropTypes.object,
  /**
   * Yup validation schema shape
   * https://jaredpalmer.com/formik/docs/guides/validation#validationschema
   * */
  validationSchema: PropTypes.object
};

export default SQFormDialog;
