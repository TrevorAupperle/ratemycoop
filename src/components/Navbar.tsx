import Link from "next/link";
import { Fragment, useState } from "react";
import AuburnCupola from "./svgs/AuburnCupola";
import { Transition } from "@headlessui/react";
import { api } from "~/utils/api";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchBarFocused, setSearchBarFocused] = useState(false);

  const ambassadorNames = api.ambassador.getNames.useQuery();

  const filteredAmbassadors =
    searchValue === ""
      ? ambassadorNames.data ?? []
      : ambassadorNames.data === undefined
      ? []
      : ambassadorNames.data.filter((ambassador) =>
          ambassador.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(searchValue.toLowerCase().replace(/\s+/g, "")),
        );

  return (
    <nav className="blueGraphPaper flex w-full items-center justify-center px-6 py-4 shadow-sm">
      <div className="flex w-full max-w-7xl items-center justify-between gap-4 sm:gap-0">
        <Link href="/">
          <h1 className="font-caveat text-3xl text-white">RateMyCoop</h1>
        </Link>
        <div className="relative sm:w-72">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <AuburnCupola className="ml-1 h-4 w-4 stroke-auburnBlue-900" />
          </div>
          <input
            type="text"
            id="simple-search"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-auburnOrange-900 focus:ring-auburnOrange-900"
            placeholder="Search ambassadors"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setSearchBarFocused(true)}
            onBlur={() => setSearchBarFocused(false)}
          />
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setSearchValue("")}
            show={searchBarFocused && searchValue !== ""}
          >
            <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              <ul className="divide-y divide-gray-200">
                {filteredAmbassadors.length === 0 && (
                  <li>
                    <div className="block px-4 py-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium text-auburnBlue-900">
                          No ambassadors found
                        </div>
                      </div>
                    </div>
                  </li>
                )}
                {filteredAmbassadors.map((person) => (
                  <li key={person.id}>
                    <Link href={`/ambassador/${person.id}`}>
                      <div className="block px-4 py-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-auburnBlue-900">
                            {person.name}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Transition>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
