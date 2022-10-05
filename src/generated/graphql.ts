export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Json: any;
};

/** Whether or not we know this Dapp is legitimate or not. */
export enum ApprovalStatus {
  Blacklisted = "BLACKLISTED",
  Restricted = "RESTRICTED",
  Unknown = "UNKNOWN",
  Whitelisted = "WHITELISTED",
}

export type BalanceChange = {
  __typename?: "BalanceChange";
  difference: Scalars["Float"];
  nextBalance: Scalars["Float"];
  previousBalance: Scalars["Float"];
};

export type Contract = {
  __typename?: "Contract";
  ABI?: Maybe<Scalars["Json"]>;
  apiWarnings: Array<Scalars["String"]>;
  bytecode?: Maybe<Scalars["String"]>;
  createdAt: Scalars["DateTime"];
  deployedAt?: Maybe<Scalars["DateTime"]>;
  erc20?: Maybe<Erc20>;
  erc721?: Maybe<Erc721>;
  erc1155?: Maybe<Erc1155>;
  etherscanLabel?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
  implementationAddress?: Maybe<Scalars["String"]>;
  isProxy?: Maybe<Scalars["Boolean"]>;
  isVerifiedEtherScan?: Maybe<Scalars["Boolean"]>;
  label?: Maybe<Scalars["String"]>;
  methodSignature?: Maybe<Scalars["String"]>;
  simulation?: Maybe<Simulation>;
  tokenStandard?: Maybe<Scalars["String"]>;
  tracerSimulation?: Maybe<Simulation>;
  txnCount30Days?: Maybe<Scalars["Int"]>;
  txnCountTotal?: Maybe<Scalars["Int"]>;
  updatedAt: Scalars["DateTime"];
};

export type ContractMethodSignatureArgs = {
  methodId: Scalars["String"];
};

export type ContractSimulationArgs = {
  blockNumber?: InputMaybe<Scalars["Int"]>;
  from: Scalars["String"];
  gas?: InputMaybe<Scalars["Int"]>;
  inputData: Scalars["String"];
  value: Scalars["String"];
};

export type ContractTracerSimulationArgs = {
  blockNumber?: InputMaybe<Scalars["Int"]>;
  from: Scalars["String"];
  gas: Scalars["String"];
  gasPrice?: InputMaybe<Scalars["String"]>;
  inputData: Scalars["String"];
  value: Scalars["String"];
};

export type Dapp = {
  __typename?: "Dapp";
  allowedContracts: Array<Maybe<Contract>>;
  approvalStatus: ApprovalStatus;
  isContractAllowed: Scalars["Boolean"];
  /** root domain, e.g. opensea.io */
  rootUrl: Scalars["String"];
};

export type DappIsContractAllowedArgs = {
  contractId: Scalars["String"];
};

export type Erc20 = {
  __typename?: "ERC20";
  contract?: Maybe<Contract>;
  decimals?: Maybe<Scalars["Int"]>;
  id: Scalars["String"];
  imageUrl?: Maybe<Scalars["String"]>;
  priceEth?: Maybe<Scalars["Float"]>;
  priceUsd?: Maybe<Scalars["Float"]>;
  symbol?: Maybe<Scalars["String"]>;
  tokenName?: Maybe<Scalars["String"]>;
  twitterUrl?: Maybe<Scalars["String"]>;
  websiteUrl?: Maybe<Scalars["String"]>;
};

export type Erc721 = {
  __typename?: "ERC721";
  collectionName?: Maybe<Scalars["String"]>;
  contract?: Maybe<Contract>;
  discordUrl?: Maybe<Scalars["String"]>;
  externalUrl?: Maybe<Scalars["String"]>;
  floorPrice?: Maybe<Scalars["Float"]>;
  id: Scalars["String"];
  imageUrl?: Maybe<Scalars["String"]>;
  openSeaCollectionSlug?: Maybe<Scalars["String"]>;
  openSeaIsVerified?: Maybe<Scalars["Boolean"]>;
  openSeaUrl?: Maybe<Scalars["String"]>;
  symbol?: Maybe<Scalars["String"]>;
  thirtyDaySales?: Maybe<Scalars["Float"]>;
  thirtyDayVolume?: Maybe<Scalars["Float"]>;
  twitterUrl?: Maybe<Scalars["String"]>;
};

