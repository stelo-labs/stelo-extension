import { ERC20Func, ParsedERC20Txn } from "../../tx/types";
import { Unknown, TransferOrApprove, ChangeAllowance } from "./functions";

type ERC20ComponentProps = {
  txn: ParsedERC20Txn;
};

export const ERC20Component = ({ txn }: ERC20ComponentProps) => {
  switch (txn.functionType) {
    case ERC20Func.APPROVE:
    case ERC20Func.TRANSFER:
    case ERC20Func.TRANSFER_FROM:
      return <TransferOrApprove txn={txn} />;
    case ERC20Func.INCREASE_ALLOWANCE:
    case ERC20Func.DECREASE_ALLOWANCE:
      return <ChangeAllowance txn={txn} />;
    default:
      return <Unknown txn={txn} />;
  }
};
