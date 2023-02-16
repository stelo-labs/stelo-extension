import { BigNumberish } from "ethers";

export type TokenType = "NATIVE" | "ERC20" | "ERC721" | "ERC1155";

export interface Transaction {
  to?: string;
  from: string;
  data: string;
  value?: BigNumberish;
  gasLimit?: BigNumberish;
  gasPrice?: BigNumberish;
  nonce?: number;
  chainId?: number;
}

export const ETH = "ETH" as const;
export const ERC20 = "ERC20" as const;
export const ERC721 = "ERC721" as const;
export const ERC1155 = "ERC1155" as const;
export const UNKNOWN = "UNKNOWN" as const;

export const transactionTypes = [ETH, ERC20, ERC721, ERC1155, UNKNOWN] as const;
export type TransactionType = (typeof transactionTypes)[number];
