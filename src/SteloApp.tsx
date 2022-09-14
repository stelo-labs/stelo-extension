import { useEffect } from "react";
import "./App.css";
import { ErrorBoundary } from "react-error-boundary";
import { TxErrorView } from "./components/TxError";
import { Box } from "./components/layout/Box";
import { Spinner } from "./components/common/Spinner/Spinner";
import { StandardView } from "./StandardModeView";
import { ReportView } from "./ReportModeView";
import { AnalyticsEvent, useAppState } from "./hooks/sharedStateContext";
import { ApproveOrReject } from "./components/common/drawer/ApproveOrReject";
import { WarningCard } from "./components/common/WarningCard";

function Initiated({
  children,
  userAddress,
}: {
  userAddress: string | undefined;
  children: React.ReactNode;
}) {
  const { createEvent } = useAppState();
  useEffect(() => {
    if (!userAddress) return;
    createEvent(AnalyticsEvent.INITIATED);
  }, [userAddress]);
  return <>{children}</>;
}

function App() {
  const {
    request,
    parsedRequest,
    parsing,
    loading,
    appMode,
    backgroundGradient,
    warning,
  } = useAppState();

  const isParsingOrLoading = parsing || loading;
  const isError = !isParsingOrLoading && (!request || !parsedRequest);
  const isWarning = !isParsingOrLoading && !isError && warning;
  const isParsed =
    !isParsingOrLoading && !isError && !isWarning && request && parsedRequest;

  return (
    <ErrorBoundary fallback={<TxErrorView />}>
      <Initiated userAddress={request?.userAddress}>
        <Box
          background={backgroundGradient}
          overflow="hidden"
          paddingTop="4x"
          paddingBottom="9x"
          style={{ minHeight: "100vh" }}
        >
          {appMode == "report" && <ReportView />}
          {appMode == "standard" && (
            <>
              {isParsingOrLoading && (
                <>
                  <Spinner /> <ApproveOrReject />
                </>
              )}
              {isWarning && <WarningCard />}
              {isError && <TxErrorView />}
              {isParsed && <StandardView />}
            </>
          )}
        </Box>
      </Initiated>
    </ErrorBoundary>
  );
}

export default App;