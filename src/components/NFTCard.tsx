import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Badge, Card, CardContent, CardMedia, Chip } from '@mui/material';

export default function NFTCard(props: { title?: string, description?: string, media?: string, tokenId?: string }) {
  const { title, description, media, tokenId } = props;
  return (
    <Badge badgeContent={'#' + tokenId} color="primary">
      <Card sx={{ display: 'flex' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5" component="h2" gutterBottom>
              {title}
            </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            {description}
          </Typography>
          <Chip style={{ marginTop: 'auto' }} label={'Share'} />
        </CardContent>
        <CardMedia component="img" image={media} alt={title} style={{ width: 200, height: 200 }}/>
      </Card>
    </Badge>
  );
}
