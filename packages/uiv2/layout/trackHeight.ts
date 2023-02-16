import React from "react";

/**
 * track the height of an element during runtime
 * @returns {ref, height} ref is a ref to the element you want to track the height of, height is the height of the element
 */
export const useTrackHeight = () => {
  const [height, setHeight] = React.useState(0);
  const ref = React.createRef<HTMLDivElement>();
  React.useEffect(() => {
    if (ref.current) {
      const resizeObserver = new ResizeObserver(() => {
        if (ref.current === null) return;
        setHeight(ref.current.offsetHeight);
      });
      resizeObserver.observe(ref.current);
      return () => resizeObserver.disconnect();
    }
  }, [ref]);
  return { ref, height };
};
