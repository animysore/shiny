import { TokenMetadata } from "./TokenMetadata";
import { Token } from "./Token";

export type Error = { error: string };
export type Message = { message: string };
export type WithError<T> = Error | T;

export type ClaimResponse = { claim: string; };

export declare namespace Mint {
  export type Request = { receiver_id: string, token_metadata: TokenMetadata };
  export type Success = Token;
  export type Response = WithError<Token>;
}

export declare namespace GenerateClaim {
  type Request = { token_id: string; };
  type Success = ClaimResponse;
  type Response = WithError<Success>;
}

export declare namespace ShareClaim {
  type Request = {
    token_id: string;
    email: string;
  };
  type Success = ClaimResponse;
  type Response = WithError<Success>;
}

export declare namespace ViewClaim {
  type Success = {
    token_id: string;
    metadata: TokenMetadata;
  };
  type Response = WithError<Success>;
}

export declare namespace TransferClaim {
  type Request = {
    claim: string;
    receiver_id: string;
  };
  type Success = Message;
  type Response = WithError<Message>;
}
