import clsx from "clsx";
import { divider } from "./Divider.css";

export const Divider = ({ className }: { className?: string }) => (
  <hr className={clsx(divider, className)} />
);
