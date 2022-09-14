import { MenuAlt2Icon } from "@heroicons/react/outline";
import { utils } from "ethers";
import { Box } from "../../layout/Box";
import { Text } from "../../layout/Text";
import { Card, Header, Separator } from "../../layout/Card";

export const MessageCard = ({
  message,
  variant = "body",
}: {
  message: string;
  variant?: "mono" | "body";
}) => {
  return (
    <Card width="full">
      <Header
        headerText="Message"
        icon={
          <Box
            background="info"
            style={{
              borderRadius: "100px",
              height: "28px",
              width: "28px",
              padding: "4px",
            }}
          >
            <MenuAlt2Icon
              style={{
                fill: "white",
                stroke: "white",
              }}
            ></MenuAlt2Icon>
          </Box>
        }
      ></Header>
      <Separator />
      <Box padding="2x" style={{ wordWrap: "break-word" }}>
        <Text style={{ whiteSpace: "break-spaces" }} font={variant}>
          {message}
        </Text>
      </Box>
    </Card>
  );
};
