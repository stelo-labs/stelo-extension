import { ERC1155Func, ParsedERC1155Txn } from "../../tx/types";
import {
  BatchTransfer,
  SetApprovalForAll,
  Transfer,
  Unknown,
} from "./functions";

type ERC1155ComponentProps = {
  txn: ParsedERC1155Txn;
};

export const ERC1155Component = ({ txn }: ERC1155ComponentProps) => {
  switch (txn.functionType) {
    case ERC1155Func.TRANSFER:
      return <Transfer txn={txn} />;
    case ERC1155Func.BATCH_TRANSFER:
      return <BatchTransfer txn={txn} />;
    case ERC1155Func.SET_APPROVAL_FOR_ALL:
      return <SetApprovalForAll txn={txn} />;
    default:
      return <Unknown txn={txn} />;
  }
};
