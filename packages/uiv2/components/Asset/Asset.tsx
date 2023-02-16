import { HeaderSubtext, HeaderText, Link, Text } from "../../base/Text";
import { type AssetChange } from "shared_types";
import {
  AssetChangeProps,
  Badge,
  CollectionName,
  Direction,
  DirectionRow,
  MaybeLink,
} from "./Shared";
import { MultiAsset } from "./MultiAsset";
import {
  assetUrl,
  formatAmountForType,
  formatFloorPrice,
  formatSymbol,
  FormatAssetWithOptionalDollarSign,
} from "./Utils";
import clsx from "clsx";
import { inlineBadge } from "./asset.css";

const NoAsset = () => {
  return <div>No Asset</div>;
};

const NFTAssetRow = ({ change }: { change: AssetChange }) => {
  return (
    <div>
      <MaybeLink href={change.asset.openseaUrl}>
        <HeaderText>
          {formatAmountForType(change)} {formatSymbol(change.asset)}
        </HeaderText>
      </MaybeLink>
      <CollectionName change={change} size="md"></CollectionName>
      <HeaderSubtext>
        Floor Price:{" "}
        <Text as="span" weight="500">
          {formatFloorPrice(change)}
        </Text>
      </HeaderSubtext>
    </div>
  );
};

const ERC20AssetRow = ({ change }: { change: AssetChange }) => {
  return (
    <div>
      <HeaderText>
        {formatAmountForType(change)} {formatSymbol(change.asset)}
      </HeaderText>
      <HeaderSubtext>
        Value:{" "}
        <Text as="span" weight="500">
          {FormatAssetWithOptionalDollarSign(change)}
        </Text>
      </HeaderSubtext>
    </div>
  );
};

const SingleAsset = ({
  change,
  direction,
}: {
  change: AssetChange;
  direction: Direction;
}) => {
  const isFungible =
    change.asset.type === "ERC20" || change.asset.type == "NATIVE";
  const isNFT =
    change.asset.type === "ERC721" || change.asset.type === "ERC1155";

  const url = isNFT ? assetUrl(change.asset) : "";
  const _Badge = (
    <Badge
      className={clsx(isFungible && inlineBadge)}
      type={change.asset.type}
      imgUrl={change.asset.imageUrl}
    />
  );
  const MaybeLinkedBadge =
    isNFT && url ? <Link href={url}>{_Badge}</Link> : _Badge;

  return (
    <DirectionRow direction={direction}>
      {isFungible && <ERC20AssetRow change={change} />}
      {isNFT && <NFTAssetRow change={change} />}
      {MaybeLinkedBadge}
    </DirectionRow>
  );
};

export const AssetChangeComponent = ({
  direction,
  changes,
}: AssetChangeProps) => {
  if (changes.length === 1)
    return <SingleAsset direction={direction} change={changes[0]} />;
  if (changes.length > 1)
    return <MultiAsset direction={direction} changes={changes} />;
  return <NoAsset></NoAsset>;
};
