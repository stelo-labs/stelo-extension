import * as React from "react";
import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={36}
    height={36}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={36} height={36} rx={18} fill="#FFEECD" />
    <path
      d="M18 24.75a6.75 6.75 0 1 0 0-13.5 6.75 6.75 0 0 0 0 13.5Z"
      fill="url(#mediumRiskFill)"
      stroke="url(#mediumRiskStroke)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18 14.625v3.938"
      stroke="#fff"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18 21.797a.703.703 0 1 0 0-1.406.703.703 0 0 0 0 1.406Z"
      fill="#F8F8F8"
    />
    <defs>
      <linearGradient
        id="mediumRiskFill"
        x1={13.275}
        y1={13.05}
        x2={22.725}
        y2={22.725}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F4915A" />
        <stop offset={1} stopColor="#F46C5A" />
      </linearGradient>
      <linearGradient
        id="mediumRiskStroke"
        x1={13.275}
        y1={13.05}
        x2={22.725}
        y2={22.725}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F4915A" />
        <stop offset={1} stopColor="#F46C5A" />
      </linearGradient>
    </defs>
  </svg>
);

export default SvgComponent;
