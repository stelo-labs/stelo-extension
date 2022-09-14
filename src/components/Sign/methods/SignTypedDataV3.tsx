import { ParsedTypedDataV3SignatureRequest } from "../../../signature/types";
import Stack from "../../layout/Stack";
import { Hero } from "../../common/Hero";
import { MessageCard } from "../common/MessageCard";

type SignTypedDataV3ComponentProps = {
  sig: ParsedTypedDataV3SignatureRequest;
};

export const SignTypedDataV3Component = ({
  sig,
}: SignTypedDataV3ComponentProps) => {
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
