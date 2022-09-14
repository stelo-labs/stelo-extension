import { BigNumberish, Transaction } from "ethers";

// Transaction types

export const ETH = "ETH" as const;
export const ERC20 = "ERC20" as const;
export const ERC721 = "ERC721" as const;
export const ERC1155 = "ERC1155" as const;
export const UNKNOWN = "UNKNOWN" as const;

export const transactionTypes = [ETH, ERC20, ERC721, ERC1155, UNKNOWN] as const;
export type TransactionType = typeof transactionTypes[number];

// ERC20 Functions

export enum ERC20Func {
  TRANSFER = "TRANSFER",
  TRANSFER_FROM = "TRANSFER_FROM",
  APPROVE = "APPROVE",
  INCREASE_ALLOWANCE = "INCREASE_ALLOWANCE",
  DECREASE_ALLOWANCE = "DECREASE_ALLOWANCE",
  UNKNOWN = "UNKNOWN",
  TOTAL_SUPPLY = "TOTAL_SUPPLY",
  BALANCE_OF = "BALANCE_OF",
  ALLOWANCE = "ALLOWANCE",
}

export const ERC20FunctionMap: { [key: string]: ERC20Func } = {
  "totalSupply()": ERC20Func.TOTAL_SUPPLY,
  "balanceOf(address)": ERC20Func.BALANCE_OF,
  "transfer(address,uint256)": ERC20Func.TRANSFER,
  "allowance(address,address)": ERC20Func.ALLOWANCE,
  "approve(address,uint256)": ERC20Func.APPROVE,
  "transferFrom(address,address,uint256)": ERC20Func.TRANSFER_FROM,
  // "increaseAllowance(address,uint256)": ERC20Func.INCREASE_ALLOWANCE,
  // "decreaseAllowance(address,uint256)": ERC20Func.DECREASE_ALLOWANCE,
};

// ERC721 Functions

export enum ERC721Func {
  APPROVE = "APPROVE",
  UNKNOWN = "UNKNOWN",
  BALANCE_OF = "BALANCE_OF",
  OWNER_OF = "OWNER_OF",
  GET_APPROVED = "GET_APPROVED",
  SET_APPROVAL_FOR_ALL = "SET_APPROVAL_FOR_ALL",
  IS_APPROVED_FOR_ALL = "IS_APPROVED_FOR_ALL",
  TRANSFER = "TRANSFER",
}

export const ERC721FunctionMap: { [key: string]: ERC721Func } = {
  "balanceOf(address)": ERC721Func.BALANCE_OF,
  "ownerOf(uint256)": ERC721Func.OWNER_OF,
  "approve(address,uint256)": ERC721Func.APPROVE,
  "getApproved(uint256)": ERC721Func.GET_APPROVED,
  "setApprovalForAll(address,bool)": ERC721Func.SET_APPROVAL_FOR_ALL,
  "isApprovedForAll(address,address)": ERC721Func.IS_APPROVED_FOR_ALL,
  "transferFrom(address,address,uint256)": ERC721Func.TRANSFER,
  "safeTransferFrom(address,address,uint256)": ERC721Func.TRANSFER,
  "safeTransferFrom(address,address,uint256,bytes)": ERC721Func.TRANSFER,
};

// ERC1155 Functions

export enum ERC1155Func {
  TRANSFER = "TRANSFER",
  BATCH_TRANSFER = "BATCH_TRANSFER",
  BALANCE_OF = "BALANCE_OF",
  BALANCE_OF_BATCH = "BALANCE_OF_BATCH",
  SET_APPROVAL_FOR_ALL = "SET_APPROVAL_FOR_ALL",
  IS_APPROVED_FOR_ALL = "IS_APPROVED_FOR_ALL",
  UNKNOWN = "UNKNOWN",
}

export const ERC1155FunctionMap: { [key: string]: ERC1155Func } = {
  "safeTransferFrom(address,address,uint256,uint256,bytes)":
    ERC1155Func.TRANSFER,
  "safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)":
    ERC1155Func.BATCH_TRANSFER,
  // TODO: Investigate why the methodId for balanceOf does not show up in contract bytecode
  // "balanceOf(address,uint256)": ERC1155Func.BALANCE_OF,
  "balanceOfBatch(address[],uint256[])": ERC1155Func.BALANCE_OF_BATCH,
  "isApprovedForAll(address,address)": ERC1155Func.IS_APPROVED_FOR_ALL,
  "setApprovalForAll(address,bool)": ERC1155Func.SET_APPROVAL_FOR_ALL,
};

