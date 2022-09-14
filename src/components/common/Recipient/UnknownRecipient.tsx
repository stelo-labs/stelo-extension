import { Card, Separator, Header, CardRow } from "../../layout/Card";
import {
  UserCircleIcon,
  UserGroupIcon,
  SwitchHorizontalIcon,
  ViewGridAddIcon,
} from "@heroicons/react/solid";
import { truncateAddress } from "../../../utils/address";

type UnknownRecipientProps = {
  address: string;
};

// TODO: need to add recipient's global history (earliest transaction)
// TODO: handle the case when the recipient is a contract not an EOA (including the smart wallet case)
export const UnknownRecipient = ({ address }: UnknownRecipientProps) => {
  return (
    <>
      <Header
        headerText="Recipient Information"
        icon={
          <UserCircleIcon
            style={{ fill: "#B862EC", height: "30px", width: "30px" }}
          ></UserCircleIcon>
        }
      ></Header>
      <Separator />
      <CardRow
        text={truncateAddress(address)}
        subText={`${"View on Etherscan"}`}
        url={`https://etherscan.io/address/${address}`}
        icon={
          <UserGroupIcon
            style={{ fill: "gray", height: "20px", width: "20px" }}
          ></UserGroupIcon>
        }
      ></CardRow>
      <CardRow
        text={"Unknown number of transactions with recipient"}
        icon={
          <SwitchHorizontalIcon
            // Needs width  24px to for text to be aligned (not sure why)
            style={{ fill: "gray", height: "20px", width: "24px" }}
          ></SwitchHorizontalIcon>
        }
      ></CardRow>
      <CardRow
        text={"Holds an unknown number of NFTs"}
        icon={
          <ViewGridAddIcon
            style={{ fill: "gray", height: "20px", width: "20px" }}
          ></ViewGridAddIcon>
        }
      ></CardRow>
    </>
  );
};
