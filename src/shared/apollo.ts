import { ApolloClient, InMemoryCache } from "@apollo/client";
import { serverUrl } from "../config";

export const client = new ApolloClient({
  uri: serverUrl,
  cache: new InMemoryCache(),
});
