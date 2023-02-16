import clsx from "clsx";
import { container } from "./Container.css";

export const Container: FC<{ className?: string }> = ({
  className,
  children,
}) => {
  return <div className={clsx(container, className)}>{children}</div>;
};
