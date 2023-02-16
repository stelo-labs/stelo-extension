export type RiskFactor = {
  name: RiskFactorName;
  score: number;
  text: string;
  subtext?: string;
};

export const riskFactorNames = [
  // Signature risk factors
  "ETH_SIGN",
  "SEAPORT_LOW_EARNINGS",
  "SEAPORT_MEDIUM_EARNINGS",
  "SEAPORT_UNKNOWN_RECIPIENT",
  "SEAPORT_LISTING_BELOW_FLOOR_PRICE",
  "SEAPORT_UNKNOWN_RECIPIENT",
  // Transaction risk factors
  "ONBOARDING_TRANSACTION",
  "APPROVAL_TO_EOA",
  "LOW_CREDIBILITY_CONTRACT",
  "FIRST_TRANSFER_TO_EOA",
  "KNOWN_MALICIOUS_RECIPIENT",
  "KNOWN_MALICIOUS_CONTRACT",
  // Url risk factors
  "MALICIOUS_URL",
  // Errors
  "ERROR_ASSET_CHANGE",
  "ERROR_RISK_EVALUATION",
  "ERROR_TRANSACTION_PARSING",
  "ERROR_SIGNATURE_PARSING",
  "ERROR_SEAPORT_PARSING",
  // Positive
  "VALID_DAPP_CONTRACT_RESTRICTION",
  "REVOKE_APPROVAL",
  "PERSONAL_SIGN",
  "WHITELISTED_URL",
] as const;
export type RiskFactorName = (typeof riskFactorNames)[number];

export const EthSignRiskFactor: RiskFactor = {
  name: "ETH_SIGN" as const,
  score: 10,
  text: "This website is asking for a potentially malicious signature.",
};

export const MaliciousUrlRiskFactor: RiskFactor = {
  name: "MALICIOUS_URL" as const,
  score: 10,
  text: "This transaction originated from a website Stelo believes is malicious",
};

export const SeaportWithLowEarningsRiskFactor: RiskFactor = {
  name: "SEAPORT_LOW_EARNINGS" as const,
  score: 10,
  text: "Low or Zero Earnings",
  subtext:
    "The value of assets you are receiving is much less than the assets you're listing for sale.",
};

export const SeaportWithMediumEarningsRiskFactor: RiskFactor = {
  name: "SEAPORT_MEDIUM_EARNINGS" as const,
  score: 5,
  text: "Low Earnings",
  subtext:
    "The value of assets you are receiving is less than the assets you're listing for sale.",
};

export const SeaportUnknownRecipientRiskFactor: RiskFactor = {
  name: "SEAPORT_UNKNOWN_RECIPIENT" as const,
  score: 5,
  text: "An unknown party will receive assets.",
};

export const SeaportListingBelowFloorPriceRiskFactor: RiskFactor = {
  name: "SEAPORT_LISTING_BELOW_FLOOR_PRICE" as const,
  score: 3,
  text: "Your assets will be listed below the floor price.",
};

export const OnboardingTransactionRiskFactor: RiskFactor = {
  name: "ONBOARDING_TRANSACTION" as const,
  score: 4,
  text: "Stelo shows you all the reasons why a transaction may be risky",
  subtext: "Like the one below",
};

export const ApprovalToEoaRiskFactor: RiskFactor = {
  name: "APPROVAL_TO_EOA" as const,
  score: 10,
  text: "Setting approval to an unusual recipient",
  subtext:
    "Approvals are usually set to marketplace contracts, not individual wallets. This pattern is often used to steal your assets",
};

export const LowCredibilityContractRiskFactor: RiskFactor = {
  name: "LOW_CREDIBILITY_CONTRACT" as const,
  score: 1,
  text: "This contract was recently deployed or has very few transactions",
  subtext:
    "Be careful, especially if you believe this contract should have significant onchain history",
};

export const FirstTransferToEoaRiskFactor: RiskFactor = {
  name: "FIRST_TRANSFER_TO_EOA" as const,
  score: 1,
  text: "You have not transacted with this address before",
  subtext: "Make sure that you’re sending to the correct recipient",
};

export const KnownMaliciousRecipientRiskFactor: RiskFactor = {
  name: "KNOWN_MALICIOUS_RECIPIENT" as const,
  score: 10,
  text: "This recipient is a known malicious actor",
};

export const KnownMaliciousContractRiskFactor: RiskFactor = {
  name: "KNOWN_MALICIOUS_CONTRACT" as const,
  score: 10,
  text: "You are interacting with a known malicious contract",
};

// ERRORS - TODO revisit these scores 10 is too high
export const ErrorAssetChangeRiskFactor = {
  name: "ERROR_ASSET_CHANGE" as const,
  score: 10,
  text: "Could not compute asset changes. Exercise caution.",
};

export const ErrorRiskEvaluationRiskFactor = {
  name: "ERROR_RISK_EVALUATION" as const,
  score: 10,
  text: "Could not evaluate risk. Exercise caution.",
};

export const ErrorTransactionParsingRiskFactor = {
  name: "ERROR_TRANSACTION_PARSING" as const,
  score: 10,
  text: "Could not understand this transaction. Exercise caution.",
};

export const ErrorSignatureParsingRiskFactor = {
  name: "ERROR_SIGNATURE_PARSING" as const,
  score: 10,
  text: "Could not understand this signature. Exercise caution.",
};

export const ErrorSeaportParsingRiskFactor = {
  name: "ERROR_SEAPORT_PARSING" as const,
  score: 10,
  text: "Could not understand this Seaport signature. Exercise caution.",
};

// POSITIVE
export const ValidDappContractRestrictionRiskFactor: RiskFactor = {
  name: "VALID_DAPP_CONTRACT_RESTRICTION" as const,
  score: -1,
  text: "",
};

export const RevokeApprovalRiskFactor: RiskFactor = {
  name: "REVOKE_APPROVAL" as const,
  score: -1,
  text: "",
};

export const PersonalSignRiskFactor: RiskFactor = {
  name: "PERSONAL_SIGN" as const,
  score: -1,
  text: "",
};

export const WhitelistedUrlRiskFactor: RiskFactor = {
  name: "WHITELISTED_URL" as const,
  score: -1,
  text: "",
};
