import { useEffect } from "react";
import { startCase } from "lodash";
import { gql, useQuery } from "@apollo/client";
import { utils } from "ethers";
import { Erc20UnknownQuery } from "../../../generated/graphql";
import { log } from "../../../shared/logger";
import { ParsedERC20Txn } from "../../../tx/types";
import { Hero } from "../../common/Hero";
import { Box } from "../../layout/Box";
import Stack from "../../layout/Stack";
import { Card } from "../../layout/Card";
import { ContractRecipient } from "../../common/Recipient/ContractRecipient";
import { AnalyticsEvent, useAppState } from "../../../hooks/sharedStateContext";
import { Value } from "../../common";
import { RiskFactors } from "../../common/RiskFactorsCard";

const UNKNOWN_QUERY = gql`
  query ERC20Unknown($contractAddress: String!, $methodId: String!) {
    contract(id: $contractAddress) {
      methodSignature(methodId: $methodId)
      label
    }
    erc20(id: $contractAddress) {
      imageUrl
      symbol
    }
  }
`;

type UnknownProps = {
  txn: ParsedERC20Txn;
};

export const Unknown = ({ txn }: UnknownProps) => {
  const { riskResult, createEvent } = useAppState();
  const { loading, error, data } = useQuery<Erc20UnknownQuery>(UNKNOWN_QUERY, {
    variables: { contractAddress: txn.toAddress, methodId: txn.methodId },
  });

  const label = data?.contract?.label;
  const symbol = data?.erc20?.symbol;
  const methodSignature = data?.contract?.methodSignature ?? "";
  const methodName = startCase(
    methodSignature?.slice(0, methodSignature?.indexOf("(")) || undefined
  );
  const isMintLike = methodName?.toLowerCase().includes("mint");
  const value = Number(utils.formatEther(txn.value));
  const header = isMintLike
    ? `Minting ${symbol || "tokens"}`
    : label || "Unknown ERC20 interaction";

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
              symbol={!!symbol ? symbol : "UNKNOWN"}
            ></Value>
          }
        />
        {riskResult.riskFactors.length > 0 && (
          <RiskFactors riskFactors={riskResult.riskFactors} />
        )}
        <Card width="full">
          <ContractRecipient
            address={txn.toAddress}
            headerText="Token details"
            showTxnCount={true}
          ></ContractRecipient>
        </Card>
      </Stack>
    </Box>
  );
};
