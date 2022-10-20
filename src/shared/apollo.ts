import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  concat,
} from "@apollo/client";
import _ from "lodash";
import { serverUrl } from "../config";
import deviceId from "./deviceId";
import { log } from "./logger";

const logErrors = async (operationName: string, response: any) => {
  _(response.body.errors).forEach((error) => {
    log(`Error calling ${operationName}`, error);
  });
};

const logLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((result) => {
    const { response, headers } = operation.getContext();
    log(
      `Successfully called ${operation.operationName} ${response.status}${
        response.status !== 200 ? " " + response.body : ""
      } ${headers["stelo-rpc-request-id"]}`
    );
    logErrors(operation.operationName, response);
    return result;
  });
});

const httpLink = new HttpLink({ uri: serverUrl });

export let rpcRequestId: string;
try {
  const params = new URLSearchParams(window.location.search);
  rpcRequestId = params.get("rpcRequestId") || "missing-rpc-request-id";
  // Allows us to listen for onDisconnect in the serviceWorker
  chrome.runtime.connect({ name: rpcRequestId as string });
} catch (error) {
  // No rpcRequestId but need to continue
}

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      "stelo-extension-version": chrome.runtime.getManifest().version,
      // so we can trace logs back to a single RPC request
      "stelo-rpc-request-id": rpcRequestId,
      "stelo-device-id": deviceId, // can be an empty string while loading
    },
  }));

  return forward(operation);
});

const cache = new InMemoryCache();
const link = concat(authMiddleware, httpLink);

const linkConfig = [];
linkConfig.push(authMiddleware, logLink, httpLink);
export const client = new ApolloClient({
  cache,
  link: ApolloLink.from(linkConfig),
});
