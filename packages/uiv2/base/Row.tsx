import clsx from "clsx";
import { forwardRef } from "react";
import { row } from "./Row.css";

type RowProps = {
  alignItems?: "center" | "flex-start" | "flex-end";
  justifyContent?: "center" | "flex-start" | "flex-end" | "space-between";
  gap?: "4px" | "8px" | "10px" | "12px" | "18px";
} & Children &
  React.AllHTMLAttributes<HTMLDivElement>;

export const Row = forwardRef<HTMLDivElement, RowProps>(
  (
    {
      className,
      style,
      justifyContent = "center",
      alignItems = "center",
      gap = "0px",
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(row, className)}
        // remove inline styles when switching to theme
        style={{
          ...style,
          gap: gap,
          alignItems: alignItems,
          justifyContent: justifyContent,
        }}
        {...rest}
      >
        {children}
      </div>
    );
  }
);
Row.displayName = "Row";
