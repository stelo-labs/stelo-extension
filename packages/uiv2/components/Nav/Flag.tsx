import * as React from "react";

const SvgComponent = (props: {}) => (
  <svg
    width={16}
    height={17}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2.5 14.125v-10.5M2.5 11.124c4-3 7 3 11 0v-7.5c-4 3-7-3-11 0"
      stroke="#6D68E4"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgComponent;
