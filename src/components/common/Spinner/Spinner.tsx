import clsx from "clsx";
import { Sprinkles, sprinkles } from "../../../css/sprinkles.css";
import { spinner, path } from "./Spinner.css";

type SpinnerProps = { color?: Sprinkles["color"] };

export const Spinner = ({ color = "gray300" }: SpinnerProps) => {
  return (
    <svg className={spinner} viewBox="0 0 50 50">
      <circle
        className={clsx(path, sprinkles({ stroke: color }))}
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="5"
      ></circle>
    </svg>
  );
};