export type Erc1155 = {
  __typename?: "ERC1155";
  collectionName?: Maybe<Scalars["String"]>;
  contract?: Maybe<Contract>;
  discordUrl?: Maybe<Scalars["String"]>;
  externalUrl?: Maybe<Scalars["String"]>;
  floorPrice?: Maybe<Scalars["Float"]>;
  id: Scalars["String"];
  imageUrl?: Maybe<Scalars["String"]>;
  openSeaCollectionSlug?: Maybe<Scalars["String"]>;
  openSeaIsVerified?: Maybe<Scalars["Boolean"]>;
  openSeaUrl?: Maybe<Scalars["String"]>;
  symbol?: Maybe<Scalars["String"]>;
  thirtyDaySales?: Maybe<Scalars["Float"]>;
  thirtyDayVolume?: Maybe<Scalars["Float"]>;
  twitterUrl?: Maybe<Scalars["String"]>;
};

export type EventInputType = {
  event: Scalars["String"];
  properties: Scalars["Json"];
  userAddress: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createEvent?: Maybe<Scalars["Boolean"]>;
  createTransactionDecision?: Maybe<Scalars["Boolean"]>;
};

export type MutationCreateEventArgs = {
  data: EventInputType;
};

export type MutationCreateTransactionDecisionArgs = {
  data: TransactionDecisionInputType;
};

export type Nft = {
  __typename?: "Nft";
  balance?: Maybe<Scalars["String"]>;
  contract?: Maybe<Web3Account>;
  contractAddress?: Maybe<Scalars["String"]>;
  /** tokenId of the NFT */
  id: Scalars["String"];
  imageUrl?: Maybe<Scalars["String"]>;
  media?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  tokenType?: Maybe<Scalars["String"]>;
  tokenUri?: Maybe<Scalars["String"]>;
};

export type OpenSeaCollection = {
  __typename?: "OpenSeaCollection";
  floorPrice?: Maybe<Scalars["Float"]>;
  /** Collection slug */
  id: Scalars["String"];
  payoutAddress?: Maybe<Scalars["String"]>;
  thirtyDaySales?: Maybe<Scalars["Float"]>;
  thirtyDayVolume?: Maybe<Scalars["Float"]>;
};

export type OpenSeaContract = {
  __typename?: "OpenSeaContract";
  collection?: Maybe<OpenSeaCollection>;
  collectionName: Scalars["String"];
  collectionSlug: Scalars["String"];
  discordUrl?: Maybe<Scalars["String"]>;
  externalUrl?: Maybe<Scalars["String"]>;
  /** Contract address */
  id: Scalars["String"];
  imageUrl: Scalars["String"];
  isVerified: Scalars["Boolean"];
  openseaUrl?: Maybe<Scalars["String"]>;
  symbol?: Maybe<Scalars["String"]>;
  twitterUrl?: Maybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  RPCRequest?: Maybe<RpcRequest>;
  contract?: Maybe<Contract>;
  contractBytecode?: Maybe<Scalars["String"]>;
  dapp?: Maybe<Dapp>;
  erc20?: Maybe<Erc20>;
  erc721?: Maybe<Erc721>;
  erc1155?: Maybe<Erc1155>;
  ethPrice?: Maybe<Scalars["String"]>;
  openSeaCollection?: Maybe<OpenSeaCollection>;
  openSeaContract?: Maybe<OpenSeaContract>;
  transaction?: Maybe<Transaction>;
  web3Account?: Maybe<Web3Account>;
};

export type QueryRpcRequestArgs = {
  method: Scalars["String"];
  params: Array<Scalars["String"]>;
  userAddress?: InputMaybe<Scalars["String"]>;
};

export type QueryContractArgs = {
  disableCache?: Scalars["Boolean"];
  id: Scalars["String"];
};

export type QueryContractBytecodeArgs = {
  id: Scalars["String"];
};

export type QueryDappArgs = {
  rootUrl?: InputMaybe<Scalars["String"]>;
  url?: InputMaybe<Scalars["String"]>;
};

export type QueryErc20Args = {
  id: Scalars["String"];
};

export type QueryErc721Args = {
  id: Scalars["String"];
};

export type QueryErc1155Args = {
  id: Scalars["String"];
};

export type QueryOpenSeaCollectionArgs = {
  id: Scalars["String"];
};

export type QueryOpenSeaContractArgs = {
  id: Scalars["String"];
};

export type QueryTransactionArgs = {
  from: Scalars["String"];
  inputData?: InputMaybe<Scalars["String"]>;
  to: Scalars["String"];
  value?: InputMaybe<Scalars["String"]>;
};

