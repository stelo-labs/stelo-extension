import { Row } from "../../base/Row";
import { Text } from "../../base/Text";
import { RiskDisplay } from "../RiskDisplay/RiskDisplay";
import {
  footerWrapper,
  footerTextWrapper,
  nudgeRiskDisplay,
} from "./Footer.css";
import { StandardControls } from "./Shared";

export const ErrorFooter = ({
  onContinue,
  onReject,
}: {
  onContinue: () => void;
  onReject: () => void;
}) => {
  return (
    <div className={footerWrapper}>
      <div>
        <div>
          <Row gap="8px" alignItems="center" justifyContent="flex-start">
            <RiskDisplay
              className={nudgeRiskDisplay}
              error={true}
              level={"high"}
            ></RiskDisplay>
            <div className={footerTextWrapper}>
              <Text size="3x" weight="500">
                Hmm, something went wrong. Proceed with caution.
              </Text>
            </div>
          </Row>
        </div>
      </div>
      <StandardControls
        onReject={onReject}
        onContinue={onContinue}
      ></StandardControls>
    </div>
  );
};
