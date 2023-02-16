import * as React from "react";

type Props = { height?: number; width?: number };

const SvgComponent: FC<Props> = (props) => (
  <svg
    width={26}
    height={27}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 26 27"
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
      d="M6.828 13.5h12.343"
      stroke="#fff"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </svg>
);

export default SvgComponent;