export type QueryWeb3AccountArgs = {
  id: Scalars["String"];
};

export type RpcRequest = {
  __typename?: "RPCRequest";
  parsedSignature?: Maybe<Scalars["Json"]>;
  parsedTransaction?: Maybe<Scalars["Json"]>;
  risk: RiskResult;
};

export type RpcRequestRiskArgs = {
  rootUrl?: InputMaybe<Scalars["String"]>;
  url?: InputMaybe<Scalars["String"]>;
};

export type RiskFactor = {
  __typename?: "RiskFactor";
  score: Scalars["Int"];
  subtext: Scalars["String"];
  text: Scalars["String"];
};

export type RiskResult = {
  __typename?: "RiskResult";
  riskFactors: Array<RiskFactor>;
  riskScore: RiskScore;
};

export enum RiskScore {
  High = "HIGH",
  Low = "LOW",
  Medium = "MEDIUM",
}

export type Simulation = {
  __typename?: "Simulation";
  balanceChange?: Maybe<BalanceChange>;
  transferEvents: Array<Maybe<TransferEvent>>;
  txnError?: Maybe<Scalars["String"]>;
  txnSucceeded: Scalars["Boolean"];
};

export type Transaction = {
  __typename?: "Transaction";
  from: Scalars["String"];
  inputData?: Maybe<Scalars["String"]>;
  riskScore: Array<RiskFactor>;
  to: Scalars["String"];
  value?: Maybe<Scalars["String"]>;
};

export enum TransactionDecisionAction {
  Approve = "APPROVE",
  Reject = "REJECT",
  Report = "REPORT",
}

export type TransactionDecisionInputType = {
  action: TransactionDecisionAction;
  dappRootUrl: Scalars["String"];
  transactionProperties: Scalars["Json"];
  userAccountId: Scalars["String"];
};

export type TransferEvent = {
  __typename?: "TransferEvent";
  /** Quantity of token being transferred */
  amount?: Maybe<Scalars["String"]>;
  contractAddress: Scalars["String"];
  eventName?: Maybe<Scalars["String"]>;
  fromAddress: Scalars["String"];
  imageUrl?: Maybe<Scalars["String"]>;
  toAddress?: Maybe<Scalars["String"]>;
  /** Only relevant to ERC721 & ERC1155 */
  tokenId?: Maybe<Scalars["String"]>;
  /** Only relevant to ERC721 & ERC1155 */
  tokenImage?: Maybe<Scalars["String"]>;
  tokenName?: Maybe<Scalars["String"]>;
  tokenStandard: Scalars["String"];
  tokenSymbol?: Maybe<Scalars["String"]>;
  /** Quantity of ETH being transferred */
  value?: Maybe<Scalars["String"]>;
};

export type Web3Account = {
  __typename?: "Web3Account";
  contractCode?: Maybe<Scalars["String"]>;
  countOfNfts?: Maybe<Scalars["Float"]>;
  countTransfersBetween: Scalars["Float"];
  deployTimestamp?: Maybe<Scalars["DateTime"]>;
  ensName?: Maybe<Scalars["String"]>;
  firstTransferToOrFrom?: Maybe<Web3Transfer>;
  /** address */
  id: Scalars["String"];
  isContractVerified: Scalars["Boolean"];
  methodSignature?: Maybe<Scalars["String"]>;
  nfts?: Maybe<Array<Maybe<Nft>>>;
  recentTransferBetween?: Maybe<Web3Transfer>;
  topNfts?: Maybe<Array<Maybe<Nft>>>;
  transactionCount30Days?: Maybe<Scalars["Int"]>;
  transactionCountTotal?: Maybe<Scalars["Int"]>;
};

export type Web3AccountCountTransfersBetweenArgs = {
  otherAddress: Scalars["String"];
};

export type Web3AccountMethodSignatureArgs = {
  methodId: Scalars["String"];
};

export type Web3AccountNftsArgs = {
  contractAddress: Scalars["String"];
  tokenId?: InputMaybe<Scalars["String"]>;
  tokenIds?: InputMaybe<Array<Scalars["String"]>>;
};

export type Web3AccountRecentTransferBetweenArgs = {
  otherAddress: Scalars["String"];
};

export type Web3Transfer = {
  __typename?: "Web3Transfer";
  category: Scalars["String"];
  contract?: Maybe<Web3Account>;
  contractAddress?: Maybe<Scalars["String"]>;
  from?: Maybe<Web3Account>;
  fromAddress: Scalars["String"];
  /** hash of blockchain transaction */
  id: Scalars["String"];
  to?: Maybe<Web3Account>;
  toAddress: Scalars["String"];
  tokenId?: Maybe<Scalars["String"]>;
  value?: Maybe<Scalars["Float"]>;
};

