import React from "react";
import {
  dropdown as dropdownClass,
  dropdownIcon,
  dropdownWrapper,
  flip,
  openable,
  openClass,
} from "./Dropdown.css";
import { Text } from "../../base/Text";
import clsx from "clsx";
import CaretDown from "./CaretDown";
import { Row } from "../../base/Row";
import AnimateHeight from "react-animate-height";

export type DropDownState = "open" | "closed";
type DropdownProps = {
  initialState?: DropDownState;
  header: React.ReactNode;
  dropdown?: React.ReactNode;
  onToggle?: (state: DropDownState) => void;
};
export const DropdownIcon = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick?: () => void;
}) => {
  return isOpen ? (
    <CaretDown className={clsx(dropdownIcon)} onClick={() => onClick?.()} />
  ) : (
    <CaretDown
      className={clsx(dropdownIcon, flip)}
      onClick={() => onClick?.()}
    />
  );
};

export const DropdownHeader: FC = ({ children }) => (
  <Text
    as="span"
    size="3x"
    style={{ display: "flex", alignItems: "center", gap: "4px" }}
  >
    {children}
  </Text>
);
export const Dropdown = ({
  initialState = "closed",
  header,
  dropdown,
  onToggle,
}: DropdownProps) => {
  React.useEffect(() => {}, [initialState]);
  const [dropdownState, setDropdownState] =
    React.useState<DropDownState>(initialState);
  React.useEffect(() => {
    setDropdownState(initialState);
  }, [initialState]);
  return (
    <div
      className={clsx(dropdownClass, !!dropdown && openable)}
      onClick={() => {
        if (!dropdown) return;
        !!onToggle && onToggle(dropdownState == "closed" ? "open" : "closed");
        dropdownState == "closed"
          ? setDropdownState("open")
          : setDropdownState("closed");
      }}
    >
      <Row
        justifyContent="space-between"
        alignItems="center"
        className={clsx(dropdownState == "open" && openClass)}
      >
        {header}
        {!!dropdown && <DropdownIcon isOpen={dropdownState == "open"} />}
      </Row>
      <AnimateHeight
        duration={300}
        height={dropdownState == "open" ? "auto" : 0}
      >
        <div className={dropdownWrapper}>{dropdown}</div>
      </AnimateHeight>
    </div>
  );
};
