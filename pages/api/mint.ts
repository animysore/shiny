// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { parseNearAmount } from 'near-api-js/lib/utils/format';
import type { NextApiRequest, NextApiResponse } from 'next'
import { NearSDK } from '../../src/server/nearserver'

type NFTMintRequest = {
  receiver_id: string,
  token_metadata: any
}

/**
 * Call contract to mint NFT
 */
export default async function mint(req: NextApiRequest, res: NextApiResponse<any>) {
  console.log('mint', req.body);
  const { contract } = await NearSDK();
  const { receiver_id, token_metadata } = req.body as NFTMintRequest;
  const result = await contract.nft_mint({
    args:{ receiver_id, token_metadata },
    gas: 300000000000000,
    amount: parseNearAmount('0.1') as string
  });
  console.log('mint result:', result);
  res.status(200).json(result)
}