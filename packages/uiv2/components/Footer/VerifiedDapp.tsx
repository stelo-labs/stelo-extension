import * as React from "react";
import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={21}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4.255 16.245c-.72-.719-.242-2.229-.608-3.113-.38-.917-1.772-1.655-1.772-2.632 0-.977 1.392-1.715 1.772-2.632.366-.885-.111-2.394.608-3.113.719-.72 2.228-.242 3.113-.608.917-.38 1.655-1.772 2.632-1.772.977 0 1.715 1.392 2.632 1.772.885.366 2.394-.111 3.113.608.72.719.242 2.228.608 3.113.38.917 1.772 1.655 1.772 2.632 0 .977-1.392 1.715-1.772 2.632-.366.885.111 2.394-.608 3.113-.719.72-2.228.242-3.113.608-.917.38-1.655 1.772-2.632 1.772-.977 0-1.715-1.392-2.632-1.772-.885-.366-2.394.111-3.113-.608Z"
      fill="#43464C"
    />
    <path
      d="M13.438 8.625 8.854 13l-2.291-2.188"
      stroke="#fff"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgComponent;
