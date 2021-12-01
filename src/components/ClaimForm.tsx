import * as React from 'react';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Alert, Button, CircularProgress } from '@mui/material';
import { useNEAR } from '../../src/near/WithNear';
import { TransferClaim } from '../../src/models/api';

export default function Claim(props: { claim: string }) {
  const { accountId } = useNEAR();
  const [claimState, setClaimState] = React.useState<'unclaimed'|'claiming'|'claimed'|'failed'>('unclaimed');
  const disableClaim = claimState === 'claiming' || claimState === 'claimed';
  const claimToken = () => {
    setClaimState('claiming');
    axios.post<TransferClaim.Request, TransferClaim.Success>(`/api/claim/transfer`, { claim: props.claim, receiver_id: accountId })
      .then(() => {
        setClaimState('claimed');
        console.log('Claimed');
      })
      .catch((err) => {
        setClaimState('failed');
        console.error(err);
      });
  }

  return accountId ? (
    <div style={{ display:'flex', alignItems: 'center' }}>
      <Button variant="outlined" onClick={claimToken} disabled={disableClaim} style={{ marginRight: 10 }}> Claim </Button>
      { claimState === 'claiming' && <CircularProgress /> }
      { claimState === 'claimed' && <Alert severity="success" action={<Button variant="text" color="inherit" size="small" href="/view">View</Button>}>
          Yay! This NFT now belongs to you.  
        </Alert>
      }
      {
        claimState === 'failed' && <Alert severity="error"> Failed to claim this token. </Alert>
      }
    </div>
  ) : (
    <Typography variant="body1">
      You must be logged in with a NEAR Wallet to claim this token.
      No wallet? you can create one for free! Click the Connect Wallet button on the top.
    </Typography>
  );
}
