// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import { ShareClaim } from '../../../src/models/api';
import { NearSDK } from '../../../src/server/nearserver'
import redis from '../../../src/server/redis';
import sgMail from '../../../src/server/sendgrid';

/**
 * Share NFT to an email address
 */
async function share(req: NextApiRequest, res: NextApiResponse<ShareClaim.Response>) {
  console.log('share:', req.body);
  const { contract, rootAccountId } = await NearSDK();
  const { token_id, email: to } = req.body as ShareClaim.Request;
  const token = await contract.nft_token({ token_id });
  
  if (!(rootAccountId in token.approved_account_ids)) {
    res.status(404).json({ error: 'Account not an approver for this token' });
    return;
  }
  
  const { claim } = await redis.hgetall(`token:${token_id}`);
  const url = `${req.headers.origin}/claim/${claim}`;

  sgMail.send({
    to,
    from: 'mail@animysore.com', // Change to your verified sender
    templateId: 'd-c53a18c82d1646af914361dd3c0709ce',
    dynamicTemplateData: {
      name: token.metadata.title,
      description: token.metadata.description,
      imageURL: token.metadata.media,
      wallet: token.owner_id,
      link: url
    },
  });
  res.status(200).json({ claim });
}

export default withSentry(share);