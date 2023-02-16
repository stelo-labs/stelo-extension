import { style } from "@vanilla-extract/css";
import { themeVars } from "../../css/themeContract.css";

export const disclaimer = style({
  padding: themeVars.space["2x"],
  backgroundColor: "#F4F4FF",
  borderRadius: themeVars.borderRadius.md,
  fontSize: themeVars.fontSize["1x"],
});
