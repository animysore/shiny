import { NextApiRequest, NextApiResponse } from 'next';
import { TokenMetadata } from '../../../src/models/TokenMetadata';
import redis from '../../../src/server/redis';

export default async function view(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const id = req.query.id;
  const {metadata: strmetadata, token} = await redis.hgetall(`claim:${id}`);
  const metadata: TokenMetadata = JSON.parse(strmetadata);
  res.json({ token_id: token, metadata });
}