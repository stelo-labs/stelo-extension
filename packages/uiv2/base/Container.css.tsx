import { themeVars } from "../css/themeContract.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  borderRadius: themeVars.borderRadius.md,
  width: "100%",
  boxSizing: "border-box",
  backgroundColor: themeVars.color.white,
  boxShadow: themeVars.shadow.sm,
  flexGrow: 1,
  borderTopRightRadius: themeVars.borderRadius.md,
  borderBottomRightRadius: themeVars.borderRadius.md,
});
