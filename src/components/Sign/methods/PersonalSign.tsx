import { useEffect } from "react";
import { ParsedPersonalSignatureRequest } from "../../../signature/types";
import Stack from "../../layout/Stack";
import { Hero } from "../../common/Hero";
import { MessageCard } from "../common/MessageCard";
import { AnalyticsEvent, useAppState } from "../../../hooks/sharedStateContext";
import { RiskFactors } from "../../common/RiskFactorsCard";

type PersonalSignComponentProps = {
  sig: ParsedPersonalSignatureRequest;
};

export const PersonalSignComponent = ({ sig }: PersonalSignComponentProps) => {
  const { createEvent, riskResult } = useAppState();
  useEffect(() => createEvent(AnalyticsEvent.LOAD_SUCCEEDED), []);
  return (
    <Stack space="5x">
      <Hero header={"Sign a Message"} />
      {riskResult.riskFactors.length > 0 && (
        <RiskFactors riskFactors={riskResult.riskFactors} />
      )}
      <MessageCard message={sig.parsedMessage} />
    </Stack>
  );
};
