import { gql } from "@apollo/client";
import { Card, Separator, Header, CardRow } from "../layout/Card";
import {
  PhotographIcon,
  PencilIcon,
  BadgeCheckIcon,
} from "@heroicons/react/solid";
import discordIcon from "../../static/DiscordIcon.png";
import twitterIcon from "../../static/TwitterIcon.png";
import openseaIcon from "../../static/OpenseaIcon.png";

import { Box } from "../layout/Box";
import { Text } from "../layout/Text";
import {
  NftCollection721Fragment,
  NftCollection1155Fragment,
} from "../../generated/graphql";
import { Media } from "./Media";
import { startCase } from "lodash";

type NFTCollectionProps = {
  nft: NftCollection721Fragment | NftCollection1155Fragment;
};

type NFTSocialLinkProps = {
  image: string;
  text: string;
  url: string;
};

export const NFTSocialLink = ({ image, text, url }: NFTSocialLinkProps) => {
  return (
    <Box>
      <a
        href={url}
        target="_blank"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textDecoration: "none",
        }}
      >
        <Media
          src={image}
          style={{ marginBottom: "5px", height: "20px", width: "20px" }}
        ></Media>
        <Text color="gray500" size="14">
          {text}
        </Text>
      </a>
    </Box>
  );
};

export const NFTCollection = ({ nft }: NFTCollectionProps) => {
  const collectionName = startCase(nft.collectionName || undefined);
  return (
    <Card width="full">
      <Header
        headerText="NFT Collection"
        icon={
          <PhotographIcon
            style={{ fill: "#2081E2", height: "30px", width: "30px" }}
          ></PhotographIcon>
        }
      ></Header>
      <Separator />

      <CardRow
        text={collectionName || "Unknown Collection"}
        subText={`${
          !nft.openSeaIsVerified
            ? "Not verified on OpenSea"
            : "Verified on OpenSea"
        }`}
        icon={
          <PencilIcon
            style={{ fill: "gray", height: "20px", width: "20px" }}
          ></PencilIcon>
        }
        extra={
          nft.openSeaIsVerified && (
            <BadgeCheckIcon
              style={{
                fill: "#2081E2",
                height: "20px",
                width: "20px",
                marginLeft: "5px",
              }}
            />
          )
        }
      ></CardRow>

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {!!nft?.openSeaUrl && (
          <NFTSocialLink
            image={openseaIcon}
            text="OpenSea"
            url={nft.openSeaUrl}
          ></NFTSocialLink>
        )}
        {!!nft.twitterUrl && (
          <NFTSocialLink
            image={twitterIcon}
            text="Twitter"
            url={nft.twitterUrl}
          ></NFTSocialLink>
        )}
        {!!nft.discordUrl && (
          <NFTSocialLink
            image={discordIcon}
            text="Discord"
            url={nft.discordUrl}
          ></NFTSocialLink>
        )}
      </div>
    </Card>
  );
};

NFTCollection.fragments = {
  ERC721: gql`
    fragment NFTCollection721 on ERC721 {
      collectionName
      openSeaUrl
      twitterUrl
      discordUrl
      openSeaIsVerified
    }
  `,
  ERC1155: gql`
    fragment NFTCollection1155 on ERC1155 {
      collectionName
      openSeaUrl
      twitterUrl
      discordUrl
      openSeaIsVerified
    }
  `,
};
