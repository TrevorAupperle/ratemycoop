import { type SetStateAction, type Dispatch } from "react";
import classNames from "../utils/classNames";
import AuburnCupola from "./svgs/AuburnCupola";

const MainSearchBar = ({
  className,
  value,
  setValue,
}: {
  className?: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className={classNames(className ?? "")}>
      <div className="relative mb-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 sm:pl-6">
          <AuburnCupola className="h-6 w-6 stroke-auburnBlue-900 sm:h-8 sm:w-8" />
        </div>
        <input
          type="text"
          id="MainSearchBar"
          className="block w-full rounded-full border-2 border-gray-300 bg-gray-50 p-2 pl-12 text-xl text-gray-900 transition-all duration-200 focus:border-auburnOrange-900 focus:ring-auburnOrange-900 sm:p-4 sm:pl-16"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Cupola Ambassador"
        />
      </div>
    </div>
  );
};

export default MainSearchBar;
