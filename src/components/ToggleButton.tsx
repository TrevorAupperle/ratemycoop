import { type Dispatch, type SetStateAction } from "react";

const ToggleButton = ({
  selected,
  setSelected,
}: {
  selected: number;
  setSelected: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div className="flex w-2/3 items-center divide-x rounded-md ring-2 ring-gray-300">
      <button
        className={`w-full py-3 transition-all duration-200 ${
          selected === 1
            ? "bg-auburnOrange-700 text-white"
            : "text-auburnBlue-900"
        } rounded-l-md px-4 py-2`}
        onClick={() => setSelected(1)}
      >
        Yes
      </button>
      <button
        className={`w-full py-3 transition-all duration-200 ${
          selected === 0
            ? "bg-auburnOrange-700 text-white"
            : "text-auburnBlue-900"
        } rounded-r-md px-4 py-2`}
        onClick={() => setSelected(0)}
      >
        No
      </button>
    </div>
  );
};

export default ToggleButton;
