import { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { Erc1155SetApprovalForAllQuery } from "../../../generated/graphql";
import { Recipient, NFTCollection, Value } from "../../common";
import { Hero } from "../../common/Hero";
import { log } from "../../../shared/logger";
import { ParsedERC1155SetApprovalForAllTxn } from "../../../tx/types";
import Stack from "../../layout/Stack";
import { Box } from "../../layout/Box";
import { ethToUsd } from "../../../utils/math";
import { isNull } from "lodash";
import { AnalyticsEvent, useAppState } from "../../../hooks/sharedStateContext";
import { RiskFactors } from "../../common/RiskFactorsCard";

const SET_APPROVAL_FOR_ALL_QUERY = gql`
  query ERC1155SetApprovalForAll(
    $fromAddress: String!
    $contractAddress: String!
    $toAddress: String!
  ) {
    fromAccount: web3Account(id: $fromAddress) {
      nfts(contractAddress: $contractAddress) {
        media
        balance
      }
    }
    toAccount: web3Account(id: $toAddress) {
      ...Recipient
    }
    erc1155(id: $contractAddress) {
      collectionName
      floorPrice
      ...NFTCollection1155
    }
    ethPrice
  }
  ${Recipient.fragments}
  ${NFTCollection.fragments.ERC1155}
`;

const getSubheader = (
  collectionName: string | undefined | null,
  numNfts: number
) => {
  if (!!collectionName && numNfts >= 0) {
    return `${numNfts} ${collectionName} ${numNfts === 1 ? "NFT" : "NFTs"}`;
  } else if (!collectionName && numNfts >= 0) {
    return `${numNfts} ${numNfts === 1 ? "NFT" : "NFTs"}`;
  } else {
    return `Unknown Number of NFTs`;
  }
};

type SetApprovalForAllProps = {
  txn: ParsedERC1155SetApprovalForAllTxn;
};

export const SetApprovalForAll = ({ txn }: SetApprovalForAllProps) => {
  const { riskResult, createEvent } = useAppState();
  const { loading, error, data } = useQuery<Erc1155SetApprovalForAllQuery>(
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
  const nfts = data?.fromAccount?.nfts;
  const numNfts = nfts
    ? nfts.reduce((x, y) => x + (Number(y?.balance) || 0), 0)
    : -1;
  const erc1155 = data?.erc1155;
  const subheader = getSubheader(erc1155?.collectionName, numNfts);
  const floorPriceUsd = ethToUsd(erc1155?.floorPrice, data?.ethPrice);
  const floorPrice = floorPriceUsd || erc1155?.floorPrice;
  const value = numNfts >= 0 && !!floorPrice ? numNfts * floorPrice : undefined;

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
              value={value}
              type={txn.approved ? "AT_RISK" : "SECURED"}
              symbol={!isNull(floorPriceUsd) ? "USD" : "ETH"}
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
        {erc1155 && <NFTCollection nft={erc1155} />}
      </Stack>
    </Box>
  );
};
