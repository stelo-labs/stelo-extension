import * as React from "react";
import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 21.5a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
      stroke="#6D68E4"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M11.25 11.75H12V17h.75" fill="#fff" />
    <path
      d="M11.25 11.75H12V17h.75"
      stroke="#71717A"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.813 9.313a.937.937 0 1 0 0-1.875.937.937 0 0 0 0 1.875Z"
      fill="#71717A"
    />
  </svg>
);

export default SvgComponent;
