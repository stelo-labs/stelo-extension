import { style } from "@vanilla-extract/css";
import { themeVars } from "../../css/themeContract.css";

export const datatableRow = style({
  fontSize: themeVars.fontSize["1x"],
  fontWeight: 400,
  display: "flex",
  justifyContent: "space-between",
});

export const datatableValue = style({
  textOverflow: "ellipsis",
});
