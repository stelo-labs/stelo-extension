import { useEffect } from "react";
import { ParsedERC1155BatchTransferTxn } from "../../../tx/types";
import { gql, useQuery } from "@apollo/client";
import { log } from "../../../shared/logger";
import { Recipient, NFTCollection } from "../../common";
import { Hero } from "../../common/Hero";
import { Box } from "../../layout/Box";
import { Text } from "../../layout/Text";
import { BigNumber } from "ethers";
import { Erc1155BatchTransferQuery } from "../../../generated/graphql";
import Stack from "../../layout/Stack";
import { ethToUsd } from "../../../utils/math";
import { SimulationResultSection } from "../../common/Simulation/SimulationResultSection";
import { AnalyticsEvent, useAppState } from "../../../hooks/sharedStateContext";
import { RiskFactors } from "../../common/RiskFactorsCard";

const BATCH_TRANSFER_QUERY = gql`
  query ERC1155BatchTransfer(
    $ownerAddress: String!
    $contractAddress: String!
    $tokenIds: [String!]
    $toAddress: String!
  ) {
    fromAccount: web3Account(id: $ownerAddress) {
      nfts(contractAddress: $contractAddress, tokenIds: $tokenIds) {
        media
      }
    }
    toAccount: web3Account(id: $toAddress) {
      ...Recipient
    }
    erc1155(id: $contractAddress) {
      symbol
      floorPrice
      ...NFTCollection1155
    }
    ethPrice
  }
  ${Recipient.fragments}
  ${NFTCollection.fragments.ERC1155}
`;

const getSubheader = (symbol: string | undefined | null, numNfts: number) => {
  if (!!symbol) {
    return `${numNfts.toString()} ${symbol} ${numNfts === 1 ? "NFT" : "NFTs"}`;
  } else {
    return `${numNfts.toString()} ${numNfts === 1 ? "NFT" : "NFTs"}`;
  }
};

type BatchTransferProps = {
  txn: ParsedERC1155BatchTransferTxn;
};

export const BatchTransfer = ({ txn }: BatchTransferProps) => {
  const { riskResult, createEvent } = useAppState();
  const { loading, error, data } = useQuery<Erc1155BatchTransferQuery>(
    BATCH_TRANSFER_QUERY,
    {
      variables: {
        ownerAddress: txn.ownerAddress,
        contractAddress: txn.toAddress,
        tokenIds: txn.tokenIds.map((x) => x.toString()),
        toAddress: txn.recipientAddress,
      },
    }
  );
  const header = "Transfer";

  let isNftOwned =
    txn.fromAddress.toLowerCase() === txn.ownerAddress.toLowerCase();
  let erc1155 = data?.erc1155;
  let nftImg = [data?.fromAccount?.nfts?.[0]?.media ?? ""];
  const numNfts = Number(
    txn.amounts.reduce((x, y) => BigNumber.from(y).add(x), 0)
  ); // TODO: this might overflow
  const subheader = getSubheader(erc1155?.symbol, numNfts);
  const floorPriceUsd = ethToUsd(erc1155?.floorPrice, data?.ethPrice);
  const floorPrice = floorPriceUsd || erc1155?.floorPrice;
  let value = floorPrice ? numNfts * floorPrice : undefined;

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
            <SimulationResultSection
              contractAddress={txn.toAddress}
              from={txn.fromAddress}
              value={BigNumber.from(txn.value)}
              inputData={txn._raw.data}
              //@ts-ignore
              gas={txn._raw.gas || txn._raw.gasLimit || BigNumber.from(800000)}
            />
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
