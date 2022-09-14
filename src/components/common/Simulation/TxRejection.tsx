import { ExclamationIcon } from "@heroicons/react/solid";
import { Box } from "../../layout/Box";
import { CardRow } from "../../layout/Card";

export const TxRejection = ({
  text,
  subtext,
}: {
  text: string;
  subtext?: string;
}) => {
  return (
    <CardRow
      text={text}
      subText={subtext}
      icon={
        <Box
          as={ExclamationIcon}
          fill="yellow"
          style={{ height: "36px", width: "36px" }}
        ></Box>
      }
    ></CardRow>
  );
};