export type Erc1155BatchTransferQueryVariables = Exact<{
  ownerAddress: Scalars["String"];
  contractAddress: Scalars["String"];
  tokenIds?: InputMaybe<Array<Scalars["String"]> | Scalars["String"]>;
  toAddress: Scalars["String"];
}>;

export type Erc1155BatchTransferQuery = {
  __typename?: "Query";
  ethPrice?: string | null;
  fromAccount?: {
    __typename?: "Web3Account";
    nfts?: Array<{ __typename?: "Nft"; media?: string | null } | null> | null;
  } | null;
  toAccount?: {
    __typename?: "Web3Account";
    contractCode?: string | null;
  } | null;
  erc1155?: {
    __typename?: "ERC1155";
    symbol?: string | null;
    floorPrice?: number | null;
    collectionName?: string | null;
    openSeaUrl?: string | null;
    twitterUrl?: string | null;
    discordUrl?: string | null;
    openSeaIsVerified?: boolean | null;
  } | null;
};

export type Erc1155SetApprovalForAllQueryVariables = Exact<{
  fromAddress: Scalars["String"];
  contractAddress: Scalars["String"];
  toAddress: Scalars["String"];
}>;

export type Erc1155SetApprovalForAllQuery = {
  __typename?: "Query";
  ethPrice?: string | null;
  fromAccount?: {
    __typename?: "Web3Account";
    nfts?: Array<{
      __typename?: "Nft";
      media?: string | null;
      balance?: string | null;
    } | null> | null;
  } | null;
  toAccount?: {
    __typename?: "Web3Account";
    contractCode?: string | null;
  } | null;
  erc1155?: {
    __typename?: "ERC1155";
    collectionName?: string | null;
    floorPrice?: number | null;
    openSeaUrl?: string | null;
    twitterUrl?: string | null;
    discordUrl?: string | null;
    openSeaIsVerified?: boolean | null;
  } | null;
};

export type Erc1155TransferQueryVariables = Exact<{
  ownerAddress: Scalars["String"];
  contractAddress: Scalars["String"];
  tokenId: Scalars["String"];
  toAddress: Scalars["String"];
}>;

export type Erc1155TransferQuery = {
  __typename?: "Query";
  ethPrice?: string | null;
  fromAccount?: {
    __typename?: "Web3Account";
    nfts?: Array<{ __typename?: "Nft"; media?: string | null } | null> | null;
  } | null;
  toAccount?: {
    __typename?: "Web3Account";
    contractCode?: string | null;
  } | null;
  erc1155?: {
    __typename?: "ERC1155";
    collectionName?: string | null;
    floorPrice?: number | null;
    openSeaUrl?: string | null;
    twitterUrl?: string | null;
    discordUrl?: string | null;
    openSeaIsVerified?: boolean | null;
  } | null;
};

export type Erc1155UnknownQueryVariables = Exact<{
  contractAddress: Scalars["String"];
  methodId: Scalars["String"];
}>;

export type Erc1155UnknownQuery = {
  __typename?: "Query";
  contract?: {
    __typename?: "Contract";
    methodSignature?: string | null;
    erc1155?: {
      __typename?: "ERC1155";
      symbol?: string | null;
      collectionName?: string | null;
      imageUrl?: string | null;
      floorPrice?: number | null;
      openSeaUrl?: string | null;
      twitterUrl?: string | null;
      discordUrl?: string | null;
      openSeaIsVerified?: boolean | null;
    } | null;
  } | null;
};

export type ChangeAllowanceQueryVariables = Exact<{
  toAddress: Scalars["String"];
  contractAddress: Scalars["String"];
}>;

export type ChangeAllowanceQuery = {
  __typename?: "Query";
  toAccount?: {
    __typename?: "Web3Account";
    contractCode?: string | null;
  } | null;
  erc20?: {
    __typename?: "ERC20";
    imageUrl?: string | null;
    symbol?: string | null;
    decimals?: number | null;
    priceUsd?: number | null;
  } | null;
};

export type Erc20TransferOrApproveQueryVariables = Exact<{
  contractAddress: Scalars["String"];
  toAddress: Scalars["String"];
}>;

