import { XCircleIcon } from "@heroicons/react/20/solid";

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div
      className="flex items-center rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-800"
      role="alert"
    >
      <XCircleIcon className="mr-3 inline h-4 w-4 flex-shrink-0" />
      <span className="sr-only">Info</span>
      <div>
        <span className="font-medium">Error: </span>
        {message}
      </div>
    </div>
  );
};

export default ErrorMessage;
