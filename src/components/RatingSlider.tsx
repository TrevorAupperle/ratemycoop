import { useState, type Dispatch, type SetStateAction } from "react";
import classNames from "~/utils/classNames";

const RatingSlider = ({
  rating,
  setRating,
}: {
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
}) => {
  const [hovered, setHovered] = useState<number>(-1);

  return (
    <div className="flex w-full items-center gap-4">
      <div className="flex h-12 w-full items-center divide-x rounded-md ring-2 ring-gray-300">
        <div
          className={classNames(
            "h-full w-1/5 rounded-l-md",
            rating >= 1 ? "bg-auburnOrange-100" : "",
            hovered >= 1 ? "bg-auburnOrange-100" : "",
          )}
          onClick={() => setRating(1)}
          onMouseEnter={() => setHovered(1)}
          onMouseLeave={() => setHovered(-1)}
        ></div>
        <div
          className={classNames(
            "h-full w-1/5",
            rating >= 2 ? "bg-auburnOrange-300" : "",
            hovered >= 2 ? "bg-auburnOrange-300" : "",
          )}
          onClick={() => setRating(2)}
          onMouseEnter={() => setHovered(2)}
          onMouseLeave={() => setHovered(-1)}
        ></div>
        <div
          className={classNames(
            "h-full w-1/5",
            rating >= 3 ? "bg-auburnOrange-500" : "",
            hovered >= 3 ? "bg-auburnOrange-500" : "",
          )}
          onClick={() => setRating(3)}
          onMouseEnter={() => setHovered(3)}
          onMouseLeave={() => setHovered(-1)}
        ></div>
        <div
          className={classNames(
            "h-full w-1/5",
            rating >= 4 ? "bg-auburnOrange-700" : "",
            hovered >= 4 ? "bg-auburnOrange-700" : "",
          )}
          onClick={() => setRating(4)}
          onMouseEnter={() => setHovered(4)}
          onMouseLeave={() => setHovered(-1)}
        ></div>
        <div
          className={classNames(
            "h-full w-1/5 rounded-r-md",
            rating >= 5 ? "bg-auburnOrange-900" : "",
            hovered >= 5 ? "bg-auburnOrange-900" : "",
          )}
          onClick={() => setRating(5)}
          onMouseEnter={() => setHovered(5)}
          onMouseLeave={() => setHovered(-1)}
        ></div>
      </div>
      <div className="flex items-center gap-1 font-bold">
        <div className="text-sm text-gray-400">
          {hovered === -1 ? rating : hovered}
        </div>
        <div className="whitespace-nowrap text-sm text-gray-400">/ 5</div>
      </div>
    </div>
  );
};

export default RatingSlider;
