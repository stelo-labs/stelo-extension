/* eslint-disable sort-keys-fix/sort-keys-fix */
import { createGlobalTheme } from "@vanilla-extract/css";
import {
  createMapValueFn,
  createNormalizeValueFn,
  createSprinkles,
  defineProperties,
  RequiredConditionalValue,
} from "@vanilla-extract/sprinkles";

import { space, negativeSpace } from "./space";

import "./reset.css";

const themeContractValues = {
  colors: {
    primary: "#A4EE89",
    white: "#FFFFFF",
    black: "#343534",
    gray500: "rgba(145, 145, 145, 1)",
    gray400: "#919191",
    gray300: "#9A9A9A",
    gray200: "#DADADA",
    green300: "#58A942",
    unrecognized: "rgba(154, 154, 154, 0.16)",
    approved: "rgba(198, 255, 0, 0.16)",
    info: "#2081E2",
    sus: "rgba(255, 78, 78, 0.16)",
    beige: "#E5E5E5",
    red: "red",
    yellow: "#F6BE4F",
    listing: "#B862EC",
    report: "#EC6D62",
  },
  fonts: { sans: "'SpaceGrotesk'", body: "'SpaceGrotesk'", mono: "courier" },
  radii: {},
  shadows: {},
  gradients: {
    good: "linear-gradient(360deg, rgba(255, 255, 255, 0) 20px, rgba(198, 255, 0, 0.2) 30%, rgba(198, 255, 0, 0.5) 100%), #F5F5F5",
    bad: "linear-gradient(360deg, rgba(255, 255, 255, 0) 20px, rgba(255, 78, 78, 0.4) 30%, rgba(255, 78, 78, 0.8) 100%), #F5F5F5",
    unknown:
      "linear-gradient(360deg, rgba(255, 255, 255, 0) 20px, rgba(154, 154, 154, 0.2), 30%, rgba(154, 154, 154, 0.5) 100%), #F5F5F5",
  },
};

export type ThemeVars = typeof themeContractValues;

export const themeVars = createGlobalTheme(":root", themeContractValues);

const fraction = (numerator: number, denominator: number) =>
  `${(numerator * 100) / denominator}%`;

export const dimensions = {
  "1": "1px",
  "2": "2px",
  "4": "4px",
  "8": "8px",
  "12": "12px",
  "20": "20px",
  "24": "24px",
  "28": "28px",
  "30": "30px",
  "32": "32px",
  "34": "34px",
  "36": "36px",
  "40": "40px",
  "48": "48px",
  "54": "54px",
  "60": "60px",
  "1/2": fraction(1, 2),
  "1/3": fraction(1, 3),
  "1/4": fraction(1, 4),
  "1/5": fraction(1, 5),
  "2/3": fraction(2, 3),
  "2/5": fraction(2, 5),
  "3/4": fraction(3, 4),
  "3/5": fraction(3, 5),
  "4/5": fraction(4, 5),
  full: "100%",
  vw: "100vw",
  fit: "fit-content",
  max: "max-content",
} as const;

export const flexAlignment = ["flex-start", "flex-end", "center"] as const;
export const justifyContent = [
  ...flexAlignment,
  "space-between",
  "space-around",
] as const;

const textAlignments = ["left", "center", "inherit"] as const;

export const growTransforms = {
  grow: "scale(1.025)",
  growLg: "scale(1.1)",
} as const;

const shrinkTransforms = {
  shrink: "scale(0.95)",
  shrinkSm: "scale(0.9)",
} as const;

const transforms = {
  ...growTransforms,
  ...shrinkTransforms,
} as const;

const textTranforms = ["capitalize", "uppercase", "lowercase"] as const;

const interactionProperties = defineProperties({
  conditions: {
    base: {},
    hover: { selector: "&:hover" },
    active: { selector: "&:active" },
  },
  defaultCondition: "base",
  properties: {
    transform: transforms,
    transition: {
      default: "0.125s ease",
    },
  },
});

export const largeScreenMinWidth = 768;

