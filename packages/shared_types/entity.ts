import { TokenType } from "./tx";
export type Entity = {
  type: "ACCOUNT" | "CONTRACT" | "NULL";
  address: string;
  account?: Account;
  contract?: Contract;
};

type Account = {
  address: string;
  ens: string | null;
  nftCount: number;
  topNfts: {
    imageUrl: string | null;
  }[];
  countTransfersTo: number;
};

type Transfer = {
  type: TokenType;
  amount: number;
  contractAddress: string | null;
  // TODO: add other relevant fields
};

export type Contract = {
  address: string;
  isVerifiedEtherScan: boolean | null;
  deployedAt: Date | null;
  txnCountTotal: number | null;
  txnCount30Days: number | null;
  label: string | null;
};
