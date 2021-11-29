import { WalletConnection } from 'near-api-js';
import { Token } from '../models/Token';
import { Contract } from './models/Contract';

export declare class WindowWithNEAR extends Window {
  walletConnection: WalletConnection;
  accountId?: string;
  contract: Contract;
  parseNearAmount: (amount?: string) => string | null;
}
