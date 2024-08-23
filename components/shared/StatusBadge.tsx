import { STATUS_ICONS } from "@/constants";
import { Status } from "@/types";
import clsx from "clsx";
import Image from "next/image";

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <div
      className={clsx(
        "flex justify-center items-center gap-2 w-fit px-4 py-2 rounded-full",
        {
          "bg-green-600": status === "scheduled",
          "bg-blue-600": status === "pending",
          "bg-red-600": status === "cancelled",
        }
      )}
    >
      <Image
        src={STATUS_ICONS[status]}
        alt={status}
        width={20}
        height={20}
        className="object-contain"
      />
      <p
        className={clsx(" font-semibold capitalize", {
          "text-green-500": status === "scheduled",
          "text-blue-500": status === "pending",
          "text-red-500": status === "cancelled",
        })}
      >
        {status}
      </p>
    </div>
  );
}
