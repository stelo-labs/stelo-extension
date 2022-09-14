import { useEffect } from "react";
import { startCase } from "lodash";
import { gql, useQuery } from "@apollo/client";
import { utils } from "ethers";
import { Erc721UnknownQuery } from "../../../generated/graphql";
import { log } from "../../../shared/logger";
import { ParsedERC721UnknownTxn } from "../../../tx/types";
import { Hero } from "../../common/Hero";
import { NFTCollection, Value } from "../../common";
import { Box } from "../../layout/Box";
import Stack from "../../layout/Stack";
import { AnalyticsEvent, useAppState } from "../../../hooks/sharedStateContext";
import { RiskFactors } from "../../common/RiskFactorsCard";

const UNKNOWN_QUERY = gql`
  query ERC721Unknown($contractAddress: String!, $methodId: String!) {
    contract(id: $contractAddress) {
      methodSignature(methodId: $methodId)
      erc721 {
        imageUrl
        ...NFTCollection721
      }
    }
  }
  ${NFTCollection.fragments.ERC721}
`;

type UnknownProps = {
  txn: ParsedERC721UnknownTxn;
};

export const Unknown = ({ txn }: UnknownProps) => {
  const { riskResult, createEvent } = useAppState();
  const { loading, error, data } = useQuery<Erc721UnknownQuery>(UNKNOWN_QUERY, {
    variables: { contractAddress: txn.toAddress, methodId: txn.methodId },
  });
  const contract = data?.contract;
  const erc721 = contract?.erc721;
  const methodSignature = contract?.methodSignature;
  const methodName = startCase(
    methodSignature?.slice(0, methodSignature?.indexOf("(")) || undefined
  );
  const isMintLike = methodName?.toLowerCase().includes("mint");
  const collectionName = erc721?.collectionName || "Unknown Collection";
  const header = isMintLike ? `Minting ${collectionName}` : `${collectionName}`;
  const value = Number(utils.formatEther(txn.value));
  const imgUrl = erc721?.imageUrl || "";

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
            />
          }
          images={[imgUrl]}
        />
        {riskResult.riskFactors.length > 0 && (
          <RiskFactors riskFactors={riskResult.riskFactors} />
        )}
        {erc721 && <NFTCollection nft={erc721} />}
      </Stack>
    </Box>
  );
};
