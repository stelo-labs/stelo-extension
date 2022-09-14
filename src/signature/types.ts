import { SignMethod, signMethods, SteloRequest } from "../shared/types";
import { SeaportOrderSignatureRequest } from "./seaport/types";

export const signatureTypes = [...signMethods, "unknown_sign"] as const;
export type SignatureType = typeof signatureTypes[number];

/*//////////////////////////////////////////////////////////////
                         REQUEST PARSING
//////////////////////////////////////////////////////////////*/

export interface SignatureRequest extends SteloRequest {
  method: SignMethod;
  params?: Array<any>;
}

export interface PersonalSignRequest extends SignatureRequest {
  account?: string;
  method: "personal_sign";
  params: [address: string, message: string];
}

export interface EthSignRequest extends SignatureRequest {
  method: "eth_sign";
  params: [signer: string, dangerousHexString: string];
}

export interface EthSignTypedDataV1Request extends SignatureRequest {
  method: "eth_signTypedData_v1" | "eth_signTypedData";
  params: [dataArray: any[], signer: string];
}

export interface EthSignTypedDataV3Request extends SignatureRequest {
  method: "eth_signTypedData_v3";
  params: [signer: string, typedMessageJson: string];
}

export interface EthSignTypedDataV4Request extends SignatureRequest {
  method: "eth_signTypedData_v4";
  params: [signer: string, typedMessageJson: string];
}

export function isRPCMethod<T extends SteloRequest>(
  methodName: string
): (method: SteloRequest) => method is T {
  return (method: SteloRequest): method is T => {
    return (method as T)?.method === methodName;
  };
}

export const isPersonalSign = isRPCMethod<PersonalSignRequest>("personal_sign");
export const isEthSign = isRPCMethod<EthSignRequest>("eth_sign");
export const isEthSignTypedData =
  isRPCMethod<EthSignTypedDataV1Request>("eth_signTypedData");
export const isEthSignTypedDataV1 = isRPCMethod<EthSignTypedDataV1Request>(
  "eth_signTypedData_v1"
);
export const isEthSignTypedDataV3 = isRPCMethod<EthSignTypedDataV3Request>(
  "eth_signTypedData_v3"
);
export const isEthSignTypedDataV4 = isRPCMethod<EthSignTypedDataV4Request>(
  "eth_signTypedData_v4"
);

/*//////////////////////////////////////////////////////////////
                            PERSONAL
//////////////////////////////////////////////////////////////*/

export type AbstractParsedSignatureRequest = {
  type: SignatureType;
  raw: SignatureRequest;
};

export interface ParsedEthSignRequest extends AbstractParsedSignatureRequest {
  type: "eth_sign";
  raw: EthSignRequest;
  signer: string;
  hexMessage: string;
  parsedMessage: string;
}

export interface ParsedPersonalSignatureRequest
  extends AbstractParsedSignatureRequest {
  type: "personal_sign";
  raw: PersonalSignRequest;
  signer: string;
  hexMessage: string;
  parsedMessage: string;
}
export interface ParsedTypedDataV1SignatureRequest
  extends AbstractParsedSignatureRequest {
  type: "eth_signTypedData_v1" | "eth_signTypedData";
  raw: EthSignTypedDataV1Request;
  signer: string;
  parsedJson: any | undefined;
  formattedJsonString: string | undefined;
}
export interface ParsedTypedDataV3SignatureRequest
  extends AbstractParsedSignatureRequest {
  type: "eth_signTypedData_v3";
  raw: EthSignTypedDataV3Request;
  signer: string;
  parsedJson: any | undefined;
  formattedJsonString: string | undefined;
}

export interface ParsedTypedDataV4SignatureRequest
  extends AbstractParsedSignatureRequest {
  type: "eth_signTypedData_v4";
  raw: EthSignTypedDataV4Request;
  signer: string;
  parsedJson: any | undefined;
  formattedJsonString: string | undefined;
}

export interface UnknownSignatureRequest
  extends AbstractParsedSignatureRequest {
  type: "unknown_sign";
  raw: any;
}
export type ParsedSignatureRequest =
  | ParsedEthSignRequest
  | ParsedPersonalSignatureRequest
  | ParsedTypedDataV1SignatureRequest
  | ParsedTypedDataV3SignatureRequest
  | ParsedTypedDataV4SignatureRequest
  | SeaportOrderSignatureRequest
  | UnknownSignatureRequest;
