"use client";

import { Category, unit } from "@/types/definitions";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RiAiGenerate2 } from "react-icons/ri";
import Breadcrumbs from "./breadcrumbs";

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
    description: "";
  }
  const [previewImage, setPreviewImage] = useState(null);

  const [product, setProduct] = useState<Omit<Product, "id">>({
    name: "",
    price: "",
    offerPrice: "",
    featuredImage: "",
    unit: "kg",
    stockQuantity: 0,
    isActive: true,
    category: "",
    description: "",
  });

  const router = useRouter();
  const [categories, setCategories] = useState<Category[] | null>(null);

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/admin/product-app/categories", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleImageUpload(e); // Parent handler for uploading image
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result as any);
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = categories?.find(
      (category) => category.id == parseInt(e.target.value)
    );
    if (selectedCategory) {
      setProduct((prev) => ({
        ...prev,
        category: selectedCategory,
      }));
    }
  };

  const [loadingDescription, setLoadingDescription] = useState<boolean>(false);

  const generateDescription = async () => {
    if (!product.name && !product?.category) {
      toast.error("Please enter a product and category first.");
      return;
    }

    setLoadingDescription(true);
    try {
      const response = await axiosInstance.post(
        "/admin/product-app/generate-description",
        {
          product_name: product.name,
          category: product.category ? product?.category?.name : "any",
          additional_info: product.description,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      product.description = response?.description ? response?.description : "";
      setLoadingDescription(false);
    } catch (error) {
      console.error("Error generating description:", error);
      setLoadingDescription(false);
      toast.error("Failed to generate description. Please try again.");
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
        formData.append("category", product.category?.id.toString());
      }
    });

    axiosInstance
      .post("/admin/product-app/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        console.log("Product added:", res.data);
        toast.success("Product added successfully!");
      })
      .catch((err) => {
        console.error("Error:", err);
        toast.error("Failed to add product.");
      })
      .finally(() =>
        setTimeout(() => {
          router.push("/business/product-setup");
        }, 500)
      );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name and Category in one row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <div onClick={fetchCategories}>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={product.category?.id || ""}
            onChange={handleCategoryChange}
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
      </div>

      {/* Price, Offer Price, Unit, Stock Quantity in one row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
      </div>

      {/* Featured Image with Preview */}
      <div className="flex items-center gap-4">
        <div>
          <label htmlFor="featuredImage">Featured Image</label>
          <input
            type="file"
            id="featuredImage"
            name="featuredImage"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="block w-full rounded-md border p-2"
          />
        </div>
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className="w-24 h-24 rounded-md border object-cover"
          />
        )}
      </div>

      {/* Description Field */}
      <div className="relative">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={product.description}
          onChange={(e) => handleInputChange(e as any)}
          rows={4}
          required
          className="block w-full rounded-md border p-2"
        ></textarea>
        <button
          type="button"
          onClick={generateDescription}
          disabled={loadingDescription}
          className="absolute top-8 right-2 px-3 py-1 bg-blue-600 text-white rounded-md"
        >
          {loadingDescription ? (
            <div className="animate-spin h-5 w-5 border-2 border-t-transparent border-white rounded-full"></div>
          ) : (
            <RiAiGenerate2 size={20} />
          )}
        </button>
      </div>

      {/* Is Active */}
      <div>
        <input
          type="checkbox"
          name="isActive"
          id="isActive"
          onChange={handleInputChange}
          checked={product.isActive}
          className="mr-2"
        />
        <label htmlFor="isActive">Is Active</label>
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
