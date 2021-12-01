// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { parseNearAmount } from 'near-api-js/lib/utils/format';
import type { NextApiRequest, NextApiResponse } from 'next'
import { Mint } from '../../src/models/api';
import { NearSDK } from '../../src/server/nearserver'

/**
 * Call contract to mint NFT
 */
export default async function mint(req: NextApiRequest, res: NextApiResponse<Mint.Response>) {
  console.log('Mint request', req.body);
  const { contract } = await NearSDK();
  const { receiver_id, token_metadata } = req.body as Mint.Request;
  try {
    const result = await contract.nft_mint({
      args:{ receiver_id, token_metadata },
      gas: 300000000000000,
      amount: parseNearAmount('0.1') as string
    });
    console.log('Mint result:', result);
    res.status(200).json(result)
  }
  catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Could not mint token: ' + err});
  }
}