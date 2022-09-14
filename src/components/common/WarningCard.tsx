import { ShieldExclamationIcon } from "@heroicons/react/solid";
import { Box } from "../layout/Box";
import { Card } from "../layout/Card";
import { Text } from "../layout/Text";
import Stack from "../layout/Stack";
import { useAppState } from "../../hooks/sharedStateContext";
import { ApproveOrReject } from "./drawer/ApproveOrReject";

export const WarningCard = () => {
  const { setWarning, riskResult } = useAppState();
  const onContinue = () => setWarning(false);
  const text =
    riskResult.riskFactors.length > 0
      ? riskResult.riskFactors[0].text
      : "Stelo believes this transaction is malicious.";
  return (
    <>
      <Box marginLeft="6x" marginRight="6x" marginBottom="8x">
        <Card
          style={{ height: "75vh" }}
          display="flex"
          justifyContent="center"
          alignItems={"center"}
        >
          <Stack space="5x">
            <Box display={"flex"} alignItems="center" justifyContent="center">
              <ShieldExclamationIcon
                style={{ fill: "red", width: "126px" }}
              ></ShieldExclamationIcon>
            </Box>
            <Text size="20" textAlign="center" weight={800}>
              {text}
            </Text>
            <Box
              style={{ cursor: "pointer" }}
              color="gray300"
              textAlign="center"
              onClick={onContinue}
            >
              <span style={{ textDecoration: "underline" }}>
                continue at your own risk
              </span>{" "}
              →
            </Box>
          </Stack>
        </Card>
      </Box>
      <ApproveOrReject />
    </>
  );
};
