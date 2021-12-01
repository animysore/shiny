import type { NextApiRequest, NextApiResponse } from 'next';
import { TransferClaim } from '../../../src/models/api';
import { NearSDK } from '../../../src/server/nearserver';
import redis from '../../../src/server/redis';

/**
 * Call contract to transfer NFT included in claim
 */
export default async function mint(req: NextApiRequest, res: NextApiResponse<TransferClaim.Response>) {
  console.log('mint', req.body);
  const { contract, rootAccountId } = await NearSDK();
  const { claim, receiver_id } = req.body as TransferClaim.Request;
  // Load the token corresponding to the claim
  const token_id = await redis.get(`claim:${claim}`);
  
  if (token_id === null) {
    res.status(404).json({ error: 'Claim not found' });
    return;
  }

  // Get latest information about token from contract
  const token = await contract.nft_token({ token_id });
  // Check that we have approval to transfer the token 
  if (rootAccountId in token.approved_account_ids) {
    try {
      const result = await contract.nft_transfer({
          args:{ token_id, receiver_id, approval_id: token.approved_account_ids[rootAccountId] },
          gas: 300000000000000,
          amount: '1'
      });
      redis.hdel(`claim:${claim}`);
      console.log('mint result:', result);
      res.status(200).json({ message: 'Success'});
      return;
    }
    catch (err) {
      console.error(err);
      res.status(400).json({ error: 'Could not process request' });
    }
  }
  res.status(403).json({ error: 'Not approved' })
}