import { client } from '../services/nftstorage';
import axios from 'axios';
import { readFileAndComputeHash } from '../services/imagehash';
import { TokenMetadata } from './TokenMetadata';
import { Token } from './Token';

export class ShinyNFT {
  id?: string;
  name: string;
  description: string;
  image: File;
  
  constructor(name:string, description: string, image: File) {
    this.name = name;
    this.description = description;
    this.image = image;
   }

  async uploadToIPFS() {
    const data = await client.store({ name: this.name, description: this.description, image: this.image });
    console.log('Uploaded to IPFS', data);
    return data;
  }

  async mint(receiver_id: string) {
    const res = await this.uploadToIPFS();
    const hash = await readFileAndComputeHash(this.image);

    const metadata: TokenMetadata = {
      title: this.name,
      description: this.description,
      media: 'https://cloudflare-ipfs.com/ipfs/' + res.data.image.toString().replace('ipfs://', ''),
      media_hash: hash,
      copies: 1,
      issued_at: new Date().toISOString()
    };
    console.log('metadata', metadata);
    const mintresult = await axios.post<Token, any>('/api/mint', {  token_id: this.id, receiver_id, token_metadata: metadata });
    this.id = mintresult.data.token_id;
    console.log('mint result', mintresult);
    return mintresult.data;
  }
}