export type Erc20TransferOrApproveQuery = {
  __typename?: "Query";
  toAccount?: {
    __typename?: "Web3Account";
    contractCode?: string | null;
  } | null;
  erc20?: {
    __typename?: "ERC20";
    imageUrl?: string | null;
    symbol?: string | null;
    decimals?: number | null;
    priceUsd?: number | null;
  } | null;
};

export type Erc20UnknownQueryVariables = Exact<{
  contractAddress: Scalars["String"];
  methodId: Scalars["String"];
}>;

export type Erc20UnknownQuery = {
  __typename?: "Query";
  contract?: {
    __typename?: "Contract";
    methodSignature?: string | null;
    label?: string | null;
  } | null;
  erc20?: {
    __typename?: "ERC20";
    imageUrl?: string | null;
    symbol?: string | null;
  } | null;
};

export type SetApprovalForAllQueryVariables = Exact<{
  fromAddress: Scalars["String"];
  contractAddress: Scalars["String"];
  toAddress: Scalars["String"];
}>;

export type SetApprovalForAllQuery = {
  __typename?: "Query";
  ethPrice?: string | null;
  fromAccount?: {
    __typename?: "Web3Account";
    nfts?: Array<{ __typename?: "Nft"; media?: string | null } | null> | null;
  } | null;
  toAccount?: {
    __typename?: "Web3Account";
    contractCode?: string | null;
  } | null;
  erc721?: {
    __typename?: "ERC721";
    collectionName?: string | null;
    floorPrice?: number | null;
    openSeaUrl?: string | null;
    twitterUrl?: string | null;
    discordUrl?: string | null;
    openSeaIsVerified?: boolean | null;
  } | null;
};

export type Erc721TransferOrApproveQueryVariables = Exact<{
  fromAddress: Scalars["String"];
  contractAddress: Scalars["String"];
  tokenId: Scalars["String"];
  toAddress: Scalars["String"];
}>;

export type Erc721TransferOrApproveQuery = {
  __typename?: "Query";
  ethPrice?: string | null;
  fromAccount?: {
    __typename?: "Web3Account";
    nfts?: Array<{ __typename?: "Nft"; media?: string | null } | null> | null;
  } | null;
  toAccount?: {
    __typename?: "Web3Account";
    contractCode?: string | null;
  } | null;
  contract?: {
    __typename?: "Contract";
    erc721?: {
      __typename?: "ERC721";
      collectionName?: string | null;
      floorPrice?: number | null;
      openSeaUrl?: string | null;
      twitterUrl?: string | null;
      discordUrl?: string | null;
      openSeaIsVerified?: boolean | null;
    } | null;
  } | null;
};

export type Erc721UnknownQueryVariables = Exact<{
  contractAddress: Scalars["String"];
  methodId: Scalars["String"];
}>;

export type Erc721UnknownQuery = {
  __typename?: "Query";
  contract?: {
    __typename?: "Contract";
    methodSignature?: string | null;
    erc721?: {
      __typename?: "ERC721";
      imageUrl?: string | null;
      collectionName?: string | null;
      openSeaUrl?: string | null;
      twitterUrl?: string | null;
      discordUrl?: string | null;
      openSeaIsVerified?: boolean | null;
    } | null;
  } | null;
};

export type EthTransferQueryVariables = Exact<{
  toAddress: Scalars["String"];
}>;

export type EthTransferQuery = {
  __typename?: "Query";
  toAccount?: {
    __typename?: "Web3Account";
    id: string;
    ensName?: string | null;
    contractCode?: string | null;
  } | null;
};

export type OpenSeaListingQueryVariables = Exact<{
  toAddress: Scalars["String"];
  contractAddress: Scalars["String"];
  tokenId: Scalars["String"];
}>;

export type OpenSeaListingQuery = {
  __typename?: "Query";
  web3Account?: {
    __typename?: "Web3Account";
    nfts?: Array<{ __typename?: "Nft"; media?: string | null } | null> | null;
  } | null;
  erc721?: {
    __typename?: "ERC721";
    collectionName?: string | null;
    openSeaUrl?: string | null;
    twitterUrl?: string | null;
    discordUrl?: string | null;
    openSeaIsVerified?: boolean | null;
  } | null;
};

export type UnknownQueryVariables = Exact<{
  contractAddress: Scalars["String"];
  methodId: Scalars["String"];
}>;

export type UnknownQuery = {
  __typename?: "Query";
  contract?: {
    __typename?: "Contract";
    methodSignature?: string | null;
    label?: string | null;
  } | null;
};

