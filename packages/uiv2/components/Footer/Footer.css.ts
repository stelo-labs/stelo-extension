import { style } from "@vanilla-extract/css";
import { themeVars } from "../../css/themeContract.css";

export const footerWrapperExpanded = style({
  height: "100%",
  position: "relative",
  display: "flex",
});

export const footerWrapper = style({
  backgroundColor: themeVars.color.white,
  borderRadius: "24px 24px 0 0",
  boxShadow:
    "0px -49px 170px rgba(114, 114, 114, 0.05), 0px -10.9448px 37.9717px rgba(109, 109, 109, 0.0298054), 0px -3.25855px 11.3052px rgba(116, 116, 116, 0.0201946)",
  padding: themeVars.space["4x"],
});

export const riskTable = style({
  backgroundColor: themeVars.color.gray100,
  padding: themeVars.space["3x"],
  borderRadius: "24px",
  gap: "20px",
});

export const riskTableControls = style({
  cursor: "pointer",
});

export const innerRiskTable = style({
  borderRadius: "16px",
  backgroundColor: "white",
  alignItems: "flex-start",
});

export const riskTableWrapper = style({
  marginTop: "24px",
});

export const controlsWrapper = style({
  padding: `${themeVars.space["4x"]} 0 0px 0px`,
});

export const highRiskControlsWrapper = style({
  zIndex: 10,
});

export const reportFooterTextArea = style({ marginTop: "24px" });

export const footerTextWrapper = style({
  width: "65%",
});
export const dappUrlClass = style({
  textOverflow: "ellipsis",
  overflow: "hidden",
});
export const riskIcon = style({
  flexGrow: 0,
  flexShrink: 0,
  flexBasis: "36px",
});
export const nudgeRiskDisplay = style({
  margin: "0 8px",
});
export const lowRiskFooter = style({
  background:
    "linear-gradient(white, white) padding-box, linear-gradient(to right, #35E498, #21D185) border-box",
  border: "10px solid transparent",
  borderBottom: "0px",

  // Shift layout to account for border
  marginLeft: "-10px",
  marginRight: "-10px",

  boxShadow: "0px -6px 100px rgba(16, 191, 116, 0.1)",
});
export const highRiskFooter = style({
  background:
    "linear-gradient(white, white) padding-box, linear-gradient(to right, #D83264, #DD3D5C) border-box",
  border: "10px solid transparent",
  // Shift layout to account for border
  marginLeft: "-10px",
  marginRight: "-10px",
  boxShadow: "0px -6px 100px rgba(218, 50, 100, 0.1)",
  borderBottom: "0px",
});

// #DA3264 @ 0%
// #E25846 @ 100%
