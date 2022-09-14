import { useEffect } from "react";
import { startCase } from "lodash";
import { BigNumber, utils } from "ethers";
import { gql, useQuery } from "@apollo/client";
import { ParsedUnknownContractTxn } from "../../tx/types";
import { Box } from "../layout/Box";
import { Text } from "../layout/Text";
import { Card, Separator } from "../layout/Card";
import { UnknownQuery } from "../../generated/graphql";
import { log } from "../../shared/logger";
import { DappInfo } from "../common/DappInfo";
import { ContractRecipient } from "../common/Recipient/ContractRecipient";
import { SimulationResultSection } from "../common/Simulation/SimulationResultSection";
import { SkeletonCardContent } from "../common/Skeleton";
import { AnalyticsEvent, useAppState } from "../../hooks/sharedStateContext";
import { RiskFactors } from "../common/RiskFactorsCard";
import Stack from "../layout/Stack";

const UNKNOWN_QUERY = gql`
  query Unknown($contractAddress: String!, $methodId: String!) {
    contract(id: $contractAddress) {
      methodSignature(methodId: $methodId)
      label
    }
  }
`;

type UnknownTxnComponentProps = {
  txn: ParsedUnknownContractTxn;
};

export const UnknownTxnComponent = ({ txn }: UnknownTxnComponentProps) => {
  const { riskResult, createEvent, request } = useAppState();
  const { loading, error, data } = useQuery<UnknownQuery>(UNKNOWN_QUERY, {
    variables: { contractAddress: txn.toAddress, methodId: txn.methodId },
  });

  const value = Number(utils.formatEther(txn.value));
  const methodSignature = data?.contract?.methodSignature;
  const methodName = startCase(
    methodSignature?.slice(0, methodSignature?.indexOf("(")) || undefined
  );

  useEffect(() => {
    if (!loading) {
      if (!data) createEvent(AnalyticsEvent.LOAD_FAILED);
      else createEvent(AnalyticsEvent.LOAD_SUCCEEDED, { valueAtRisk: value });
      if (error) log(error);
    }
  }, [loading, data, error]);
  return (
    <Stack space="5x">
      <Card padding="2x" marginTop="6x">
        {loading ? (
          <SkeletonCardContent></SkeletonCardContent>
        ) : (
          <>
            <Box paddingTop="4x" margin="1x" overflowWrap="break-word">
              <Text
                transform="uppercase"
                size="32"
                weight={700}
                textAlign="center"
              >
                {data?.contract?.label || "Unknown contract interaction"}
              </Text>
            </Box>
            {methodName && (
              <>
                <Separator />
                <Box
                  paddingY="4x"
                  display="flex"
                  justifyContent={"center"}
                  fontSize="32"
                  marginX="auto"
                  fontWeight={700}
                  textAlign="center"
                  width="fit"
                  minWidth="2/3"
                  background={!!methodName ? "gray300" : "white"}
                  color="white"
                  paddingX="8x"
                  marginY="5x"
                  borderRadius="10"
                  overflowWrap="break-word"
                >
                  {methodName}
                </Box>
              </>
            )}
            <Separator />
            <SimulationResultSection
              contractAddress={txn.toAddress}
              from={txn.fromAddress}
              value={BigNumber.from(txn.value)}
              inputData={txn._raw.data}
              blockNumber={request?.blockNumber}
              gas={
                //@ts-ignore
                txn._raw.gas || txn._raw.gasLimit || BigNumber.from(800000)
              }
            ></SimulationResultSection>
            <Separator />
            <Box>
              <DappInfo />
            </Box>
          </>
        )}
      </Card>
      {riskResult.riskFactors.length > 0 && (
        <RiskFactors riskFactors={riskResult.riskFactors} />
      )}
      <Card width="full">
        <ContractRecipient
          address={txn.toAddress}
          headerText="Contract details"
          showTxnCount={true}
        ></ContractRecipient>
      </Card>
    </Stack>
  );
};
