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

const HOST = 'localhost:3000';

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
  const url = `https://${HOST}/claim/${claim_id}`;
  sgMail.send({
    to,
    from: 'mail@animysore.com', // Change to your verified sender
    subject: 'Look! A shiny NFT!',
    text: `Claim this NFT generated on Shiny at ${url}`,
    html: `Claim this NFT generated on Shiny at <strong> <a href="${url}"> ${url} </a> </strong>`,
  });
  res.status(200).json({ claim_id });
}