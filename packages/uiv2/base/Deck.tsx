import { type Asset } from "shared_types";
import clsx from "clsx";
import React from "react";
import { assetUrl } from "../components/Asset/Utils";
import {
  deckImageMedia,
  deckImageRow,
  deckImageWrapper,
  nftStyles,
  tokenStyles,
} from "./Deck.css";
import { Media } from "./Media";
import { Link } from "./Text";

type AssetDeckProps = {
  assets?: Asset[];
  size?: number;
  limit?: number;
};

const typeSizeMap = {
  NATIVE: 34,
  ERC20: 34,
  ERC721: 44,
  ERC1155: 44,
};
const typeClassMap = {
  NATIVE: tokenStyles,
  ERC20: tokenStyles,
  ERC721: nftStyles,
  ERC1155: nftStyles,
};

const DeckImage = ({
  hovered,
  size,
  limit,
  idx,
  img,
  className,
  link,
  length,
}: {
  hovered: boolean;
  idx: number;
  size: number;
  className?: string | undefined;
  limit: number;
  img?: string | undefined | null;
  link?: string;
  length: number;
}) => {
  const Inner = (
    <>
      <Media
        className={clsx(deckImageMedia, className)}
        style={{
          height: size,
          width: size,
        }}
        src={img}
      />{" "}
    </>
  );
  const Body = !!link ? <Link href={link}>{Inner}</Link> : Inner;

  return (
    <div
      className={deckImageWrapper}
      style={{
        zIndex: `${idx}00`,
        transform: !hovered
          ? `translateX(0)`
          : `translateX(${-(size / 2) * (limit - (idx + 1))}px)`,
      }}
    >
      {Body}
    </div>
  );
};

const isNft = (asset: Asset) =>
  asset.type === "ERC1155" || asset.type === "ERC721";

export const AssetDeck = ({ assets, size = 44, limit = 4 }: AssetDeckProps) => {
  const [hovered, setHovered] = React.useState<boolean>(false);

  return !!assets ? (
    <div
      onMouseEnter={() => {
        if (assets.length > 1) {
          setHovered(true);
        }
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      className={deckImageRow}
    >
      {assets.slice(0, limit).map((asset, idx) => (
        <DeckImage
          hovered={hovered}
          limit={limit}
          idx={idx}
          size={typeSizeMap[asset.type]}
          img={asset.imageUrl}
          className={typeClassMap[asset.type]}
          link={isNft(asset) && assetUrl(asset) ? assetUrl(asset) : undefined}
          length={assets.length}
          key={`${idx}-${asset.contractAddress}-${asset.tokenId}`}
        ></DeckImage>
      ))}
    </div>
  ) : (
    <></>
  );
};

type DeckProps = {
  imgs?: string[];
  size?: number;
  limit?: number;
};

export const Deck = ({ imgs, size = 44, limit = 4 }: DeckProps) => {
  const [hovered, setHovered] = React.useState<boolean>(false);

  return !!imgs ? (
    <div
      onMouseEnter={() => {
        if (imgs.length > 1) {
          setHovered(true);
        }
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      className={deckImageRow}
    >
      {imgs.slice(0, limit).map((img, idx) => (
        <DeckImage
          hovered={hovered}
          size={size}
          limit={limit}
          idx={idx}
          img={img}
          className={nftStyles}
          length={imgs.length}
          key={`${idx}-${img}`}
        ></DeckImage>
      ))}
    </div>
  ) : (
    <></>
  );
};
