import { Text, Title } from "../../base/Text";
import {
  type SignatureResponse,
  type TransactionResponse,
  type AssetChange,
} from "shared_types";
import { Direction } from "../../components/Asset/Shared";
import { AssetChangeComponent } from "../../components/Asset/Asset";
import { directionRowChildren } from "../../components/Asset/asset.css";
import Question from "../../components/RiskDisplay/Question";
import { Row } from "../../base/Row";
import { simulateAssetChangeError } from "./AssetChangeSection.css";
import { Stack } from "../../base/Stack";
import { useHasAssetChangeError } from "../../store";
import { copy } from "../../copy";
import { Container } from "../../base/Container";
import { Recipient } from "../../components/Recipient/Recipient";
import cloneDeep from "lodash/cloneDeep";

type Response = TransactionResponse | SignatureResponse | undefined;

export const hasAssetChanges = (response: Response) => {
  return (
    !!response && !!response.assetChanges && response?.assetChanges?.length > 0
  );
};

const ChangeAndTitle = ({
  title,
  direction,
  assetChanges,
  style,
}: {
  style?: React.CSSProperties;
  title: String;
  direction: Direction;
  assetChanges: AssetChange[];
}) => {
  return (
    <>
      <Title>{title}</Title>
      <AssetChangeComponent direction={direction} changes={assetChanges} />
    </>
  );
};

const UnableToSimulate = () => {
  return (
    <Stack space="12px">
      <Title>Unable to simulate transaction</Title>
      <Container>
        <div className={directionRowChildren}>
          <Row
            justifyContent="center"
            alignItems="center"
            className={simulateAssetChangeError}
          >
            <Question />
          </Row>
        </div>
      </Container>
    </Stack>
  );
};

const isTransactionResponse = (res: Response): res is TransactionResponse => {
  return !!(res as TransactionResponse)?.functionType;
};

const isSignatureResponse = (res: Response): res is SignatureResponse => {
  return !!(res as SignatureResponse)?.signatureType;
};

export const getOutgoingVerb = (enrichedResponse: Response) => {
  if (isTransactionResponse(enrichedResponse)) {
    switch (enrichedResponse.functionType) {
      case "SET_APPROVAL_FOR_ALL":
        if (enrichedResponse?.assetChanges?.[0].asset.amount == "0") {
          return copy.verbs.revoke;
        } else {
          return copy.verbs.approve;
        }
      case "APPROVE":
        if (enrichedResponse?.assetChanges[0].asset.amount == "0") {
          return copy.verbs.revoke;
        } else {
          return copy.verbs.approve;
        }
      default:
        return copy.verbs.send;
    }
  } else if (isSignatureResponse(enrichedResponse)) {
    if (
      enrichedResponse.signatureType == "SEAPORT" &&
      enrichedResponse.seaport?.seaportType == "BID"
    ) {
      return copy.verbs.offer;
    } else if (
      enrichedResponse.signatureType == "SEAPORT" &&
      enrichedResponse.seaport?.seaportType == "LISTING"
    ) {
      return copy.verbs.offer;
    } else {
      return copy.verbs.send;
    }
  }
  return copy.verbs.send;
};

export const getIncomingVerb = (enrichedResponse: Response) => {
  if (
    isSignatureResponse(enrichedResponse) &&
    enrichedResponse.signatureType == "SEAPORT" &&
    (enrichedResponse.seaport?.seaportType == "LISTING" ||
      enrichedResponse.seaport?.seaportType == "BID")
  ) {
    return copy.verbs.for;
  }

  return copy.verbs.receive;
};

/**
 * Aggregate ERC20 "Fungible" Asset changes so they can be displayed as a single change, while keeping Non-fungible changes separate.
 * some UI's might decide to display AssetChanges on a per recipient basis. We do not.
 *
 * @param assetChanges
 * @returns
 */
const aggregateFungibleAssetChanges = (
  assetChanges: AssetChange[]
): AssetChange[] => {
  return Object.values(
    assetChanges.reduce(
      (acc: Record<string, AssetChange[]>, change: AssetChange) => {
        const contractAddress = change.asset.contractAddress || "0x000000000";
        // Skip malformed AssetChanges
        if (!contractAddress) return acc;
        const assetType = change.asset.type;
        if (assetType == "ERC20") {
          const existing = acc[contractAddress]?.[0] || false;
          if (existing) {
            existing.asset.formattedAmount = (
              Number(existing.asset.formattedAmount) +
              Number(change.asset.formattedAmount)
            ).toString();
            acc[contractAddress] = [cloneDeep(existing)];
          } else {
            acc[contractAddress] = [cloneDeep(change)];
          }
        } else {
          !!acc[contractAddress]
            ? acc[contractAddress].push(cloneDeep(change))
            : (acc[contractAddress] = [cloneDeep(change)]);
        }
        return acc;
      },
      {}
    )
  ).flat();
};

export const getApprovalAssetChanges = (changes: AssetChange[]) => {
  return aggregateFungibleAssetChanges(
    changes.filter(
      (change) => change.type === "APPROVE" || change.type === "APPROVE_ALL"
    )
  );
};
export const getSendingAssetChanges = (changes: AssetChange[]) => {
  return aggregateFungibleAssetChanges(
    changes.filter((change) => change.type === "TRANSFER_OUT")
  );
};
export const getReceivingAssetChanges = (changes: AssetChange[]) => {
  return aggregateFungibleAssetChanges(
    changes.filter((change) => change.type === "TRANSFER_IN")
  );
};
const getRecipients = (changes: AssetChange[]) => {
  return changes
    .filter(
      (change) =>
        change.type === "TRANSFER_OUT" ||
        change.type === "APPROVE" ||
        change.type === "APPROVE_ALL"
    )
    .map((change) => change.counterparty)
    .filter((counterparty) => !!counterparty);
};

export const AssetChangeSection = ({
  response,
}: {
  response: NonNullable<Response>;
}) => {
  const hasAssetChangeError = useHasAssetChangeError();
  const approvals = getApprovalAssetChanges(response.assetChanges);
  const sending = getSendingAssetChanges(response.assetChanges);
  const receiving = getReceivingAssetChanges(response.assetChanges);
  const recipients = getRecipients(response.assetChanges);
  return (
    <>
      {hasAssetChangeError && <UnableToSimulate />}

      {approvals.length > 0 && (
        <ChangeAndTitle
          title={getOutgoingVerb(response)}
          direction="out"
          assetChanges={approvals}
        />
      )}
      {sending.length > 0 && (
        <ChangeAndTitle
          title={getOutgoingVerb(response)}
          direction="out"
          assetChanges={sending}
        />
      )}
      {receiving.length > 0 && (
        <ChangeAndTitle
          style={{ marginTop: "4px" }}
          direction="in"
          title={copy.verbs.receive}
          assetChanges={receiving}
        />
      )}
      {recipients.length > 0 && <Recipient recipients={recipients}></Recipient>}
    </>
  );
};
