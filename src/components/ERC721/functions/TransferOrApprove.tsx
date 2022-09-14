import { useEffect } from "react";
import { isNull, startCase } from "lodash";
import { gql, useQuery } from "@apollo/client";
import { Erc721TransferOrApproveQuery } from "../../../generated/graphql";
import {
  ERC721Func,
  ParsedERC721ApproveTxn,
  ParsedERC721TransferTxn,
} from "../../../tx/types";
import { toReadableNumber } from "../../../utils";
import { Recipient, NFTCollection, Value } from "../../common";
import { Box } from "../../layout/Box";
import { Text } from "../../layout/Text";
import { Hero } from "../../common/Hero";
import { log } from "../../../shared/logger";
import Stack from "../../layout/Stack";
import { ethToUsd } from "../../../utils/math";
import { AnalyticsEvent, useAppState } from "../../../hooks/sharedStateContext";
import { RiskFactors } from "../../common/RiskFactorsCard";

const TRANSFER_OR_APPROVE_QUERY = gql`
  query ERC721TransferOrApprove(
    $fromAddress: String!
    $contractAddress: String!
    $tokenId: String!
    $toAddress: String!
  ) {
    fromAccount: web3Account(id: $fromAddress) {
      nfts(contractAddress: $contractAddress, tokenId: $tokenId) {
        media
      }
    }
    toAccount: web3Account(id: $toAddress) {
      ...Recipient
    }
    contract(id: $contractAddress) {
      erc721 {
        collectionName
        floorPrice
        ...NFTCollection721
      }
    }
    ethPrice
  }
  ${Recipient.fragments}
  ${NFTCollection.fragments.ERC721}
`;

type TransferOrApproveProps = {
  txn: ParsedERC721TransferTxn | ParsedERC721ApproveTxn;
};

export const TransferOrApprove = ({ txn }: TransferOrApproveProps) => {
  const { riskResult, createEvent } = useAppState();
  const { loading, error, data } = useQuery<Erc721TransferOrApproveQuery>(
    TRANSFER_OR_APPROVE_QUERY,
    {
      variables: {
        fromAddress: txn.fromAddress,
        contractAddress: txn.toAddress,
        tokenId: txn.tokenId.toString(),
        toAddress: txn.recipientAddress,
      },
    }
  );

  const header =
    txn.functionType === ERC721Func.APPROVE ? "Approve access to" : "Transfer";
  let isNftOwned =
    !!data?.fromAccount?.nfts?.length && !!data.fromAccount.nfts[0];
  let erc721 = data?.contract?.erc721;
  let nftImg = [data?.fromAccount?.nfts?.[0]?.media ?? ""]; // TODO: get image for unowned Nft
  let subheader = `${
    startCase(erc721?.collectionName || undefined) || "NFT"
  } #${toReadableNumber(txn.tokenId)}`;
  const floorPriceUsd = ethToUsd(erc721?.floorPrice, data?.ethPrice);
  const value = floorPriceUsd || erc721?.floorPrice;

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
        {/* TODO: Handle the case where its a transferFrom and the tx sender has approval to transfer from the owner */}
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
        {erc721 && <NFTCollection nft={erc721} />}
      </Stack>
    </Box>
  );
};
