import { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { SetApprovalForAllQuery } from "../../../generated/graphql";
import { ParsedERC721SetApprovalForAllTxn } from "../../../tx/types";
import { Recipient, NFTCollection, Value } from "../../common";
import { Hero } from "../../common/Hero";
import { log } from "../../../shared/logger";
import { Box } from "../../layout/Box";
import Stack from "../../layout/Stack";
import { ethToUsd } from "../../../utils/math";
import { isNull } from "lodash";
import { AnalyticsEvent, useAppState } from "../../../hooks/sharedStateContext";
import { RiskFactors } from "../../common/RiskFactorsCard";

const SET_APPROVAL_FOR_ALL_QUERY = gql`
  query SetApprovalForAll(
    $fromAddress: String!
    $contractAddress: String!
    $toAddress: String!
  ) {
    fromAccount: web3Account(id: $fromAddress) {
      nfts(contractAddress: $contractAddress) {
        media
      }
    }
    toAccount: web3Account(id: $toAddress) {
      ...Recipient
    }
    erc721(id: $contractAddress) {
      collectionName
      floorPrice
      ...NFTCollection721
    }
    ethPrice
  }
  ${Recipient.fragments}
  ${NFTCollection.fragments.ERC721}
`;

type SetApprovalForAllProps = {
  txn: ParsedERC721SetApprovalForAllTxn;
};

const getSubheader = (
  collectionName: string | undefined | null,
  nfts: any[] | undefined | null
) => {
  if (collectionName && nfts) {
    return `${nfts?.length} ${collectionName} ${
      nfts?.length > 1 ? "NFTs" : "NFT"
    }`;
  } else if (!collectionName && nfts) {
    return `${nfts?.length} ${nfts?.length > 1 ? "NFTs" : "NFT"}`;
  } else {
    return `Unknown Number of NFTs`;
  }
};

export const SetApprovalForAll = ({ txn }: SetApprovalForAllProps) => {
  const { riskResult, createEvent } = useAppState();
  const { loading, error, data } = useQuery<SetApprovalForAllQuery>(
    SET_APPROVAL_FOR_ALL_QUERY,
    {
      variables: {
        fromAddress: txn.fromAddress,
        contractAddress: txn.toAddress,
        toAddress: txn.recipientAddress,
      },
    }
  );

  const header = `${txn.approved ? "Approve" : "Revoke"} access to`;
  let nfts = data?.fromAccount?.nfts;
  const erc721 = data?.erc721;
  const subheader = getSubheader(erc721?.collectionName, nfts);
  const floorPriceUsd = ethToUsd(erc721?.floorPrice, data?.ethPrice);
  const floorPrice = floorPriceUsd || erc721?.floorPrice;
  const value = !!nfts && !!floorPrice ? nfts.length * floorPrice : undefined;

  useEffect(() => {
    if (!loading) {
      if (!data) createEvent(AnalyticsEvent.LOAD_FAILED);
      else createEvent(AnalyticsEvent.LOAD_SUCCEEDED, { valueAtRisk: value });
      if (error) log(error);
    }
  }, [loading, data, error]);

  return (
    <Box paddingTop="5x">
      <Stack space="5x">
        <Hero
          loading={loading}
          header={header}
          subheader={subheader}
          BodyContent={
            <Value
              type={txn.approved ? "AT_RISK" : "SECURED"}
              symbol={!isNull(floorPriceUsd) ? "USD" : "ETH"}
              value={value}
            ></Value>
          }
          images={(!!nfts && nfts.map((x: any) => x.media)) || undefined}
        />
        {riskResult.riskFactors.length > 0 && (
          <RiskFactors riskFactors={riskResult.riskFactors} />
        )}
        <Recipient
          loading={loading}
          toAccount={data?.toAccount}
          fromAddress={txn.fromAddress}
          toAddress={txn.recipientAddress}
        />
        {erc721 && <NFTCollection nft={erc721} />}
      </Stack>
    </Box>
  );
};
