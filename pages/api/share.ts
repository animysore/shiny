// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { NearSDK } from '../../src/server/nearserver'
import redis from '../../src/server/redis';
import sgMail from '../../src/server/sendgrid';

type NFTShareRequest = {
  token_id: string;
  email: string;
}

/**
 * Share NFT to an email address
 */


export default async function share(req: NextApiRequest, res: NextApiResponse<any>) {
  console.log('share:', req.body);
  const { contract } = await NearSDK();
  const { token_id, email: to } = req.body as NFTShareRequest;
  const token = await contract.nft_token({ token_id });
  const claim_id = uuidv4();
  await redis.hset(
    `claim:${claim_id}`,
    'token', token_id,
    'metadata', JSON.stringify(token.metadata),
  );
  console.log(`Added claim ${claim_id} for token ${token_id} - ${token.metadata.title}`);
  const url = `${req.headers.origin}/claim/${claim_id}`;
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
  res.status(200).json({ claim_id });
}