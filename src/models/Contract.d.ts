import { Contract as BaseContract } from 'near-api-js';
import { Token } from './Token';
import { ChangeMethod, ViewMethod } from './NearMethod';

export declare class Contract extends BaseContract {
    nft_token: ViewMethod<{ token_id: string }, Token>;
    nft_tokens: ViewMethod<{}, Token[]>;
    nft_tokens_for_owner: ViewMethod<{ account_id: string }, Token[]>;
    nft_mint: ChangeMethod<{ receiver_id: string, token_metadata: TokenMetadata }, Token>;
    nft_approve: ChangeMethod<{ token_id: string, account_id: string, message?: string }, Token>;
    nft_transfer: ChangeMethod<{ token_id: string, receiver_id: string, approval_id?: number }, void>;
}