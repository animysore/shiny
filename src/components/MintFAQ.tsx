import * as React from 'react'
import { Box, Typography, Divider } from '@mui/material'

export default function MintFAQ() {
  return (
    <Box sx={{ '& > :not(style)': { my: 2, textAlign: 'justify'} }}>
      <Typography variant="h6"> What&apos;s so special about this NFT? </Typography>
      <Typography variant="body1"> You can view this NFT in your NEAR Wallet (check!), because it resides on the Blockchain. </Typography>
      <Typography variant="body1"> It truly BELONGS to you. You can transfer this NFT directly to another wallet - you don&apos;t need &quot;permission&quot; of this website even though you minted the NFT here. You can even approve someone else (i.e. another wallet) to transfer it on your behalf! </Typography>
      <Divider />
      <Typography variant="h6"> How do I share this NFT? </Typography>
      <Typography variant="body1"> Just transfer using the NEAR wallet! </Typography>
      <Typography variant="h6"> The receiver does not have a NEAR wallet </Typography>
      <Typography variant="body1"> You can approve Shiny as a trusted transferer. Shiny will create a claim code which you can share via email or other channels and the person who is claiming the NFT will be guided on making a wallet when using the link</Typography>
    </Box>
  )
}
