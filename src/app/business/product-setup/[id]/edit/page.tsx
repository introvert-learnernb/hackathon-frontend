"use client";

import { Category, unit } from "@/types/definitions";
import axiosInstance from "@/utils/axiosInstance";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Breadcrumbs from "@/components/adminComponents/product-setup/breadcrumbs";
import { RiAiGenerate2 } from "react-icons/ri";

export default function EditForm() {
  const params = useParams();
  const { id } = params as { id: string };

  interface Product {
    id: number;
    name: string;
    price: string;
    offerPrice: string;
    featuredImage: string | File | null;
    unit: "kg" | "piece" | "litre" | "dozen" | "pack";
    stockQuantity: number;
    isActive: boolean;
    category: any;
    description: string;
  }
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loadingDescription, setLoadingDescription] = useState<boolean>(false);
  const [product, setProduct] = useState<Omit<Product, "id"> | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch the product data
  const fetchProduct = async () => {
    try {
      const res = await axiosInstance.get(`/admin/product-app/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      // Set the product state
      setProduct(res);

      // Set the preview image
      setPreviewImage(res.featuredImage || defaultImage);
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to load product data.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/admin/product-app/categories", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      // @ts-ignore
      setCategories(res?.results);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    if (id) fetchProduct();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      setProduct((prev) => {
        if (!prev) return null; // Handle case where `prev` is null
        return {
          ...prev, // Spread the previous state to preserve all fields
          featuredImage: file || null,
        };
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImageUpload(e);

    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!product) return;

    const formData = new FormData();

    Object.entries(product).forEach(([key, value]) => {
      if (key === "featuredImage") {
        if (value instanceof File) {
          formData.append(key, value);
        }
      } else if (key === "category") {
        formData.append(key, value.id);
      } else {
        formData.append(key, value as string);
      }
    });

    try {
      await axiosInstance.patch(`/admin/product-app/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      toast.success("Product updated successfully!");
      router.push("/business/product-setup");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product.");
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!product) return <p>Product not found.</p>;

  const defaultImage = "https://randomuser.me/api/portraits/men/1.jpg";

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = categories?.find(
      (category) => category.id === parseInt(e.target.value)
    );

    if (selectedCategory) {
      setProduct((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          category: selectedCategory,
        };
      });
    }
  };

  const generateDescription = async () => {
    if (!product?.name || !product?.category) {
      toast.error("Please enter a product name and category first.");
      return;
    }

    setLoadingDescription(true);

    try {
      const response = await axiosInstance.post(
        "/admin/product-app/generate-description",
        {
          product_name: product.name,
          category: product.category?.name || "any",
          additional_info: product.description,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const description = response?.description || "";
      setProduct((prev) => (prev ? { ...prev, description } : prev)); // Properly update state
    } catch (error) {
      console.error("Error generating description:", error);
      toast.error("Failed to generate description. Please try again.");
    } finally {
      setLoadingDescription(false);
    }
  };

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Products", href: "/business/product-setup" },
          {
            label: "Update Product",
            href: "#",
            active: true,
          },
        ]}
      />
      <form onSubmit={handleSubmit} className="space-y-4">
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
            checked={product.isActive}
            onChange={(e) =>
              setProduct((prev) =>
                prev ? { ...prev, isActive: e.target.checked } : null
              )
            }
            className="mr-2"
          />
          <label htmlFor="isActive">Is Active</label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="px-4 rounded-md py-2 bg-blue-600 text-white"
        >
          Update Product
        </button>
      </form>
    </>
  );
}
