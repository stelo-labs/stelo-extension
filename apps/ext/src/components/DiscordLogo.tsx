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
      d="M12 19.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM20 19.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"
      fill="#71717A"
    />
    <path
      d="M9.3 10A21.917 21.917 0 0 1 16 9a21.916 21.916 0 0 1 6.7 1M22.7 22a21.917 21.917 0 0 1-6.7 1 21.917 21.917 0 0 1-6.7-1"
      stroke="#71717A"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m19.38 22.76 1.504 3.006a.997.997 0 0 0 1.124.527c3.067-.75 5.712-2.058 7.637-3.732a1.006 1.006 0 0 0 .31-1.049L25.707 7.357a1.002 1.002 0 0 0-.579-.639c-1.2-.491-2.44-.875-3.708-1.148a1.002 1.002 0 0 0-1.165.66l-.996 2.99M12.619 22.76l-1.503 3.006a.996.996 0 0 1-1.124.527c-3.068-.75-5.712-2.058-7.638-3.732a1.006 1.006 0 0 1-.309-1.049L6.292 7.357a1.003 1.003 0 0 1 .578-.639c1.2-.491 2.44-.875 3.708-1.148a1.002 1.002 0 0 1 1.165.66l.997 2.99"
      stroke="#71717A"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgComponent;
