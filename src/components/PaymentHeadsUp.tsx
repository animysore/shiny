import { Alert } from '@mui/material';
import * as React from 'react';

export default function PaymentHeadsUp() {
  return (
    <Alert severity="info">
      This action involves invoking a Contract method. You will need to approve the transfer of a small amount of NEAR. 
    </Alert>
  );
}    