import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={36}
    height={36}
    fill="none"
    viewBox="0 0 36 36"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient
        id="background"
        x1={14.649}
        y1={11.242}
        x2={21.763}
        y2={25.903}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DA3264" />
        <stop offset={1} stopColor="#E25846" />
      </linearGradient>
      <linearGradient
        id="outline"
        x1={14.649}
        y1={11.242}
        x2={21.763}
        y2={25.903}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DA3264" />
        <stop offset={1} stopColor="#E25846" />
      </linearGradient>
    </defs>
    <rect width={36} height={36} rx={18} fill="#FFF0F0" />
    <path
      d="M17.027 11.811 10.84 22.498a1.124 1.124 0 0 0 .974 1.689h12.371a1.126 1.126 0 0 0 .974-1.689l-6.186-10.687a1.125 1.125 0 0 0-1.947 0v0Z"
      fill="url(#background)"
      stroke="url(#outline)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18 16.313v2.812"
      stroke="#fff"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18 22.36a.703.703 0 1 0 0-1.407.703.703 0 0 0 0 1.406Z"
      fill="#fff"
    />
  </svg>
);

export default SvgComponent;
