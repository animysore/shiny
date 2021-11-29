import * as React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { TokenMetadata } from '../../src/models/TokenMetadata';
import NFTCard from '../../src/components/NFTCard';
import ClaimForm from './ClaimForm';
import { CircularProgress } from '@mui/material';
import Layout from '../../src/components/Layout';

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
    <Layout title="Shiny Claims" subtitle="Claim this NFT">
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
    </Layout>
  );
}