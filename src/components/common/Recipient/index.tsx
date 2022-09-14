import { gql } from "@apollo/client";
import { RecipientFragment } from "../../../generated/graphql";
import { Card } from "../../layout/Card";
import { AccountRecipient } from "./AccountRecipient";
import { ContractRecipient } from "./ContractRecipient";
import { SkeletonRecipient } from "./SkeletonRecipient";
import { UnknownRecipient } from "./UnknownRecipient";

type RecipientProps = {
  toAccount: RecipientFragment | null | undefined;
  fromAddress: string;
  toAddress: string;
  loading: boolean;
};

export const Recipient = ({
  loading,
  toAccount,
  fromAddress,
  toAddress,
}: RecipientProps) => {
  let inner;
  if (loading) {
    inner = <SkeletonRecipient />;
  } else if (!toAccount) {
    inner = <UnknownRecipient address={toAddress} />;
  } else if (toAccount.contractCode === "0x") {
    inner = (
      <AccountRecipient fromAddress={fromAddress} toAddress={toAddress} />
    );
  } else {
    inner = <ContractRecipient address={toAddress} />;
  }

  return <Card padding="2x">{inner}</Card>;
};

Recipient.fragments = gql`
  fragment Recipient on Web3Account {
    contractCode
  }
`;
