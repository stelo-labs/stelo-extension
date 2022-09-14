import { ERC1155, ERC20, ERC721, ETH, ParsedTransaction } from "../tx/types";
import { ERC721Component } from "./ERC721";
import { ERC20Component } from "./ERC20";
import { ETHComponent } from "./ETH";
import { UnknownTxnComponent } from "./Unknown/UnknownTxn";
import React from "react";
import { ERC1155Component } from "./ERC1155";

type TxnViewProps = {
  txn: ParsedTransaction;
};

export function TxnView({ txn }: TxnViewProps) {
  const TransactionView: React.ElementType = ((txn: ParsedTransaction) => {
    switch (txn.transactionType) {
      case ERC721:
        return ERC721Component;
      case ERC20:
        return ERC20Component;
      case ERC1155:
        return ERC1155Component;
      case ETH:
        return ETHComponent;
      default:
        return UnknownTxnComponent;
    }
  })(txn);

  return <TransactionView txn={txn} />;
}
