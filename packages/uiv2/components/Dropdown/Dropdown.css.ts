import { style } from "@vanilla-extract/css";
import { themeVars } from "../../css/themeContract.css";

export const dropdown = style({
  backgroundColor: themeVars.color.white,
  padding: themeVars.space["3x"],
  borderRadius: themeVars.borderRadius.md,
  boxShadow: themeVars.shadow.sm,
});

export const openable = style({
  cursor: "pointer",
});

export const dropdownIcon = style({
  height: "20px",
  width: "20px",
  marginLeft: "8px",
});

export const dropdownWrapper = style({
  paddingTop: "12px",
});

export const flip = style({
  transform: "rotate(180deg)",
});

export const openClass = style({ marginBottom: "12px" });
