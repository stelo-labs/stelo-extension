import { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { utils } from "ethers";
import { EthTransferQuery } from "../../generated/graphql";
import { log } from "../../shared/logger";
import { ParsedEthTransfer } from "../../tx/types";
import { Recipient, Value } from "../common";
import { Hero } from "../common/Hero";
import Stack from "../layout/Stack";
import { Box } from "../layout/Box";
import { AnalyticsEvent, useAppState } from "../../hooks/sharedStateContext";
import { normalizeAccount } from "../../utils/address";
import { RiskFactors } from "../common/RiskFactorsCard";

const ETH_TRANSFER_QUERY = gql`
  query EthTransfer($toAddress: String!) {
    toAccount: web3Account(id: $toAddress) {
      ...Recipient
      id
      ensName
    }
  }
  ${Recipient.fragments}
`;

type ETHComponentProps = {
  txn: ParsedEthTransfer;
};

export const ETHComponent = ({ txn }: ETHComponentProps) => {
  const { riskResult, createEvent } = useAppState();
  const { loading, error, data } = useQuery<EthTransferQuery>(
    ETH_TRANSFER_QUERY,
    { variables: { toAddress: txn.toAddress } }
  );
  const value = Number(utils.formatEther(txn.value));

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
          header={`Send ${value} ETH to`}
          subheader={normalizeAccount({
            ensName: data?.toAccount?.ensName,
            id: txn.toAddress,
          })}
          BodyContent={<Value value={value} type={"AT_RISK"} />}
        />
        {riskResult.riskFactors.length > 0 && (
          <RiskFactors riskFactors={riskResult.riskFactors} />
        )}
        <Recipient
          loading={loading}
          toAccount={data?.toAccount}
          fromAddress={txn.fromAddress}
          toAddress={txn.toAddress}
        />
      </Stack>
    </Box>
  );
};
