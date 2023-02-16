import * as React from "react";

const SvgComponent = (props: any) => (
  <svg
    viewBox="0 0 32 33"
    width={32}
    height={33}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x={0.75}
      y={1.25}
      width={30.5}
      height={30.5}
      rx={15.25}
      fill="#F4F4FF"
      stroke="#fff"
      strokeWidth={1.5}
    />
    <path
      d="M15.999 18.872a4.74 4.74 0 1 0 0-9.481 4.74 4.74 0 0 0 0 9.481Z"
      stroke="#6D68E4"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.813 23.018a8.3 8.3 0 0 1 14.372 0"
      stroke="#6D68E4"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgComponent;
