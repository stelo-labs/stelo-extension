/**
 * There will only be one instance of the service-worker running per stelo chrome-extension
 */

import NotificationManager from "./NotificationsManager";
import {
  requestStream,
  decisionStream,
  sendDecisionToCS,
} from "../shared/messages";
import { TxRequestStore } from "../shared/storage";
import { log } from "../shared/logger";
import { RequestStreamPayload } from "./types";
import { onboardingUrl } from "../config";

log("⭐ Stelo Service-Worker ⭐");
log("This is the background process for the Stelo Extension.");
log("Clearing Tx store during boot.");
TxRequestStore.clear();

// Initialize notification manager singleton
const notificationManager = new NotificationManager();

// On Request show popup & write tx to store
requestStream.subscribe(async (payload: RequestStreamPayload) => {
  log("RECEIVED MESSAGE", payload);
  // RequestStreamPayload (for some reason) gets serialized as an object instead of an array, explicitly making an object instead
  TxRequestStore.set({
    [payload[0].rpcRequestId]: { request: payload[0], sender: payload[1] },
  });
  await notificationManager.showPopup(payload[0].rpcRequestId!);
});

// Send Rejection if Pop-up was Closed
chrome.runtime.onConnect.addListener(async function (port) {
  // Probably a better way to do this
  const requests = await TxRequestStore.get();
  if (Object.keys(requests).indexOf(port.name) >= 0) {
    port.onDisconnect.addListener(function () {
      sendDecisionToCS([{ approval: false, rpcRequestId: port.name }, {}]);
    });
  }
});

decisionStream.subscribe(sendDecisionToCS);

chrome.runtime.onInstalled.addListener(function (details) {
  switch (details.reason) {
    case "install":
      chrome.tabs.create({ url: onboardingUrl });
      break;
    case "update":
      // First run after an update
      break;
  }
});
