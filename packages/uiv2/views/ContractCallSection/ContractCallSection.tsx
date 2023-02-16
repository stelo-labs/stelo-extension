import { Link, Text, Title } from "../../base/Text";
import {
  Dropdown,
  DropdownHeader,
  DropdownIcon,
  DropDownState,
} from "../../components/Dropdown/Dropdown";
import { DataTable, KeyValue } from "../../components/DataTable/DataTable";
import { formatAmount, truncateAddress } from "utils";
import { type TransactionResponse } from "shared_types";
import { formatDistance } from "date-fns";
import CountractCounterParty from "../../components/Recipient/ContractCounterParty";
import React from "react";
import { Row } from "../../base/Row";
import ExternalLinkIcon from "../../base/ExternalLinkIcon";
import { useHasTransactionFunctionArgsError } from "../../store";

type Contract = TransactionResponse["contract"];
type ContractFunction = TransactionResponse["function"];

const getTxCountString = (count: number | undefined | null) => {
  if (typeof count === "undefined" || count === null) return "unknown";
  if (count > 9990) return "10,000+";
  return formatAmount(count);
};

export const getContractData = (
  contract: Contract,
  showTxData: boolean = false
): KeyValue[] => {
  const data = [];
  data.push({
    label: "Source Code",
    value: contract?.isVerifiedEtherScan ? (
      <Link href={`https://etherscan.io/address/${contract.address}#code`}>
        <Row>
          <Text size="1x" weight="400">
            Verified on Etherscan
          </Text>
          <ExternalLinkIcon />
        </Row>
      </Link>
    ) : (
      <Text size="1x" weight="400">
        Not Verified
      </Text>
    ),
  });
  if (!!contract) {
    data.push({
      label: "Contract address",
      value: (
        <Link href={`https://etherscan.io/address/${contract.address}`}>
          <Row>
            <Text size="1x" weight="400">
              {truncateAddress(contract.address)}
            </Text>
            <ExternalLinkIcon />
          </Row>
        </Link>
      ),
    });
  }

  if (showTxData) {
    data.push({
      label: "Transactions (Total) ",
      value: getTxCountString(contract?.txnCountTotal),
    });
    data.push({
      label: "Transactions (Last 30 days)",
      value: getTxCountString(contract?.txnCount30Days),
    });
  }

  if (!!contract?.deployedAt) {
    data.push({
      label: "First deployed",
      value:
        formatDistance(new Date(contract?.deployedAt!), new Date(), {
          addSuffix: true,
        }) || "unknown",
    });
  }
  return data;
};

export const getContractTitle = (contract: Contract | undefined) => {
  return (
    contract?.label || truncateAddress(contract?.address || "") || "unknown"
  );
};

// const getDataTypeDisplayValue: (value: any, datatype: any) => {};
// TODO
const getFunctionData = (contractFunction: ContractFunction): KeyValue[] => {
  return (
    contractFunction?.arguments.map((arg) => {
      return {
        label: arg.name,
        value: arg.value + "",
      };
    }) || []
  );
};

export const ContractCallSection = ({
  contract,
  contractFunction,
  initialState,
}: {
  initialState?: DropDownState;
  contract: Contract;
  contractFunction: ContractFunction;
}) => {
  const [open, setOpen] = React.useState<boolean>(initialState == "open");
  const hasTransactionArgsError = useHasTransactionFunctionArgsError();
  return !open ? (
    <Row
      alignItems="center"
      justifyContent="center"
      style={{ height: "22px" }}
      onClick={() => {
        setOpen(true);
      }}
    >
      <div style={{ display: "flex", cursor: "pointer" }}>
        <Text weight="600" color="gray500" style={{ cursor: "pointer" }}>
          Show Contract Details
        </Text>
        <DropdownIcon isOpen={open} />
      </div>
    </Row>
  ) : (
    <>
      <Row justifyContent="space-between">
        <Title>Contract</Title>
        <Row
          style={{ cursor: "pointer" }}
          onClick={() => {
            setOpen(false);
          }}
        >
          <Text style={{ cursor: "pointer" }} color="gray500" weight="600">
            Hide advanced
          </Text>
          <DropdownIcon isOpen={open} />
        </Row>
      </Row>
      <ContractDropdown contract={contract} initialState="open" />
      {!hasTransactionArgsError && (
        <>
          <Title>Function</Title>
          <Dropdown
            header={<DropdownHeader>{contractFunction?.name}</DropdownHeader>}
            dropdown={undefined}
          ></Dropdown>
        </>
      )}
    </>
  );
};

export const ContractDropdown = ({
  contract,
  initialState,
  showTxData = true,
}: {
  contract: Contract;
  initialState?: DropDownState;
  showTxData?: boolean;
}) => {
  return (
    <Dropdown
      initialState={initialState}
      header={
        <DropdownHeader>
          <Row>
            <CountractCounterParty
              style={{ height: "34px", width: "34px", marginRight: "6px" }}
            />
            <Link href={`https://etherscan.io/address/${contract?.address}`}>
              <Row>
                <Text size={"3x"} weight={"400"} color={"black"}>
                  {getContractTitle(contract)}
                </Text>
              </Row>
            </Link>
          </Row>
        </DropdownHeader>
      }
      dropdown={<DataTable data={getContractData(contract, showTxData)} />}
    ></Dropdown>
  );
};
