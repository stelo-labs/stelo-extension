import { style } from "@vanilla-extract/css";
import { themeVars } from "../../css/themeContract.css";

export const button = style({
  borderRadius: "50%",
  height: "36px",
  width: "36px",
  backgroundColor: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid #EAEAFF",
  cursor: "pointer",
});

export const navWrapper = style({
  padding: "16px 24px",
});
