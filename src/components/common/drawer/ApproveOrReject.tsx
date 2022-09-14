import { XIcon } from "@heroicons/react/solid";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { sendDecision } from "../../../shared/messages";
import Button, { ButtonProps } from "../../layout/Button";
import { Box } from "../../layout/Box";
import { AnalyticsEvent, useAppState } from "../../../hooks/sharedStateContext";

type ApproveOrRejectProps = {
  color?: ButtonProps["color"];
};
export const ApproveOrReject = ({ color }: ApproveOrRejectProps) => {
  const { createEvent } = useAppState();
  const { warning, setAppMode, requestId } = useAppState();
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
              createEvent(AnalyticsEvent.REJECTED);
              sendDecision({ approval: false, requestId: requestId }).then(
                async () => {
                  window.close();
                }
              );
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
              createEvent(AnalyticsEvent.APPROVED);
              sendDecision({ approval: true, requestId: requestId }).then(
                async () => {
                  window.close();
                }
              );
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
