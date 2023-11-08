import { Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import { type Major } from "@prisma/client";
import { useState, Fragment, type Dispatch, type SetStateAction } from "react";

const MultiSelectBox = ({
  majors,
  selected,
  setSelected,
}: {
  majors: Major[];
  selected: number[];
  setSelected: Dispatch<SetStateAction<number[]>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (id: number) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((selectedId) => selectedId !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  return (
    <div className="relative w-1/2">
      <button
        className="relative w-full cursor-default rounded-lg bg-white py-4 pl-3 pr-10 text-left ring-2 ring-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-auburnOrange-900 sm:text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected.length === 0 ? (
          <span className="block truncate text-gray-500">Select major(s)</span>
        ) : (
          <span className="block truncate">
            {selected
              .map((id) => majors.find((major) => major.id === id)?.name)
              .join(", ")}
          </span>
        )}
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </span>
      </button>
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        show={isOpen}
      >
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
          <ul className="divide-y divide-gray-200">
            {majors.map((major) => (
              <li key={major.id} onClick={() => handleSelect(major.id)}>
                <div className="block px-4 py-4 hover:bg-gray-50">
                  <div className="flex items-center gap-2">
                    {selected.includes(major.id) && (
                      <CheckIcon
                        className="h-5 w-5 text-auburnOrange-900"
                        aria-hidden="true"
                      />
                    )}
                    <div className="text-sm font-medium text-auburnBlue-900">
                      {major.name}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Transition>
    </div>
  );

  //   return (
  //     <div className="fixed w-72">
  //       <Listbox value={selected} onChange={setSelected}>
  //         <div className="relative mt-1">
  //           <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
  //             <span className="block truncate">Testing</span>
  //             <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
  //               <ChevronUpDownIcon
  //                 className="h-5 w-5 text-gray-400"
  //                 aria-hidden="true"
  //               />
  //             </span>
  //           </Listbox.Button>
  //           <Transition
  //             as={Fragment}
  //             leave="transition ease-in duration-100"
  //             leaveFrom="opacity-100"
  //             leaveTo="opacity-0"
  //           >
  //             <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
  //               {people.map((person, personIdx) => (
  //                 <Listbox.Option
  //                   key={personIdx}
  //                   className={({ active }) =>
  //                     `relative cursor-default select-none py-2 pl-10 pr-4 ${
  //                       active ? "bg-amber-100 text-amber-900" : "text-gray-900"
  //                     }`
  //                   }
  //                   value={person}
  //                 >
  //                   {({ selected }) => (
  //                     <>
  //                       <span
  //                         className={`block truncate ${
  //                           selected ? "font-medium" : "font-normal"
  //                         }`}
  //                       >
  //                         {person.name}
  //                       </span>
  //                       {selected ? (
  //                         <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
  //                           <CheckIcon className="h-5 w-5" aria-hidden="true" />
  //                         </span>
  //                       ) : null}
  //                     </>
  //                   )}
  //                 </Listbox.Option>
  //               ))}
  //             </Listbox.Options>
  //           </Transition>
  //         </div>
  //       </Listbox>
  //     </div>
  //   );
};

export default MultiSelectBox;
