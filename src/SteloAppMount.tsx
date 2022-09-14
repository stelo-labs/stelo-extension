import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import App from "./SteloApp";
import "./index.css";
import { TxErrorView } from "./components/TxError";
import { AppStateProvider } from "./hooks/appStateProvider";
import { client } from "./shared/apollo";

let requestId;
try {
  const params = new URLSearchParams(window.location.search);
  requestId = params.get("requestId");
  // Allows us to listen for onDisconnect in the serviceWorker
  chrome.runtime.connect({ name: requestId as string });
} catch (error) {
  // No requestId but need to continue
}

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AppStateProvider requestId={requestId as string}>
        {!requestId ? <TxErrorView /> : <App />}
      </AppStateProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
