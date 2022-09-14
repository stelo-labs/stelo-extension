import React from "react";
import { Box, BoxProps } from "../Box";

export type TextProps = {
  id?: string;
  as?:
    | "code"
    | "div"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "label"
    | "p"
    | "span";
  children?: React.ReactNode;
  color?: BoxProps["color"];
  font?: BoxProps["fontFamily"];
  size?: BoxProps["fontSize"];
  weight?: BoxProps["fontWeight"];
  transform?: BoxProps["textTransform"];
  className?: string;
  tabIndex?: number;
  textAlign?: BoxProps["textAlign"];
  letterSpacing?: BoxProps["letterSpacing"];
  margin?: BoxProps["margin"];
  marginX?: BoxProps["margin"];
  marginY?: BoxProps["margin"];
  overflowWrap?: BoxProps["overflowWrap"];
  style?: React.CSSProperties;
};

export const Text = React.forwardRef(
  (
    {
      as = "div",
      children,
      style,
      className,
      color = "black",
      font = "body",
      id,
      size = "16",
      tabIndex,
      textAlign = "inherit",
      weight = 500,
      letterSpacing = "normal",
      margin,
      marginX,
      marginY,
      transform,
      overflowWrap = "break-word",
    }: TextProps,
    ref: React.Ref<HTMLElement>
  ) => {
    return (
      <Box
        as={as}
        style={style}
        className={className}
        color={color}
        fontFamily={font}
        fontSize={size}
        fontWeight={weight}
        textTransform={transform}
        letterSpacing={letterSpacing}
        id={id}
        ref={ref}
        tabIndex={tabIndex}
        textAlign={textAlign}
        margin={margin}
        marginX={marginX}
        marginY={marginY}
        overflowWrap={overflowWrap}
      >
        {children}
      </Box>
    );
  }
);

Text.displayName = "Text";
