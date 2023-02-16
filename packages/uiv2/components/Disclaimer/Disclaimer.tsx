import clsx from "clsx";
import { Row } from "../../base/Row";
import { disclaimer } from "./Disclaimer.css";
import Warning from "./Warning";

export const Disclaimer = ({
  icon = <Warning></Warning>,
  children,
  className,
}: {
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <Row
      gap={"8px"}
      alignItems="center"
      justifyContent="flex-start"
      className={clsx(disclaimer, className)}
    >
      <div>{icon}</div>
      {children}
    </Row>
  );
};
