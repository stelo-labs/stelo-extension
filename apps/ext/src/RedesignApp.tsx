import { useCallback } from "react";
import { App } from "uiv2";
import { ErrorLayout } from "uiv2/views/ErrorView/ErrorView";
import { useAsync } from "./hooks/useAsync";
import { popRequestForId } from "./shared/storage";
import { sendDecision } from "./shared/messages";
import { getDeviceId } from "./shared/deviceId";
import { themeVars } from "uiv2/css/themeContract.css";
import { ErrorBoundary } from "uiv2/base/ErrorBoundary";

let rpcRequestId: string;
try {
  const params = new URLSearchParams(window.location.search);
  rpcRequestId = params.get("rpcRequestId") || "missing-rpc-request-id";
  // Allows us to listen for onDisconnect in the serviceWorker
  chrome.runtime.connect({ name: rpcRequestId });
} catch (error) {
  rpcRequestId = "missing-rpc-request-id";
}

export const RedesignApp = () => {
  const callRequest = useCallback(
    () => popRequestForId(rpcRequestId),
    [rpcRequestId]
  );

  const callDeviceId = useCallback(() => getDeviceId(), []);

  const reject = useCallback(() => {
    sendDecision({ approval: false, rpcRequestId }).then(async () => {
      window.close();
    });
  }, [rpcRequestId]);

  const approve = useCallback(() => {
    sendDecision({ approval: true, rpcRequestId }).then(async () => {
      window.close();
    });
  }, [rpcRequestId]);

  const { status: reqStatus, value: reqValue } = useAsync(callRequest, true);
  const { status: idStatus, value: idValue } = useAsync(callDeviceId, true);

  const isRequestSuccess = reqStatus === "success" && !!reqValue?.request;
  const isRequestComplete = reqStatus === "success" || reqStatus === "error";
  const isIdComplete = idStatus === "success" || idStatus === "error";
  const extensionMetadata = {
    rpcRequestId,
    deviceId: idValue || "missing",
    extensionVersion: chrome.runtime.getManifest().version,
  };

  if (isRequestSuccess && isIdComplete) {
    return (
      <div
        style={{ height: "100vh", backgroundColor: themeVars.color.background }}
      >
        <ErrorBoundary
          fallbackRender={(props) => {
            return (
              <ErrorLayout
                extensionMetadata={extensionMetadata}
                approve={approve}
                reject={reject}
                errorMessage={props.error.stack || props.error.message}
              />
            );
          }}
        >
          <App
            mode="EXT"
            request={reqValue.request}
            controls={{ onContinue: approve, onReject: reject }}
            dappUrl={reqValue.sender.url}
            extensionMetadata={extensionMetadata}
          />
        </ErrorBoundary>
      </div>
    );
  } else if (isRequestComplete && isIdComplete) {
    return (
      <div
        style={{ height: "100vh", backgroundColor: themeVars.color.background }}
      >
        <ErrorLayout
          approve={approve}
          reject={reject}
          extensionMetadata={extensionMetadata}
          errorMessage={`Could not pop RPC request for request id ${rpcRequestId}`}
        />
      </div>
    );
  } else return <div></div>;
};
