import * as React from 'react';
import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { useNEAR } from './near/WithNear';
import { Grid } from '@mui/material';
import { Token } from './models/Token';
import NFTCard from './components/NFTCard';

export default function Gallery() {
  const { accountId, contract } = useNEAR();
  const [nfts, setNfts] = React.useState<Token[]>([]);
  useEffect(() => {
    console.log('Fetching NFTs...');
    if (contract && accountId) {
      contract.nft_tokens_for_owner({ account_id: accountId })
        .then(tokens => setNfts(tokens));
    }    
  }, [contract, accountId]);
  return (
    <>
      { accountId && (
        <>
          <Typography variant="h5" gutterBottom> Gallery </Typography>
          <Grid container spacing={2}>
            {nfts.map(nft => (
              <Grid item key={nft.token_id}>
                <NFTCard
                  title={nft.metadata.title}
                  description={nft.metadata.description}
                  media={nft.metadata.media}
                  tokenId={nft.token_id}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
}
