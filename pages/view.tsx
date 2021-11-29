import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Copyright from '../src/Copyright';
import Gallery from '../src/Gallery';
import { WithNear } from '../src/near/WithNear';
import Header from '../src/components/Header';

export default function View() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>  
        <WithNear>
          <Header />
          <Typography variant="h2" component="h1" gutterBottom> Shiny </Typography>
          <Typography variant="h5" gutterBottom> Mint an NFT and send it over email! </Typography>
          <div style={{ marginTop: 50 }}>
            <Gallery />
          </div>
        </WithNear>
        <Copyright />
      </Box>
    </Container>
  );
}