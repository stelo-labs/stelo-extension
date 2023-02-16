import { BigNumber, BigNumberish, ethers } from "ethers";
import fromExponential from "from-exponential";
import prettyNum from "pretty-num";
export const isMillion = (value: number) => {
  return value < 1_000_000_000 && value > 999_999;
};

export const isBillion = (value: number) => {
  return value < 1_000_000_000_000 && value > 999_999_999;
};

export const isTrillion = (value: number) => {
  return value < 1_000_000_000_000_000 && value > 999_999_999_999;
};

export const truncateAddress = (address: string) => {
  return address.slice(0, 6) + "..." + address.slice(-4);
};

const toFixedWithoutZeroes = (num: number) => {
  return parseFloat(num.toFixed(2));
};

export const formatAmountWithDecimals = (amount: number, decimals: number) => {
  const UNLIMITED_APPROVAL_AMOUNT = ethers.BigNumber.from(2).pow(256).sub(1);
  if (amount == Number(UNLIMITED_APPROVAL_AMOUNT)) return "Maximum";
  const amountWithDecimals = amount / 10 ** decimals;
  if (isMillion(amountWithDecimals))
    return `${toFixedWithoutZeroes(amountWithDecimals / 1_000_000)}M`;
  if (isBillion(amountWithDecimals))
    return `${toFixedWithoutZeroes(amountWithDecimals / 1_000_000_000)}B`;
  if (isTrillion(amountWithDecimals))
    return `${toFixedWithoutZeroes(amountWithDecimals / 1_000_000_000_000)}T`;
  return Number(amountWithDecimals.toPrecision(3));
};

export const formatAmount = (amount: number | null) => {
  if (typeof amount == "undefined" || amount === null) return "N/A";
  if (amount == 0) return "0";
  if (amount < 0.000000001) return "< .000000001";
  if (amount < 1) return prettyNum(parseFloat(amount.toPrecision(3)));
  if (amount < 100)
    return amount.toLocaleString(undefined, { maximumFractionDigits: 2 });
  if (amount < 1_000_000_000)
    return amount.toLocaleString(undefined, { maximumFractionDigits: 0 });
  if (isMillion(amount))
    return `${toFixedWithoutZeroes(amount / 1_000_000).toLocaleString()}M`;
  if (isBillion(amount))
    return `${toFixedWithoutZeroes(amount / 1_000_000_000).toLocaleString()}B`;
  if (isTrillion(amount))
    return `${toFixedWithoutZeroes(
      amount / 1_000_000_000_000
    ).toLocaleString()}T`;
  return "Unlimited";
};

export const formatNumber = (amount: number | null) => {
  if (typeof amount == "undefined" || amount === null) return "N/A";
  return amount.toLocaleString();
};

export const extractAppName = (label: string | null | undefined) => {
  if (!label) return null;
  try {
    return label.match(/[^:]*/i)![0];
  } catch {
    return label;
  }
};

export const roundNumber = (value: number, decimals: number) => {
  return Math.round((value + Number.EPSILON) * 10 ** decimals) / 10 ** decimals;
};

export const isValidURL = (url: string | undefined) => {
  if (!url) return false;
  try {
    new URL(url);
  } catch (e) {
    console.error(e);
    return false;
  }
  return true;
};

export const getRootURL = (url: string | undefined | null) => {
  if (!url) return "Unknown Dapp";
  try {
    return new URL(url).hostname;
  } catch (e) {
    console.error(e);
    return "Unknown Dapp";
  }
};
