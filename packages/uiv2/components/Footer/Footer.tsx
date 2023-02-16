import { Text } from "../../base/Text";
import { RiskDisplay, RiskDisplayLevel } from "../RiskDisplay/RiskDisplay";
import {
  footerWrapper,
  riskTableWrapper,
  dappUrlClass,
  footerTextWrapper,
  nudgeRiskDisplay,
  lowRiskFooter,
  highRiskFooter,
  footerWrapperExpanded,
} from "./Footer.css";
import { type TransactionResponse } from "shared_types";
import React from "react";
import { useHasAssetChangeError, useViewStore } from "../../store";
import clsx from "clsx";
import { Row } from "../../base/Row";
import { getRootURL, isValidURL } from "utils";
import {
  getRiskTitle,
  HighRiskControls,
  RiskFactorTable,
  StandardControls,
} from "./Shared";

type Risk = TransactionResponse["risk"];
type RiskFactor = Risk["riskFactors"][number];

type FooterProps = {
  onReject: () => void;
  onContinue: () => void;
  isLoading: boolean;
  risk: Risk | undefined;
  dappUrl: string | undefined;
};

const riskFactorFooterClassMap: Record<
  "LOW" | "MEDIUM" | "HIGH",
  string | undefined
> = {
  HIGH: highRiskFooter,
  LOW: lowRiskFooter,
  MEDIUM: undefined,
};

const NAVHEIGHT = 68;

const getHeight = (isHighRisk: boolean, isExpanded: boolean) => {
  if (isHighRisk && isExpanded)
    return `${window.innerHeight - NAVHEIGHT - 210}px`;
  if (isHighRisk && !isExpanded) return `160px`;
  return "auto";
};

export const Footer = ({
  risk,
  onReject,
  onContinue,
  isLoading,
  dappUrl,
}: FooterProps) => {
  const hasAssetChangeError = useHasAssetChangeError();
  const { isFooterExpanded, setFooterExpanded } = useViewStore(
    ({ isFooterExpanded, setFooterExpanded }) => ({
      isFooterExpanded,
      setFooterExpanded,
    })
  );
  const [isHighRisk, setIsHighRisk] = React.useState<boolean>(false);
  React.useEffect(() => {
    setIsHighRisk(risk?.riskScore === "HIGH");
    setFooterExpanded(
      risk?.riskScore === "HIGH" || risk?.riskScore === "MEDIUM"
    );
  }, [risk?.riskScore]);

  // Track footer height for padding offset for scrollable content

  const riskScore = (risk?.riskScore.toLowerCase() ||
    "unknown") as RiskDisplayLevel;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
      className={clsx(
        footerWrapper,
        isHighRisk && isFooterExpanded && footerWrapperExpanded,
        risk && riskFactorFooterClassMap[risk?.riskScore]
      )}
    >
      <div style={{ flexGrow: "1" }}>
        <div
          style={{
            transition: "all .3s",
            height: getHeight(isHighRisk, isFooterExpanded),
          }}
        >
          <Row gap="8px" alignItems="center" justifyContent="flex-start">
            <RiskDisplay
              className={nudgeRiskDisplay}
              error={hasAssetChangeError}
              isLoading={isLoading}
              level={riskScore}
            ></RiskDisplay>
            <div className={footerTextWrapper}>
              <Text size="4x" weight="500">
                {getRiskTitle(risk, hasAssetChangeError, isLoading)}
              </Text>
              <Text weight="500" className={dappUrlClass}>
                {hasAssetChangeError
                  ? "Risks are unknown"
                  : isValidURL(dappUrl)
                  ? getRootURL(dappUrl)
                  : "Unknown"}
              </Text>
            </div>
          </Row>
          {hasAssetChangeError && (
            <Text size="1x" color="gray300" className={riskTableWrapper}>
              Stelo was unable to simulate the transaction. Press Continue to
              execute the transaction anyway
            </Text>
          )}

          {!hasAssetChangeError && !!risk && risk.riskFactors.length > 0 && (
            <div className={riskTableWrapper}>
              <RiskFactorTable
                isExpanded={isFooterExpanded}
                setIsExpanded={(isClosed: boolean) => {
                  setFooterExpanded(isClosed);
                }}
                factors={risk.riskFactors}
              />
            </div>
          )}
        </div>
      </div>

      {isHighRisk ? (
        <HighRiskControls
          state={isFooterExpanded ? "VIEW_DETAILS" : "CONTINUE"}
          onReject={onReject}
          onViewDetails={() => {
            setFooterExpanded(false);
          }}
          onContinue={onContinue}
        ></HighRiskControls>
      ) : (
        <StandardControls
          onReject={onReject}
          onContinue={onContinue}
        ></StandardControls>
      )}
    </div>
  );
};
