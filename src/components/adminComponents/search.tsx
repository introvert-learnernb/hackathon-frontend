"use client";

import { tokens } from "@/data/tokens";
import axiosInstance from "@/utils/axiosInstance";
import { Search as SearchIcon } from "lucide-react";

export default function Search({
  placeholder,
  setProducts,
}: {
  placeholder: string;
  setProducts: (products: any[]) => void;
}) {
  const handleSearch = async (term: string) => {
    const res = await axiosInstance.get(
      `/admin/product-app/products?search=${term}`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${tokens.access}`,
        },
      }
    );

    // @ts-ignore
    setProducts(res?.results);
  };

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <SearchIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
