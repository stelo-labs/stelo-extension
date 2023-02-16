import { recipe, RecipeVariants } from "@vanilla-extract/recipes";
import { style, keyframes } from "@vanilla-extract/css";
import { themeVars } from "../../css/themeContract.css";
export const riskDisplay = recipe({
  base: [
    {
      padding: "8px",
      backgroundColor: "red",
      width: "64px",
      height: "64px",
      borderRadius: "50%",
      position: "relative",
    },
  ],
  variants: {
    level: {
      unknown: { background: themeVars.color.riskIconNeutral },
      low: {
        background: themeVars.color.riskIconSafe,
      },
      medium: {
        background: themeVars.color.riskIconNeutral,
      },
      high: {
        background: themeVars.color.riskIconRisky,
      },
    },
  },
  defaultVariants: { level: "high" },
});

export const question = style({
  left: "-1px",
  position: "absolute",
  right: 0,
  bottom: 0,
  top: 0,
  margin: "auto auto",
});

export type RiskDisplayVariants = RecipeVariants<typeof riskDisplay>;

export const shieldPosition = style({
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  top: 0,
  margin: "auto auto",
});

export const unsurePosition = style({
  position: "absolute",
  left: -2,
  right: 0,
  bottom: 0,
  top: 0,
  margin: "auto auto",
});

export const iconPosition = style({
  left: 0,
  position: "absolute",
  right: 0,
  bottom: 0,
  top: 0,
  margin: "auto auto",
});

/* loading animation */
const spinning = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "50%": { transform: "scale(120%) rotate(180deg)" },
  "100%": { transform: "scale(100%) rotate(360deg)" },
});

export const loadingSpinner = style({
  animation: `${spinning} 3s infinite ease-in-out`,
});
