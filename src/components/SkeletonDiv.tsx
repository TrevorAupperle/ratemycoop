import { type ReactNode } from "react";
import classNames from "~/utils/classNames";

const SkeletonDiv = ({
  children,
  className,
  loading,
  skeletonClassName,
}: {
  children: ReactNode;
  className?: string;
  loading?: boolean;
  skeletonClassName?: string;
}) => {
  if (loading) {
    return (
      <div
        className={classNames(
          "animate-pulse rounded-md bg-gray-200",
          skeletonClassName ?? "",
        )}
      ></div>
    );
  } else {
    return <div className={className}>{children}</div>;
  }
};

export default SkeletonDiv;
