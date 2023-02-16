import { style } from "@vanilla-extract/css";
import { themeVars } from "../css/themeContract.css";

const WIDTH = "413px";
const MINWIDTH = "260px";

export const mainLayout = style({
  backgroundColor: themeVars.color.background,
  position: "relative",
  margin: "0 auto",
  minHeight: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  maxWidth: WIDTH,
  minWidth: MINWIDTH,
});
export const content = style({
  display: "flex",
  flexDirection: "column",
  flex: "1 1 auto",
  padding: "16px",
  paddingTop: "0px",
});

export const extFooterPosition = style({
  position: "fixed",
  bottom: "0",
  left: "0",
  right: "0",
  minWidth: MINWIDTH,
  zIndex: "10000",
});

export const embedFooterPosition = style({
  position: "absolute",
  bottom: "0",
  left: "0",
  right: "0",
  minWidth: MINWIDTH,
  width: "100%",
  zIndex: "10000",
});
