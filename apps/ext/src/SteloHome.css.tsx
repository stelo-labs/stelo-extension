import { style } from "@vanilla-extract/css";
import { themeVars } from "uiv2/css/themeContract.css";

export const app = style({
  background: themeVars.color["background"],
  minWidth: "440px",
  padding: themeVars.space["3x"],
  paddingTop: "0px",
});

export const container = style({
  padding: themeVars.space["4x"],
  alignItems: "center",
  justifyContent: "space-between",
});

export const divider = style({ marginTop: "6px" });

export const row = style({
  paddingTop: themeVars.space["2x"],
  paddingBottom: themeVars.space["2x"],
  justifyContent: "space-between",
  width: "100%",
});

export const noUnderline = style({
  ":hover": {
    textDecoration: "none !important",
  },
});
