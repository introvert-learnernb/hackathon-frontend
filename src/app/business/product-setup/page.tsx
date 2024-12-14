"use client";

import React, { Suspense, useEffect, useState } from "react";
import Pagination from "@/components/adminComponents/product-setup/pagination";
import Search from "@/components/adminComponents/search";
import ProductsTable from "@/components/adminComponents/product-setup/table";
import { CreateProduct } from "@/components/adminComponents/product-setup/buttons";
import { ProductsTableSkeleton } from "@/components/adminComponents/skeletons";

// ----------------------------------------------------------------------
// FIXME - Fetch data from API
import axiosInstance from "@/utils/axiosInstance";
import { tokens } from "@/data/tokens";
import { useParams } from "next/navigation";
import { Product } from "@/types/definitions";
// ----------------------------------------------------------------------

export default function Page() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [offset, setOffSet] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get(
          `/admin/product-app/products?limit=5&offset=${offset}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${tokens.access}`,
            },
          }
        );

        const resp = await axiosInstance.get("/admin/product-app/products", {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${tokens.access}`,
          },
        });

        // @ts-ignore
        setProducts(res?.results || []);
        // @ts-ignore
        setTotalPages(parseInt(resp.count / 5));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Products</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Products..." setProducts={setProducts} />
        <CreateProduct />
      </div>
      <Suspense
        key={currentPage}
        fallback={<ProductsTableSkeleton />}
      ></Suspense>
      {products ? (
        <ProductsTable data={products} />
      ) : (
        <p className="text-center  my-8"> No products found</p>
      )}
      <div className="mt-5 flex w-full justify-center">
        <Pagination
          currentPage={totalPages - offset * 5}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
