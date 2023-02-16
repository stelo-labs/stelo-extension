// Todo: Unify these styles into one component w/ variants

import { clsx } from "clsx";
import React from "react";
import { element } from "../css/reset.css";
import { ThemeVars, themeVars } from "../css/themeContract.css";
import {
  bodyText,
  headerText,
  inlineLink,
  link,
  subtext,
  textRecipe,
} from "./Text.css";

export const HeaderText: FC = ({ children }) => {
  return <h1 className={clsx(element.h1, headerText)}>{children}</h1>;
};

export const HeaderSubtext: FC = ({ children }) => {
  return <h5 className={clsx(element.h1, subtext)}>{children}</h5>;
};

export const BodyText: FC = ({ children }) => {
  return <p className={clsx(element.h1, bodyText)}>{children}</p>;
};

export const Title: FC<{ style?: React.CSSProperties }> = ({
  children,
  style,
}) => {
  return (
    <Text weight="400" size="3x" style={{ paddingLeft: "8px", ...style }}>
      {children}
    </Text>
  );
};

export const Link: FC<{ href: string; className?: string }> = ({
  href,
  children,
  className,
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={(event) => {
        event.stopPropagation();
      }}
      className={clsx(element.h1, bodyText, link, className)}
    >
      {children}
    </a>
  );
};
export const InlineLink: FC<{ href: string }> = ({ href, children }) => (
  <Link className={inlineLink} href={href}>
    {children}
  </Link>
);

type TextProps = {
  style?: React.CSSProperties;
  size?: keyof ThemeVars["fontSize"];
  weight?: "400" | "500" | "600" | "700";
  color?: keyof ThemeVars["color"];
  as?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5";
} & Omit<React.HTMLAttributes<HTMLParagraphElement>, "color">;

//TODO: pull these attributes into sprinkles

export const Text: FC<TextProps> = ({
  children,
  style,
  size = "1x",
  color = "black",
  weight,
  className,
  as = "p",
  ...rest
}) => {
  return React.createElement(
    as,
    {
      className: clsx(element.h1, textRecipe(), className),
      style: {
        ...style,
        fontSize: themeVars.fontSize[size],
        fontWeight: weight,
        color: themeVars.color[color],
      },
      ...rest,
    },
    children
  );
};
