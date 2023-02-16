import * as React from "react";
type Props = { height?: number; width?: number };
const SvgComponent = (props: Props) => (
  <svg
    width={26}
    height={27}
    fill="none"
    viewBox="0 0 26 27"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle
      cx={13}
      cy={13.5}
      r={12}
      fill="#491805"
      fillOpacity={0.1}
      stroke="#fff"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <path
      d="M7 13.5h12M13 19.14v-12"
      stroke="#fff"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </svg>
);

export default SvgComponent;
