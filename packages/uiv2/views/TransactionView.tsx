import "../css/globalStyles.css";
import { Stack } from "uiv2/base/Stack";

import { type TransactionResponse } from "shared_types";
import { Divider } from "../base/Divider";
import { AssetChangeSection as AssetChangeSection } from "./AssetChangeSection/AssetChangeSection";
import { ContractCallSection } from "./ContractCallSection/ContractCallSection";
import { useAssetChanges } from "../store";

type TransactionViewProps = { enrichedTx: TransactionResponse };

export function TransactionView({ enrichedTx }: TransactionViewProps) {
  const assetChanges = useAssetChanges();
  return (
    <Stack space="12px">
      {assetChanges.length > 0 && (
        <AssetChangeSection response={enrichedTx}></AssetChangeSection>
      )}
      {!!enrichedTx.contract && (
        <>
          {assetChanges.length > 0 && <Divider />}
          <ContractCallSection
            contract={enrichedTx.contract}
            contractFunction={enrichedTx.function}
            initialState={assetChanges.length == 0 ? "open" : "closed"}
          />
        </>
      )}
    </Stack>
  );
}
