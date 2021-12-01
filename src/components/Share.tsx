import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import axios, { AxiosResponse as Ax } from 'axios';
import { useNEAR } from '../near/WithNear';
import { CONTRACT_NAME } from '../near/config';
import { parseNearAmount } from 'near-api-js/lib/utils/format';
import PaymentHeadsUp from './PaymentHeadsUp';
import { Avatar, Typography, Input, Alert } from '@mui/material';
import { GenerateClaim, ShareClaim } from '../models/api';

export interface ShareProps {
  keepMounted: boolean;
  open: boolean;
  tokenId: string;
  approved: boolean;
  onClose: () => void;
}

export default function Share(props: ShareProps) {
  const { onClose, open, tokenId, approved } = props;
  const { contract } = useNEAR();
  const [email, setEmail] = React.useState<string>('');
  const [claimId, setClaimId] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (approved) {
      axios.post<{}, Ax<GenerateClaim.Success>, GenerateClaim.Request>('/api/claim/generate', { token_id: tokenId })
        .then((res) => setClaimId(res.data.claim))
        .catch(console.error);
    }
  }, [open, tokenId, approved]);

  const handleApprove = () => {
    if (props.tokenId && contract) {
      setTimeout(() => contract.nft_approve({
        args: {
          token_id: tokenId,
          account_id: CONTRACT_NAME,
        },
        callbackUrl: `${window.origin}/view`,
        gas: 300000000000000,
        amount: parseNearAmount("0.0005") || "0" 
        }), 100);
    }
  }

  const handleShare = () => {
    axios.post<{}, Ax<ShareClaim.Success>, ShareClaim.Request>('/api/claim/share', { token_id: tokenId, email })
      .then(() => {
        alert('Successfully shared token claim with ' + email);
      })
      .catch((err) => {
        alert('Could not share token claim with ' + email); 
        console.error(err);
      });
  }

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
    >
      <DialogTitle>Share NFT</DialogTitle>
      <DialogContent dividers style={{ display: 'flex', alignItems: 'flex-start' }}>
        <Avatar style={{ padding: 5, margin: 5 }}> 1 </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: 1 }}>
          <Typography variant="subtitle2"> Grant Approval </Typography>
          { (props.approved) ? "Done" : (
              <>
                <Typography variant="body1"> To transfer this token on your behalf. </Typography>
                <PaymentHeadsUp />
              </>
          )}
        </Box>
      </DialogContent>
      <DialogContent dividers style={{ display: 'flex', alignItems: 'flex-start' }}>
        <Avatar style={{ padding: 5, margin: 5 }}> 2 </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: 1 }}>
          <Typography variant="subtitle2"> Share Claim link </Typography>
          { (props.approved) ? (
              <>
                <Typography variant="body1"> 
                  Copy and share this
                  <br />
                  <Alert severity="success"> {`${window.origin}/claim/${claimId}`} </Alert>
                  <br />
                  Or send the link over email
                </Typography>
                <Input placeholder="Email" type="email" fullWidth={true} onChange={(e) => setEmail(e.target.value)} />
              </>
          ) : "Approval required" }
        </Box>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        { (props.approved) ?
          <Button variant="outlined" onClick={handleShare}> SHARE </Button> :
          <Button variant="outlined" onClick={handleApprove}> APPROVE </Button> }
      </DialogActions>
    </Dialog>
  );
}
