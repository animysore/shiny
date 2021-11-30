import { NextApiRequest, NextApiResponse } from 'next';
import { TokenMetadata } from '../../../src/models/TokenMetadata';
import redis from '../../../src/server/redis';

export default async function view(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const id = req.query.id;
  const token_id = await redis.get(`claim:${id}`);
  const { metadata: strmetadata } = await redis.hgetall(`token:${token_id}`);
  const metadata: TokenMetadata = JSON.parse(strmetadata);
  console.log('View claim for ', metadata)
  res.json({ token_id, metadata });
}