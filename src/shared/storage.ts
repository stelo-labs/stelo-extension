import { getBucket } from "@extend-chrome/storage";
import { TxRequestStorage } from "../worker/types";

/**
 * Sets up basic persistent storage can be shared between content-script, service-worker & pop-up
 * Can't be used by EthereumWrapper
 */
export const TxRequestStore = getBucket<TxRequestStorage>("txRequest");

export const popRequestForId = async (requestId: string) => {
  const txRequests = await TxRequestStore.get();
  const txRequest = txRequests[requestId];
  return txRequest;
};
