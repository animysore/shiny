import * as React from 'react';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Button } from '@mui/material';
import { useNEAR } from '../../src/near/WithNear';

export default function Claim(props: { claim: string }) {
  const { accountId } = useNEAR();

  const claimToken = () => {
    axios.post(`/api/claim/transfer`, { claim: props.claim, receiver_id: accountId })
      .then(() => {
        console.log('Claimed');
      });
  }

  return (
    <>
      { accountId ? (
          <Button variant="outlined" onClick={claimToken}> Claim </Button>
        ) : (
          <Typography variant="body1">
            You must be logged in with a NEAR Wallet to claim this token.
            No wallet? you can create one for free! Click the Connect Wallet button on the top.
          </Typography>
      )}
    </>
  );
}
