import { useAppState } from "./hooks/sharedStateContext";
import { SignView } from "./components/SignView";
import { TxnView } from "./components/TxnView";
import { ApproveOrReject } from "./components/common/drawer/ApproveOrReject";
import { isParsedSig, isParsedTx } from "./RPCRequestParser";
import { Box } from "./components/layout/Box";

export const StandardView = () => {
  const { parsedRequest } = useAppState();
  // Just to make the types play nice, should never be null
  if (!parsedRequest)
    throw new Error("Should never happen, missing ParsedRequest");

  return (
    <>
      <Box marginLeft="6x" marginRight="6x" marginBottom="8x">
        {isParsedTx(parsedRequest) && <TxnView txn={parsedRequest} />}
        {isParsedSig(parsedRequest) && <SignView sig={parsedRequest} />}
      </Box>
      <ApproveOrReject></ApproveOrReject>
    </>
  );
};
