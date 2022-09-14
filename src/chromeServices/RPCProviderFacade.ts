import { log } from "../shared/logger";
import { v4 as uuidv4 } from "uuid";
import { EthersRequest, isIntercept } from "../shared/types";
import {
  ExternalProvider,
  isJsonRpcRequest,
  JsonRpcCallback,
  JsonRpcRequest,
  JsonRpcResponse,
} from "./types";

const isMainnet = () => {
  return window.ethereum.chainId === "0x1";
};

export class RPCProviderFacade {
  constructor() {
    if (window.ethereum) {
      log("wrapping window.ethereum");
      this.wrap(window.ethereum);
      if (!!window.ethereum?.providers?.length) {
        window.ethereum?.providers.forEach(this.wrap.bind(this));
      }
    } else {
      log("adding ethereum#initialized event listener ");
      window.addEventListener("ethereum#initialized", () => {
        log("ethereum#initialized: wrapping window.ethereum");
        this.wrap(window.ethereum);
      });
    }
  }
  wrap(provider: ExternalProvider) {
    /*//////////////////////////////////////////////////////////////
                      WRAP WINDOW.ETHEREUM METHODS
    //////////////////////////////////////////////////////////////*/

    if (provider.send) {
      log("wrapping deprecated send");
      const deprecatedProviderSend = provider.send;
      const deprecatedSend = (
        methodOrPayload: string | JsonRpcRequest,
        paramsOrCallback?: Array<unknown> | JsonRpcCallback
      ): Promise<JsonRpcResponse> | void => {
        log("triggering deprecated send");
        if (isJsonRpcRequest(methodOrPayload)) {
          let request = methodOrPayload;
          let callback = paramsOrCallback as JsonRpcCallback;
          if (isIntercept(request.method) && isMainnet()) {
            log("intercepted deprecated send");
            this.waitForDecision(request).then(async () => {
              return deprecatedProviderSend(request, callback);
            });
          } else {
            return deprecatedProviderSend(request, callback);
          }
        } else {
          let method = methodOrPayload;
          let params = paramsOrCallback as any[];

          if (isIntercept(method) && isMainnet()) {
            log("intercepted deprecated send");
            return this.waitForDecision({
              jsonrpc: "2.0",
              method,
              params,
            }).then(async () => {
              return deprecatedProviderSend(method, params);
            }) as Promise<JsonRpcResponse>;
          } else {
            return deprecatedProviderSend(method, params);
          }
        }
      };
      provider.send = deprecatedSend.bind(this);
      provider.stelo = true;
    }

    if (provider.sendAsync) {
      log("wrapping deprecated sendAsync");
      const deprecatedProviderSendAsync = provider.sendAsync;
      const deprecatedSendAsync = (
        request: JsonRpcRequest,
        callback: (error: any, response: any) => void
      ): void => {
        if (isIntercept(request.method) && isMainnet()) {
          log("intercepted deprecated sendAsync");
          this.waitForDecision(request)
            .then(async () => {
              deprecatedProviderSendAsync(request, callback);
            })
            .catch((err) => {
              callback(err, {});
            });
        } else {
          deprecatedProviderSendAsync(request, callback);
        }
      };
      provider.sendAsync = deprecatedSendAsync.bind(this);
      provider.stelo = true;
    }
    if (provider.request) {
      log("wrapping request");
      // We don't want metamask's ethereum.request externally accessible at runtime.
      // We include it in the closure of _our_ request function so that we can forward approved requests.
      const providerRequest = provider.request;
      const request = async (request: JsonRpcRequest) => {
        if (isIntercept(request.method) && isMainnet()) {
          log("intercepted request");
          return this.waitForDecision(request).then(async () => {
            return await providerRequest(request);
          });
        } else {
          return await providerRequest(request);
        }
      };
      provider.request = request.bind(this);
      provider.stelo = true;
    }
  }

  async waitForDecision(request: EthersRequest) {
    const requestId = uuidv4();
    const event = new CustomEvent("STELO", {
      detail: {
        requestId,
        ...request,
        userAddress: window.ethereum.selectedAddress,
      },
    });
    window.dispatchEvent(event);
    return new Promise((res, rej) => {
      window.addEventListener("message", (event) => {
        if (
          event.data.origin === "stelo" &&
          event.data.requestId === requestId
        ) {
          event.data.approval
            ? res(undefined)
            : rej({ message: "User Rejected Tx in Stelo" });
        }
      });
    });
  }
}
