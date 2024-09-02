// GlobalDialog.js
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { forwardRef, useImperativeHandle, useState } from 'react';

const GlobalDialog = forwardRef((props, ref,actions) => {
  const [open, setOpen] = useState(false);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  useImperativeHandle(ref, () => ({
    openDialog,
    closeDialog,
  }));

  return (
    <Dialog open={open} onClose={closeDialog} fullWidth={props.size} maxWidth={props.size}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>{props.children}</DialogContent>

      {props.actions && (
        <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button onClick={closeDialog} color="primary">
          Confirm
        </Button>
      </DialogActions>
      )}
      
    </Dialog>
  );
});

export default GlobalDialog;
