import * as nearAPI from 'near-api-js';
import { ConnectConfig, Contract, KeyPair, Near } from 'near-api-js';
import { InMemoryKeyStore } from 'near-api-js/lib/key_stores';
import { Contract as ContractWithMethods } from '../models/Contract';
import getConfig from '../near/config';

const nearConfig = getConfig(process.env.NODE_ENV || 'development')

const keyStore = new InMemoryKeyStore();

let near: Near|null = null;
let rootAccountId: string = process.env.CONTRACT_NAME || '';
let contract: ContractWithMethods;


async function NearSDK() : Promise<{ near: Near, rootAccountId: string, contract: ContractWithMethods }> {
  if (near) {
    return { near, rootAccountId, contract };
  }
  
  await keyStore.setKey(nearConfig.networkId, process.env.CONTRACT_NAME || '', KeyPair.fromString(process.env.PRIVATE_KEY || ''));

  const config: ConnectConfig = {
    nodeUrl: nearConfig.nodeUrl,
    networkId: nearConfig.networkId,  
    keyStore
  };

  // open a connection to the NEAR platform
  near = await nearAPI.connect(config);
  const account = await near.account(rootAccountId);
  // Initializing our contract APIs by contract name and configuration
  contract = (await new Contract(account, nearConfig.contractName, {
    viewMethods: ['nft_metadata', 'nft_token', 'nft_tokens'],
    changeMethods: ['nft_mint', 'nft_transfer'],
  })) as ContractWithMethods;

  return { near, rootAccountId, contract };
}

export { NearSDK };