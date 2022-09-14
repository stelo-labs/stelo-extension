import { useEffect } from "react";
import { startCase } from "lodash";
import { ParsedERC1155UnknownTxn } from "../../../tx/types";
import { gql, useQuery } from "@apollo/client";
import { utils } from "ethers";
import { log } from "../../../shared/logger";
import { Hero } from "../../common/Hero";
import { NFTCollection, Value } from "../../common";
import { Erc1155UnknownQuery } from "../../../generated/graphql";
import Stack from "../../layout/Stack";
import { Box } from "../../layout/Box";
import { AnalyticsEvent, useAppState } from "../../../hooks/sharedStateContext";
import { RiskFactors } from "../../common/RiskFactorsCard";

const UNKNOWN_QUERY = gql`
  query ERC1155Unknown($contractAddress: String!, $methodId: String!) {
    contract(id: $contractAddress) {
      methodSignature(methodId: $methodId)
      erc1155 {
        symbol
        collectionName
        symbol
        imageUrl
        floorPrice
        ...NFTCollection1155
      }
    }
  }
  ${NFTCollection.fragments.ERC1155}
`;

type UnknownProps = {
  txn: ParsedERC1155UnknownTxn;
};

export const Unknown = ({ txn }: UnknownProps) => {
  const { riskResult, createEvent } = useAppState();
  const { loading, error, data } = useQuery<Erc1155UnknownQuery>(
    UNKNOWN_QUERY,
    { variables: { contractAddress: txn.toAddress, methodId: txn.methodId } }
  );

  const erc1155 = data?.contract?.erc1155;
  const methodSignature = data?.contract?.methodSignature;
  const methodName = startCase(
    methodSignature?.slice(0, methodSignature?.indexOf("(")) || undefined
  );
  const isMintLike = methodName?.toLowerCase().includes("mint");
  const collectionName = erc1155?.collectionName || "Unknown Collection";
  const header = isMintLike ? `Minting ${collectionName}` : `${collectionName}`;
  const value = Number(utils.formatEther(txn.value));
  const imgUrl = erc1155?.imageUrl || "";

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
          methodName={methodName}
          BodyContent={
            <Value
              value={value}
              type={isMintLike ? "MINT_COST" : "TXN_VALUE"}
            ></Value>
          }
          images={[imgUrl]}
        />
        {riskResult.riskFactors.length > 0 && (
          <RiskFactors riskFactors={riskResult.riskFactors} />
        )}
        {erc1155 && <NFTCollection nft={erc1155} />}
      </Stack>
    </Box>
  );
};
