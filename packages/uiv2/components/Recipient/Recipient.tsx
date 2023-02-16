import { type AssetChange } from "shared_types";
import { truncateAddress } from "utils";
import { Deck } from "../../base/Deck";
import { Divider } from "../../base/Divider";
import { Row } from "../../base/Row";
import { Stack } from "../../base/Stack";
import { Title, Text, Link } from "../../base/Text";
import { ContractDropdown } from "../../views/ContractCallSection/ContractCallSection";
import { DataTable, KeyValue } from "../DataTable/DataTable";
import { Dropdown, DropdownHeader } from "../Dropdown/Dropdown";
import EOACounterParty from "./EOACounterParty";
import ExternalLinkIcon from "../../base/ExternalLinkIcon";
type CounterParty = AssetChange["counterparty"];

export const getRecipientData = (counterParty: CounterParty): KeyValue[] => {
  const data = [];
  if (typeof counterParty?.account?.countTransfersTo !== "undefined") {
    data.push({
      label: "Your past transactions",
      value: counterParty?.account?.countTransfersTo.toString(),
    });
  }
  if (typeof counterParty?.account?.nftCount !== "undefined") {
    data.push({
      label: "NFTs held",
      value: counterParty?.account?.nftCount.toString(),
    });
  }

  return data;
};

export const Recipient = ({ recipients }: { recipients: CounterParty[] }) => {
  const hasENS = !!recipients[0]?.account?.ens;
  const isEOA = recipients[0]?.type == "ACCOUNT";
  const Header = (
    <>
      <Row justifyContent="space-between" style={{ flexGrow: "1" }}>
        <Row gap="12px">
          <EOACounterParty
            style={{ height: "26px", width: "26px", marginRight: "6px" }}
          />
          <Stack space="4px">
            {hasENS && (
              <Text
                size="2x"
                weight={"500"}
                style={{
                  display: "inline-block",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  maxWidth: "200px",
                }}
              >
                {recipients[0]?.account?.ens}
              </Text>
            )}
            {!!recipients[0]?.address && (
              <Link href={`https://opensea.io/${recipients[0]?.address}`}>
                <Text
                  size={hasENS ? "2x" : "3x"}
                  weight={"400"}
                  color={hasENS ? "gray500" : "black"}
                >
                  <Row justifyContent="flex-start">
                    {truncateAddress(recipients[0]?.address)}

                    {hasENS && <ExternalLinkIcon />}
                  </Row>
                </Text>
              </Link>
            )}
          </Stack>
        </Row>
        <Deck
          size={36}
          limit={3}
          imgs={
            recipients[0]?.account?.topNfts.map(
              ({ imageUrl }) => imageUrl || ""
            ) || []
          }
        ></Deck>
      </Row>
    </>
  );

  return (
    <>
      <Divider />
      <Title>Recipient</Title>
      {isEOA ? (
        <Dropdown
          header={Header}
          dropdown={
            <DataTable data={getRecipientData(recipients[0])}></DataTable>
          }
        ></Dropdown>
      ) : (
        <ContractDropdown
          showTxData={false}
          contract={recipients[0]?.contract}
          initialState="closed"
        />
      )}
    </>
  );
};
