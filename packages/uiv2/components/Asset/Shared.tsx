import { AssetChange, type TokenType } from "shared_types";
import clsx from "clsx";
import React from "react";
import { formatAmount } from "utils";
import { Container } from "../../base/Container";
import ExternalLinkIcon from "../../base/ExternalLinkIcon";
import { Media } from "../../base/Media";
import { Row } from "../../base/Row";
import { Stack } from "../../base/Stack";
import { Link, Text } from "../../base/Text";
import {
  badge,
  directionIconReceiving,
  directionIconSending,
  directionRowChildren,
  isExpandedClass as isExpandedClass,
  expandWrapper,
  nftBadge,
  drawer,
  drawerOffset,
  optionalCollectionLink,
} from "./asset.css";
import Minus from "./Minus";
import Plus from "./Plus";
import { useDirectionRowStore } from "./Store";
import { formatFloorPrice } from "./Utils";
import Verified from "./verified";

export type AssetType = "NFT" | "ERC20";

export type Direction = "in" | "out";

export type AssetChangeProps = {
  direction: Direction;
  changes: AssetChange[];
};

export type DirectionRowProps = {
  direction: Direction;
  dropdown?: React.ReactNode;
};

export const Badge = ({
  className,
  style,
  type,
  imgUrl,
}: {
  className?: string;
  style?: React.CSSProperties;
  type: TokenType;
  imgUrl?: string | null;
}) => {
  return (
    <Media
      style={style}
      className={clsx(tokenTypeCSSMap[type], className)}
      src={imgUrl || ""}
    />
  );
};

const tokenTypeCSSMap: Record<TokenType, string> = {
  NATIVE: badge,
  ERC1155: nftBadge,
  ERC20: badge,
  ERC721: nftBadge,
};

const DirectionIndicator = ({ direction }: { direction: Direction }) => {
  return (
    <div
      className={
        direction == "in" ? directionIconReceiving : directionIconSending
      }
    >
      {direction == "in" ? (
        <Plus height={24} width={24}></Plus>
      ) : (
        <Minus height={24} width={24}></Minus>
      )}
    </div>
  );
};

export const DirectionRow: FC<DirectionRowProps> = ({
  direction,
  children,
  dropdown,
}) => {
  const { isOpen } = useDirectionRowStore();

  return (
    <div>
      <Container>
        <DirectionIndicator direction={direction}></DirectionIndicator>
        <Stack
          className={clsx(
            expandWrapper,
            isOpen(direction) && dropdown && isExpandedClass
          )}
        >
          <div className={directionRowChildren}>{children}</div>
        </Stack>
      </Container>
      {isOpen(direction) && !!dropdown && (
        <Row>
          <div className={drawerOffset}></div>
          <div className={drawer}>{dropdown}</div>
        </Row>
      )}
    </div>
  );
};

export const CollectionName = ({
  change,
  size,
}: {
  change: AssetChange;
  size: "sm" | "md";
}) => {
  return (
    <Row justifyContent="flex-start" gap="4px">
      <Text color="gray500" size={size == "md" ? "2x" : "1x"} weight="400">
        {change.asset.name || "NFT"}
      </Text>
      {change.asset.isVerifiedOpensea && (
        <Verified style={{ display: "inline-block" }}></Verified>
      )}
    </Row>
  );
};

/**
 * Wrap children in Link if href is valid
 * @param param0
 * @returns
 */
export const MaybeLink: FC<{
  href?: string | undefined | null;
  icon?: boolean;
}> = ({ href, icon = false, children }) => {
  if (!href) return <>{children}</>;

  return (
    <Link href={href} className={optionalCollectionLink}>
      <Row justifyContent="flex-start">
        {children} {icon && <ExternalLinkIcon />}
      </Row>
    </Link>
  );
};

export const formatTokenName = (change: AssetChange) => {
  if (!!change.asset.tokenId) {
    return `${change.asset.symbol} #${parseInt(change.asset.tokenId, 16)}`;
  }
};

export const FloorPrice = ({ change }: { change: AssetChange }) => {
  return (
    <Text size="1x" color="gray500">
      Floor Price:{" "}
      <Text as="span" weight="500">
        {formatFloorPrice(change)}
      </Text>
    </Text>
  );
};
