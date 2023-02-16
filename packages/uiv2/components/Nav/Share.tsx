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
      d="M13 14.125H2.5a.5.5 0 0 1-.5-.5v-10.5M11 9.625l3-3-3-3"
      stroke="#6D68E4"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.69 11.125a6.003 6.003 0 0 1 5.81-4.5H14"
      stroke="#6D68E4"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgComponent;