const responsiveProperties = defineProperties({
  conditions: {
    smallScreen: {},
    largeScreen: {
      "@media": `screen and (min-width: ${largeScreenMinWidth}px)`,
    },
  },
  defaultCondition: "smallScreen",
  properties: {
    alignItems: flexAlignment,
    display: ["none", "block", "flex", "inline-flex"],
  },
});

export type ResponsiveValue<Value extends string | number | boolean> =
  RequiredConditionalValue<typeof responsiveProperties, Value>;

export const mapResponsiveValue = createMapValueFn(responsiveProperties);
export const normalizeResponsiveValue =
  createNormalizeValueFn(responsiveProperties);

const unresponsiveProperties = defineProperties({
  properties: {
    alignSelf: flexAlignment,
    fill: themeVars.colors,
    flexWrap: ["wrap", "nowrap"] as const,
    backgroundSize: ["cover"] as const,
    borderRadius: {
      ...themeVars.radii,
      "1": "1px",
      "6": "6px",
      "10": "10px",
      "19": "19px",
      "25%": "25%",
      full: "9999px",
    },
    borderStyle: ["solid", "none"],
    borderWidth: {
      "0": "0px",
      "1": "1px",
      "2": "2px",
      "4": "4px",
    },
    cursor: ["pointer"],
    flexDirection: ["row", "column"],
    fontFamily: themeVars.fonts,
    fontSize: {
      "12": { fontSize: "12px", lineHeight: "18px" },
      "13": { fontSize: "13px", lineHeight: "18px" },
      "14": { fontSize: "14px", lineHeight: "18px" },
      "16": { fontSize: "16px", lineHeight: "20px" },
      "18": { fontSize: "18px", lineHeight: "24px" },
      "20": { fontSize: "20px", lineHeight: "24px" },
      "23": { fontSize: "23px", lineHeight: "29px" },
      "32": { fontSize: "32px", lineHeight: "36px" },
      "50": { fontSize: "50px", lineHeight: "63px" },
    },
    fontWeight: {
      400: "400",
      500: "500",
      600: "600",
      700: "700",
      800: "800",
    },
    letterSpacing: {
      normal: "0px",
      wide: "2px",
    },
    gap: space,
    height: dimensions,
    flexBasis: [0, 1],
    flexGrow: [0, 1],
    flexShrink: [0, 1],
    justifyContent: justifyContent,
    textAlign: textAlignments,
    textTransform: textTranforms,
    marginBottom: { ...space, ...negativeSpace },
    marginLeft: { ...space, ...negativeSpace, auto: "auto" },
    marginRight: { ...space, ...negativeSpace, auto: "auto" },
    marginTop: { ...space, ...negativeSpace },
    maxWidth: dimensions,
    minWidth: dimensions,
    overflow: ["hidden"] as const,
    overflowWrap: ["break-word"] as const,
    paddingBottom: space,
    paddingLeft: space,
    paddingRight: space,
    paddingTop: space,
    position: ["absolute", "fixed", "relative"],
    right: {
      "0": "0",
    },
    userSelect: ["none"] as const,
    width: dimensions,
  } as const,
  shorthands: {
    margin: ["marginTop", "marginBottom", "marginLeft", "marginRight"],
    marginX: ["marginLeft", "marginRight"],
    marginY: ["marginTop", "marginBottom"],
    padding: ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"],
    paddingX: ["paddingLeft", "paddingRight"],
    paddingY: ["paddingTop", "paddingBottom"],
  },
});

const colorProperties = defineProperties({
  conditions: {
    base: {},
    hover: { selector: "&:hover" },
    active: { selector: "&:active" },
  },
  defaultCondition: "base",
  properties: {
    background: { ...themeVars.colors, ...themeVars.gradients },
    borderColor: themeVars.colors,
    boxShadow: themeVars.shadows,
    color: themeVars.colors,
    stroke: themeVars.colors,
  },
});

export const sprinkles = createSprinkles(
  colorProperties,
  interactionProperties,
  responsiveProperties,
  unresponsiveProperties
);
export type Sprinkles = Parameters<typeof sprinkles>[0];
