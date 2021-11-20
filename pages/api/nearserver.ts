import * as nearAPI from 'near-api-js';
import { Contract, Near, WalletConnection } from 'near-api-js';
import getConfig from '../../src/near/config';

const nearConfig = getConfig(process.env.NODE_ENV || 'development')

const config = {
  nodeUrl: nearConfig.nodeUrl,
  networkId: nearConfig.networkId,
  deps: {
    keyStore: new nearAPI.keyStores.UnencryptedFileSystemKeyStore('/tmp/near'),
  },
};

let near: Near;
let walletConnection: WalletConnection;
let rootAccountId: string;
let contract: Contract;

async function init() {
  // open a connection to the NEAR platform
  const near = await nearAPI.connect(config);
  const walletConnection = new WalletConnection(near, null);
  const accountId = walletConnection.getAccountId();
  
  // Initializing our contract APIs by contract name and configuration
  const contract = await new Contract(walletConnection.account(), nearConfig.contractName, {
    viewMethods: ['nft_metadata', 'nft_tokens'],
    changeMethods: ['nft_mint', 'nft_transfer'],
  });

  return [near, walletConnection, accountId, contract];
}

init().then(([near, walletConnection, accountId, contract]) => {
  near = near;
  walletConnection = walletConnection;
  rootAccountId = accountId;
  contract = contract;
});

export { near, walletConnection, rootAccountId, contract };