import * as React from "react";
import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={33}
    height={33}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.018 10.697C4 11.354 4 12.125 4 13.056v2.58c0 2.615 0 3.922.224 5.134a13.461 13.461 0 0 0 4.158 7.49c.91.832 2.02 1.525 4.24 2.91l.003.002.005.003c1.24.774 1.862 1.162 2.5 1.4a6.756 6.756 0 0 0 4.716 0c.637-.239 1.259-.626 2.5-1.401l.004-.002.002-.002 1.136-.71-19.47-19.764Zm26.13 12.275a13.44 13.44 0 0 0 .603-2.201c.224-1.212.224-2.52.224-5.135v-2.579c0-2.691 0-4.037-.44-5.194a6.734 6.734 0 0 0-1.845-2.657c-.93-.818-2.192-1.29-4.716-2.235l-2.698-1.01c-1.402-.525-2.103-.788-2.824-.892a6.754 6.754 0 0 0-1.929 0c-.721.104-1.422.367-2.824.892l-2.697 1.01c-.14.052-.276.102-.407.152l19.553 19.849Z"
      fill="#fff"
    />
    <path
      d="M1.978 1.5 31.038 31"
      stroke="#fff"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgComponent;
