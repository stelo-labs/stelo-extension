import {
  type AssetChange,
  type Contract,
  type Asset,
  TransactionType,
  Transaction,
} from "shared_types";
import { SignMethod } from "shared_types";
import { RiskFactor } from "./risk";
import { SteloError } from "./errors";

export type DomainCredibility =
  | "BLOCKLIST"
  | "ALLOWLIST"
  | "ALLOWED_FOR_CONTRACT"
  | "UNKNOWN";

export type Expiry = {
  date: Date;
  never: boolean;
};

// TODO: Add validation to this field
/**
 * Calldata tring in hex format (starts with 0x)
 */
export type calldata = string;

/**
 * Number in hex format (starts with 0x). Use 0x0 to denote 0.
 * @pattern ^0x[a-fA-F0-9]+$
 */
export type hexNumber = string;

export type TransactionRequestParams = {
  /**
   * The address of the transaction recipient, required. We currently don't support contract creation transactions.
   */
  to: string;
  /**
   * The address of the transaction sender, required.
   */
  from: string;
  /**
   * Transaction calldata in hex, optional.
   */
  data?: calldata;
  /**
   * Transaction value in wei (hex), optional. Leaving this empty is the same as setting to zero.
   */
  value?: hexNumber;
  /**
   * Maximum gas to be used by the transaction (hex), optional. Computed automatically if left empty.
   */
  gasLimit?: hexNumber;
  /**
   * Same as gasLimit.
   */
  gas?: hexNumber;
  /**
   * Gas price in wei (hex), optional. Computed automatically if left empty.
   */
  gasPrice?: hexNumber;
  // TODO: will support in the future
  // nonce?: number;
  // chainId?: number;
  /**
   * URL of the website or dapp that originated the transaction, optional. Used for risk assessment.
   */
  url?: string;
};

export type SignatureRequest = {
  /**
   * The ethereum RPC method associated with the signature, required.
   */
  method: SignMethod;
  /**
   * Array of params, depending on the RPC method, required.
   */
  params: string[];
  /**
   * URL of the website or dapp that originated the transaction, optional. Used for risk assessment.
   */
  url?: string;
};

export type Function = {
  name: string;
  arguments: {
    name: string;
    type: string;
    value: any;
  }[];
};

export type TransactionRequest = Transaction & {
  url?: string;
};

export type BaseResponse = {
  summary: string;
  risk: RiskResult;
  assetChanges: AssetChange[];
  errors?: SteloError[];
  domainCredibility?: DomainCredibility;
};

export type RiskResult = {
  riskScore: "LOW" | "MEDIUM" | "HIGH";
  riskFactors: RiskFactor[];
};

export type TransactionResponse = BaseResponse & ParsedTransaction;

export type ParsedTransaction = {
  transactionType: TransactionType;
  functionType?: FunctionType;
  contract?: Contract;
  function?: Function;
};

type FunctionType = ERC20Func | ERC721Func | ERC1155Func;

const rpcMethods = [
  "ETH_SIGN",
  "PERSONAL_SIGN",
  "EIP712_TYPED_DATA",
  "UNKNOWN",
] as const;
export type RPCMethod = (typeof rpcMethods)[number];

const signatureTypes = [
  "TRANSACTION",
  "SEAPORT",
  "MESSAGE",
  "UNKNOWN",
] as const;
export type SignatureType = (typeof signatureTypes)[number];

export type SignatureResponse = BaseResponse & {
  rpcMethod: RPCMethod;
  signatureType: SignatureType;
  signer: string;
  message?: string;
  json?: object;
  seaport?: Seaport;
  transaction?: ParsedTransaction;
};

// TODO: make this exhaustive, look at official Seaport order types
const seaportTypes = [
  "BID",
  "LISTING",
  "BULK_BID",
  "BULK_LISTING",
  "OTHER",
] as const;
export type SeaportType = (typeof seaportTypes)[number];

// TODO: currently the creatorValue and platformValue objects do not include the address of the recipient (creator/platform)
export type Seaport = {
  seaportType: SeaportType;
  expiry: Expiry;
  creatorAddresses: string[];
  // Only for BID and LISTING
  totalValue?: Asset;
  creatorValue?: Asset;
  platformValue?: Asset;
};

// ERC20 Functions
export type ERC20Func =
  | "TRANSFER"
  | "TRANSFER_FROM"
  | "APPROVE"
  | "INCREASE_ALLOWANCE"
  | "DECREASE_ALLOWANCE"
  | "UNKNOWN"
  | "TOTAL_SUPPLY"
  | "BALANCE_OF"
  | "ALLOWANCE";

export type ERC721Func =
  | "APPROVE"
  | "UNKNOWN"
  | "BALANCE_OF"
  | "OWNER_OF"
  | "GET_APPROVED"
  | "SET_APPROVAL_FOR_ALL"
  | "IS_APPROVED_FOR_ALL"
  | "TRANSFER";

export type ERC1155Func =
  | "TRANSFER"
  | "BATCH_TRANSFER"
  | "BALANCE_OF"
  | "BALANCE_OF_BATCH"
  | "SET_APPROVAL_FOR_ALL"
  | "IS_APPROVED_FOR_ALL"
  | "UNKNOWN";

export type AnalyticsRequest = {
  userId: string;
  address: string;
  event: string;
  properties: unknown;
};
