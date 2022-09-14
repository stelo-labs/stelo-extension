import { UnknownSignComponent } from "./Unknown/UnknownSign";
import React from "react";
import {
  ParsedSignatureRequest,
  ParsedTypedDataV4SignatureRequest,
} from "../signature/types";
import { Box } from "./layout/Box";
import {
  isSeaportERC721ListingSignatureRequest,
  isSeaportRequest,
  SeaportOrderSignatureRequest,
} from "../signature/seaport/types";
import { SeaportERC721ListComponent } from "./Opensea";
import { PersonalSignComponent } from "./Sign/methods/PersonalSign";
import { SignTypedDataV4Component } from "./Sign/methods/SignTypedDataV4";
import { SignTypedDataV1Component } from "./Sign/methods/SignTypedDataV1";
import { SignTypedDataV3Component } from "./Sign/methods/SignTypedDataV3";
import { EthSignComponent } from "./Sign/methods/EthSign";

type SignViewProps = {
  sig: ParsedSignatureRequest;
};

const SignTypedDataV4Router = (
  sig: ParsedTypedDataV4SignatureRequest | SeaportOrderSignatureRequest
) => {
  if (isSeaportRequest(sig)) {
    return SeaportRouter(sig);
  } else {
    return SignTypedDataV4Component;
  }
};

const SeaportRouter = (sig: SeaportOrderSignatureRequest) => {
  if (isSeaportERC721ListingSignatureRequest(sig)) {
    return SeaportERC721ListComponent;
  } else {
    return SignTypedDataV4Component;
  }
};

export function SignView({ sig }: SignViewProps) {
  const View: React.ElementType = ((sig: ParsedSignatureRequest) => {
    switch (sig.type) {
      case "eth_sign":
        return EthSignComponent;
      case "personal_sign":
        return PersonalSignComponent;
      case "eth_signTypedData":
      case "eth_signTypedData_v1":
        return SignTypedDataV1Component;
      case "eth_signTypedData_v3":
        return SignTypedDataV3Component;
      case "eth_signTypedData_v4":
        return SignTypedDataV4Router(sig);
      default:
        return UnknownSignComponent;
    }
  })(sig);

  return (
    <Box marginTop="5x">
      <View sig={sig} />
    </Box>
  );
}
