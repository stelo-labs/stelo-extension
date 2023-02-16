import { style } from "@vanilla-extract/css";

export const deckImageRow = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

export const deckImageWrapper = style({
  transition: "transform .2s",
  marginLeft: "-12px",
  justifyContent: "center",
  display: "flex",
});

export const deckImageMedia = style({
  border: "2px solid white",
  backgroundColor: "white",
});

export const imageOverlay = style({
  position: "absolute",
  backgroundColor: "rgba(0, 0, 0, .4)",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  margin: "auto auto",
  zIndex: "2",
  color: "white",
});

export const tokenStyles = style({
  borderRadius: "50%",
  filter: "drop-shadow(0px 8px 20px rgba(109, 56, 56, 0.1))",
});

export const nftStyles = style({
  borderRadius: "8.5px",
  filter: "drop-shadow(0px 8px 20px rgba(109, 56, 56, 0.1))",
});
