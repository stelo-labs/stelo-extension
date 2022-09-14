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
  setParsingCreator,
  setRequestCreator,
  AppStateProviderProps,
  AppStateContext,
  AnalyticsEvent,
  setWarningCreator,
  setRiskResultCreator,
  setLoadingCreator,
  stringifyEthSendTransactionParams,
  PARSE_RPC_REQUEST_QUERY,
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
  const setDappInfo = setDappInfoCreator(dispatch);
  const setParsing = setParsingCreator(dispatch);
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
        setParsing(false);
        return;
      }
      if (!state.request) throw new Error("Need Request");
      const massagedRequest = stringifyEthSendTransactionParams(state.request);
      const { data: parsedRequestData, error } = await parseRequestQuery({
        variables: {
          method: state.request.method,
          params: massagedRequest.params,
          userAddress: state.request.userAddress,
        },
      });

      const parsedRequest =
        parsedRequestData?.RPCRequest?.parsedSignature ||
        parsedRequestData?.RPCRequest?.parsedTransaction;

      setParsedRequest(parsedRequest);
      setLoading(false);
      setParsing(false);
    };
    t();
  }, []);

  return (
    <AppStateContext.Provider
      value={{
        state: { ...state, requestId: "" },
        dispatch,
        setBackgroundGradient,
        setAppMode,
        setRequest,
        setDappInfo,
        setParsing,
        setLoading,
        setParsedRequest,
        setWarning,
        setRiskResult,
        createEvent,
      }}
    >
      {!state.parsing && children}
    </AppStateContext.Provider>
  );
}
