import { NFTStorage } from 'nft.storage';

const token = process.env.NEXT_PUBLIC_NFT_STORAGE_KEY || '';
export const client = new NFTStorage({ token });
