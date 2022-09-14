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
  stringifyEthSendTransactionParams,
  RISK_ANALYSIS_QUERY,
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
  const setDappInfo = setDappInfoCreator(dispatch);
  const setParsing = setParsingCreator(dispatch);
  const setLoading = setLoadingCreator(dispatch);
  const setWarning = setWarningCreator(dispatch);
  const setRiskResult = setRiskResultCreator(dispatch);
  const setParsedRequest = setParsedRequestCreator(dispatch);

  const [dappStatusQuery] = useLazyQuery<DappStatusQuery>(DAPP_STATUS_QUERY);
  const [parseRequestQuery] = useLazyQuery<ParseRpcRequestQuery>(
    PARSE_RPC_REQUEST_QUERY
  );
  const [riskAnalysisQuery] =
    useLazyQuery<RiskAnalysisQuery>(RISK_ANALYSIS_QUERY);

  useEffect(() => {
    if (!requestId) return;
    const t = async () => {
      const { request: req, sender } = await popRequestForId(requestId);
      const dappUrl = new URL(sender.url!).hostname;

      setRequest(req);
      const massagedRequest = stringifyEthSendTransactionParams(req);
      await allSettled(
        async () => {
          const { data: parsedRequestData, error } = await parseRequestQuery({
            variables: {
              method: req.method,
              params: massagedRequest.params,
              userAddress: req.userAddress,
              rootUrl: dappUrl,
            },
          });
          const parsedRequest =
            parsedRequestData?.RPCRequest?.parsedSignature ||
            parsedRequestData?.RPCRequest?.parsedTransaction;

          if (!parsedRequest) {
            throw new Error(`Request parsing returned null: ${error}"`);
          }
          setParsedRequest(parsedRequest);
        },
        async () => {
          const { data: riskAnalysisData, error } = await riskAnalysisQuery({
            variables: {
              method: req.method,
              params: massagedRequest.params,
              userAddress: req.userAddress,
              rootUrl: dappUrl,
            },
          });

          // Show defaultRiskResult if API call errors
          const riskResult =
            riskAnalysisData?.RPCRequest?.risk || defaultRiskResult;

          setRiskResult(riskResult);
          setWarning(riskResult.riskScore === RiskScore.High);
          setBackgroundGradient(getGradientForRisk(riskResult.riskScore));
        },
        async () => {
          const { data: fetchDappInfo } = await dappStatusQuery({
            variables: { dappRootUrl: dappUrl },
          });

          const dappInfo = {
            ...state.dappInfo,
            ...(fetchDappInfo?.dapp || {
              rootUrl: dappUrl,
            }),
          };
          setDappInfo(dappInfo);
        }
      );

      setLoading(false);
      setParsing(false);
    };
    t();
  }, [requestId]);

  const [mutateFunction, _] = useMutation<CreateEventMutation>(
    CREATE_ANALYTICS_EVENT_QUERY,
    { ignoreResults: true }
  );
  const createEvent = (event: AnalyticsEvent, properties?: Object) => {
    mutateFunction({
      variables: {
        data: {
          userAddress: state?.request?.userAddress || "UNKNOWN",
          event: event.toString(),
          properties: {
            ...omit(state?.parsedRequest, "_raw"),
            ...state.dappInfo,
            ...state?.request,
            ...(properties || {}),
          },
        },
      },
    });
  };

  return (
    <AppStateContext.Provider
      value={{
        state: { ...state, requestId },
        dispatch,
        setBackgroundGradient,
        setAppMode,
        setRequest,
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
