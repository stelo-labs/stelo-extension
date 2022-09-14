import { gql, useQuery } from "@apollo/client";
import {
  Separator,
  Header,
  CardRow,
  CardContentPlaceholder,
} from "../../layout/Card";
import {
  UserCircleIcon,
  UserGroupIcon,
  SwitchHorizontalIcon,
  ViewGridAddIcon,
} from "@heroicons/react/solid";
import { normalizeAccount, truncateAddress } from "../../../utils/address";
import { Media } from "../Media";
import { log } from "../../../shared/logger";
import { AccountRecipientQuery } from "../../../generated/graphql";
import { enterAnimationClass } from "./Recipient.css";

const ACCOUNT_RECIPIENT_QUERY = gql`
  query AccountRecipient($fromAddress: String!, $toAddress: String!) {
    web3Account(id: $toAddress) {
      ensName
      countOfNfts
      topNfts {
        media
      }
      countTransfersBetween(otherAddress: $fromAddress)
      recentTransferBetween(otherAddress: $fromAddress) {
        contractAddress
        category
        value
        tokenId
      }
    }
  }
`;

type AccountRecipientProps = {
  fromAddress: string;
  toAddress: string;
};

// TODO: need to add recipient's global history (earliest transaction)
// TODO: handle the case when the recipient is a contract not an EOA (including the smart wallet case)
export const AccountRecipient = ({
  fromAddress,
  toAddress,
}: AccountRecipientProps) => {
  const { loading, error, data } = useQuery<AccountRecipientQuery>(
    ACCOUNT_RECIPIENT_QUERY,
    { variables: { fromAddress: fromAddress, toAddress: toAddress } }
  );

  const account = data?.web3Account;
  const topNfts = account?.topNfts || [];

  if (error) log(error);
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
      {loading ? (
        <CardContentPlaceholder rows={3} height={140} width={300} />
      ) : (
        <div className={enterAnimationClass}>
          <CardRow
            text={normalizeAccount({
              ensName: account?.ensName,
              id: toAddress,
            })}
            subText={`${
              !account?.ensName
                ? "View on Etherscan"
                : truncateAddress(toAddress)
            }`}
            url={`https://etherscan.io/address/${toAddress}`}
            icon={
              <UserGroupIcon
                style={{ fill: "gray", height: "20px", width: "20px" }}
              ></UserGroupIcon>
            }
          ></CardRow>
          <CardRow
            text={
              (account?.countTransfersBetween || 0) +
              " transactions with recipient"
            }
            // TODO(scharf): clean this up -- not sure what the recent transfers are
            subText={
              !!account?.countTransfersBetween
                ? "Recently transferred an NFT"
                : undefined
            }
            icon={
              <SwitchHorizontalIcon
                style={{ fill: "gray", height: "20px", width: "20px" }}
              ></SwitchHorizontalIcon>
            }
          ></CardRow>
          <CardRow
            text={
              "Holds " +
              (account?.countOfNfts || "an unknown number of") +
              " NFTs"
            }
            icon={
              <ViewGridAddIcon
                style={{ fill: "gray", height: "20px", width: "20px" }}
              ></ViewGridAddIcon>
            }
          ></CardRow>
          {topNfts.length > 0 && (
            <a href={`https://opensea.io/${toAddress}`} target="_blank">
              <div style={{ marginLeft: "40px", display: "flex" }}>
                {(
                  topNfts
                    .filter((nft: any) => nft.media !== "")
                    .slice(0, 4) as any[]
                ).map((nft, index) => (
                  <div style={{ position: "relative", padding: "5px" }}>
                    <Media
                      style={{
                        borderRadius: "20px",
                        filter: "drop-shadow(1px 0px 4px rgba(0, 0, 0, 0.45))",
                        height: "55px",
                        width: "55px",
                      }}
                      src={nft.media}
                    />
                    {(index == 3 || index == topNfts!.length - 1) && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "55px",
                          width: "55px",
                          borderRadius: "20px",
                          fontSize: "22px",
                          // this should be done via Vanilla
                          fontWeight: "700",
                          position: "absolute",
                          margin: "auto auto",
                          top: "5px",
                          backgroundColor: "rgba(0, 0, 0, .4)",
                          zIndex: "2",
                          color: "white",
                        }}
                      >
                        {topNfts!.length > 4 && "+ " + (topNfts!.length - 4)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </a>
          )}
        </div>
      )}
    </>
  );
};
