import {useState, useCallback} from 'react';

/**
 * @description Custom hook to control dialog open state
 * @example const [isCreateCompanionDialogOpen, setIsCreateCompanionDialogOpen, {openDialog, closeDialog}] = useDialog(false);
 * @param {boolean} isOpen (initial dialog state)
 * @returns {array} [{boolean} isDialogOpen, {function} setIsDialogOpen({boolean}), {openDialog, closeDialog}]
 */

export function useDialog(isOpen = false) {
  const [isDialogOpen, setIsDialogOpen] = useState(isOpen);

  const openDialog = useCallback(() => {
    setIsDialogOpen(true);
  }, []);
  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  return [isDialogOpen, {openDialog, closeDialog}];
}
