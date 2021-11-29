export type ChangeMethod<T,U> = (params: { args: T, gas: number, amount: string, callbackUrl?: string }) => Promise<U>;

export type ViewMethod<T, U> = (params: T) => Promise<U>;
