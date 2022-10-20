import { XIcon } from "@heroicons/react/solid";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { sendDecision } from "../../../shared/messages";
import Button from "../../layout/Button";
import { Inline } from "../../layout/Inline";
import { Box } from "../../layout/Box";
import { AnalyticsEvent, useAppState } from "../../../hooks/sharedStateContext";

type CancelOrReportProps = {
  onReport: () => void;
};

export const CancelOrReport = ({ onReport }: CancelOrReportProps) => {
  const { createEvent } = useAppState();
  const { rpcRequestId } = useAppState();
  return (
    <Box
      paddingY="4x"
      style={{ position: "fixed", bottom: "0px", width: "100%" }}
    >
      <Box position="relative" style={{ zIndex: 1000 }}>
        <Inline space="6x">
          <Button
            color="secondary"
            onClick={() => {
              createEvent(AnalyticsEvent.REJECTED);
              sendDecision({ approval: false, rpcRequestId }).then(async () => {
                window.close();
              });
            }}
          >
            <XIcon
              style={{ display: "flex", marginRight: "6px" }}
              height={18}
              width={18}
            ></XIcon>{" "}
            Close
          </Button>
          <Button
            color="destructive"
            onClick={() => {
              onReport();
              sendDecision({ approval: false, rpcRequestId }).then(async () => {
                window.close();
              });
            }}
          >
            <CheckCircleIcon
              height={24}
              width={24}
              style={{ display: "flex", marginRight: "6px" }}
            />
            Report
          </Button>
        </Inline>
      </Box>
      <Box
        style={{
          backgroundColor: "rgba(255,255,255,.80)",
          zIndex: 1,
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      ></Box>
    </Box>
  );
};
