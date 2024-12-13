"use client";

import { tokens } from "@/data/tokens";
import { Category, unit } from "@/types/definitions";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ProductForm() {
  interface Product {
    id: number;
    name: string;
    price: string;
    offerPrice: string;
    featuredImage: string | File | null;
    unit: "kg" | "piece" | "litre" | "dozen" | "pack";
    stockQuantity: number;
    isActive: boolean; // Product status
    category: any; // New field added
  }

  const [product, setProduct] = useState<Omit<Product, "id">>({
    name: "",
    price: "",
    offerPrice: "",
    featuredImage: "",
    unit: "kg",
    stockQuantity: 0,
    isActive: true,
    category: "",
  });

  const router = useRouter();
  const [categories, setCategories] = useState<Category[] | null>(null);

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/admin/product-app/categories", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${tokens.access}`,
        },
      });
      // @ts-ignore
      setCategories(res?.results);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProduct((prev) => ({
        ...prev,
        featuredImage: e.target.files ? e.target.files[0] : null,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(product).forEach(([key, value]) => {
      if (key === "featuredImage" && value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value as string);
      }
    });

    axiosInstance
      .post("/admin/product-app/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${tokens.access}`,
        },
      })
      .then((res) => {
        console.log("Product added:", res.data);
        toast.success("product addes successfully!");
      })
      .catch((err) => {
        console.error("Error:", err);
        toast.error("product adding failed!");
      })
      .finally(() =>
        setTimeout(() => {
          router.push("/business/product-setup");
        }, 500)
      );
  };

  console.log(product);
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={product.name}
          onChange={handleInputChange}
          required
          className="block w-full rounded-md border p-2"
        />
      </div>

      {/* Price */}
      <div>
        <label htmlFor="price">Price</label>
        <input
          type="text"
          id="price"
          name="price"
          value={product.price}
          onChange={handleInputChange}
          required
          className="block w-full rounded-md border p-2"
        />
      </div>

      {/* Offer Price */}
      <div>
        <label htmlFor="offerPrice">Offer Price</label>
        <input
          type="text"
          id="offerPrice"
          name="offerPrice"
          value={product.offerPrice}
          onChange={handleInputChange}
          required
          className="block w-full rounded-md border p-2"
        />
      </div>

      {/* Featured Image */}
      <div>
        <label htmlFor="featuredImage">Featured Image</label>
        <input
          type="file"
          id="featuredImage"
          name="featuredImage"
          accept="image/*"
          onChange={handleImageUpload}
          required
          className="block w-full rounded-md border p-2"
        />
      </div>

      {/* Unit */}
      <div>
        <label htmlFor="unit">Unit</label>
        <select
          id="unit"
          name="unit"
          value={product.unit}
          onChange={handleInputChange}
          required
          className="block w-full rounded-md border p-2"
        >
          {unit?.map((unitOption) => (
            <option key={unitOption.id} value={unitOption.id}>
              {unitOption.name}
            </option>
          ))}
        </select>
      </div>

      {/* Stock Quantity */}
      <div>
        <label htmlFor="stockQuantity">Stock Quantity</label>
        <input
          type="number"
          id="stockQuantity"
          name="stockQuantity"
          value={product.stockQuantity}
          onChange={handleInputChange}
          required
          className="block w-full rounded-md border p-2"
        />
      </div>

      {/* Category Name */}
      <div onClick={fetchCategories}>
        <label htmlFor="category">Category Name</label>
        <select
          id="category"
          name="category"
          value={product.category}
          onChange={handleInputChange}
          required
          className="block w-full rounded-md border p-2"
        >
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Is Active */}
      <div>
        <input
          type="checkbox"
          name="isActive"
          id="isActive"
          onChange={handleInputChange}
          className="mr-2"
        />
        <label htmlFor=" isActive">Is Active</label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="px-4 rounded-md py-2 bg-blue-600 text-white"
      >
        Add Product
      </button>
    </form>
  );
}
