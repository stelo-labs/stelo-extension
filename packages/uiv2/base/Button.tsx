import clsx from "clsx";
import { button } from "./Button.css";
import { ButtonVariants } from "./Button.css";

export const Button: FC<
  ButtonVariants & React.ComponentPropsWithRef<"button">
> = ({ children, size = "md", color = "primary", className, ...rest }) => {
  return (
    <button className={clsx(button({ size, color }), className)} {...rest}>
      {children}
    </button>
  );
};
