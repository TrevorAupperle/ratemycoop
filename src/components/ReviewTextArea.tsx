import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useEffect, type Dispatch, type SetStateAction, useState } from "react";
import checkProfanity from "~/utils/checkProfanity";
import classNames from "~/utils/classNames";

const ReviewTextArea = ({
  value,
  setValue,
  error,
  setError,
  checkingProfanity,
  setCheckingProfanity,
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
  checkingProfanity: boolean;
  setCheckingProfanity: Dispatch<SetStateAction<boolean>>;
}) => {
  const maxLength = 450;
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    setCheckingProfanity(true);

    const delayDebounceFn = setTimeout(() => {
      if (checkProfanity(value)) {
        setError(true);
      } else {
        setError(false);
      }
      setCheckingProfanity(false);
    }, 2000);

    return () => {
      clearTimeout(delayDebounceFn);
      setCheckingProfanity(false);
    };
  }, [value, setError, setCheckingProfanity]);

  return (
    <div className="flex w-full flex-col gap-2">
      <div
        className={classNames(
          "flex flex-col rounded-md p-1 ring-2",
          error ? "ring-red-500" : "ring-gray-300",
          focused ? "ring-auburnOrange-900" : "ring-gray-300",
        )}
      >
        <textarea
          rows={5}
          className="border-0 focus:border-0 focus:ring-0"
          onChange={(e) =>
            e.target.value.length <= maxLength && setValue(e.target.value)
          }
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <div className="flex w-full items-center justify-between p-1">
          <div className="text-xs text-gray-400">
            {value.length}/{maxLength}
          </div>
          {checkingProfanity ? (
            <ArrowPathIcon className="h-6 w-6 animate-spin text-gray-400" />
          ) : error ? (
            <XCircleIcon className="h-6 w-6 text-red-500" />
          ) : (
            <CheckCircleIcon className="h-6 w-6 text-green-500" />
          )}
        </div>
      </div>
      {error && (
        <div className="pl-2 text-sm text-red-500">
          Would you talk to your mother with that mouth?
        </div>
      )}
    </div>
  );
};

export default ReviewTextArea;
