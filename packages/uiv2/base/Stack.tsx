import clsx from "clsx";
import { forwardRef } from "react";
import { stack } from "./Stack.css";

type Space = "2px" | "4px" | "6px" | "10px" | "12px" | "16px" | "20px";
type StackProps = {
  space?: Space;
  className?: string;
  alignItems?: "center" | "flex-start" | "flex-end";
  justifyContent?: "center" | "flex-start" | "flex-end";
  style?: React.CSSProperties;
} & Children;

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ style, space, alignItems, justifyContent, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(stack, props.className)}
        // Will switch from inline styling to sprinkles when we do theming push
        style={{
          ...style,
          gap: space,
          alignItems: alignItems,
          justifyContent: justifyContent,
        }}
      >
        {props.children}
      </div>
    );
  }
);

Stack.displayName = "Stack";
