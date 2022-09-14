import { ERC721Func, ParsedERC721Txn } from "../../tx/types";
import { TransferOrApprove, SetApprovalForAll, Unknown } from "./functions";

type ERC721ComponentProps = {
  txn: ParsedERC721Txn;
};

export const ERC721Component = ({ txn }: ERC721ComponentProps) => {
  switch (txn.functionType) {
    case ERC721Func.APPROVE:
    case ERC721Func.TRANSFER:
      return <TransferOrApprove txn={txn} />;
    case ERC721Func.SET_APPROVAL_FOR_ALL:
      return <SetApprovalForAll txn={txn} />;
    default:
      return <Unknown txn={txn} />;
  }
};
