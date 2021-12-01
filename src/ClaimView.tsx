import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { captureException } from '@sentry/nextjs';
import { Alert, Box, CircularProgress } from '@mui/material';
import { TokenMetadata } from './models/TokenMetadata';
import NFTCard from './components/NFTCard';
import ClaimForm from './components/ClaimForm';
import { ViewClaim } from './models/api';
import { useNEAR } from './near/WithNear';

export default function ClaimView({ claimId }: { claimId: string }) {
  const { accountId } = useNEAR();
  const [loading, setLoading] = useState(true);
  const [tokenId, setTokenId] = useState<string | null>(null);
  const [metadata, setTokenMetadata] = useState<TokenMetadata | null>(null);
  const [owner, setOwner] = useState<string | null>(null);
  const isOwner = accountId && owner && owner === accountId;

  useEffect(() => {
    if (!claimId) return;
    axios.get<ViewClaim.Success>(`/api/claim/view?id=${claimId}`)
      .then(({ data }) => {
        console.log(data);
        setTokenId(data.token_id);
        setOwner(data.owner_id);
        setTokenMetadata(data.metadata);
      })
      .catch(captureException)
      .finally(() => setLoading(false));
  }, [claimId])
  
  return loading ? <CircularProgress /> : (
      (tokenId && metadata) ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', '& > :not(style)': { my: 3 } }}>
          <div>
            <NFTCard
              title={metadata?.title}
              description={metadata?.description}
              media={metadata?.media}
              tokenId={tokenId}
              approved={false}
              share={false}
            />
          </div>
          {
            isOwner ?
              <Alert severity="info"> You cannot claim your own NFT! </Alert> :
              <ClaimForm claim={claimId}/>
          }
        </Box>          
      ) : <Alert severity="warning"> Invalid claim" </Alert>
  );
}