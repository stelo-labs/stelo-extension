import { useEffect } from "react";
import { ParsedTypedDataV4SignatureRequest } from "../../../signature/types";
import Stack from "../../layout/Stack";
import { Hero } from "../../common/Hero";
import { MessageCard } from "../common/MessageCard";
import { AnalyticsEvent, useAppState } from "../../../hooks/sharedStateContext";
import { RiskFactors } from "../../common/RiskFactorsCard";

type SignTypedDataV4ComponentProps = {
  sig: ParsedTypedDataV4SignatureRequest;
};

export const SignTypedDataV4Component = ({
  sig,
}: SignTypedDataV4ComponentProps) => {
  const { createEvent, riskResult } = useAppState();
  useEffect(() => createEvent(AnalyticsEvent.LOAD_SUCCEEDED), []);
  return (
    <Stack space="5x">
      <Hero header={"Sign a Message"} />
      {riskResult.riskFactors.length > 0 && (
        <RiskFactors riskFactors={riskResult.riskFactors} />
      )}
      <MessageCard
        variant={"mono"}
        message={sig.formattedJsonString || sig.raw.params[1]}
      />
    </Stack>
  );
};
