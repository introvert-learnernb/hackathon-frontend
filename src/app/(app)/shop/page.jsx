"use client";

import React, { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import Categories from "@/components/Home/categories";
import Ratings from "@/components/Home/rating";
import ProductCard from "@/components/Home/card";
import { Input } from "@/components/ui/input";
import SortBy from "@/components/Home/sortby";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState(null);

  const router = useRouter();

  const fetchProducts = async (
    query = "",
    sortBy,
    rating = null,
    categories = []
  ) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/public/product-app/products?search=${query}`
      );
      let productData = response.results;

      if (categories?.length > 0) {
        productData = productData.filter((product) =>
          categories.includes(product.categoryName)
        );
      }

      if (rating) {
        productData = productData.filter(
          (product) => Math.round(product.averageRating) === rating
        );
      }

      if (sortBy === "ascending") {
        productData = productData.sort((a, b) => a.offerPrice - b.offerPrice);
      }
      if (sortBy === "descending") {
        productData = productData.sort((a, b) => b.offerPrice - a.offerPrice);
      }
      if (sortBy === "name") {
        productData = productData.sort((a, b) => a.name - b.name);
      }

      setProducts(productData);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(searchTerm, sortBy, selectedRating, selectedCategories);
  }, [searchTerm, sortBy, selectedRating, selectedCategories]);

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
  };

  const handleClick = (route) => {
    router.push(`/shop/${route}`);
  };

  return (
    <>
      <div className="bg-primary text-primary-foreground w-full h-20 flex justify-center items-center font-bold text-3xl">
        Shop Page
      </div>
      <div className="main-container grid grid-cols-12 gap-8 px-6 py-8 bg-gray-100">
        <div className="col-span-3 bg-white rounded-lg shadow-lg">
          {/* <h2 className="text-lg font-semibold bg-primary text-primary-foreground p-3 text-center w-full rounded-t-md">
            Filters
          </h2> */}
          <Categories onCategoryChange={handleCategoryChange} />
          <Ratings onRatingSelect={setSelectedRating} />
        </div>

        <div className="col-span-9">
          <div className="flex items-center justify-between mb-6">
            <div className="relative w-full max-w-lg">
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-12"
              />
            </div>

            <div>
              <SortBy setSortBy={setSortBy} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {loading ? (
              <>
                <div className=" animate-pulse h-96 w-full"></div>
                <div className=" animate-pulse h-96 w-full"></div>
                <div className=" animate-pulse h-96 w-full"></div>
                <div className=" animate-pulse h-96 w-full"></div>
                <div className=" animate-pulse h-96 w-full"></div>
                <div className=" animate-pulse h-96 w-full"></div>
              </>
            ) : products.length > 0 ? (
              products.map((product) => (
                <ProductCard
                  key={product.id}
                  percentDisc={`${Math.round(
                    ((product.price - product.offerPrice) / product.price) * 100
                  )}%`}
                  actualPrice={`${product.price}`}
                  discountPrice={`${product.offerPrice}`}
                  starRating={Math.round(product.averageRating)}
                  imageUrl={
                    product.featuredImage || "/defaultImage/defaultImage.avif"
                  }
                  onClick={() => handleClick(product.id)}
                  cardName={product.name}
                  unit={product.unit}
                  totalReviews={product.totalReviews}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-600">
                <p>No products available.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
