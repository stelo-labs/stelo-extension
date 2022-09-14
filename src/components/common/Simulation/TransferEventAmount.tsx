import { Box } from "../../layout/Box";
import { Text } from "../../layout/Text";
type TransferEventAmountProps = {
  direction: "in" | "out";
  label?: string;
  subamount?: string;
};
export const TransferEventAmount = ({
  direction,
  label,
  subamount,
}: TransferEventAmountProps) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"flex-end"}
      style={{ marginLeft: "auto" }}
    >
      <Text
        weight={700}
        size="20"
        color={direction == "in" ? "green300" : "red"}
        style={{ float: "right", whiteSpace: "nowrap" }}
      >
        {direction == "in" ? "+" : "-"}
        {label}
      </Text>
      <Text
        style={{ float: "right" }}
        color={direction == "in" ? "green300" : "red"}
      >
        {subamount}
      </Text>
    </Box>
  );
};
