import { round } from "lodash";
import { SimulationQuery } from "../../../generated/graphql";
import { TransferEventERC20 } from "./TransferEventERC20";
import { O } from "ts-toolbelt";

type TransferEventBalanceChangeProps = {
  ethPrice: string;
  balanceChange: O.Path<
    SimulationQuery,
    ["contract", "tracerSimulation", "balanceChange"]
  >;
};
export const TransferEventBalanceChange = ({
  ethPrice,
  balanceChange,
}: TransferEventBalanceChangeProps) => {
  if (!balanceChange) return <></>;
  const { difference } = balanceChange;
  if (difference == 0) return <></>;
  const direction = difference > 0 ? "in" : "out";
  const absoluteDifference = round(Math.abs(difference), 4);
  return (
    <TransferEventERC20
      direction={direction}
      img={"https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"}
      label={"Ethereum"}
      subamount={"$" + (absoluteDifference * parseFloat(ethPrice)).toFixed(2)}
      amount={String(absoluteDifference) + " ETH"}
    />
  );
};
