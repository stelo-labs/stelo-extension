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
      d="m27 12.5-.001-7.499L19.5 5M17.996 14.004l9-9M23 18v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1h8"
      stroke="#71717A"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgComponent;
