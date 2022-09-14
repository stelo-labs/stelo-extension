import { ParsedPersonalSignatureRequest } from "../../../signature/types";
import Stack from "../../layout/Stack";
import { Hero } from "../../common/Hero";
import { MessageCard } from "../common/MessageCard";

type PersonalSignComponentProps = {
  sig: ParsedPersonalSignatureRequest;
};

export const PersonalSignComponent = ({ sig }: PersonalSignComponentProps) => {
  return (
    <Stack space="5x">
      <Hero header={"Sign a Message"} />
      <MessageCard message={sig.parsedMessage} />
    </Stack>
  );
};
