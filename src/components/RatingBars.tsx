export type RatingBarsProps = {
  ratings: number[];
};

const RatingBars = (props: RatingBarsProps) => {
  return (
    <div className="flex w-full flex-col">
      {props.ratings.map((rating, index) => (
        <div key={index} className="flex items-center gap-4">
          <div className="min-w-[16px] font-bold">{index + 1}</div>
          <div className="h-5 w-full rounded bg-gray-200">
            <div
              className="h-5 rounded bg-auburnOrange-500"
              style={{ width: `${rating}%` }}
            ></div>
          </div>
          <div className="min-w-[48px]">{rating}%</div>
        </div>
      ))}
    </div>
  );
};

export default RatingBars;
