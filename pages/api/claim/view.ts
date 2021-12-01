import { NextApiRequest, NextApiResponse } from 'next';
import { ViewClaim } from '../../../src/models/api';
import { TokenMetadata } from '../../../src/models/TokenMetadata';
import redis from '../../../src/server/redis';

export default async function view(
  req: NextApiRequest,
  res: NextApiResponse<ViewClaim.Response>
) {
  const id = req.query.id;
  console.log('Viewing claim: ', id);
  const token_id = await redis.get(`claim:${id}`);

  if (!token_id) {
    console.log('Claim not found');
    res.status(404).json({ error: 'Claim not found' });
    return;
  }

  const { metadata: strmetadata } = await redis.hgetall(`token:${token_id}`);
  const metadata: TokenMetadata = JSON.parse(strmetadata);
  console.log('View claim for ', metadata);
  res.json({ token_id, metadata });
}