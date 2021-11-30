import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Badge, Button, Card, CardContent, CardMedia, Tooltip } from '@mui/material';
import Share from './Share';

export default function NFTCard(props: { title: string, description: string, media: string, tokenId: string, approved: boolean, share?: boolean }) {
  const { title, description, media, tokenId, approved, share } = props;
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Badge badgeContent={
          <Tooltip title="The unique ID of this NFT" placement="right">
            <span>{'#' + tokenId}</span>
          </Tooltip>
        } color="primary">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h5" component="h2" gutterBottom>
                {title}
              </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              {description}
            </Typography>
            <div style={{ marginTop: 'auto' }}>
            { share && <Button onClick={()=> setOpen(true)}> Share </Button> }
            </div>
          </CardContent>
          <CardMedia component="img" image={media} alt={title} style={{ width: 200, height: 200 }}/>
        </Card>
      </Badge>
      { share && <Share
        keepMounted
        open={open}
        onClose={handleClose}
        tokenId={tokenId}
        approved={approved}
      />
      }
    </>
  );
}

NFTCard.defaultProps = {
  share: true
}