import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Copyright from '../Copyright';
import { WithNear } from '../near/WithNear';
import Header from '../components/Header';
import theme from '../theme';
import { Badge, Typography } from '@mui/material';

export default function Layout(props: { title: string, subtitle: string, children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ width: '100%', height: '10px', backgroundColor: theme.palette.primary.main }} />
      <Container maxWidth="md">
        <Box sx={{ py: 4 }}>  
          <WithNear>
            <Header />
            <Badge badgeContent="BETA" color="primary">
              <Typography variant="h2" component="h1" gutterBottom> {props.title} </Typography>
            </Badge>
            <Typography variant="h5" gutterBottom> {props.subtitle} </Typography>

            { props.children }
          </WithNear>
        </Box>
        <Box sx={{ mt: 'auto' }}>
          <Copyright />
        </Box>
      </Container>
    </div>
  )
}

Layout.defaultProps = {
  title: 'Shiny',
  subtitle: 'Mint an NFT and send it over email!'
}