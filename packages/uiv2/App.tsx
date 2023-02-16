import { TransactionView, SignatureView, ReportView } from "./views";
import "./css/globalStyles.css";
import { ExtensionMetadata, useEnrichRequest, useViewStore } from "./store";
import React from "react";
import { Nav } from "./components/Nav/Nav";
import { Footer } from "./components/Footer/Footer";
import { Main } from "./layout/main";
import {
  type SignatureResponse,
  type TransactionResponse,
  type SteloRequest,
} from "shared_types";
import { Spinner } from "./base/Spinner";
import { ErrorView } from "./views/ErrorView/ErrorView";
import { ReportFooter } from "./components/Footer/ReportFooter";
import { ErrorFooter } from "./components/Footer/ErrorFooter";

export type Mode = "EMBED" | "EXT";
type AppProps = {
  request: SteloRequest;
  controls?: {
    onReject: () => void;
    onContinue: () => void;
  };

  mode?: Mode;
  dappUrl?: string;
  extensionMetadata?: ExtensionMetadata;
};

export const App = ({
  request,
  controls,
  mode = "EMBED",
  dappUrl,
  extensionMetadata,
}: AppProps) => {
  let { view, init, createEvent } = useViewStore(
    ({ view, setView, init, createEvent }) => ({
      view,
      setView,
      init,
      createEvent,
    })
  );
  const { data } = useEnrichRequest();
  React.useEffect(() => {
    init(request, dappUrl, extensionMetadata);
  }, [request.method, JSON.stringify(request.params)]);

  return (
    <Main
      mode={mode}
      nav={<Nav showControls={mode == "EXT"}></Nav>}
      footer={
        <>
          {!controls ? (
            <></>
          ) : view === "REPORT" ? (
            <ReportFooter dappUrl={dappUrl}></ReportFooter>
          ) : view === "API_ERROR" ? (
            <ErrorFooter
              onContinue={() => {
                createEvent("ERROR_APPROVED");
                controls?.onContinue();
              }}
              onReject={() => {
                createEvent("ERROR_REJECTED");
                controls?.onReject();
              }}
            ></ErrorFooter>
          ) : (
            <Footer
              dappUrl={dappUrl}
              risk={data?.risk}
              isLoading={view === "LOADING"}
              onContinue={() => {
                createEvent("APPROVED");
                controls?.onContinue();
              }}
              onReject={() => {
                createEvent("REJECTED");
                controls?.onReject();
              }}
            ></Footer>
          )}
        </>
      }
    >
      {view === "TRANSACTION" && (
        <TransactionView
          enrichedTx={data! as TransactionResponse}
        ></TransactionView>
      )}
      {view === "SIGNATURE" && (
        <SignatureView sig={data as SignatureResponse} />
      )}
      {view === "REPORT" && <ReportView />}
      {view === "LOADING" && (
        <div>
          <Spinner />
        </div>
      )}
      {view === "API_ERROR" && <ErrorView />}
    </Main>
  );
};
