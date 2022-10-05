import { gql } from "@apollo/client";
import React from "react";
import { F } from "ts-toolbelt";
import { DappStatus, ListStatus } from "../components/common/DappInfo";
import { BoxProps } from "../components/layout/Box";
import { RiskResult, RiskScore } from "../generated/graphql";
import { ParsedRPCRequest } from "../RPCRequestParser";
import { SteloRequest } from "../shared/types";

/*//////////////////////////////////////////////////////////////
                             QUERIES
//////////////////////////////////////////////////////////////*/

export const PARSE_RPC_REQUEST_QUERY = gql`
  query ParseRPCRequest(
    $method: String!
    $params: [String!]!
    $userAddress: String
  ) {
    RPCRequest(method: $method, params: $params, userAddress: $userAddress) {
      parsedSignature
      parsedTransaction
    }
  }
`;

export const RISK_ANALYSIS_QUERY = gql`
  query RiskAnalysis(
    $method: String!
    $params: [String!]!
    $userAddress: String
    $url: String!
  ) {
    RPCRequest(method: $method, params: $params, userAddress: $userAddress) {
      risk(url: $url) {
        riskScore
        riskFactors {
          score
          text
          subtext
        }
      }
    }
  }
`;
export const CREATE_ANALYTICS_EVENT_QUERY = gql`
  mutation CreateEvent($data: EventInputType!) {
    createEvent(data: $data)
  }
`;

export const DAPP_STATUS_QUERY = gql`
  query DappStatus($url: String!) {
    dapp(url: $url) {
      rootUrl
      approvalStatus
      allowedContracts {
        id
      }
    }
  }
`;

/*//////////////////////////////////////////////////////////////
                              STATE
//////////////////////////////////////////////////////////////*/

export const defaultDappStatus = {
  rootUrl: "Unknown Website",
  approvalStatus: "UNKNOWN" as ListStatus,
  allowedContracts: [],
};

export const AppModes = ["standard", "report"];
export type AppMode = typeof AppModes[number];

export type AppState = {
  backgroundGradient: BoxProps["background"];
  appMode: AppMode;
  requestId: string;
  url: string;
  request: SteloRequest | undefined;
  parsedRequest: ParsedRPCRequest | undefined;
  dappInfo: DappStatus;
  parsing: boolean;
  loading: boolean;
  warning: boolean;
  riskResult: RiskResult;
};

export const initialState: AppState = {
  appMode: "standard",
  backgroundGradient: "unknown",
  requestId: "",
  url: "unknown",
  dappInfo: defaultDappStatus,
  request: undefined,
  parsedRequest: undefined,
  parsing: true,
  loading: true,
  warning: false,
  riskResult: {
    riskScore: RiskScore.Medium,
    riskFactors: [],
  },
};

/*//////////////////////////////////////////////////////////////
                               ACTIONS
  //////////////////////////////////////////////////////////////*/

export enum AnalyticsEvent {
  INITIATED = "INITIATED",
  LOAD_SUCCEEDED = "LOAD_SUCCEEDED",
  LOAD_FAILED = "LOAD_FAILED",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  CLOSED = "CLOSED",
  REPORTED = "REPORTED",
  ERROR = "ERROR",
}

export type SetGradient = {
  type: "set_gradient";
  data: {
    status: AppState["backgroundGradient"];
  };
};

export type SetParsing = {
  type: "set_parsing";
  data: {
    parsing: boolean;
  };
};

export type SetLoading = {
  type: "set_loading";
  data: {
    loading: boolean;
  };
};

export type SetWarning = {
  type: "set_warning";
  data: {
    warning: boolean;
  };
};

export type SetAppMode = {
  type: "set_app_mode";
  data: {
    mode: AppMode;
  };
};

export type setDappInfo = {
  type: "set_dapp_info";
  data: {
    dappInfo: DappStatus;
  };
};

export type setRequest = {
  type: "set_request";
  data: {
    request: SteloRequest;
  };
};

export type setParsedRequest = {
  type: "set_parsed_request";
  data: {
    parsedRequest: ParsedRPCRequest;
  };
};

export type SetUrl = {
  type: "set_url";
  data: {
    url: string;
  };
};

export type SetRiskResult = {
  type: "set_risk_result";
  data: {
    riskResult: RiskResult;
  };
};

export type Action =
  | SetAppMode
  | setDappInfo
  | setRequest
  | SetGradient
  | setParsedRequest
  | SetUrl
  | SetParsing
  | SetLoading
  | SetWarning
  | SetRiskResult;

