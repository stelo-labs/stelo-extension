import * as React from "react";
import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={31}
    height={33}
    viewBox={"0 0 31 33"}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#a)">
      <circle
        cx={15}
        cy={16.5}
        r={15.25}
        fill="#F4F4FF"
        stroke="#fff"
        strokeWidth={1.5}
      />
      <path
        d="M13.25 15.375h4.375M13.25 17.625h4.375M9.75 21.563c.232 0 .455-.119.619-.33.164-.211.256-.497.256-.796V12c0-.15.046-.292.128-.398a.395.395 0 0 1 .31-.165h8.75c.116 0 .227.06.309.165a.653.653 0 0 1 .128.398v8.438c0 .298-.092.584-.256.795-.164.211-.387.33-.619.33H9.75ZM9.75 21.563c-.232 0-.455-.119-.619-.33a1.306 1.306 0 0 1-.256-.796v-6.75"
        stroke="#6D68E4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" transform="translate(0 .5)" d="M0 0h31v32H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default SvgComponent;
