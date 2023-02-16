import * as React from "react";

const SvgComponent = (props: any) => (
  <svg
    width={15}
    height={12}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m13.371 2.383-7.619 7.619L2.29 6.539"
      stroke="#36D372"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgComponent;
