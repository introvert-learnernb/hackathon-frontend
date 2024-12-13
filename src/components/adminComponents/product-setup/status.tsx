import clsx from "clsx";
import { Check, Clock } from "lucide-react";

export default function ProductStatus({ status }: { status: boolean }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs",
        {
          "bg-gray-100 text-gray-500": status === false,
          "bg-green-500 text-white": status === true,
        }
      )}
    >
      {status === false ? (
        <>
          Not Active
          <Clock className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === true ? (
        <>
          Active
          <Check className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
