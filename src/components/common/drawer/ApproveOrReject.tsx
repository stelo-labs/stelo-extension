import { XIcon } from "@heroicons/react/solid";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { sendDecision } from "../../../shared/messages";
import Button, { ButtonProps } from "../../layout/Button";
import { Box } from "../../layout/Box";
import { AnalyticsEvent, useAppState } from "../../../hooks/sharedStateContext";
import { RiskScore } from "../../../generated/graphql";

type ApproveOrRejectProps = {
  color?: ButtonProps["color"];
  error?: boolean;
};
export const ApproveOrReject = ({
  color,
  error = false,
}: ApproveOrRejectProps) => {
  const { createEvent, warning, setAppMode, rpcRequestId, riskResult } =
    useAppState();
  const isWarning = riskResult.riskScore === RiskScore.High;
  const approved = error
    ? AnalyticsEvent.APPROVED_ERROR
    : isWarning
    ? AnalyticsEvent.APPROVED_WARNING
    : AnalyticsEvent.APPROVED;
  const rejected = error
    ? AnalyticsEvent.REJECTED_ERROR
    : isWarning
    ? AnalyticsEvent.REJECTED_WARNING
    : AnalyticsEvent.REJECTED;
  return (
    <Box
      paddingY="4x"
      style={{ position: "fixed", bottom: "0px", width: "100%", zIndex: 1000 }}
    >
      <Box position="relative" style={{ zIndex: 1000 }}>
        <Box
          color="report"
          fontWeight={600}
          textAlign="center"
          marginBottom="4x"
          onClick={() => {
            setAppMode("report");
          }}
          style={{ textDecoration: "underline", cursor: "pointer" }}
        >
          Report as suspicious
        </Box>
        <Box
          display="flex"
          justifyContent={"space-around"}
          flexDirection="row"
          paddingX="5x"
        >
          <Button
            style={{ width: "156px" }}
            color="secondary"
            onClick={() => {
              createEvent(rejected);
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
            Reject
          </Button>
          <Button
            disabled={warning}
            color={color ? color : "primary"}
            onClick={() => {
              createEvent(approved);
              sendDecision({ approval: true, rpcRequestId }).then(async () => {
                window.close();
              });
            }}
          >
            <CheckCircleIcon
              height={24}
              width={24}
              style={{ display: "flex", marginRight: "6px" }}
            />
            Continue
          </Button>
        </Box>
      </Box>
      <Box
        style={{
          backgroundColor: "rgba(255,255,255,.5)",
          backdropFilter: "blur(10px)",
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
