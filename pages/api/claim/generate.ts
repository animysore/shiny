import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { GenerateClaim } from '../../../src/models/api';
import { NearSDK } from '../../../src/server/nearserver'
import redis from '../../../src/server/redis';

/**
 * Share NFT to an email address
 */


export default async function share(req: NextApiRequest, res: NextApiResponse<GenerateClaim.Response>) {
  console.log('share:', req.body);
  const { contract, rootAccountId } = await NearSDK();
  const { token_id } = req.body as GenerateClaim.Request;
  const exists = await redis.hexists(`token:${token_id}`, 'claim');

  if (exists) {
    // If claim already exists, just fetch it
    const { claim } = await redis.hgetall(`token:${token_id}`);
    res.status(200).json({ claim });
  } else {
    // Otherwise make new claim
    const token = await contract.nft_token({ token_id });
  
    if (!(rootAccountId in token.approved_account_ids)) {
      res.status(404).json({ error: 'Account not an approver for this token' });
      return
    }  
    
    const claim_id = uuidv4();
    await redis.hset(
      `token:${token_id}`,
      'claim', claim_id,
      'owner_id', token.owner_id,
      'metadata', JSON.stringify(token.metadata),
    );
    await redis.set(`claim:${claim_id}`, token_id);
    console.log(`Added claim ${claim_id} for token ${token_id} - ${token.metadata.title}`);
    res.status(200).json({ claim: claim_id });
  }
}