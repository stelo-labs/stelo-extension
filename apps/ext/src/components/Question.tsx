import * as React from "react";
import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={17}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8 14.5a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
      stroke="#7A75FF"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.875 11.75a.125.125 0 1 1 .25 0 .125.125 0 0 1-.25 0Z"
      fill="#7A75FF"
      stroke="#7A75FF"
      strokeWidth={1.5}
    />
    <path
      d="M8 9.5V9a1.75 1.75 0 1 0-1.75-1.75"
      stroke="#7A75FF"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgComponent;
