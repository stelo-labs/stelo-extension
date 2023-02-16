import clsx from "clsx";
import Checkmark from "./Checkmark";
import Exclamation from "./Exclamation";
import Question from "./Question";
import Unsure from "./Unsure";
import {
  RiskDisplayVariants,
  riskDisplay,
  shieldPosition,
  iconPosition,
  question,
  unsurePosition,
  loadingSpinner,
} from "./RiskDisplay.css";

import Shield from "./Shield";
import { themeVars } from "../../css/themeContract.css";
import { Spinner } from "../../base/Spinner";
import Loading from "./Loading";
type RiskDisplayProps = {
  error?: boolean;
  isLoading?: boolean;
} & RiskDisplayVariants;

const Icon = ({ level }: RiskDisplayProps) => {
  switch (level) {
    case "high":
      return <Exclamation className={iconPosition}></Exclamation>;
    case "medium":
      return (
        <Exclamation
          className={iconPosition}
          stroke={themeVars.color["gray500"]}
        ></Exclamation>
      );
    case "low":
      return <Checkmark className={iconPosition}></Checkmark>;
    case "unknown":
      return <Question className={question}></Question>;
    default:
      return <></>;
  }
};
export type RiskDisplayLevel = NonNullable<RiskDisplayProps["level"]>;

export const RiskDisplay: React.FC<
  RiskDisplayProps & { className?: string }
> = ({ level, isLoading, error, className }) => {
  return (
    <div className={clsx(riskDisplay({ level }), className)}>
      {error && <Unsure className={unsurePosition} />}
      {isLoading && (
        <Loading
          height={"32px"}
          width={"32px"}
          className={clsx(loadingSpinner, shieldPosition)}
        />
      )}
      {!isLoading && !error && (
        <>
          <Shield className={shieldPosition}></Shield>
          <Icon level={level}></Icon>
        </>
      )}
    </div>
  );
};
