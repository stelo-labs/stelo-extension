import { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { Erc1155TransferQuery } from "../../../generated/graphql";
import { log } from "../../../shared/logger";
import { toReadableNumber } from "../../../utils";
import { Recipient, NFTCollection, Value } from "../../common";
import { Hero } from "../../common/Hero";
import { ParsedERC1155TransferTxn } from "../../../tx/types";
import { Box } from "../../layout/Box";
import { Text } from "../../layout/Text";
import Stack from "../../layout/Stack";
import { ethToUsd } from "../../../utils/math";
import { isNull } from "lodash";
import { AnalyticsEvent, useAppState } from "../../../hooks/sharedStateContext";
import { RiskFactors } from "../../common/RiskFactorsCard";

const TRANSFER_QUERY = gql`
  query ERC1155Transfer(
    $ownerAddress: String!
    $contractAddress: String!
    $tokenId: String!
    $toAddress: String!
  ) {
    fromAccount: web3Account(id: $ownerAddress) {
      nfts(contractAddress: $contractAddress, tokenId: $tokenId) {
        media
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

type TransferProps = {
  txn: ParsedERC1155TransferTxn;
};

export const Transfer = ({ txn }: TransferProps) => {
  const { riskResult, createEvent } = useAppState();
  const { loading, error, data } = useQuery<Erc1155TransferQuery>(
    TRANSFER_QUERY,
    {
      variables: {
        ownerAddress: txn.ownerAddress,
        contractAddress: txn.toAddress,
        tokenId: txn.tokenId.toString(),
        toAddress: txn.recipientAddress,
      },
    }
  );
  const header = "Transfer";
  let isNftOwned =
    txn.fromAddress.toLowerCase() === txn.ownerAddress.toLowerCase();
  let erc1155 = data?.erc1155;
  let nftImg = [data?.fromAccount?.nfts?.[0]?.media ?? ""];
  let subheader = `${erc1155?.collectionName || "NFT"} #${toReadableNumber(
    txn.tokenId
  )}`;
  const amount = Number(txn.amount.toString());
  const floorPriceUsd = ethToUsd(erc1155?.floorPrice, data?.ethPrice);
  const floorPrice = floorPriceUsd || erc1155?.floorPrice;
  let value = floorPrice ? floorPrice * amount : undefined;

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
        {!loading && !isNftOwned && (
          <Box paddingX="2x" position="relative" style={{ top: "-20px" }}>
            <Text>
              WARNING: Trying to approve or transfer an NFT you don't own.
              Transaction may fail.
            </Text>
          </Box>
        )}
        <Hero
          loading={loading}
          header={header}
          subheader={subheader}
          images={nftImg}
          BodyContent={
            <Value
              value={value}
              type={"AT_RISK"}
              symbol={!isNull(floorPriceUsd) ? "USD" : "ETH"}
            ></Value>
          }
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
