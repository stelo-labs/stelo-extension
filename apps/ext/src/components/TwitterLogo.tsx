import * as React from "react";
import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={32}
    height={32}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16 11a5 5 0 0 1 9.585-2H30l-4.033 4.033A16.001 16.001 0 0 1 10 28c-4 0-5-1.5-5-1.5S9 25 11 22c0 0-8-4-6-15 0 0 5 5 10.998 6l.002-2Z"
      stroke="#71717A"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgComponent;