export const actionCreator =
  <T extends F.Function<any[], Action>>(CreatorFN: T) =>
  (dispatch: React.Dispatch<Action>) =>
  (...args: F.Parameters<typeof CreatorFN>) => {
    dispatch(CreatorFN(...args));
  };

export const setBackgroundGradientCreator = actionCreator(
  (gradient: AppState["backgroundGradient"]) => {
    return {
      type: "set_gradient",
      data: { status: gradient },
    };
  }
);

export const setAppModeCreator = actionCreator((mode: AppState["appMode"]) => {
  return {
    type: "set_app_mode",
    data: { mode },
  };
});

export const setRequestCreator = actionCreator(
  (request: NonNullable<AppState["request"]>) => {
    return {
      type: "set_request",
      data: { request },
    };
  }
);

export const setUrlCreator = actionCreator((url: AppState["url"]) => {
  return {
    type: "set_url",
    data: { url },
  };
});

export const setDappInfoCreator = actionCreator(
  (dappInfo: NonNullable<AppState["dappInfo"]>) => {
    return {
      type: "set_dapp_info",
      data: { dappInfo },
    };
  }
);

export const setParsingCreator = actionCreator((parsing: boolean) => {
  return {
    type: "set_parsing",
    data: { parsing },
  };
});

export const setLoadingCreator = actionCreator((loading: boolean) => {
  return {
    type: "set_loading",
    data: { loading },
  };
});

export const setWarningCreator = actionCreator((warning: boolean) => {
  return {
    type: "set_warning",
    data: { warning },
  };
});

export const setRiskResultCreator = actionCreator((riskResult: RiskResult) => {
  return {
    type: "set_risk_result",
    data: { riskResult },
  };
});

export const setParsedRequestCreator = actionCreator(
  (parsedRequest: ParsedRPCRequest) => {
    return {
      type: "set_parsed_request",
      data: { parsedRequest },
    };
  }
);

/*//////////////////////////////////////////////////////////////
                               REDUCER
  //////////////////////////////////////////////////////////////*/

export const appStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "set_gradient":
      return { ...state, backgroundGradient: action.data.status };
    case "set_app_mode":
      return { ...state, appMode: action.data.mode };
    case "set_parsing":
      return { ...state, parsing: action.data.parsing };
    case "set_loading":
      return { ...state, loading: action.data.loading };
    case "set_warning":
      return { ...state, warning: action.data.warning };
    case "set_dapp_info":
      return { ...state, dappInfo: action.data.dappInfo };
    case "set_request":
      return { ...state, request: action.data.request };
    case "set_url":
      return { ...state, url: action.data.url };
    case "set_risk_result":
      return { ...state, riskResult: action.data.riskResult };
    case "set_parsed_request":
      return { ...state, parsedRequest: action.data.parsedRequest };
    default:
      return { ...state };
  }
};

/*//////////////////////////////////////////////////////////////
                             CONTEXT
//////////////////////////////////////////////////////////////*/

export type AppStateContextType = {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  setBackgroundGradient: F.Return<typeof setBackgroundGradientCreator>;
  setAppMode: F.Return<typeof setAppModeCreator>;
  setRequest: F.Return<typeof setRequestCreator>;
  setUrl: F.Return<typeof setUrlCreator>;
  setDappInfo: F.Return<typeof setDappInfoCreator>;
  setParsing: F.Return<typeof setParsingCreator>;
  setLoading: F.Return<typeof setLoadingCreator>;
  setWarning: F.Return<typeof setWarningCreator>;
  setRiskResult: F.Return<typeof setRiskResultCreator>;
  setParsedRequest: F.Return<typeof setParsedRequestCreator>;
  createEvent: (event: AnalyticsEvent, properties?: Object) => void;
};

export type AppStateProviderProps = {
  children: React.ReactNode;
  requestId: string;
};

export const AppStateContext =
  React.createContext<AppStateContextType | undefined>(undefined);

/*//////////////////////////////////////////////////////////////
                              HOOKS
//////////////////////////////////////////////////////////////*/

export function useAppState() {
  const context = React.useContext(AppStateContext);
  if (context === undefined) {
    throw new Error(
      "useAppState must be used within a AppStateContextProvider"
    );
  }
  const {
    state,
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
  } = context;

  return {
    ...state,
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
  };
}

/*//////////////////////////////////////////////////////////////
                              UTILS
//////////////////////////////////////////////////////////////*/

export const getMassagedParams = (request: SteloRequest) => {
  if (request.method === "eth_sendTransaction")
    return [JSON.stringify(request.params?.[0] || {})];

  // Need to do this because some websites insert a null param for no clear reason
  return request.params?.filter((p) => !!p) || [];
};
