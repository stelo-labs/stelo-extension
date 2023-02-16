import { type TransactionResponse } from "shared_types";
import clsx from "clsx";
import { Button } from "../../base/Button";
import { Row } from "../../base/Row";
import { Text } from "../../base/Text";
import { Stack } from "../../base/Stack";
import { useHasAssetChangeError } from "../../store";
import {
  controlsWrapper,
  highRiskControlsWrapper,
  innerRiskTable,
  riskIcon,
} from "./Footer.css";

import { useInterval } from "usehooks-ts";
import MediumRiskIcon from "./MediumRiskIcon";
import RiskIcon from "./RiskIcon";
import React from "react";
import { Dropdown, DropdownHeader } from "../Dropdown/Dropdown";

export const StandardControls = ({
  onReject,
  onContinue,
}: {
  onReject: () => void;
  onContinue: () => void;
}) => {
  const hasAssetChangeError = useHasAssetChangeError();
  return (
    <Row gap="10px" className={controlsWrapper}>
      <Button onClick={() => onReject()} color="secondary">
        Reject
      </Button>
      <Button
        color={hasAssetChangeError ? "secondary" : "primary"}
        onClick={() => onContinue()}
      >
        Continue
      </Button>
    </Row>
  );
};

export const HighRiskControls = ({
  onReject,
  onContinue,
  onViewDetails,
  state,
}: {
  onReject: () => void;
  onViewDetails: () => void;
  onContinue: () => void;
  state: "VIEW_DETAILS" | "CONTINUE";
}) => {
  return (
    <Stack
      space="10px"
      className={clsx(controlsWrapper, highRiskControlsWrapper)}
    >
      <Button onClick={() => onReject()}>Reject</Button>
      {state == "VIEW_DETAILS" ? (
        <Button color="secondary" onClick={() => onViewDetails()}>
          View Details
        </Button>
      ) : (
        <Button color="secondary" onClick={() => onContinue()}>
          Continue anyway
        </Button>
      )}
    </Stack>
  );
};
type Risk = TransactionResponse["risk"];
type RiskFactor = Risk["riskFactors"][number];

export const RiskRow = ({ risk }: { risk: RiskFactor }) => {
  return (
    <Row gap="12px">
      {risk.score >= 5 && <RiskIcon className={riskIcon}></RiskIcon>}
      {risk.score < 5 && <MediumRiskIcon className={riskIcon}></MediumRiskIcon>}
      <Stack>
        <Text weight="500" size="2x">
          {risk.text}
        </Text>
        <Text color="gray500" size="2x">
          {risk.subtext}
        </Text>
      </Stack>
    </Row>
  );
};

export const RiskFactorTable = ({
  factors,
  isExpanded,
  setIsExpanded,
}: {
  factors: RiskFactor[];
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
}) => {
  return (
    <Dropdown
      initialState={isExpanded ? "open" : "closed"}
      onToggle={(state) => {
        setIsExpanded(state === "open");
      }}
      header={
        <DropdownHeader>
          {factors.length} risk signal
          {factors.length > 1 && "s"}
        </DropdownHeader>
      }
      dropdown={
        <Stack space="12px" className={innerRiskTable}>
          {factors.map((risk, idx) => (
            <RiskRow key={idx} risk={risk}></RiskRow>
          ))}
        </Stack>
      }
    ></Dropdown>
  );
};

const Analyzing = () => {
  const [counter, setCounter] = React.useState(0);
  useInterval(() => {
    setCounter(counter + 1);
  }, 1000);

  return (
    <span>
      Analyzing Risk.
      {Array(counter % 3)
        .fill("")
        .reduce((acc, item) => {
          return acc + ".";
        }, "")}
    </span>
  );
};

export const getRiskTitle = (
  risk: Risk | undefined,
  hasAssetChangeError: boolean,
  isLoading: boolean
) => {
  if (hasAssetChangeError) return "Unable to simulate";
  if (isLoading) return <Analyzing />;
  if (!risk) return "Unknown Risks";
  switch (risk.riskScore) {
    case "LOW":
      return "Low Risk";
    case "MEDIUM":
      return "Some Risk";
    case "HIGH":
      return "High Risk";
    default:
      return "Unknown Risks";
  }
};
