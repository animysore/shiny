import * as React from 'react'
import { Box, Typography, Divider } from '@mui/material'
import MuiLink from '@mui/material/Link';

export default function FAQText() {
  return (
    <Box sx={{ '& > :not(style)': { my: 2, textAlign: 'justify'} }}>
      <Typography variant="h6" gutterBottom> What is Shiny? </Typography>
      <Typography variant="body1" gutterBottom> Shiny helps you welcome new folks into crypto by letting you create Non-Fungible tokens and sharing access-links over non-crypto mediums like email.  </Typography>
      <Typography variant="h6" gutterBottom> How does Shiny work? </Typography>
      <Typography variant="body1" gutterBottom> Shiny is a web UI powered by an NFT smart contract that lives on the {' '}
        <MuiLink href="https://near.org" target="_blank">
          NEAR blockchain.
        </MuiLink>
      </Typography>
      <Divider />
      <Typography variant="h6"> What&apos;s so special about this NFT? </Typography>
      <Typography variant="body1"> You can view this NFT in your NEAR Wallet (check!), because it resides on the Blockchain. </Typography>
      <Typography variant="body1"> It truly BELONGS to you. You can transfer this NFT directly to another wallet - you don&apos;t need &quot;permission&quot; of this website even though you minted the NFT here. You can even approve someone else (i.e. another wallet) to transfer it on your behalf! </Typography>
      <Divider />
      <Typography variant="h6"> How do I share this NFT? </Typography>
      <Typography variant="body1"> Just transfer using the NEAR wallet! </Typography>
      <Typography variant="h6"> The receiver does not have a NEAR wallet </Typography>
      <Typography variant="body1"> You can approve Shiny as a trusted transferer. Shiny will create a claim code which you can share via email or other channels and the person who is claiming the NFT will be guided on making a wallet when using the link</Typography>
      <Divider />
      <Typography variant="h6"> How is this built? </Typography>
      <Typography variant="body1">
        With Rust and Typescript over two weekends. For more details, take a look at the {' '}
        <MuiLink href="https://github.com/animysore/shiny" target="_blank">
          Github repository
        </MuiLink>
      </Typography>

    </Box>
  )
}
