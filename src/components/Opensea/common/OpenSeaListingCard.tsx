import {
  CalendarIcon,
  CurrencyDollarIcon,
  SwitchHorizontalIcon,
  UserIcon,
} from "@heroicons/react/solid";
import { format, formatDistanceStrict } from "date-fns";
import { Bill, Expiry } from "../../../signature/seaport/types";
import { Box } from "../../layout/Box";
import { Card, CardRow, Header, Separator } from "../../layout/Card";

type OpenSeaListingCardProps = {
  bill: Bill;
  expiry: Expiry;
};
export const OpenSeaListingCard: React.FC<OpenSeaListingCardProps> = ({
  bill,
  expiry,
}) => {
  return (
    <Card>
      <Header
        headerText="OpenSea Listing Information"
        icon={
          <Box
            padding="1x"
            background={"listing"}
            display="flex"
            alignItems={"center"}
            borderRadius="full"
            style={{ width: "26px", height: "26px" }}
          >
            <UserIcon
              style={{
                fill: "white",
                height: "20px",
                width: "20px",
              }}
            ></UserIcon>
          </Box>
        }
      ></Header>
      <Separator />
      <CardRow
        layout="inverted"
        text={"If sold you receive"}
        subText={"" + bill.earnings + " " + bill.listToken}
        icon={
          <CurrencyDollarIcon
            style={{ fill: "gray", height: "20px", width: "20px" }}
          ></CurrencyDollarIcon>
        }
      ></CardRow>
      <CardRow
        layout="inverted"
        text={"Fees and Royalties"}
        subText={
          <>
            {bill.creatorFee}% Creator <br /> {bill.platformFee}% Opensea
          </>
        }
        icon={
          <SwitchHorizontalIcon
            style={{ fill: "gray", height: "20px", width: "20px" }}
          ></SwitchHorizontalIcon>
        }
      ></CardRow>
      <CardRow
        layout="inverted"
        text={"Listing Expires"}
        subText={`${format(
          new Date(expiry.date),
          "MM/dd/yyyy"
        )} (${formatDistanceStrict(new Date(), new Date(expiry.date), {
          unit: "day",
        })})`}
        icon={
          <CalendarIcon
            style={{ fill: "gray", height: "20px", width: "20px" }}
          ></CalendarIcon>
        }
      ></CardRow>
    </Card>
  );
};
