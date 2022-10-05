import { useLazyQuery, useMutation } from "@apollo/client";
import { omit } from "lodash";
import React, { useEffect } from "react";
import {
  CreateEventMutation,
  DappStatusQuery,
  ParseRpcRequestQuery,
  RiskResult,
  RiskScore,
  RiskAnalysisQuery,
  RiskAnalysisQueryVariables,
  DappStatusQueryVariables,
  ParseRpcRequestQueryVariables,
  CreateEventMutationVariables,
} from "../generated/graphql";
import { popRequestForId } from "../shared/storage";
import { allSettled } from "../utils/async";
import { getGradientForRisk } from "../utils/style";
import {
  initialState,
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
  PARSE_RPC_REQUEST_QUERY,
  CREATE_ANALYTICS_EVENT_QUERY,
  DAPP_STATUS_QUERY,
  RISK_ANALYSIS_QUERY,
  setUrlCreator,
  getMassagedParams,
} from "./sharedStateContext";

const defaultRiskResult: RiskResult = {
  riskScore: RiskScore.Medium,
  riskFactors: [
    {
      score: 10,
      text: "There was an issue analyzing your transaction. Exercise caution.",
      subtext: "",
    },
  ],
};

export function AppStateProvider({
  requestId,
  children,
}: AppStateProviderProps) {
  const [state, dispatch] = React.useReducer(appStateReducer, initialState);
  const setBackgroundGradient = setBackgroundGradientCreator(dispatch);
  const setAppMode = setAppModeCreator(dispatch);
  const setRequest = setRequestCreator(dispatch);
  const setUrl = setUrlCreator(dispatch);
  const setDappInfo = setDappInfoCreator(dispatch);
  const setParsing = setParsingCreator(dispatch);
  const setLoading = setLoadingCreator(dispatch);
  const setWarning = setWarningCreator(dispatch);
  const setRiskResult = setRiskResultCreator(dispatch);
  const setParsedRequest = setParsedRequestCreator(dispatch);

  const [dappStatusQuery] =
    useLazyQuery<DappStatusQuery, DappStatusQueryVariables>(DAPP_STATUS_QUERY);
  const [parseRequestQuery] = useLazyQuery<
    ParseRpcRequestQuery,
    ParseRpcRequestQueryVariables
  >(PARSE_RPC_REQUEST_QUERY);
  const [riskAnalysisQuery] =
    useLazyQuery<RiskAnalysisQuery, RiskAnalysisQueryVariables>(
      RISK_ANALYSIS_QUERY
    );

  const [createEventMutation, _] = useMutation<
    CreateEventMutation,
    CreateEventMutationVariables
  >(CREATE_ANALYTICS_EVENT_QUERY, { ignoreResults: true });

  const createEvent = (event: AnalyticsEvent, properties?: Object) => {
    createEventMutation({
      variables: {
        data: {
          userAddress: state.request?.userAddress || "UNKNOWN",
          event: event.toString(),
          properties: {
            url: state.url,
            ...omit(state?.parsedRequest, "_raw"),
            ...state.dappInfo,
            ...state.request,
            ...(properties || {}),
          },
        },
      },
    });
  };

  useEffect(() => {
    if (!requestId) return;
    const t = async () => {
      const { request, sender } = await popRequestForId(requestId);
      const _url = new URL(sender.tab?.url || sender.url!);
      const url = _url.href;
      setUrl(url);
      setRequest(request);
      const massagedParams = getMassagedParams(request);
      await allSettled(
        async () => {
          const { data, error } = await parseRequestQuery({
            variables: {
              method: request.method,
              params: massagedParams,
              userAddress: request.userAddress,
            },
          });
          const parsedRequest =
            data?.RPCRequest?.parsedSignature ||
            data?.RPCRequest?.parsedTransaction;

          if (!parsedRequest) {
            throw new Error(`Request parsing returned null: ${error}"`);
          }
          setParsedRequest(parsedRequest);
        },
        async () => {
          const { data } = await riskAnalysisQuery({
            variables: {
              method: request.method,
              params: massagedParams,
              userAddress: request.userAddress,
              url,
            },
          });
          const riskResult = data?.RPCRequest?.risk || defaultRiskResult;
          setRiskResult(riskResult);
          setWarning(riskResult.riskScore === RiskScore.High);
          setBackgroundGradient(getGradientForRisk(riskResult.riskScore));
        },
        async () => {
          const { data } = await dappStatusQuery({ variables: { url } });
          setDappInfo({
            ...state.dappInfo,
            ...(data?.dapp || { rootUrl: _url.hostname }),
          });
        }
      );

      setLoading(false);
      setParsing(false);
    };
    t();
  }, [requestId]);

  useEffect(() => {
    if (!!state.request) createEvent(AnalyticsEvent.INITIATED);
  }, [state.request]);

  return (
    <AppStateContext.Provider
      value={{
        state: { ...state, requestId },
        dispatch,
        setBackgroundGradient,
        setAppMode,
        setRequest,
        setUrl,
        setDappInfo,
        setParsing,
        setLoading,
        setParsedRequest,
        createEvent,
        setWarning,
        setRiskResult,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}
