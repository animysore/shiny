import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Button, Input, Box, Typography, CircularProgress } from '@mui/material';
import { ShinyNFT } from './models/shinynft';
import { Token } from './models/Token';
import { useNEAR } from './near/WithNear';
import NFTCard from './components/NFTCard';
import { CONTRACT_NAME } from './near/config';
import { parseNearAmount } from 'near-api-js/lib/utils/format';

function UploadForm() {
  const { accountId, contract } = useNEAR();
  const [file, setFile] = useState<File | null>(null);
  const [imagePreviewURL, setimagePreviewURL] =  useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mintState, setMintState] = useState<'unminted'|'minting'|'minted'>('unminted');
  const [token, setToken] = useState<Token | null>(null);
  const imageCSS = imagePreviewURL ? { background: `url(${imagePreviewURL})` } : {};
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file && accountId) {
      console.log(file);
      setMintState('minting');
      const nft = new ShinyNFT(name, description, file);
      nft.mint(accountId).then((token) => {
        setMintState('minted');
        setToken(token);
        console.log(token);
      });
    }
  }
  const handleShare = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (token && contract) {
      axios.post('/api/share', { token_id: token.token_id, email }).then(console.log);
      setTimeout(() => contract.nft_approve({
        args: {
          token_id: token.token_id,
          account_id: CONTRACT_NAME,
        },
        callbackUrl: `${window.origin}/view`,
        gas: 300000000000000,
        amount: parseNearAmount("0.0005") || "0" 
        }), 100);
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    if (file) {
      reader.onloadend = () => {
        setFile(file);
        setimagePreviewURL(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <Box style={{ display: 'flex', flexDirection: 'column' }}>
      { mintState !== 'minted'  ? (
        <form onSubmit={onFormSubmit}>
          <Box sx={{
            display: 'flex',
            '& > :not(style)': { m: 1 },
          }}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'wrap',
              '& > :not(style)': { m: 1 },
            }}>
              <Input placeholder="Name" onChange={(e) => setName(e.target.value)} />
              <Input placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column',
              flexWrap: 'wrap',
              '& > :not(style)': { m: 1 },
            }}>
              <Box sx={{
                m: 1, width: 200, height: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#eee',
                borderRadius: 1,
                ...imageCSS,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}>
                { !imagePreviewURL && (
                  <Typography variant="body1">
                    Upload an Image
                  </Typography>
                )}
              </Box>
              <input
                style={{ display: "none" }}
                id="nft-image-upload"
                type="file"
                onChange={onChange}
              />
              <label htmlFor="nft-image-upload">
                <Button variant="outlined" color="primary" component="span">
                  Choose Image
                </Button>
              </label>
            </Box>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Button type="submit" variant="outlined" disabled={mintState !== 'unminted'}> Mint </Button>
              <CircularProgress style={{ display: (mintState === 'minting') ? 'block': 'none' }}/>
          </Box>
        </form>
      ) : (
        <>
          <NFTCard
            title={token?.metadata.title}
            description={token?.metadata.description}
            media={token?.metadata.media}
            tokenId={token?.token_id}
          />
          <Box sx={{ my: 7 }}>
            <Typography variant="h5"> Share this NFT </Typography>
            <form onSubmit={handleShare} style={{ display: 'flex' }}>
              <Input placeholder="Email" type="email" fullWidth={true} onChange={(e) => setEmail(e.target.value)} />
              <Button type="submit" style={{ marginLeft: 5 }} variant="outlined" color="primary">
                Share
              </Button>
            </form>
          </Box>
        </>
      )}
    </Box>
  );
}

export default UploadForm;