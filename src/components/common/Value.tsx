import { isNull, isUndefined } from "lodash";
import { Box } from "../layout/Box";
import { Text } from "../layout/Text";

export type ValueType =
  | "AT_RISK"
  | "SECURED"
  | "MINT_COST"
  | "TXN_VALUE"
  | "LISTING";

type ValueProps = {
  value: number | null | undefined;
  type: ValueType;
  symbol?: string;
};

export const Value = ({ value, type, symbol = "ETH" }: ValueProps) => {
  let header: string;
  if (isNull(value) || isUndefined(value)) header = "UNKNOWN";
  else if (symbol === "USD") {
    header = `$${Math.round((value + Number.EPSILON) * 100) / 100}`;
  } else {
    header = `${
      Math.round((value + Number.EPSILON) * 100000) / 100000
    } ${symbol}`;
  }
  return (
    <Box marginY="6x" alignItems={"center"}>
      <Text
        as="h3"
        size="18"
        letterSpacing="wide"
        textAlign="center"
        transform="uppercase"
      >
        {type === "LISTING" && "List Price"}
        {type === "AT_RISK" && "Value at risk"}
        {type === "SECURED" && "Value secured"}
        {type === "MINT_COST" && "Mint Cost"}
        {type === "TXN_VALUE" && "Transaction Value"}
      </Text>
      <Text size="50" textAlign="center" as="h1">
        {header}
      </Text>
    </Box>
  );
};
