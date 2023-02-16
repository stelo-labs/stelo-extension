import {
  createGlobalThemeContract,
  createGlobalTheme,
  globalStyle,
  globalFontFace,
} from "@vanilla-extract/css";
import { modularScale } from "polished";
import "./reset.css";
const getVarNames = (object: Record<string, any>, prefix: string = "") => {
  return Object.keys(object).reduce((acc: Record<string, string>, value) => {
    acc[value] = prefix + value;
    return acc;
  }, {});
};
const fontFamily = "DM Sans";

globalFontFace(fontFamily, {
  fontWeight: 400,
  src: "url(https://fonts.gstatic.com/s/dmsans/v11/rP2Hp2ywxg089UriCZOIHTWEBlw.woff2) format('woff2')",
  fontStyle: "normal",
  fontDisplay: "auto",
});
globalFontFace(fontFamily, {
  fontWeight: 500,
  src: "url(https://fonts.gstatic.com/s/dmsans/v11/rP2Cp2ywxg089UriAWCrCBimC3YU-Ck.woff2) format('woff2')",
  fontStyle: "normal",
  fontDisplay: "auto",
});
globalFontFace(fontFamily, {
  fontWeight: 600,
  src: "url(https://fonts.gstatic.com/s/dmsans/v11/rP2Cp2ywxg089UriASitCBimC3YU-Ck.woff2) format('woff2')",
  fontStyle: "normal",
  fontDisplay: "auto",
});

const createScale = (ratio: number, base: number) => (steps: number) =>
  `${modularScale(steps, base, ratio)}px`;

const colors = {
  risky: "linear-gradient(135.67deg, #F4915A 14.16%, #F46C5A 85%)",
  riskIconRisky: "linear-gradient(151.26deg, #DA3264 9.55%, #E25846 99.97%)",
  riskIconMedium: "linear-gradient(135.67deg, #F4915A 14.16%, #F46C5A 85%);",
  riskIconSafe: "linear-gradient(151.2deg, #34E398 1.02%, #0FBF73 64.15%)",
  riskIconNeutral: "linear-gradient(151.26deg, #5E5E5E 9.56%, #828282 99.97%)",
  safe: "linear-gradient(151.2deg, #34E398 1.02%, #0FBF73 64.15%)",
  sending: "rgba(227, 111, 88, 1)",
  receiving: "rgba(17, 168, 103, 1)",
  gray50: "rgba(240, 240, 240, 0.6000000238418579)",
  gray100: "#F8F8F8",
  gray500: "#7B7D80",
  gray900: "rgba(48, 49, 54, 1)",
  purple700: "#6D68E4",
  background: "#F9F9FC",
  white: "#ffffff",
  black: "rgba(48, 49, 54, 1)",
};
const spaceScale = (step: number) => `${step * 6}px`;
const space = {
  "0x": spaceScale(0),
  "1x": spaceScale(1),
  "2x": spaceScale(2),
  "3x": spaceScale(3),
  "4x": spaceScale(4),
  "5x": spaceScale(5),
};

const fontSizes = {
  "0x": "10px",
  "1x": "14px",
  "2x": "16px",
  "3x": "20px",
  "4x": "25px",
  "5x": "31px",
  "6x": "39px",
  "7x": "49px",
  "8x": "61px",
  "9x": "76px",
  "10x": "95px ",
} as const;

// Line height roughly 150% of font size
const lineHeight = {
  "0x": "15px",
  "1x": "20px",
  "2x": "24px",
  "3x": "30px",
  "4x": "38px",
  "5x": "47px",
};

// themeVars will be able to be theme-able by the embed product
// createGlobalThemeContracts creates CSS Variables that will be consumed by sprinkes
// Themes will override the default values
export const themeVars = createGlobalThemeContract(
  {
    shadow: { sm: "shadow-sm" },
    color: getVarNames(colors),
    space: getVarNames(space, "space-"),
    fontSize: getVarNames(fontSizes),
    lineHeight: getVarNames(lineHeight, "line-height-"),
    font: {
      body: "font-body",
    },
    borderRadius: {
      sm: "sm",
      md: "md",
    },
  },
  // Prefix our CSS variables so that we don't clash accidentally locally defined vars w/ our embed product
  (value) => `stelo-${value}`
);

export type ThemeVars = typeof themeVars;
createGlobalTheme(":root", themeVars, {
  shadow: {
    sm: "0px 0px 4px rgba(50, 50, 71, 0.05), 0px 2px 6px rgba(50, 50, 71, 0.05)",
  },
  color: { ...colors },
  font: {
    body: fontFamily,
  },
  space: space,
  fontSize: fontSizes,
  lineHeight: lineHeight,
  borderRadius: {
    sm: "4px",
    md: "16px",
  },
});

globalStyle("html, body", {
  backgroundColor: themeVars.color.background,
});
