"use client";

import clsx from "clsx";
import Link from "next/link";
import { generatePagination } from "@/utils/utils";
import { usePathname, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Pagination({
  totalPages,
  currentPage,

}: {
  currentPage: number;
  totalPages: number;
}) {
  const allPages = generatePagination(currentPage, totalPages);

  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <div className="inline-flex">
        <PaginationArrow direction="left" isDisabled={currentPage <= 1} />

        <div className="flex -space-x-px">
          {allPages.map((page, index) => {
            let position: "first" | "last" | "single" | "middle" | undefined;

            if (index === 0) position = "first";
            if (index === allPages.length - 1) position = "last";
            if (allPages.length === 1) position = "single";
            if (page === "...") position = "middle";

            return (
              <PaginationNumber
                key={page}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            );
          })}
        </div>

        <PaginationArrow direction="right" isDisabled={currentPage >= totalPages} />
      </div>
    </>
  );
}

function PaginationNumber({
  page,
  isActive,
  position,
}: {
  page: number | string;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}) {
  const className = clsx(
    "flex h-10 w-10 items-center justify-center text-sm border",
    {
      "rounded-l-md": position === "first" || position === "single",
      "rounded-r-md": position === "last" || position === "single",
      "z-10 bg-blue-600 border-blue-600 text-white": isActive,
      "hover:bg-gray-100": !isActive && position !== "middle",
      "text-gray-300": position === "middle",
    }
  );

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <div className={className}>{page}</div>
  );
}

function PaginationArrow({
  direction,
  isDisabled,
}: {
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  const className = clsx(
    "flex h-10 w-10 items-center justify-center rounded-md border",
    {
      "pointer-events-none text-gray-300": isDisabled,
      "hover:bg-gray-100": !isDisabled,
      "mr-2 md:mr-4": direction === "left",
      "ml-2 md:ml-4": direction === "right",
    }
  );

  const icon =
    direction === "left" ? (
      <ArrowLeft className="w-4" />
    ) : (
      <ArrowRight className="w-4" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <div className={className}>{icon}</div>
  );
}
