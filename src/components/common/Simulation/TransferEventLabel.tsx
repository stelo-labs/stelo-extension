import { Box } from "../../layout/Box";
import { Text } from "../../layout/Text";

type TransferEventLabelProps = {
  direction: "in" | "out";
  amount?: string;
  label: string | null | undefined;
};
export const TransferEventLabel = ({
  direction,
  label,
}: TransferEventLabelProps) => {
  return (
    <Box>
      <Text
        weight={700}
        size="20"
        color={direction == "in" ? "green300" : "red"}
      >
        {label}
      </Text>
      <Text
        style={{ float: "left" }}
        color={direction == "in" ? "green300" : "red"}
      ></Text>
    </Box>
  );
};
