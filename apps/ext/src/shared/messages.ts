// messages.js, used in both the background and content script
import { getMessage } from "@extend-chrome/messages";
import { SteloRequest, TxDecision } from "shared_types";
import { F } from "ts-toolbelt";

export const STELO_REQUEST_STREAM = "STELO_REQUEST";
export const STELO_DECISION_STREAM = "STELO_DECISON";

/**
 * wrap sendMessage such that it can send to contentScripts
 * @param f a send function created by the getMessage helper
 * @returns a function that will send a message to all tabs (We will need to narrow this).
 */
export const forwardMessageToContentScript = function <
  Fn extends F.Function<any, any>
>(f: Fn) {
  return (data: [F.Parameters<Fn>[0], chrome.runtime.MessageSender]) => {
    chrome.tabs.query({ windowType: "normal" }, function (tabs) {
      tabs.forEach((t) => {
        if (!t.id) return;
        f(data[0], { tabId: t.id });
      });
    });
  };
};

/**
 * Sets up message passing can be shared between content-script, service-worker & pop-up
 * Can't be used by EthereumWrapper
 */
export const [sendRequest, requestStream, waitForRequest] =
  getMessage<SteloRequest>(STELO_REQUEST_STREAM);

export const [sendDecision, decisionStream] = getMessage<TxDecision>(
  STELO_DECISION_STREAM
);
export const sendDecisionToCS = forwardMessageToContentScript(sendDecision);
