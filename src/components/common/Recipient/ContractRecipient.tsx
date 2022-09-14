import { gql, useQuery } from "@apollo/client";
import {
  ChartBarIcon,
  ClockIcon,
  CodeIcon,
  ExclamationIcon,
  ShieldCheckIcon,
  TerminalIcon,
} from "@heroicons/react/solid";
import { formatDistance } from "date-fns";
import { ContractRecipientQuery } from "../../../generated/graphql";
import { log } from "../../../shared/logger";
import { truncateAddress } from "../../../utils/address";
import {
  CardContentPlaceholder,
  CardRow,
  Header,
  Separator,
} from "../../layout/Card";
import { Box } from "../../layout/Box";

const CONTRACT_RECIPIENT_QUERY = gql`
  query ContractRecipient($address: String!) {
    contract(id: $address) {
      isVerifiedEtherScan
      deployedAt
      txnCountTotal
      txnCount30Days
      label
    }
  }
`;

const parseTxnCount = (count: number | null | undefined) =>
  !count ? "0" : count === 10000 ? "10,000+" : count.toString();

type ContractRecipientProps = {
  address: string;
  headerText?: string;
  showTxnCount?: boolean;
};

export const ContractRecipient = ({
  address,
  headerText = "Contract Recipient",
  showTxnCount = false,
}: ContractRecipientProps) => {
  const { loading, error, data } = useQuery<ContractRecipientQuery>(
    CONTRACT_RECIPIENT_QUERY,
    { variables: { address: address } }
  );

  const contract = data?.contract;
  if (error) log(error);

  return (
    <>
      <Header
        headerText={headerText}
        icon={
          <CodeIcon
            style={{ fill: "#2081E2", height: "30px", width: "30px" }}
          ></CodeIcon>
        }
      ></Header>
      <Separator />
      {loading ? (
        <CardContentPlaceholder rows={3} height={140} width={300} />
      ) : (
        <>
          <CardRow
            text={contract?.label || truncateAddress(address)}
            subText={"View on Etherscan"}
            icon={
              <TerminalIcon
                style={{ fill: "gray", height: "20px", width: "20px" }}
              ></TerminalIcon>
            }
            url={`https://etherscan.io/address/${address}`}
          ></CardRow>
          <CardRow
            text={`${
              !contract?.isVerifiedEtherScan ? "Not " : ""
            }Verified on Etherscan`}
            icon={
              contract?.isVerifiedEtherScan ? (
                <ShieldCheckIcon
                  style={{ fill: "gray", height: "20px", width: "20px" }}
                ></ShieldCheckIcon>
              ) : (
                <Box
                  as={ExclamationIcon}
                  fill="yellow"
                  style={{ height: "20px", width: "20px" }}
                ></Box>
              )
            }
          ></CardRow>
          {showTxnCount && (
            <CardRow
              text={`${parseTxnCount(
                contract?.txnCount30Days
              )} transactions in last 30 days`}
              subText={`${parseTxnCount(
                contract?.txnCountTotal
              )} transactions total`}
              icon={
                <ChartBarIcon
                  style={{ fill: "gray", height: "20px", width: "20px" }}
                ></ChartBarIcon>
              }
            ></CardRow>
          )}
          <CardRow
            text={`First deployed ${formatDistance(
              new Date(contract?.deployedAt),
              new Date(),
              { addSuffix: true }
            )}`}
            icon={
              <ClockIcon
                style={{ fill: "gray", height: "20px", width: "20px" }}
              ></ClockIcon>
            }
          ></CardRow>
        </>
      )}
    </>
  );
};
