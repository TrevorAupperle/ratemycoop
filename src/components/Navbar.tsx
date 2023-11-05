import Link from "next/link";
import MainSearchBar from "./MainSearchBar";

const Navbar = () => {
  return (
    <nav className="blueGraphPaper flex w-full items-center justify-center px-6 py-4 shadow-sm">
      <div className="flex w-full max-w-7xl items-center justify-between gap-4 sm:gap-0">
        <Link href="/">
          <h1 className="font-caveat text-3xl text-white">RateMyCoop</h1>
        </Link>
        <MainSearchBar className="sm:w-72" textSize="text-sm" />
      </div>
    </nav>
  );
};

export default Navbar;
