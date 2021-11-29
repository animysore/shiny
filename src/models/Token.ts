import { TokenMetadata } from "./TokenMetadata";

export type Token = {
  token_id: string;
  owner_id: string;
  metadata: TokenMetadata;
  approved_account_ids: {
    [account_id: string]: number;
  }
}