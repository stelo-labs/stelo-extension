import { type Seaport, type SignatureResponse } from "shared_types";
import clsx from "clsx";
import { Divider } from "../../base/Divider";
import { Stack } from "../../base/Stack";
import { Text, Title } from "../../base/Text";
import { DataTable, KeyValue } from "../../components/DataTable/DataTable";
import { Disclaimer } from "../../components/Disclaimer/Disclaimer";
import Info from "../../components/Disclaimer/Info";
import Warning from "../../components/Disclaimer/Warning";
import { Dropdown, DropdownHeader } from "../../components/Dropdown/Dropdown";
import { TypedDataView } from "../../components/TypedData/TypeData";
import { AssetChangeSection } from "../AssetChangeSection/AssetChangeSection";
import { ContractCallSection } from "../ContractCallSection/ContractCallSection";
import {
  breakWordWrap,
  nudgeDisclaimer,
  personalSign,
} from "./SignatureView.css";
import { format, formatDistance } from "date-fns";
import { copy } from "../../copy";
import { Container } from "../../base/Container";
import { formatAmount } from "utils";
import { formatSymbol } from "../../components/Asset/Utils";
import { useHasSeaportMetadataError } from "../../store";
type SignatureViewProps = {
  sig: SignatureResponse;
};

type SeaportData = NonNullable<SignatureResponse["seaport"]>;

const isMultisigWallet = (sigType: SignatureResponse["signatureType"]) => {
  return sigType == "TRANSACTION";
};

const isSeaportSignature = (sigType: SignatureResponse["signatureType"]) => {
  return sigType == "SEAPORT";
};

const getTotalRoyaltyPercentage = (seaportData: any) => {
  let feeAmount = 0;
  const totaAmount = Number(seaportData?.totalValue?.amount);
  if (!totaAmount) return 0;
  if (!!seaportData?.creatorValue?.amount) {
    feeAmount += Number(seaportData?.creatorValue?.amount);
  }
  if (!!seaportData?.platformValue?.amount) {
    feeAmount += Number(seaportData?.platformValue?.amount);
  }
  return (feeAmount / totaAmount) * 100;
};

const getRoyaltyData = (seaportData: any): KeyValue[] => {
  const totalAmount = seaportData?.totalValue?.amount;
  const data = [];

  if (!!seaportData?.totalValue?.amount) {
    const platformFee =
      (Number(seaportData?.platformValue?.amount) / totalAmount) * 100;
    data.push({
      label: copy.royalty_table.platformFee,
      value: `${platformFee}%`,
    });
  }
  if (!!seaportData?.creatorValue?.amount) {
    const creatorFee =
      (Number(seaportData?.creatorValue?.amount) / totalAmount) * 100;
    data.push({
      label: copy.royalty_table.creatorFee,
      value: `${creatorFee}%`,
    });
  }

  if (!!seaportData.expiry.date) {
    data.push({
      label: copy.royalty_table.expires,
      value: `${format(
        new Date(seaportData.expiry.date),
        "MM/dd/yyyy"
      )} (${formatDistance(
        new Date(seaportData.expiry.date),
        new Date(),

        {
          addSuffix: true,
        }
      )})`,
    });
  } else if (!!seaportData.expiry.never) {
    data.push({
      label: copy.royalty_table.expires,
      value: `Never`,
    });
  }
  return data;
};

export const SeaportSection = ({
  seaportData,
}: {
  seaportData: SeaportData;
}) => {
  return (
    <>
      <Title>Listing Information</Title>
      <Dropdown
        header={
          <DropdownHeader>
            Listing for{" "}
            <Text as="span" size="3x" weight="600">
              {formatAmount(
                Number(seaportData.totalValue?.formattedAmount || 0)
              )}{" "}
              {formatSymbol(seaportData.totalValue)}
            </Text>
          </DropdownHeader>
        }
        dropdown={<DataTable data={getRoyaltyData(seaportData)} />}
      ></Dropdown>
    </>
  );
};

export const SignatureView: FC<SignatureViewProps> = ({ sig }) => {
  const sigType = sig.signatureType;
  const assetChanges = sig.assetChanges.length > 0;
  const hasSeaportError = useHasSeaportMetadataError();
  const isListing = ["LISTING", "BULK_LISTING"].includes(
    sig.seaport?.seaportType || ""
  );
  return (
    <Stack space="12px">
      {assetChanges ? (
        <AssetChangeSection response={sig} />
      ) : (
        <SignatureSection sig={sig} />
      )}
      {isMultisigWallet(sigType) ? (
        <Disclaimer icon={<Warning></Warning>} className={nudgeDisclaimer}>
          This transaction requires another party to confirm before finalizing
        </Disclaimer>
      ) : sig.rpcMethod === "EIP712_TYPED_DATA" ? (
        <Disclaimer icon={<Info></Info>} className={nudgeDisclaimer}>
          This is a gasless signature. Signing this message may not result in
          immediate changes.
        </Disclaimer>
      ) : (
        <></>
      )}
      {isMultisigWallet(sigType) && (
        <>
          <Divider />
          <ContractCallSection
            contract={sig.transaction?.contract}
            contractFunction={sig.transaction?.function}
          />
        </>
      )}
      {isSeaportSignature(sigType) && !hasSeaportError && isListing && (
        <>
          <Divider></Divider>
          <SeaportSection seaportData={sig.seaport as Seaport}></SeaportSection>
        </>
      )}
    </Stack>
  );
};
const SignatureSection = ({ sig }: { sig: SignatureResponse }) => {
  return (
    <>
      <Title>Signing a Message</Title>
      {sig.rpcMethod === "PERSONAL_SIGN" && <PersonalSignSection sig={sig} />}
      {sig.rpcMethod === "ETH_SIGN" && <EthSignSection sig={sig} />}
      {sig.rpcMethod === "EIP712_TYPED_DATA" && (
        <SignedTypedDataSection sig={sig} />
      )}
      {sig.rpcMethod === "UNKNOWN" && <PersonalSignSection sig={sig} />}
    </>
  );
};

const PersonalSignSection = ({ sig: enrichedSig }: SignatureViewProps) => {
  const hasWhiteSpace = !enrichedSig?.message?.includes(" ");
  return (
    <Container className={clsx(personalSign, hasWhiteSpace && breakWordWrap)}>
      {enrichedSig?.message}
    </Container>
  );
};

const SignedTypedDataSection = ({ sig: enrichedSig }: SignatureViewProps) => {
  return (
    <div className={personalSign}>
      <Text size="2x" weight="600">
        Signature Data
      </Text>
      <br />
      <TypedDataView
        // @ts-ignore
        data={enrichedSig.json.message as unknown as any}
      ></TypedDataView>
    </div>
  );
};

const EthSignSection = ({ sig: enrichedSig }: SignatureViewProps) => {
  return <div className={personalSign}>{enrichedSig?.message}</div>;
};
