import { ErrorBoundary } from "react-error-boundary";
import "./App.css";
import { ErrorBoundaryTxErrorView, TxErrorView } from "./components/TxError";
import { Box } from "./components/layout/Box";
import { Spinner } from "./components/common/Spinner/Spinner";
import { StandardView } from "./StandardModeView";
import { ReportView } from "./ReportModeView";
import { useAppState } from "./hooks/sharedStateContext";
import { ApproveOrReject } from "./components/common/drawer/ApproveOrReject";
import { WarningCard } from "./components/common/WarningCard";

function App() {
  const {
    request,
    parsedRequest,
    loading,
    appMode,
    backgroundGradient,
    warning,
  } = useAppState();

  const isError = !loading && (!request || !parsedRequest);
  const isWarning = !loading && !isError && warning;
  const isParsed =
    !loading && !isError && !isWarning && request && parsedRequest;

  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryTxErrorView}>
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
            {loading && (
              <>
                <Spinner /> <ApproveOrReject />
              </>
            )}
            {isWarning && <WarningCard />}
            {isError && (
              <TxErrorView
                analyticsMessage={"Request or parsed request was missing"}
              />
            )}
            {isParsed && <StandardView />}
          </>
        )}
      </Box>
    </ErrorBoundary>
  );
}

export default App;
