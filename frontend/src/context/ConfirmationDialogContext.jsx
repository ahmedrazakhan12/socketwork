import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { createContext, useContext, useState } from 'react';

const ConfirmationDialogContext = createContext();

export const useConfirmationDialog = () => useContext(ConfirmationDialogContext);

export const ConfirmationDialogProvider = ({ children }) => {
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [onConfirm, setOnConfirm] = useState(null);

  const showConfirmationDialog = (onConfirmCallback) => {
    setOnConfirm(() => onConfirmCallback);
    setConfirmationDialogOpen(true);
  };

  const closeConfirmationDialog = () => {
    setOnConfirm(null);
    setConfirmationDialogOpen(false);
  };

  const confirmAction = () => {
    if (onConfirm) {
      onConfirm();
      closeConfirmationDialog();
    }
  };

  return (
    <ConfirmationDialogContext.Provider value={showConfirmationDialog}>
      {children}

      {/* Global Confirmation Dialog */}
      <Dialog open={isConfirmationDialogOpen} onClose={closeConfirmationDialog}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          Are you sure you want to perform this action?
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmationDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmAction} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </ConfirmationDialogContext.Provider>
  );
};