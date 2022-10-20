import { useEffect } from "react";
import Stack from "../layout/Stack";
import { Hero } from "../common/Hero";
import { gql, useQuery } from "@apollo/client";
import { OpenSeaListingQuery } from "../../generated/graphql";
import { Spinner } from "../common/Spinner/Spinner";
import { BigNumber, utils } from "ethers";
import { NFTCollection, Value } from "../common";
import { OpenSeaListingCard } from "./common/OpenSeaListingCard";
import { log } from "../../shared/logger";
import { AnalyticsEvent, useAppState } from "../../hooks/sharedStateContext";
import { SeaportERC721ListingSignatureRequest } from "../../signature/seaport/types";
import { RiskFactors } from "../common/RiskFactorsCard";

type OpenSeaComponentProps = {
  sig: SeaportERC721ListingSignatureRequest;
};

// TODO: support ERC1155
const OPENSEA_LISTING_QUERY = gql`
  query OpenSeaListing(
    $toAddress: String!
    $contractAddress: String!
    $tokenId: String!
  ) {
    web3Account(id: $toAddress) {
      nfts(contractAddress: $contractAddress, tokenId: $tokenId) {
        media
      }
    }
    erc721(id: $contractAddress) {
      ...NFTCollection721
    }
  }
  ${NFTCollection.fragments.ERC721}
`;

export const SeaportERC721ListComponent = ({ sig }: OpenSeaComponentProps) => {
  const { createEvent, riskResult } = useAppState();
  const { loading, error, data } = useQuery<OpenSeaListingQuery>(
    OPENSEA_LISTING_QUERY,
    {
      variables: {
        toAddress: sig.signer,
        contractAddress: sig.parsedJson.message.offer[0].token,
        tokenId: utils.hexZeroPad(
          BigNumber.from(
            sig.parsedJson.message.offer[0].identifierOrCriteria
          ).toHexString(),
          32
        ),
      },
    }
  );
  const erc721 = data?.erc721;
  const account = data?.web3Account;

  useEffect(() => {
    if (!loading) {
      if (!data) createEvent(AnalyticsEvent.LOAD_FAILED);
      else createEvent(AnalyticsEvent.LOAD_SUCCEEDED);
      if (error) log(error);
    }
  }, [loading, data, error]);

  // TODO: Replace with loading shimmer cards
  if (loading) return <Spinner />;

  return (
    <Stack space="5x">
      <Hero
        images={[account?.nfts?.[0]?.media || ""]}
        header={"List"}
        subheader={`${erc721?.collectionName} #${sig.parsedJson.message.offer[0].identifierOrCriteria}`}
        BodyContent={
          <Value
            type="LISTING"
            value={sig.bill.listPrice}
            symbol={sig.bill.listToken}
          ></Value>
        }
      />
      {riskResult.riskFactors.length > 0 && (
        <RiskFactors riskFactors={riskResult.riskFactors} />
      )}
      <OpenSeaListingCard bill={sig.bill} expiry={sig.expiry} />
      {erc721 && <NFTCollection nft={erc721} />}
    </Stack>
  );
};
