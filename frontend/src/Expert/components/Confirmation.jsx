import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Confirmation({open , handleClose , handleClick}) {


  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are You Sure You Want To Logout?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
                Once you logged out you won't be able to come except login
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} >Cancel</Button>
          <Button onClick={handleClick} autoFocus variant="outlined" color="error">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}