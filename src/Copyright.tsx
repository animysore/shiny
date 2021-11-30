import * as React from 'react';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';

export default function Copyright() {
  return (
    <Typography variant="body2" align="center" sx={{ my: 2 }}>
      An {' '}
      <MuiLink color="#000" href="https://github.com/animysore/shiny" target="_blank" style={{ textDecoration: 'none' }}> 🧪 </MuiLink>
      {' '} by {' '}
      <MuiLink color="#000" href="https://twitter.com/ani_mysore" target="_blank" style={{ textDecoration: 'none' }}>
        Aniruddha Mysore
      </MuiLink>
    </Typography>
  );
}
