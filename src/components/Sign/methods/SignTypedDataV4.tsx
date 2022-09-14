import { ParsedTypedDataV4SignatureRequest } from "../../../signature/types";
import Stack from "../../layout/Stack";
import { Hero } from "../../common/Hero";
import { MessageCard } from "../common/MessageCard";

type SignTypedDataV4ComponentProps = {
  sig: ParsedTypedDataV4SignatureRequest;
};

export const SignTypedDataV4Component = ({
  sig,
}: SignTypedDataV4ComponentProps) => {
  return (
    <Stack space="5x">
      <Hero header={"Sign a Message"} />
      <MessageCard
        variant={"mono"}
        message={sig.formattedJsonString || sig.raw.params[1]}
      />
    </Stack>
  );
};
