import { EIP_712_ORDER_TYPE, EIP_712_SEAPORT_DOMAIN } from "./constants";
import { equals } from "ramda";
import { OrderComponents } from "@opensea/seaport-js/lib/types";
import { ParsedTypedDataV4SignatureRequest } from "../types";

export type Bill = {
  listPrice: number;
  earnings: string;
  listToken: string;
  creatorFee: string;
  platformFee: string;
};
export type Expiry = {
  date: string;
};
export interface SeaportOrderSignatureRequest
  extends ParsedTypedDataV4SignatureRequest {
  parsedJson: SeaportOrder;
  eip712Type: "seaport";
}

export interface SeaportERC721ListingSignatureRequest
  extends SeaportOrderSignatureRequest {
  bill: Bill;
  expiry: Expiry;
  seaportOrderType: "erc721Listing";
}
export type SeaportOrder = {
  domain: typeof EIP_712_SEAPORT_DOMAIN;
  types: typeof EIP_712_ORDER_TYPE;
  primaryType: "OrderComponents";
  message: OrderComponents;
};
export const isSeaportERC721ListingSignatureRequest = (
  request: ParsedTypedDataV4SignatureRequest
): request is SeaportERC721ListingSignatureRequest => {
  return (
    (request as SeaportERC721ListingSignatureRequest).eip712Type == "seaport" &&
    (request as SeaportERC721ListingSignatureRequest).seaportOrderType ==
      "erc721Listing"
  );
};

export const isSeaportRequest = (
  request: ParsedTypedDataV4SignatureRequest
): request is SeaportOrderSignatureRequest => {
  return (
    equals(request.parsedJson.types, EIP_712_ORDER_TYPE) &&
    equals(request.parsedJson.domain, EIP_712_SEAPORT_DOMAIN)
  );
};

export const isSeaportERC721Listing = (
  request: SeaportOrderSignatureRequest
) => {
  return (
    request.parsedJson.message.offer.length == 1 &&
    //@ts-ignore
    parseInt(request.parsedJson.message.offer[0].itemType) == 2
  );
};
