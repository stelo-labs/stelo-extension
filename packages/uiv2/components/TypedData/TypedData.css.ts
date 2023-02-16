import { style } from "@vanilla-extract/css";
export const typedDataValue = style({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  flexGrow: "1",
  width: "50%",
  textAlign: "right",
});

export const typedDataLabel = style({ flexGrow: "1", width: "50%" });

export const nestedContainer = style({
  borderLeft: "1px solid black",
  paddingLeft: "12px",
  paddingRight: "0",
});

export const objectTitle = style({
  marginBottom: "12px",
});

export const arrayNode = style({
  marginBottom: "12px",
  marginTop: "12px",
});