export type NftCollection721Fragment = {
  __typename?: "ERC721";
  collectionName?: string | null;
  openSeaUrl?: string | null;
  twitterUrl?: string | null;
  discordUrl?: string | null;
  openSeaIsVerified?: boolean | null;
};

export type NftCollection1155Fragment = {
  __typename?: "ERC1155";
  collectionName?: string | null;
  openSeaUrl?: string | null;
  twitterUrl?: string | null;
  discordUrl?: string | null;
  openSeaIsVerified?: boolean | null;
};

export type AccountRecipientQueryVariables = Exact<{
  fromAddress: Scalars["String"];
  toAddress: Scalars["String"];
}>;

export type AccountRecipientQuery = {
  __typename?: "Query";
  web3Account?: {
    __typename?: "Web3Account";
    ensName?: string | null;
    countOfNfts?: number | null;
    countTransfersBetween: number;
    topNfts?: Array<{
      __typename?: "Nft";
      media?: string | null;
    } | null> | null;
    recentTransferBetween?: {
      __typename?: "Web3Transfer";
      contractAddress?: string | null;
      category: string;
      value?: number | null;
      tokenId?: string | null;
    } | null;
  } | null;
};

export type ContractRecipientQueryVariables = Exact<{
  address: Scalars["String"];
}>;

export type ContractRecipientQuery = {
  __typename?: "Query";
  contract?: {
    __typename?: "Contract";
    isVerifiedEtherScan?: boolean | null;
    deployedAt?: any | null;
    txnCountTotal?: number | null;
    txnCount30Days?: number | null;
    label?: string | null;
  } | null;
};

export type RecipientFragment = {
  __typename?: "Web3Account";
  contractCode?: string | null;
};

export type SimulationQueryVariables = Exact<{
  contractAddress: Scalars["String"];
  from: Scalars["String"];
  value: Scalars["String"];
  inputData: Scalars["String"];
  blockNumber?: InputMaybe<Scalars["Int"]>;
  gas: Scalars["String"];
}>;

export type SimulationQuery = {
  __typename?: "Query";
  ethPrice?: string | null;
  contract?: {
    __typename?: "Contract";
    tracerSimulation?: {
      __typename?: "Simulation";
      txnError?: string | null;
      txnSucceeded: boolean;
      transferEvents: Array<{
        __typename?: "TransferEvent";
        fromAddress: string;
        toAddress?: string | null;
        contractAddress: string;
        amount?: string | null;
        value?: string | null;
        tokenId?: string | null;
        tokenName?: string | null;
        imageUrl?: string | null;
        tokenStandard: string;
        tokenSymbol?: string | null;
        eventName?: string | null;
      } | null>;
      balanceChange?: {
        __typename?: "BalanceChange";
        previousBalance: number;
        nextBalance: number;
        difference: number;
      } | null;
    } | null;
  } | null;
};

export type ParseRpcRequestQueryVariables = Exact<{
  method: Scalars["String"];
  params: Array<Scalars["String"]> | Scalars["String"];
  userAddress?: InputMaybe<Scalars["String"]>;
}>;

export type ParseRpcRequestQuery = {
  __typename?: "Query";
  RPCRequest?: {
    __typename?: "RPCRequest";
    parsedSignature?: any | null;
    parsedTransaction?: any | null;
  } | null;
};

export type RiskAnalysisQueryVariables = Exact<{
  method: Scalars["String"];
  params: Array<Scalars["String"]> | Scalars["String"];
  userAddress?: InputMaybe<Scalars["String"]>;
  url: Scalars["String"];
}>;

export type RiskAnalysisQuery = {
  __typename?: "Query";
  RPCRequest?: {
    __typename?: "RPCRequest";
    risk: {
      __typename?: "RiskResult";
      riskScore: RiskScore;
      riskFactors: Array<{
        __typename?: "RiskFactor";
        score: number;
        text: string;
        subtext: string;
      }>;
    };
  } | null;
};

export type CreateEventMutationVariables = Exact<{
  data: EventInputType;
}>;

export type CreateEventMutation = {
  __typename?: "Mutation";
  createEvent?: boolean | null;
};

export type DappStatusQueryVariables = Exact<{
  url: Scalars["String"];
}>;

export type DappStatusQuery = {
  __typename?: "Query";
  dapp?: {
    __typename?: "Dapp";
    rootUrl: string;
    approvalStatus: ApprovalStatus;
    allowedContracts: Array<{ __typename?: "Contract"; id: string } | null>;
  } | null;
};
