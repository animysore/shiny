// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { contract } from './nearserver'

type Data = {
  name: string
}

type NFTMintRequest = {
  token_id: string,
  receiver_id: string,
  token_metadata: any
}

type NFTTransferRequest = {
  token_id: string,
  receiver_id: string,
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}

/**
 * Call contract to mint NFT
 */
export async function mint(req: NextApiRequest, res: NextApiResponse<any>) {
  const { token_id, receiver_id, token_metadata } = req.body;
  const result = await contract.nft_mint({ token_id, receiver_id, token_metadata }, 300000000000000, 1);
  res.status(200).json(result)
}

/**
 * Transfer NFT to another account
 */
export async function transfer(req: NextApiRequest, res: NextApiResponse<any>) {
  const { token_id, receiver_id } = req.body;
  const result = await contract.nft_transfer({ token_id, receiver_id }, 300000000000000, 1);
  res.status(200).json(result)
}