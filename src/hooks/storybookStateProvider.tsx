import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { ParseRpcRequestQuery } from "../generated/graphql";
import {
  initialState,
  AppState,
  appStateReducer,
  setAppModeCreator,
  setBackgroundGradientCreator,
  setDappInfoCreator,
  setParsedRequestCreator,
  setRequestCreator,
  AppStateProviderProps,
  AppStateContext,
  AnalyticsEvent,
  setWarningCreator,
  setRiskResultCreator,
  setLoadingCreator,
  getMassagedParams,
  PARSE_RPC_REQUEST_QUERY,
  setUrlCreator,
} from "./sharedStateContext";
// Need to figure out how to mock `popRequestForId` than we can remove this

export function StorybookStateProvider({
  children,
  ...partialState
}: AppStateProviderProps & Partial<AppState>) {
  const [parseRequestQuery] = useLazyQuery<ParseRpcRequestQuery>(
    PARSE_RPC_REQUEST_QUERY
  );

  const [state, dispatch] = React.useReducer(appStateReducer, {
    ...initialState,
    ...partialState,
  });
  const setBackgroundGradient = setBackgroundGradientCreator(dispatch);
  const setAppMode = setAppModeCreator(dispatch);
  const setRequest = setRequestCreator(dispatch);
  const setUrl = setUrlCreator(dispatch);
  const setDappInfo = setDappInfoCreator(dispatch);
  const setLoading = setLoadingCreator(dispatch);
  const setParsedRequest = setParsedRequestCreator(dispatch);
  const setWarning = setWarningCreator(dispatch);
  const setRiskResult = setRiskResultCreator(dispatch);
  const createEvent = (
    event: AnalyticsEvent,
    properties?: Object | undefined
  ) => {};
  useEffect(() => {
    const t = async () => {
      if (state.parsedRequest) {
        setLoading(false);
        return;
      }
      if (!state.request) throw new Error("Need Request");
      const massagedParams = getMassagedParams(state.request);
      const { data } = await parseRequestQuery({
        variables: {
          method: state.request.method,
          params: massagedParams,
          userAddress: state.request.userAddress,
        },
      });

      const parsedRequest =
        data?.RPCRequest?.parsedSignature ||
        data?.RPCRequest?.parsedTransaction;

      setParsedRequest(parsedRequest);
      setLoading(false);
    };
    t();
  }, []);

  return (
    <AppStateContext.Provider
      value={{
        state: { ...state, rpcRequestId: "" },
        dispatch,
        setBackgroundGradient,
        setAppMode,
        setRequest,
        setUrl,
        setDappInfo,
        setLoading,
        setParsedRequest,
        setWarning,
        setRiskResult,
        createEvent,
      }}
    >
      {!state.loading && children}
    </AppStateContext.Provider>
  );
}
