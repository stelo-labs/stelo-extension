import React, { Children, ReactElement, ReactNode, useMemo } from "react";
import flattenChildren from "react-flatten-children";
import { negateSpace, Space } from "../../../css/space";
import { flexAlignment, justifyContent } from "../../../css/sprinkles.css";
import { Box } from "../Box";

export type InlineProps = {
  children: ReactNode;
  alignHorizontal?: typeof justifyContent[number];
  alignVertical?: typeof flexAlignment[number];
  space?: Space;
  horizontalSpace?: Space;
  verticalSpace?: Space;
} & (
  | {
      separator?: undefined;
      wrap?: true;
    }
  | {
      separator?: ReactElement;
      wrap: false;
    }
);

/**
 * @description Renders flowing content with equal spacing between items
 * both horizontally and vertically, wrapping to multiple lines if needed.
 */
export function Inline({
  children,
  alignHorizontal = "center",
  alignVertical = "center",
  space,
  horizontalSpace: horizontalSpaceProp,
  verticalSpace: verticalSpaceProp,
  separator,
  wrap = false,
}: InlineProps) {
  const verticalSpace = verticalSpaceProp ?? space;
  const horizontalSpace = horizontalSpaceProp ?? space;

  const flattenedChildren = useMemo(
    () => flattenChildren(children),
    [children]
  );

  return (
    <Box
      display="flex"
      alignItems={alignVertical}
      flexDirection="row"
      flexWrap={wrap ? "wrap" : undefined}
      justifyContent={alignHorizontal}
      marginRight={
        wrap && horizontalSpace ? negateSpace(horizontalSpace) : "0x"
      }
      marginTop={wrap && verticalSpace ? negateSpace(verticalSpace) : "0x"}
    >
      {Children.map(flattenedChildren, (child, index) => {
        if (wrap) {
          return (
            <Box paddingRight={horizontalSpace} paddingTop={verticalSpace}>
              {child}
            </Box>
          );
        }

        const isLastChild = index === flattenedChildren.length - 1;
        return (
          <>
            {horizontalSpace && !isLastChild ? (
              <Box paddingRight={horizontalSpace}>{child}</Box>
            ) : (
              child
            )}
            {separator && !isLastChild ? (
              <Box paddingRight={horizontalSpace}>{separator}</Box>
            ) : null}
          </>
        );
      })}
    </Box>
  );
}
