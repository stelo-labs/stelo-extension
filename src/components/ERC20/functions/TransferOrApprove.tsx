import { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { BigNumber, utils } from "ethers";
import { Erc20TransferOrApproveQuery } from "../../../generated/graphql";
import { log } from "../../../shared/logger";
import { ERC20Func, ParsedERC20Txn } from "../../../tx/types";
import { Recipient, Value } from "../../common";
import { Hero } from "../../common/Hero";
import Stack from "../../layout/Stack";
import { Box } from "../../layout/Box";
import { AnalyticsEvent, useAppState } from "../../../hooks/sharedStateContext";
import { RiskFactors } from "../../common/RiskFactorsCard";

const MAX_UINT256 =
  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

const TRANSFER_OR_APPROVE_QUERY = gql`
  query ERC20TransferOrApprove($contractAddress: String!, $toAddress: String!) {
    toAccount: web3Account(id: $toAddress) {
      ...Recipient
    }
    erc20(id: $contractAddress) {
      imageUrl
      symbol
      decimals
      priceUsd
    }
  }
  ${Recipient.fragments}
`;

type TransferOrApproveProps = {
  txn: ParsedERC20Txn;
};

export const TransferOrApprove = ({ txn }: TransferOrApproveProps) => {
  const { riskResult, createEvent } = useAppState();
  const { loading, error, data } = useQuery<Erc20TransferOrApproveQuery>(
    TRANSFER_OR_APPROVE_QUERY,
    {
      variables: {
        toAddress: txn.recipientAddress,
        contractAddress: txn.toAddress,
      },
    }
  );

  const header =
    txn.functionType === ERC20Func.APPROVE ? "Approve access to" : "Transfer";
  const erc20 = data?.erc20;
  const decimals = erc20?.decimals || 18;

  let value: number | null, subheader: string;
  if (txn.amount === MAX_UINT256) {
    value = null;
    subheader = `all your ${erc20?.symbol || "tokens"}`;
  } else {
    let amount = Number(
      utils.formatUnits(BigNumber.from(txn.amount), decimals)
    );
    value = erc20?.priceUsd ? amount * erc20?.priceUsd : null;
    amount = Math.round((amount + Number.EPSILON) * 10000) / 10000;
    subheader = `${amount} ${erc20?.symbol || "tokens"}`;
  }

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
            <Value value={value} type={"AT_RISK"} symbol="USD"></Value>
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
      </Stack>
    </Box>
  );
};
