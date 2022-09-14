import clsx from "clsx";
import React from "react";
import { sprinkles, dimensions } from "../../../css/sprinkles.css";
import { button, ButtonVariants } from "./button.css";

export type ButtonProps = ButtonVariants & {
  width?: keyof typeof dimensions;
} & React.ComponentPropsWithRef<"button">;
export type Ref = HTMLButtonElement;

const Button = React.forwardRef<Ref, ButtonProps>(
  ({ color, size, width, ...htmlProps }, ref) => {
    return (
      <button
        {...htmlProps}
        className={clsx(
          htmlProps.disabled
            ? button({ color: "disabled", size })
            : button({ color, size }),

          sprinkles({ width })
        )}
      />
    );
  }
);
Button.displayName = "Button";

export default Button;
