import {
  isSignMethod,
  isTxMethod,
  type SignatureRequest,
  type TransactionRequest,
  type SignatureResponse,
  type TransactionResponse,
  type SteloRequest,
  type Transaction,
  type AnalyticsRequest,
  type SteloError,
} from "shared_types";
import { create } from "zustand";
import { fetcher } from "./fetch";
import { ANALYTICS_EVENT_URL, SIGNATURE_URL, TRANSACTION_URL } from "./urls";

const VIEWS = [
  "TRANSACTION",
  "SIGNATURE",
  "REPORT",
  "LOADING",
  "API_ERROR",
] as const;

type View = (typeof VIEWS)[number];

const MODALS = ["REPORT_SUBMITTED", undefined] as const;
type Modal = (typeof MODALS)[number];

type ErrorTracking = {
  // Store errors that get bubbled up from the UI
  runtimeError?: string;
  // Store errors that come from the API
  apiErrors?: SteloError[];
};

export type ExtensionMetadata = {
  rpcRequestId: string;
  deviceId: string;
  extensionVersion: string;
};

type ViewStore = {
  view: View;
  loading: boolean;
  isFooterExpanded: boolean;
  errorTracking: ErrorTracking;
  data?: TransactionResponse | SignatureResponse;
  viewHistory: View[];
  modal: Modal;
  request?: SteloRequest;
  extensionMetadata?: ExtensionMetadata;
  dappUrl: string | undefined;
  setFooterExpanded: (expanded: boolean) => void;
  setView: (view: View) => void;
  back: () => void;
  setModal: (modal: Modal) => void;
  createEvent: (
    event: string,
    properties?: Object,
    extensionMetadata?: ExtensionMetadata
  ) => void;
  init: (
    request: SteloRequest,
    dappUrl: string | undefined,
    extensionMetadata?: ExtensionMetadata
  ) => Promise<void>;
};

export const useViewStore = create<ViewStore>((set, get) => ({
  view: "LOADING",
  viewHistory: [],
  isFooterExpanded: false,
  errorTracking: {},
  loading: true,
  data: undefined,
  modal: undefined,
  request: undefined,
  extensionMetadata: undefined,
  dappUrl: undefined,
  setFooterExpanded: (expanded: boolean) => set({ isFooterExpanded: expanded }),
  setView: (view: View) => {
    let currentView = get().view;
    if (currentView === view) return;
    let viewHistory = get().viewHistory;
    viewHistory.push(currentView);
    set({ viewHistory, view });
  },
  back: () => {
    let viewHistory = get().viewHistory;
    let view = viewHistory.pop();
    if (view) set({ viewHistory, view });
  },
  setModal: (modal: Modal) => set({ modal }),
  createEvent: (
    event: string,
    properties?: Object,
    metadata?: ExtensionMetadata
  ) => {
    const { request, data, errorTracking, extensionMetadata, dappUrl } = get();
    fetcher<AnalyticsRequest, boolean>(
      ANALYTICS_EVENT_URL,
      {
        userId: extensionMetadata?.deviceId || "missing",
        address: request?.userAddress || "missing",
        event,
        properties: {
          request: { method: request?.method, params: request?.params },
          riskScore: data?.risk.riskScore,
          riskFactors: data?.risk.riskFactors,
          runtimeError: errorTracking.runtimeError,
          apiErrors: errorTracking.apiErrors,
          dappUrl,
          ...properties,
        },
      },
      // if metadata is passed in, use that, otherwise use the extensionMetadata from the store
      metadata || extensionMetadata
    );
  },
  init: async (request, dappUrl, extensionMetadata) => {
    try {
      set({
        view: "LOADING",
        loading: true,
        request,
        extensionMetadata,
        dappUrl,
      });
      const { createEvent } = get();
      createEvent("INITIATED");
      if (isTxMethod(request.method)) {
        // Think it would be a good idea to create a Zod resolver for Request types https://github.com/wagmi-dev/abitype#zod
        // Good candidate for OSS
        const tx = request.params?.[0] as unknown as Transaction;
        const data = await fetcher<TransactionRequest, TransactionResponse>(
          TRANSACTION_URL,
          { ...tx, url: dappUrl },
          extensionMetadata
        );
        const unrecoverableErrors = getUnrecoverableErrors(data);
        const hasUnrecoverableError = unrecoverableErrors.length > 0;
        set(({ errorTracking }) => ({
          loading: false,
          data,
          errorTracking: { ...errorTracking, apiErrors: data.errors },
          view: hasUnrecoverableError ? "API_ERROR" : "TRANSACTION",
        }));
      } else if (isSignMethod(request.method)) {
        const sig = {
          params: request.params as string[],
          method: request.method,
        };
        const data = await fetcher<SignatureRequest, SignatureResponse>(
          SIGNATURE_URL,
          { ...sig, url: dappUrl },
          extensionMetadata
        );
        const unrecoverableErrors = getUnrecoverableErrors(data);
        const hasUnrecoverableError = unrecoverableErrors.length > 0;
        set(({ errorTracking }) => ({
          loading: false,
          data,
          errorTracking: { ...errorTracking, apiErrors: data.errors },
          view: hasUnrecoverableError ? "API_ERROR" : "SIGNATURE",
        }));
      }
      createEvent("LOAD_SUCCEEDED");
    } catch (error) {
      const { createEvent } = get();
      let runtimeError = "Unknown Error";
      if (error instanceof Error) runtimeError = error.stack || error.message;
      set(({ errorTracking }) => ({
        loading: false,
        errorTracking: { ...errorTracking, runtimeError },
        view: "API_ERROR",
      }));
      createEvent("LOAD_FAILED");
    }
  },
}));

export const useEnrichRequest = () => {
  const { data, loading } = useViewStore(({ data, loading }) => ({
    data,
    loading,
  }));
  return {
    data,
    loading,
  };
};

const recoverableErrorsCodes = [
  "ASSET_CHANGE_COMPUTATION_ERR",
  "SEAPORT_METADATA_ERR",
  "RISK_EVALUATION_ERR",
  "TRANSACTION_FUNCTION_ARGS_ERR",
  "DOMAIN_CREDIBILITY_ERR",
];

export const getUnrecoverableErrors = (
  response: TransactionResponse | SignatureResponse
) => {
  return (
    response.errors?.filter(
      (error) => !recoverableErrorsCodes.includes(error.name)
    ) || []
  );
};

export const useHasAssetChangeError = () => {
  const { errorTracking } = useViewStore(({ errorTracking }) => ({
    errorTracking,
  }));
  return !!errorTracking.apiErrors?.find(
    (error) => error.name === "ASSET_CHANGE_COMPUTATION_ERR"
  );
};

export const useHasSeaportMetadataError = () => {
  const { errorTracking } = useViewStore(({ errorTracking }) => ({
    errorTracking,
  }));
  return !!errorTracking.apiErrors?.find(
    (error) => error.name === "SEAPORT_METADATA_ERR"
  );
};

export const useHasTransactionFunctionArgsError = () => {
  const { errorTracking } = useViewStore(({ errorTracking }) => ({
    errorTracking,
  }));
  return !!errorTracking.apiErrors?.find(
    (error) => error.name === "TRANSACTION_FUNCTION_ARGS_ERR"
  );
};

export const useRisk = () => {
  return useViewStore(({ data }) => data?.risk);
};

export const useAssetChanges = () => {
  const { data } = useViewStore(({ data }) => ({ data }));
  return data?.assetChanges || [];
};
