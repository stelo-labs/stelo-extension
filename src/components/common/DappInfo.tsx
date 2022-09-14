import {
  ShieldCheckIcon,
  ShieldExclamationIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/solid";
import { Box, BoxProps } from "../layout/Box";
import { Inline } from "../layout/Inline";
import { Text } from "../layout/Text";
import Stack from "../layout/Stack";
import React, { useEffect } from "react";
import { useAppState } from "../../hooks/sharedStateContext";
import { RiskScore } from "../../generated/graphql";

export const listStatus = [
  "UNKNOWN",
  "WHITELISTED",
  "BLACKLISTED",
  "RESTRICTED",
] as const;
export type ListStatus = typeof listStatus[number];

export type DappStatus = {
  rootUrl: string;
  approvalStatus: ListStatus;
  allowedContracts: ({ id: string } | null)[];
};

type DappInfoProps = DappStatus;

export const DappInfo = () => {
  const { riskResult, dappInfo } = useAppState();
  switch (dappInfo.approvalStatus) {
    case "UNKNOWN":
      return <UnrecognizedDappInfo url={dappInfo.rootUrl} />;
    case "RESTRICTED":
      if (riskResult.riskScore === RiskScore.Low)
        return <RestrictedDappInfo url={dappInfo.rootUrl} />;
      return <UnrecognizedDappInfo url={dappInfo.rootUrl} />;
    case "BLACKLISTED":
      return <SuspiciousDappInfo url={dappInfo.rootUrl} />;
    case "WHITELISTED":
      return <ApprovedDappInfo url={dappInfo.rootUrl} />;
    default:
      // Should not happen
      return <UnrecognizedDappInfo url={dappInfo.rootUrl} />;
  }
};

const BaseDappInfo = (props: React.PropsWithChildren<BoxProps>) => {
  return (
    <Box
      paddingX="2x"
      width="full"
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Inline space="4x">{props.children} </Inline>
    </Box>
  );
};

export const UnrecognizedDappInfo = (props: { url: string }) => (
  <BaseDappInfo>
    <QuestionMarkCircleIcon
      fill="gray"
      height={30}
      width={30}
    ></QuestionMarkCircleIcon>
    <Stack alignHorizontal="flex-start">
      <Text textAlign="left">{props.url}</Text>
      <Text size="12" color="gray500" textAlign="left">
        Unrecognized site
      </Text>
    </Stack>
  </BaseDappInfo>
);

export const ApprovedDappInfo = (props: { url: string }) => {
  return (
    <BaseDappInfo>
      <ShieldCheckIcon fill="#62C554" height={30} width={30}></ShieldCheckIcon>
      <Stack alignHorizontal="flex-start">
        <Text textAlign="left">{props.url}</Text>
        <Text size="12" color="gray500" textAlign="left">
          Website approved by Stelo
        </Text>
      </Stack>
    </BaseDappInfo>
  );
};

export const RestrictedDappInfo = (props: { url: string }) => {
  return (
    <BaseDappInfo>
      <ShieldCheckIcon fill="#62C554" height={30} width={30}></ShieldCheckIcon>
      <Stack alignHorizontal="flex-start">
        <Text textAlign="left">{props.url}</Text>
        <Text size="12" color="gray500" textAlign="left">
          Official website for this contract
        </Text>
      </Stack>
    </BaseDappInfo>
  );
};

export const SuspiciousDappInfo = (props: { url: string }) => (
  <BaseDappInfo>
    <ShieldExclamationIcon
      fill="#FF0000"
      height={32}
      width={32}
    ></ShieldExclamationIcon>
    <Stack alignHorizontal="flex-start">
      <Text textAlign="left">{props.url}</Text>
      <Text size="12" color="gray500" textAlign="left">
        Suspicious site
      </Text>
    </Stack>
  </BaseDappInfo>
);
