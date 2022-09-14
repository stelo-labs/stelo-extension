import { Box } from "../../layout/Box";
import { Media } from "../Media";
import { TransferEventAmount } from "./TransferEventAmount";
import { TransferEventLabel } from "./TransferEventLabel";

type TransferEventERC20Props = {
  img: string;
  direction: "in" | "out";
  label: string | null | undefined;
  subamount: string;
  amount: string;
};
export const TransferEventERC20 = ({
  img,
  direction,
  label,
  subamount,
  amount,
}: TransferEventERC20Props) => {
  return (
    <Box
      style={{ width: "100%" }}
      display="inline-flex"
      flexDirection="row"
      paddingLeft="2x"
      paddingRight="4x"
      paddingY="4x"
      alignItems="center"
    >
      <Media
        src={img}
        style={{
          height: "31px",
          width: "31px",
          marginRight: "12px",
          flexBasis: "31px",
          flexGrow: 0,
          flexShrink: 0,
        }}
      />
      <TransferEventLabel direction={direction} label={label} />
      <TransferEventAmount
        direction={direction}
        label={amount}
        subamount={subamount}
      ></TransferEventAmount>
    </Box>
  );
};
