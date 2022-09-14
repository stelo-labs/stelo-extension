import {
  Card,
  Separator,
  Header,
  CardContentPlaceholder,
} from "../../layout/Card";
import { UserCircleIcon } from "@heroicons/react/solid";
import { SkeletonCardContent } from "../Skeleton";

// TODO: need to add recipient's global history (earliest transaction)
// TODO: handle the case when the recipient is a contract not an EOA (including the smart wallet case)
export const SkeletonRecipient = () => {
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
      <CardContentPlaceholder rows={3} height={140} width={300} />
    </>
  );
};
