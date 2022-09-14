import { FlagIcon } from "@heroicons/react/solid";
import React from "react";
import { Card } from "../layout/Card";
import { Text } from "../layout/Text";
import Stack from "../layout/Stack";
import { Box } from "../layout/Box";
import { ReportCardTextField } from "./ReportCard.css";

type ReportCardProps = {
  value: string;
  onChange: (payload: any) => void;
  dappRootUrl: string;
};
export const ReportCard = ({
  dappRootUrl,
  value,
  onChange,
}: ReportCardProps) => {
  return (
    <Card paddingX="6x" paddingY="7x">
      <Stack space="5x" alignHorizontal="center">
        <FlagIcon
          style={{ textAlign: "center", width: "64px", fill: "#EC6D62" }}
        ></FlagIcon>
        <Text weight={600} textAlign="center">
          Report <span style={{ color: "#EC6D62" }}>{dappRootUrl}</span> <br />{" "}
          as suspicious
          <br />
        </Text>
        <Box
          as={"textarea"}
          onChange={onChange}
          value={value}
          className={ReportCardTextField}
          borderColor="gray400"
          borderStyle="solid"
          borderWidth="1"
          padding="2x"
          style={{
            minHeight: "117px",
            minWidth: "100%",
            fontWeight: "500",
            borderRadius: "3px",
            fontSize: "13px",
          }}
          placeholder="Why did you report this transaction?"
        ></Box>
      </Stack>
    </Card>
  );
};
