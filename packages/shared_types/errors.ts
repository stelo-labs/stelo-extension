const errorNames = [
  "TRANSACTION_PARSING_ERR",
  "TRANSACTION_FUNCTION_ARGS_ERR",
  "RISK_EVALUATION_ERR",
  "ASSET_CHANGE_COMPUTATION_ERR",
  "SIGNATURE_PARSING_ERR",
  "SEAPORT_SIGNATURE_PARSING_ERR",
  "SEAPORT_METADATA_ERR",
  "DOMAIN_CREDIBILITY_ERR",
] as const;
export type ErrorName = (typeof errorNames)[number];

export type SteloError = {
  name: ErrorName;
  message: string;
};

export const TransactionParsingError: SteloError = {
  name: "TRANSACTION_PARSING_ERR",
  message: "Could not parse transaction",
};

export const TransactionFunctionArgsError: SteloError = {
  name: "TRANSACTION_FUNCTION_ARGS_ERR",
  message: "Could not compute function arguments",
};

export const RiskEvaluationError: SteloError = {
  name: "RISK_EVALUATION_ERR",
  message: "Could not evaluate risk",
};

export const AssetChangeComputationError: SteloError = {
  name: "ASSET_CHANGE_COMPUTATION_ERR",
  message: "Could not compute asset changes",
};

export const SignatureParsingError: SteloError = {
  name: "SIGNATURE_PARSING_ERR",
  message: "Could not parse signature",
};

export const SeaportSignatureParsingError: SteloError = {
  name: "SEAPORT_SIGNATURE_PARSING_ERR",
  message: "Could not parse Seaport signature",
};

export const SeaportMetadataError: SteloError = {
  name: "SEAPORT_METADATA_ERR",
  message: "Could not get Seaport metadata",
};

export const DomainCredibilityError: SteloError = {
  name: "DOMAIN_CREDIBILITY_ERR",
  message: "Could not get domain credibility",
};
