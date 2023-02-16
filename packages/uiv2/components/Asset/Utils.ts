import { Asset, AssetChange } from "shared_types";
import { BigNumber } from "ethers";
import { formatAmount } from "utils";

const prependAmountString = (amountStr: string) => {
  if (amountStr == "Unknown") return amountStr;
  if (amountStr == "Unlimited") return amountStr;
  if (amountStr == "< .000000001") return `< $.000000001`;
  return `$${amountStr} USD`;
};

export const FormatAssetWithOptionalDollarSign = (change: AssetChange) => {
  const ret = formatValue(change);
  return prependAmountString(ret);
};

export const formatAmountWithOptionalDollarSign = (amount: number) => {
  return prependAmountString(formatAmount(amount));
};

export const formatAmountForType = (change: AssetChange) => {
  let type = change.asset.type;
  let amount = Number(change.asset.formattedAmount);
  if (change.type === "APPROVE_ALL") return "All";
  if (type === "ERC20" || type == "NATIVE") return formatAmount(amount);
  return amount;
};

const getNFTFallbackTxt = (formattedAmount: string | undefined) => {
  if (!formattedAmount) return "NFT";
  return Number(formattedAmount) > 1 ? "NFTs" : "NFT";
};
const geTokenFallbackTxt = (formattedAmount: string | undefined) => {
  if (!formattedAmount) return "Token";
  return Number(formattedAmount) > 1 ? "Tokens" : "Token";
};

export const formatSymbol = (asset: Asset | undefined) => {
  if (!asset) return ""; // ugh
  if (!!asset.symbol) return asset.symbol;
  let type = asset.type;
  if (type === "ERC721" || type === "ERC1155")
    return getNFTFallbackTxt(asset.formattedAmount);
  if (type == "ERC20" || type == "NATIVE")
    return geTokenFallbackTxt(asset.formattedAmount);
};

export const formatFloorPrice = (change: AssetChange) => {
  if (!change.asset.priceNative) return "Unknown";
  return `${formatAmount(change.asset.priceNative)} ETH ($${formatAmount(
    Number(change.asset.priceUsd) * Number(change.asset.formattedAmount)
  )})`;
};

export const formatValue = (change: AssetChange) => {
  if (!change.asset.priceUsd) return "Unknown";
  return `${formatAmount(
    change.asset.priceUsd * Number(change.asset.formattedAmount)
  )}`;
};

export const assetUrl = (asset: Asset) => {
  // Need strong guarantee that tokenId is a hex number
  if (!asset.tokenId || !asset.contractAddress) return "";
  const decimalTokenId = BigNumber.from(asset.tokenId).toString();

  return `https://opensea.io/assets/ethereum/${asset.contractAddress}/${decimalTokenId}`;
};
