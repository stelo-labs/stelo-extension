import { Box } from "../../layout/Box";
import { Media } from "../Media";
import { TransferEventAmount } from "./TransferEventAmount";
import { TransferEventLabel } from "./TransferEventLabel";

type TransferEventERC721Props = {
  img: string;
  direction: "in" | "out";
  label: string | null | undefined;
  subamount: string;
  amount: string;
};
export const TransferEventERC721 = ({
  img,
  direction,
  label,
  subamount,
  amount,
}: TransferEventERC721Props) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      paddingLeft="2x"
      paddingRight="4x"
      paddingY="4x"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box paddingRight={"4x"}>
        <Media
          src={img}
          style={{
            height: "31px",
            width: "31px",
            borderRadius: ".5em",
          }}
        />
      </Box>
      <TransferEventLabel direction={direction} label={label} amount={amount} />
      <TransferEventAmount
        direction={direction}
        label={amount}
        subamount={subamount}
      ></TransferEventAmount>
    </Box>
  );
};
