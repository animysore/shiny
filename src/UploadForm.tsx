import * as React from 'react';
import { useState } from 'react';
import { Button, Input, Box, Typography, CircularProgress } from '@mui/material';
import { ShinyNFT } from './models/shinynft';
import { Token } from './models/Token';
import { useNEAR } from './near/WithNear';
import NFTCard from './components/NFTCard';
import { CONTRACT_NAME } from './near/config';
import MintFAQ from './components/MintFAQ';

function UploadForm() {
  const { accountId } = useNEAR();
  const [file, setFile] = useState<File | null>(null);
  const [imagePreviewURL, setimagePreviewURL] =  useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
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
      }).catch((err) => {
        alert('Error minting token: ' + err);
        setMintState('unminted');
      });
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
    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
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
            <CircularProgress style={{ marginLeft: 10, display: (mintState === 'minting') ? 'block': 'none' }}/>
          </Box>
        </form>
      ) : (token && (
        <>
          <Typography variant="h5" sx={{ my: 2 }}> Fresh! </Typography>
          <NFTCard
            title={token.metadata.title}
            description={token.metadata.description}
            media={token.metadata.media}
            tokenId={token.token_id}
            approved={(CONTRACT_NAME in token.approved_account_ids)}
          />
          <Box sx={{ my: 2 }}>
            <MintFAQ />
          </Box>
        </>)
      )}
    </Box>
  );
}

export default UploadForm;