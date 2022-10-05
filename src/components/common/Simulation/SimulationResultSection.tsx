import { SimulationQuery, TransferEvent } from "../../../generated/graphql";
import { Box } from "../../layout/Box";
import { gql, useQuery } from "@apollo/client";
import { BigNumber, utils } from "ethers";
import { round } from "lodash";
import { Value } from "../Value";
import { TransferEventERC20 } from "./TransferEventERC20";
import { TransferEventERC721 } from "./TransferEventERC721";
import { TransferEventBalanceChange } from "./TransferEventBalanceChange";
import { TxRejection } from "./TxRejection";
import { PlaceholderSimulationSection } from "./PlaceholderSimulationSection";
import React from "react";

const SIMULATION_QUERY = gql`
  query Simulation(
    $contractAddress: String!
    $from: String!
    $value: String!
    $inputData: String!
    $blockNumber: Int
    $gas: String!
  ) {
    ethPrice
    contract(id: $contractAddress) {
      tracerSimulation(
        from: $from
        value: $value
        inputData: $inputData
        blockNumber: $blockNumber
        gas: $gas
      ) {
        txnError
        txnSucceeded
        transferEvents {
          fromAddress
          toAddress
          contractAddress
          amount
          value
          tokenId
          tokenName
          imageUrl
          tokenStandard
          tokenSymbol
          eventName
        }
        balanceChange {
          previousBalance
          nextBalance
          difference
        }
      }
    }
  }
`;
const getDirection = (transfer: TransferEvent | null, receiver: string) => {
  return transfer?.toAddress?.toUpperCase() == receiver.toUpperCase()
    ? "in"
    : "out";
};

const sortByDirection =
  (from: string) => (a: TransferEvent | null, b: TransferEvent | null) => {
    const a_direction = getDirection(a, from) == "in" ? 1 : 0;
    const b_direction = getDirection(b, from) == "in" ? 1 : 0;
    return b_direction - a_direction;
  };

type SimulationResultSectionProps = {
  contractAddress: string;
  from: string;
  value: BigNumber;
  inputData: string;
  blockNumber?: number;
  gas: BigNumber;
};
export const SimulationResultSection = ({
  contractAddress,
  from,
  value,
  inputData,
  blockNumber,
  gas,
}: SimulationResultSectionProps) => {
  const displayedScreen = React.useRef<HTMLDivElement>(null);

  let { loading, error, data } = useQuery<SimulationQuery>(SIMULATION_QUERY, {
    variables: {
      contractAddress,
      from,
      value: value.toString(),
      inputData,
      blockNumber,
      gas: gas.toString(),
    },
  });
  const [height, setHeight] = React.useState<number>(145);

  const rejectedTx =
    !error && !loading && data?.contract?.tracerSimulation?.txnError;
  const noEvents =
    !error &&
    !loading &&
    !data?.contract?.tracerSimulation?.txnError &&
    !data?.contract?.tracerSimulation?.transferEvents?.length;
  const hasEvents =
    !error &&
    !loading &&
    !!data?.contract?.tracerSimulation?.transferEvents?.length;
  const hasDifference =
    !!data?.contract?.tracerSimulation?.balanceChange?.difference;
  const events =
    data?.contract?.tracerSimulation?.transferEvents
      .filter(
        (ev) =>
          ev?.eventName == "Transfer" ||
          ev?.eventName == "TransferSingle" ||
          ev?.eventName == "TransferBatch"
      )
      .sort(sortByDirection(from)) || [];
  React.useEffect(() => {
    // get height of ref when they are set
    setHeight(displayedScreen.current?.clientHeight || 145);
  }, [displayedScreen.current, loading]);

  return (
    <Box
      style={{
        height: height,
        transition: "height .1s",
        overflowX: "auto",
        overflowY: "hidden",
      }}
    >
      <div ref={displayedScreen} style={{ display: "block" }}>
        {loading && (
          <PlaceholderSimulationSection
            height={140}
          ></PlaceholderSimulationSection>
        )}
        {error && (
          <TxRejection
            text={
              "Stelo was unable to understand this transaction. Use caution."
            }
          />
        )}
        {rejectedTx && (
          <TxRejection
            subtext={data?.contract?.tracerSimulation?.txnError!}
            text={"This transaction will fail."}
          />
        )}
        {noEvents && !hasDifference && (
          <Value
            type="AT_RISK"
            symbol="ETH"
            value={Number(utils.formatUnits(value, "ether"))}
          ></Value>
        )}
        {hasEvents &&
          events.map((ev) => {
            if (!!ev) {
              const {
                tokenName,
                tokenSymbol,
                amount,
                imageUrl,
                value,
                tokenStandard,
              } = ev;
              if (
                tokenStandard == "ERC20" ||
                tokenStandard == "WRAPPED ETHER"
              ) {
                return (
                  <TransferEventERC20
                    img={imageUrl || ""}
                    direction={getDirection(ev, from)}
                    amount={
                      (amount ? `${round(parseFloat(amount), 4)}` : "0") +
                      ` ${tokenSymbol}`
                    }
                    label={tokenName}
                    subamount={`$${parseFloat(value || "0").toFixed(2)}`}
                  />
                );
              } else if (tokenStandard == "ERC721") {
                return (
                  <TransferEventERC721
                    img={imageUrl || ""}
                    direction={getDirection(ev, from)}
                    amount={`${parseFloat(amount || "0").toFixed(0)} NFT`}
                    label={tokenName || "Unknown NFT"}
                    subamount={
                      value
                        ? `$${parseFloat(value).toFixed(2)}`
                        : "Unknown Value"
                    }
                  ></TransferEventERC721>
                );
              } else if (tokenStandard == "ERC1155") {
                return (
                  <TransferEventERC721
                    img={imageUrl || ""}
                    direction={getDirection(ev, from)}
                    amount={`${parseFloat(amount || "0").toFixed(0)} NFT`}
                    label={tokenName || "Unknown NFT"}
                    subamount={
                      value
                        ? `$${parseFloat(value).toFixed(2)}`
                        : "Unknown Value"
                    }
                  ></TransferEventERC721>
                );
              }
            }
          })}
        {hasDifference && (
          <TransferEventBalanceChange
            ethPrice={data?.ethPrice || ""}
            balanceChange={data?.contract?.tracerSimulation?.balanceChange}
          />
        )}
      </div>
    </Box>
  );
};
