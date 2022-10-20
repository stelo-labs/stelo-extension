import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import App from "./SteloApp";
import "./index.css";
import { TxErrorView } from "./components/TxError";
import { AppStateProvider } from "./hooks/appStateProvider";
import { client, rpcRequestId } from "./shared/apollo";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AppStateProvider rpcRequestId={rpcRequestId as string}>
        {!rpcRequestId ? (
          <TxErrorView
            analyticsMessage={"Missing RPC Request ID in App Mount"}
          />
        ) : (
          <App />
        )}
      </AppStateProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
