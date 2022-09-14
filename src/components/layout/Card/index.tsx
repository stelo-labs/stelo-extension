import { Separator as RadixSeparator } from "@radix-ui/react-separator";
import React from "react";
import { sprinkles } from "../../../css/sprinkles.css";
import { Box, BoxProps } from "../Box";
import { Text } from "../Text";
import { ExternalLinkIcon } from "@heroicons/react/solid";
import {
  cardClass,
  cardrowsubtext,
  cardrowtext,
  CardRowVariants,
} from "./card.css";
import ContentLoader from "react-content-loader";

export const Card = (props: BoxProps) => {
  return (
    <Box
      className={cardClass}
      style={{ transition: "all .2s" }}
      padding="2x"
      background="white"
      borderRadius="19"
      width="full"
      {...props}
    ></Box>
  );
};

type HeaderProps = {
  headerText: string;
  icon?: any;
};

type cardRowProps = {
  text: string;
  subText?: string | JSX.Element | null;
  url?: string | null;
  icon?: any;
  extra?: any;
  layout?: CardRowVariants["layout"];
};

export const Separator = () => (
  <RadixSeparator
    className={sprinkles({
      marginX: "-2x",
      marginY: "2x",
    })}
    style={{
      borderTop: "1px solid rgb(0,0,0, .05)",
    }}
  />
);

export const Header = ({ headerText, icon }: HeaderProps) => {
  return (
    <Box display="flex" alignItems="center" marginLeft="2x" paddingTop="1x">
      {icon}
      <Box marginLeft="4x">
        <Text transform="uppercase" color="gray500">
          {headerText}
        </Text>
      </Box>
    </Box>
  );
};

export const CardRow = ({
  text,
  subText,
  url,
  icon,
  layout = "standard",
  extra = null,
}: cardRowProps) => {
  return (
    <Box>
      <Box
        marginX="2x"
        display="flex"
        paddingY="3x"
        style={{
          alignItems: "center",
        }}
      >
        {icon}
        <Box marginLeft="4x" width="full">
          <Box display="flex" width="full">
            <Text
              size={layout == "standard" ? "16" : "12"}
              className={cardrowtext({ layout })}
            >
              {text}
            </Text>
            {!!extra && extra}
          </Box>
          {url && (
            <div style={{ display: "flex" }}>
              <a href={url} target="_blank" style={{ textDecoration: "none" }}>
                <Text
                  size={layout == "standard" ? "12" : "16"}
                  className={cardrowsubtext({ layout })}
                >
                  {subText}
                </Text>
              </a>
              <ExternalLinkIcon
                style={{
                  marginTop: "3px",
                  fill: "gray",
                  height: "12px",
                  width: "12px",
                  marginLeft: "5px",
                }}
              />
            </div>
          )}
          {!url && (
            <Text
              size={layout == "standard" ? "12" : "16"}
              className={cardrowsubtext({ layout })}
            >
              {subText}
            </Text>
          )}
        </Box>
      </Box>
    </Box>
  );
};

type CardContentPlaceholderProps = {
  height: number | string;
  width: string | number;
  viewport?: string;
  rows: number;
};
export const CardContentPlaceholder = (props: CardContentPlaceholderProps) => {
  return (
    <ContentLoader
      speed={2}
      width={props.width}
      height={props.height}
      viewBox={
        props.viewport ? props.viewport : `0 0 ${props.width} ${props.height} `
      }
    >
      {Array(props.rows)
        .fill(undefined)
        .map((_, i) => {
          return (
            <>
              <rect
                key={`${i}-rec1`}
                x="10"
                y={i * 40 + 20}
                height="20"
                width="20"
                r="1"
              />
              <rect
                key={`${i}-rec2`}
                x="40"
                y={i * 40 + 20}
                rx="4"
                ry="4"
                width="200"
                height="20"
              />
            </>
          );
        })}
    </ContentLoader>
  );
};
