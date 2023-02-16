import { style } from "@vanilla-extract/css";
import { themeVars } from "../../css/themeContract.css";

export const personalSign = style({
  fontSize: themeVars.fontSize["3x"],
  backgroundColor: themeVars.color.white,
  borderRadius: themeVars.borderRadius.md,
  padding: themeVars.space["3x"],
  whiteSpace: "pre-wrap",
  wordWrap: "break-word",
  display: "block",
});

export const breakWordWrap = style({
  wordWrap: "break-word",
});
export const nudgeDisclaimer = style({
  marginTop: "12px",
});
