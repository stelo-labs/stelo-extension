import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "../css/themeContract.css";

export const headerText = style({
  fontWeight: 500,
  fontFamily: themeVars.font.body,
  fontSize: "28px",
  letterSpacing: "-.01em",
});

export const subtext = style({
  color: themeVars.color.gray500,
  fontWeight: 400,
  fontFamily: themeVars.font.body,
  fontSize: themeVars.fontSize["1x"],
});

export const bodyText = style({
  color: themeVars.color.black,
  fontFamily: themeVars.font.body,
  fontWeight: 600,
  fontSize: themeVars.fontSize["2x"],
});

export const textRecipe = recipe({
  base: [
    {
      fontFamily: themeVars.font.body,
      textDecoration: "none",
    },
  ],
  variants: {},
});

export const inlineLink = style({
  color: "#7A75FF",
  fontWeight: "400",
  textDecoration: "underline !important",
});

export const link = style({
  textDecoration: "none",
  ":hover": {
    textDecoration: "underline",
  },
});
