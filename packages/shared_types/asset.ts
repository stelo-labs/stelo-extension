import { Entity } from "./entity";
import { TokenType } from "./tx";

export type Asset = {
  type: TokenType;
  contractAddress: string | null;
  amount: string;
  formattedAmount: string;
  ownedAmount: string | null;
  formattedOwnedAmount: string | null;
  priceUsd: number | null;
  priceNative: number | null;
  tokenId: string | null;
  imageUrl: string | null;
  name: string | null;
  symbol: string | null;
  decimals: number | null;
  assetUrl: string | null;
  isVerifiedOpensea: boolean | null;
  openseaUrl: string | null;
};

export type AssetChange = {
  type: "TRANSFER_IN" | "TRANSFER_OUT" | "APPROVE" | "APPROVE_ALL";
  asset: Asset;
  counterparty?: Entity;
};
