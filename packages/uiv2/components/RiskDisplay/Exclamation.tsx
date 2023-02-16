import * as React from "react";

const SvgComponent = ({ stroke = "#DA3264", ...rest }: any) => (
  <svg
    width={28}
    height={29}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path
      d="M14.559 9.176v7.279M14.559 20.824v.728"
      stroke={stroke}
      strokeWidth={3.2}
      strokeLinecap="round"
    />
  </svg>
);

export default SvgComponent;
