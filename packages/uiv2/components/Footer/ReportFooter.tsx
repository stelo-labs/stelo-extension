import { getRootURL, isValidURL } from "utils";
import { Button } from "../../base/Button";
import { Row } from "../../base/Row";
import { Stack } from "../../base/Stack";
import { Text } from "../../base/Text";
import { TextArea } from "../../base/TextArea";
import { useViewStore } from "../../store";
import {
  controlsWrapper,
  footerWrapper,
  reportFooterTextArea,
} from "./Footer.css";

export const ReportFooter = ({ dappUrl }: { dappUrl: string | undefined }) => {
  const { back, createEvent } = useViewStore();
  const report = () => {
    createEvent("REPORTED");
    back();
  };

  return (
    <div className={footerWrapper}>
      <Stack space="6px">
        <Text weight="600" size="3x">
          Submit a report
        </Text>
        <Text size="2x">
          Reporting{" "}
          <Text as="span" size="2x" weight="500">
            {isValidURL(dappUrl) ? getRootURL(dappUrl) : "Unknown Dapp"}
          </Text>{" "}
          as suspicious
        </Text>
        <TextArea
          className={reportFooterTextArea}
          placeholder="why do you wish to report this transaction? (optional)"
          rows={6}
        />
      </Stack>
      <Row gap="10px" className={controlsWrapper}>
        <Button
          onClick={() => {
            back();
          }}
          color="secondary"
        >
          Close
        </Button>
        <Button onClick={report}>Submit</Button>
      </Row>
    </div>
  );
};
