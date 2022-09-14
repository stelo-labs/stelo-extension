import { ParsedTransaction, transactionTypes } from "./tx/types";
import { ParsedSignatureRequest, signatureTypes } from "./signature/types";

export type ParsedRPCRequest = ParsedTransaction | ParsedSignatureRequest;

export const isParsedTx = (
  request: ParsedRPCRequest
): request is ParsedTransaction => {
  return transactionTypes.includes(
    (request as ParsedTransaction)?.transactionType
  );
};
export const isParsedSig = (
  request: ParsedRPCRequest
): request is ParsedSignatureRequest => {
  return signatureTypes.includes((request as ParsedSignatureRequest)?.type);
};
