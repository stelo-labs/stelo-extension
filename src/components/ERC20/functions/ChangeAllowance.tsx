import { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { BigNumber, utils } from "ethers";
import { ChangeAllowanceQuery } from "../../../generated/graphql";
import { log } from "../../../shared/logger";
import { ERC20Func, ParsedERC20Txn } from "../../../tx/types";
import { Recipient, Value } from "../../common";
import { Hero } from "../../common/Hero";
import Stack from "../../layout/Stack";
import { Box } from "../../layout/Box";
import { AnalyticsEvent, useAppState } from "../../../hooks/sharedStateContext";
import { RiskFactors } from "../../common/RiskFactorsCard";

const CHANGE_ALLOWANCE_QUERY = gql`
  query ChangeAllowance($toAddress: String!, $contractAddress: String!) {
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

type ChangeAllowanceProps = {
  txn: ParsedERC20Txn;
};

export const ChangeAllowance = ({ txn }: ChangeAllowanceProps) => {
  const { riskResult, createEvent } = useAppState();
  const { loading, error, data } = useQuery<ChangeAllowanceQuery>(
    CHANGE_ALLOWANCE_QUERY,
    {
      variables: {
        toAddress: txn.recipientAddress,
        contractAddress: txn.toAddress,
      },
    }
  );

  const header = `${
    txn.functionType === ERC20Func.INCREASE_ALLOWANCE ? "Increase" : " Decrease"
  } allowance by`;
  const type =
    txn.functionType === ERC20Func.INCREASE_ALLOWANCE ? "AT_RISK" : "SECURED";
  const erc20 = data?.erc20;
  const decimals = erc20?.decimals || 18;
  const amount = Number(
    utils.formatUnits(BigNumber.from(txn.amount), decimals)
  );
  const value = erc20?.priceUsd ? amount * erc20?.priceUsd : null;
  const subheader = `${amount} ${erc20?.symbol || "tokens"}`;

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
          BodyContent={<Value value={value} type={type} symbol={"USD"}></Value>}
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
