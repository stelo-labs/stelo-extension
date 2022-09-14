import { ExclamationCircleIcon, ExclamationIcon } from "@heroicons/react/solid";
import { Card, CardRow, Header, Separator } from "../../layout/Card";
import { themeVars } from "../../../css/sprinkles.css";
import { RiskFactor } from "../../../generated/graphql";

type RiskFactorProps = {
  riskFactors: RiskFactor[];
};

const riskFactorScoreToColor = (score: number) =>
  score >= 5 ? themeVars.colors.red : themeVars.colors.yellow;

export const RiskFactors = ({ riskFactors }: RiskFactorProps) => {
  return (
    <Card>
      <Header
        headerText="Risk Factors"
        icon={
          <ExclamationCircleIcon
            style={{
              fill: themeVars.colors.yellow,
              height: "30px",
              width: "30px",
            }}
          ></ExclamationCircleIcon>
        }
      ></Header>
      <Separator></Separator>
      {riskFactors.map((riskFactor) => (
        <CardRow
          icon={
            <ExclamationIcon
              style={{
                fill: riskFactorScoreToColor(riskFactor.score),
                height: "24px",
                width: "24px",
              }}
            ></ExclamationIcon>
          }
          text={riskFactor.text}
          subText={riskFactor.subtext}
        ></CardRow>
      ))}
    </Card>
  );
};
