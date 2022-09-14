import { SteloRequest, UUID } from "../shared/types";

export type RequestStreamPayload = [SteloRequest, chrome.runtime.MessageSender];

export type TxRequest = {
  request: SteloRequest;
  sender: chrome.runtime.MessageSender;
};

export type TxRequestStorage = Record<UUID, TxRequest>;
