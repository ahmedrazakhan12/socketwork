import Button from '@mui/joy/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import React from 'react';
import { Link } from 'react-router-dom';

export function InsufficientFundsDialog({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Insufficient Funds</DialogTitle>
      <DialogContent>
        {/* <div className="infi-funds mb-5"> */}
        <p>Your wallet does not have enough funds to make the booking.</p>
        {/* </div> */}

       <Link to={'/add-wallet'}> <Button size="md" variant={`soft`} className='w-50' color="warning">
        Replenish
        </Button></Link>

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
