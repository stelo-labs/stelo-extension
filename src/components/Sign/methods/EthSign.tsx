import { ParsedEthSignRequest } from "../../../signature/types";
import Stack from "../../layout/Stack";
import { Hero } from "../../common/Hero";
import { MessageCard } from "../common/MessageCard";

type EthSignComponentProps = {
  sig: ParsedEthSignRequest;
};

export const EthSignComponent = ({ sig }: EthSignComponentProps) => {
  return (
    <Stack space="5x">
      <Hero header={"Sign a Message"} />
      <MessageCard message={sig.parsedMessage} />
    </Stack>
  );
};
