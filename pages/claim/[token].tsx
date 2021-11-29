import * as React from 'react';
import { useEffect } from 'react';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from 'axios';
import { TokenMetadata } from '../../src/models/TokenMetadata';
import Header from '../../src/components/Header';
import NFTCard from '../../src/components/NFTCard';
import { WithNear } from '../../src/near/WithNear';
import ClaimForm from './ClaimForm';
import { CircularProgress } from '@mui/material';

export default function Claim() {
  const router = useRouter();
  const id = router.query.token;
  const [loading, setLoading] = React.useState(true);
  const [tokenId, setTokenId] = React.useState<string | null>(null);
  const [metadata, setTokenMetadata] = React.useState<TokenMetadata | null>(null);
  
  useEffect(() => {
    if (!id) return;
    axios.get<{ token_id:string, metadata: TokenMetadata }>(`/api/claim/view?id=${id}`)
      .then(claim => {
        console.log(claim.data);
        setLoading(false);
        setTokenId(claim.data.token_id);
        setTokenMetadata(claim.data.metadata);
      });
  }, [id])
  
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <WithNear>
          <Header />
          <Typography variant="h4" component="h1" gutterBottom> Claim this NFT! </Typography>
          { loading && <CircularProgress /> }
          { tokenId && metadata && typeof(id) === 'string' && (
            <>
              <NFTCard
                title={metadata?.title}
                description={metadata?.description}
                media={metadata?.media}
                tokenId={tokenId}
              />
              <ClaimForm claim={id}/>
            </>          
          )}
        </WithNear>
      </Box>
    </Container>
  );
}