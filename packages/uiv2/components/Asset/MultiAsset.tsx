import { AssetChange } from "shared_types";
import { formatAmount } from "utils";
import { AssetDeck } from "../../base/Deck";
import { Row } from "../../base/Row";
import { Stack } from "../../base/Stack";
import { HeaderSubtext, HeaderText, Link, Text } from "../../base/Text";
import { DropdownIcon } from "../Dropdown/Dropdown";
import { multiAssetDropdown } from "./asset.css";
import {
  Badge,
  CollectionName,
  Direction,
  DirectionRow,
  FloorPrice,
  formatTokenName,
  MaybeLink,
} from "./Shared";
import { useDirectionRowStore } from "./Store";
import {
  assetUrl,
  formatSymbol,
  FormatAssetWithOptionalDollarSign,
  formatAmountWithOptionalDollarSign,
} from "./Utils";

const getId = (change: AssetChange) => {
  return `${change.asset.contractAddress}-${change.asset.tokenId}`;
};

// TODO Deck should take asset changes directly and style image based on type
const MultiBadge = ({ changes }: { changes: AssetChange[] }) => {
  return <AssetDeck limit={3} assets={changes.map((c) => c.asset)}></AssetDeck>;
};

export const AssetRow: FC<{ badge?: React.ReactNode }> = ({
  children,
  badge,
}) => {
  return (
    <Row justifyContent="space-between" alignItems="center">
      <Stack space="2px">{children}</Stack>
      <div style={{ width: "44px", justifyContent: "center", display: "flex" }}>
        {badge}
      </div>
    </Row>
  );
};

const ERC721AssetRow = ({ change }: { change: AssetChange }) => {
  const url = assetUrl(change.asset);

  const MaybeBadgeLink = url ? (
    <Link href={assetUrl(change.asset)}>
      <Badge type={change.asset.type} imgUrl={change.asset.imageUrl} />
    </Link>
  ) : (
    <Badge type={change.asset.type} imgUrl={change.asset.imageUrl} />
  );

  return (
    <AssetRow badge={MaybeBadgeLink}>
      <MaybeLink href={change.asset.openseaUrl}>
        <Text size="1x" weight="600">
          {formatTokenName(change)}
        </Text>
      </MaybeLink>
      <CollectionName change={change} size="sm" />
      <FloorPrice change={change}></FloorPrice>
    </AssetRow>
  );
};
const ERC20ASssetRow = ({ change }: { change: AssetChange }) => {
  return (
    <AssetRow
      badge={<Badge type={change.asset.type} imgUrl={change.asset.imageUrl} />}
    >
      <Text size="1x" weight="500">
        {formatAmount(Number(change.asset.formattedAmount))}{" "}
        {formatSymbol(change.asset)}
      </Text>
      <Text size="1x" color="gray500">
        Value:{" "}
        <Text as="span" weight="500" color="black">
          {FormatAssetWithOptionalDollarSign(change)}
        </Text>
      </Text>
    </AssetRow>
  );
};

export const MultiAsset = ({
  changes,
  direction,
}: {
  changes: AssetChange[];
  direction: Direction;
}) => {
  const { isOpen, setOpen } = useDirectionRowStore((state) => ({
    isOpen: state.isOpen,
    setOpen: state.setOpen,
  }));
  const numberOfAssets = changes.length;
  const value = changes
    .map((asset) => {
      return Number(asset.asset.priceUsd) * Number(asset.asset.formattedAmount);
    })
    .reduce((a, b) => a + b, 0);
  const open = isOpen(direction);
  return (
    <DirectionRow
      direction={direction}
      dropdown={
        <Stack className={multiAssetDropdown} space="16px">
          {changes.map((change, idx) => {
            if (
              change.asset.type === "ERC721" ||
              change.asset.type === "ERC1155"
            )
              return <ERC721AssetRow key={getId(change)} change={change} />;
            if (change.asset.type === "ERC20" || change.asset.type === "NATIVE")
              return <ERC20ASssetRow key={getId(change)} change={change} />;
          })}
        </Stack>
      }
    >
      <div>
        <HeaderText>{numberOfAssets} Tokens</HeaderText>
        <HeaderSubtext>
          Combined:{" "}
          <Text as="span" weight="500">
            {formatAmountWithOptionalDollarSign(value)}
          </Text>
        </HeaderSubtext>
      </div>
      <Row justifyContent="center" alignItems="center">
        <MultiBadge changes={changes} />
        <DropdownIcon
          isOpen={open}
          onClick={() => {
            setOpen(direction, !open);
          }}
        />
      </Row>
    </DirectionRow>
  );
};
