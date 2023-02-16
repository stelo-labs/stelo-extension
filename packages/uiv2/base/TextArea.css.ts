import { style } from "@vanilla-extract/css";
import { themeVars } from "../css/themeContract.css";

export const wrapper = style({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  columnGap: "16px",
  position: "relative",
});

export const label = style({
  flex: "0 0 100px",
  fontFamily: "monospace",
});

export const input = style({
  fontSize: themeVars.fontSize["2x"],
  padding: themeVars.space["2x"],
  borderRadius: "8px",
  backgroundColor: themeVars.color.gray50,
  border: "1px solid #E5E5E5",
  width: "100%",
  flex: "1 auto",
});
