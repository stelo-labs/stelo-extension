import React from "react";
import { CancelOrReport } from "./components/common/drawer/CancelOrReport";
import { Box } from "./components/layout/Box";
import { ReportCard } from "./components/ReportCard";
import { AnalyticsEvent, useAppState } from "./hooks/sharedStateContext";

export const ReportView = () => {
  const { dappInfo } = useAppState();
  const { createEvent } = useAppState();
  const [reportMessage, setReportMessage] = React.useState("");
  if (!dappInfo) throw new Error("Should never happen, Missing DappInfo");

  return (
    <>
      <Box marginLeft="6x" marginRight="6x" marginBottom="8x">
        <ReportCard
          dappRootUrl={dappInfo.rootUrl}
          value={reportMessage}
          onChange={(e) => {
            setReportMessage(e.target.value);
          }}
        />
      </Box>
      <CancelOrReport
        onReport={() => {
          createEvent(AnalyticsEvent.REPORTED, { reportMessage });
        }}
      ></CancelOrReport>
    </>
  );
};
