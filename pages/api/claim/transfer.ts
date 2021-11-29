import { parseNearAmount } from 'near-api-js/lib/utils/format';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NearSDK } from '../../../src/server/nearserver';
import redis from '../../../src/server/redis';

type NFTTransferRequest = {
  claim: string;
  receiver_id: string;
};

/**
 * Call contract to transfer NFT included in claim
 */
export default async function mint(req: NextApiRequest, res: NextApiResponse<any>) {
  console.log('mint', req.body);
  const { contract, rootAccountId } = await NearSDK();
  const { claim, receiver_id } = req.body as NFTTransferRequest;
  // Load the token corresponding to the claim
  const { token: token_id } = await redis.hgetall(`claim:${claim}`);
  // Get latest information about token from contract
  const token = await contract.nft_token({ token_id });
  // Check that we have approval to transfer the token 
  if (rootAccountId in token.approved_account_ids) {
    const result = await contract.nft_transfer({
        args:{ token_id, receiver_id, approval_id: token.approved_account_ids[rootAccountId] },
        gas: 300000000000000,
        amount: '1'
    });
    redis.hdel(`claim:${claim}`);
    console.log('mint result:', result);
    res.status(200).json(result)
    return;
  }
  res.status(403).json({ error: 'Not approved' })
}