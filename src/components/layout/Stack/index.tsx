import React, { Children, ReactElement, ReactNode } from "react";
import flattenChildren from "react-flatten-children";
import { Space } from "../../../css/space";
import { flexAlignment, sprinkles } from "../../../css/sprinkles.css";
import { Box, BoxProps } from "../Box";

export type StackProps = {
  children: ReactNode;
  alignHorizontal?: typeof flexAlignment[number];
  width?: BoxProps["width"];
  space?: Space;
  separator?: ReactElement;
};
type Ref = HTMLElement; // or HTMLButtonElement etc

const Stack = React.forwardRef<Ref, StackProps>((props, ref) => {
  const {
    alignHorizontal = "center",
    space,
    width,
    children: childrenProp,
    separator,
    ...rest
  } = props;
  const children = flattenChildren(childrenProp);
  return (
    <Box
      width={width}
      alignItems={alignHorizontal}
      display="flex"
      flexDirection="column"
    >
      {Children.map(children, (child, index) => {
        const isLastChild = index === children.length - 1;
        return (
          <>
            {space && !isLastChild ? (
              <Box
                width="full"
                display={"flex"}
                justifyContent={alignHorizontal}
                paddingBottom={space}
              >
                {child}
              </Box>
            ) : (
              child
            )}
            {separator && !isLastChild ? (
              <Box
                display={"flex"}
                justifyContent={alignHorizontal}
                paddingBottom={space}
                width="full"
              >
                {separator}
              </Box>
            ) : null}
          </>
        );
      })}
    </Box>
  );
});

export default Stack;
