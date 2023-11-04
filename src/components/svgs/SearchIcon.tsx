import { type SVGProps } from "react";
const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    // width={32}
    //height={32}
    fill="none"
    {...props}
  >
    <path
      fill="#0B2341"
      d="M28.947 27.053 24 22.147A12 12 0 1 0 22.147 24l4.906 4.907a1.335 1.335 0 0 0 1.894 0 1.334 1.334 0 0 0 0-1.854ZM14.667 24a9.333 9.333 0 1 1 0-18.666 9.333 9.333 0 0 1 0 18.666Z"
    />
  </svg>
);
export default SearchIcon;
