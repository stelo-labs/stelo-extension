import { ExtensionMetadata } from "./store";

// Does not do any actual schema validation
export function fetcher<R, T>(
  url: URL,
  data: R,
  extensionMetadata?: ExtensionMetadata
) {
  let metatadataHeaders = {};
  if (!!extensionMetadata)
    metatadataHeaders = {
      "stelo-extension-version": extensionMetadata.extensionVersion,
      "stelo-rpc-request-id": extensionMetadata.rpcRequestId,
      "stelo-device-id": extensionMetadata.deviceId,
    };
  return fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...metatadataHeaders,
    },
    body: JSON.stringify(data),
  }).then((res) => res.json()) as Promise<T>;
}
