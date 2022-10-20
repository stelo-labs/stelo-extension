import { Box } from "../layout/Box";
import { Text } from "../layout/Text";
import { ApproveOrReject } from "../common/drawer/ApproveOrReject";
import { Card } from "../layout/Card";
import { AnalyticsEvent, useAppState } from "../../hooks/sharedStateContext";
import { useEffect } from "react";
import LogStore from "../../shared/LogStore";

const NoTxErrorContents = () => {
  return (
    <>
      <Text size="18">Oops... something went wrong. </Text>
      <br />
      <Text>Stelo did not receive a transaction to process.</Text>
      <br />
      <Text color="red">
        Proceed with caution. Something nefarious might be happening.
      </Text>
      <br />
    </>
  );
};

const ParsingErrorContents = () => {
  return (
    <>
      <Text size="16">We encountered an issue analyzing your transaction.</Text>
      <br />
      <Text>
        This is likely an error on our end but you should still proceed with
        caution.
      </Text>
      <br />
      <Text>
        If you still wish to forward your transaction to your wallet, click
        Continue.
      </Text>
    </>
  );
};

const ErrorBase: React.FC = (props) => {
  return (
    <Box
      background={"unknown"}
      overflow="hidden"
      paddingTop="8x"
      paddingX="6x"
      paddingBottom="9x"
      style={{ minHeight: "100vh" }}
    >
      <Box width="full" textAlign="center" style={{ fontSize: "120px" }}>
        🤷
      </Box>
      <Card padding="4x">{props.children}</Card>
    </Box>
  );
};

export const ErrorBoundaryTxErrorView = ({ error }: { error: Error }) => {
  return <TxErrorView analyticsMessage={error.message} />;
};

export const TxErrorView = ({
  analyticsMessage,
}: {
  analyticsMessage: string;
}) => {
  const { rpcRequestId, setWarning } = useAppState();
  const { createEvent } = useAppState();
  useEffect(() => {
    setWarning(false);
    createEvent(AnalyticsEvent.ERROR, {
      message: analyticsMessage,
      logs: LogStore.logs,
    });
  }, []);
  return (
    <>
      <ErrorBase>
        {rpcRequestId ? <ParsingErrorContents /> : <NoTxErrorContents />}
      </ErrorBase>
      {rpcRequestId && <ApproveOrReject color={"tertiary"} error={true} />}
    </>
  );
};
