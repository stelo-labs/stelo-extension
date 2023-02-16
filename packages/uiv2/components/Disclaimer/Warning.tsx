import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10.701 3.749 2.454 17.998a1.5 1.5 0 0 0 1.298 2.251h16.495a1.5 1.5 0 0 0 1.299-2.251l-8.248-14.25a1.5 1.5 0 0 0-2.597 0Z"
      fill="url(#warning-background)"
    />
    <path
      d="M12 9.75v3.75"
      stroke="#fff"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 17.813a.937.937 0 1 0 0-1.875.937.937 0 0 0 0 1.874Z"
      fill="#fff"
    />
    <defs>
      <linearGradient
        id="warning-background"
        x1={5.176}
        y1={5.3}
        x2={17.127}
        y2={19.128}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F4915A" />
        <stop offset={1} stopColor="#F46C5A" />
      </linearGradient>
    </defs>
  </svg>
);

export default SvgComponent;
