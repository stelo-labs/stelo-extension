export type UUID = string;

export type EthersRequest = {
  method: string;
  params?: Array<any>;
};

export interface SteloRequest extends EthersRequest {
  userAddress?: string | null;
  blockNumber?: number;
  rpcRequestId: string;
}

export const signMethods = [
  "eth_sign",
  "eth_signTypedData",
  "eth_signTypedData_v1",
  "eth_signTypedData_v3",
  "eth_signTypedData_v4",
  "personal_sign",
] as const;
export type SignMethod = (typeof signMethods)[number];

export const txMethods = ["eth_sendTransaction"] as const;
export type TxMethod = (typeof txMethods)[number];

// List of web3 provider methods we want to intercept
export const interceptMethods = [...txMethods, ...signMethods] as const;
export type InterceptMethods = (typeof interceptMethods)[number];

/**
 * HOF generates predicate to determine membership of list
 * @param list List of strings
 * @returns (el: string) => boolean
 */
function isMember<T extends readonly string[]>(
  list: T
): (el: string | undefined) => boolean {
  return (el: string | undefined) => {
    if (typeof el == "undefined") return false;
    return list.includes(el);
  };
}
export const isIntercept = isMember(interceptMethods);

export const isTxMethod = (x: string): x is TxMethod => {
  return txMethods.includes(x as TxMethod);
};

export const isSignMethod = (x: string): x is SignMethod => {
  return signMethods.includes(x as SignMethod);
};

export type TxDecision = {
  approval: boolean;
  rpcRequestId: string;
};
