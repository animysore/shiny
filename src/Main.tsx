import * as React from 'react';
import Typography from '@mui/material/Typography';
import UploadForm from './UploadForm';
import { useNEAR } from './near/WithNear';
import { Button } from '@mui/material';
import theme from './theme';

export default function Main() {
  const { accountId: isLoggedIn, login } = useNEAR();
  return (
    <div style={{ padding: 15, border: `1px solid ${theme.palette.primary.main}`, borderRadius: 5 }}>
      { isLoggedIn ? (
        <UploadForm />
      ) : (
        <>
          <Typography variant="h5" gutterBottom> Please login with NEAR Wallet to mint an NFT. </Typography>
          <Typography variant="body1" gutterBottom>
            The NFTs you mint will be stored in your wallet. You can then use Shiny to send it to an emails, or you can transfer them directly to other wallets.
            If you don’t have a NEAR wallet yet, you can create one for free.
            <br />
          </Typography>
          <Button variant="outlined" onClick={() => login()}> CONNECT NEAR WALLET </Button>
        </>
      )}
    </div>
  );
}
