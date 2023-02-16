import { style } from "@vanilla-extract/css";
import { themeVars } from "../../css/themeContract.css";

const iconShared = {
  display: "flex",
  alignItems: "center",
  padding: themeVars.space["1x"],
  boxShadow: themeVars.shadow.sm,
  borderRadius: themeVars.borderRadius.md,
  borderTopRightRadius: "0px",
  borderBottomRightRadius: "0px",
  borderRight: "none",
  opacity: ".9",
};
export const directionIconSending = style({
  ...iconShared,
  border: `1px solid ${themeVars.color.sending}`,
  background: themeVars.color.risky,
});

export const directionIconReceiving = style({
  ...iconShared,
  border: `1px solid ${themeVars.color.receiving}`,
  background: themeVars.color.safe,
});

export const expandWrapper = style({
  backgroundColor: themeVars.color.white,
  boxShadow: themeVars.shadow.sm,
  flexGrow: 1,
  borderTopRightRadius: themeVars.borderRadius.md,
  borderBottomRightRadius: themeVars.borderRadius.md,
});

export const isExpandedClass = style({
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  boxShadow: "none",
});
export const drawer = style({
  borderBottomLeftRadius: themeVars.borderRadius.md,
  borderBottomRightRadius: themeVars.borderRadius.md,
  backgroundColor: "white",
  boxShadow: themeVars.shadow.sm,
  clipPath: "inset(0px -5px -5px -5px)",
  flexGrow: "1",
});
export const drawerOffset = style({
  width: "38px",
});

export const directionRowChildren = style({
  display: "flex",
  width: "100%",
  flexDirection: "row",
  padding: "16px",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "transparent",
  position: "relative",
});

export const inlineBadge = style({
  height: "28px !important",
  width: "28px !important",
  position: "absolute",
  top: "20px",
  right: "20px",
});

export const badge = style({
  height: "32px",
  width: "32px",
  border: "1px solid #E6E6E7",
  borderRadius: "25px",
  filter: "drop-shadow(0px 8px 20px rgba(109, 56, 56, 0.1))",
});

export const nftBadge = style({
  borderRadius: "14px",
  height: "44px",
  width: "44px",
  border: `2px solid ${themeVars.color.gray100}`,
  filter: "drop-shadow(0px 8px 20px rgba(109, 56, 56, 0.1))",
});

export const multiAssetDropdown = style({
  padding: "24px",
  paddingTop: "6px",
});

export const optionalCollectionLink = style({
  textDecoration: "none",
});
