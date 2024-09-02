import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

export default function AlertDialog({openAlert,handleCloseAlert}) {
 

  return (
    <React.Fragment>
   
      <Dialog
        open={openAlert}
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" >
          <h2 className='text-center' > {"Site is Under Development!!"} </h2>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{color:'#000'}}>
          We are working on something awesome! Please check back later.

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleCloseAlert}>Disagree</Button> */}
          <Button onClick={handleCloseAlert} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
