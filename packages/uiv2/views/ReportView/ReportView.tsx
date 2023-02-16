import { Stack } from "../../base/Stack";
import ContractErrorIllustration from "./ContractErrorIllustration";
import { fill } from "./ReportView.css";
export const ReportView = () => {
  return (
    <Stack alignItems="center" className={fill}>
      <ContractErrorIllustration />
    </Stack>
  );
};
