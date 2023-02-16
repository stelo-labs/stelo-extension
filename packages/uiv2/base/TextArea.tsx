import clsx from "clsx";
import React from "react";
import { label as labelRecipe, input, wrapper } from "./TextArea.css";

type TextAreaProps = { error?: string } & React.HTMLProps<HTMLTextAreaElement>;

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ id, label, error, className, ...rest }, ref) => {
    return (
      <div className={clsx(wrapper, className)}>
        {error ||
          (label && (
            <label className={label} htmlFor={id}>
              {error || label}
            </label>
          ))}
        <textarea ref={ref} className={input} id={id} {...rest} />
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