// Base Transaction type

export interface BaseParsedTxn {
  _raw: Transaction;
  transactionType: TransactionType;
  fromAddress: string;
  toAddress: string;
  value: BigNumberish;
}

export interface ParsedContractTxn extends BaseParsedTxn {
  methodId: string;
}

// Transaction Types
// 1. Eth Transfer
export interface ParsedEthTransfer extends BaseParsedTxn {
  transactionType: typeof ETH;
}

// 2. Unknown Contract Interaction
export interface ParsedUnknownContractTxn extends ParsedContractTxn {
  transactionType: typeof UNKNOWN;
  functionType: typeof UNKNOWN;
}

// 3. ERC721 Transactions
export interface BaseParsedERC721Txn extends ParsedContractTxn {
  transactionType: typeof ERC721;
  functionType: ERC721Func;
  ownerAddress: string;
}

export interface ParsedERC721ApproveTxn extends BaseParsedERC721Txn {
  functionType: ERC721Func.APPROVE;
  tokenId: BigNumberish;
  recipientAddress: string;
}

export interface ParsedERC721TransferTxn extends BaseParsedERC721Txn {
  functionType: ERC721Func.TRANSFER;
  tokenId: BigNumberish;
  recipientAddress: string;
}

export interface ParsedERC721SetApprovalForAllTxn extends BaseParsedERC721Txn {
  functionType: ERC721Func.SET_APPROVAL_FOR_ALL;
  approved: boolean;
  recipientAddress: string;
}

export interface ParsedERC721UnknownTxn extends BaseParsedERC721Txn {
  functionType: ERC721Func.UNKNOWN;
}

export type ParsedERC721Txn =
  | ParsedERC721ApproveTxn
  | ParsedERC721TransferTxn
  | ParsedERC721SetApprovalForAllTxn
  | ParsedERC721UnknownTxn;

// 4. ERC20 Transactions
export interface ParsedERC20Txn extends ParsedContractTxn {
  transactionType: typeof ERC20;
  functionType: ERC20Func;
  ownerAddress: string;
  recipientAddress: string;
  amount: BigNumberish;
}

// 5. ERC1155 Transactions
export interface BaseParsedERC1155Txn extends ParsedContractTxn {
  transactionType: typeof ERC1155;
  functionType: ERC1155Func;
  ownerAddress: string;
}

export interface ParsedERC1155TransferTxn extends BaseParsedERC1155Txn {
  functionType: ERC1155Func.TRANSFER;
  recipientAddress: string;
  tokenId: BigNumberish;
  amount: BigNumberish;
}

export interface ParsedERC1155BatchTransferTxn extends BaseParsedERC1155Txn {
  functionType: ERC1155Func.BATCH_TRANSFER;
  recipientAddress: string;
  tokenIds: BigNumberish[];
  amounts: BigNumberish[];
}

export interface ParsedERC1155SetApprovalForAllTxn
  extends BaseParsedERC1155Txn {
  functionType: ERC1155Func.SET_APPROVAL_FOR_ALL;
  recipientAddress: string;
  approved: boolean;
}

export interface ParsedERC1155UnknownTxn extends BaseParsedERC1155Txn {
  functionType: ERC1155Func.UNKNOWN;
  //todo add function args
}

export type ParsedERC1155Txn =
  | ParsedERC1155TransferTxn
  | ParsedERC1155BatchTransferTxn
  | ParsedERC1155SetApprovalForAllTxn
  | ParsedERC1155UnknownTxn;

export type ParsedTransaction =
  | ParsedERC20Txn
  | ParsedERC721Txn
  | ParsedERC1155Txn
  | ParsedUnknownContractTxn
  | ParsedEthTransfer;

export type ParsedContractInteraction =
  | ParsedERC20Txn
  | ParsedERC721Txn
  | ParsedERC1155Txn
  | ParsedUnknownContractTxn;

export type Function = ERC20Func | ERC721Func | ERC1155Func;
