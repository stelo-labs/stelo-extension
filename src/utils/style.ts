import { BoxProps } from "../components/layout/Box";
import { RiskScore } from "../generated/graphql";

export const getGradientForRisk = (risk: RiskScore): BoxProps["background"] => {
  switch (risk) {
    case "HIGH":
      return "bad";
    case "MEDIUM":
      return "unknown";
    case "LOW":
      return "good";
    default:
      return "unknown";
  }
};
