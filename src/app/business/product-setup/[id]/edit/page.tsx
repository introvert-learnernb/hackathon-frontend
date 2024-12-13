"use client";

import { tokens } from "@/data/tokens";
import { Category } from "@/types/definitions";
import axiosInstance from "@/utils/axiosInstance";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

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
  }
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [product, setProduct] = useState<Omit<Product, "id"> | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch the product data
  const fetchProduct = async () => {
    try {
      const res = await axiosInstance.get(`/admin/product-app/products/${id}`, {
        headers: {
          Authorization: `Bearer ${tokens.access}`,
        },
      });
      // @ts-ignore
      setProduct(res);
      // @ts-ignore
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
          Authorization: `Bearer ${tokens.access}`,
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
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreviewImage(URL.createObjectURL(file)); // Set the preview image
      setProduct((prev) =>
        prev
          ? {
              ...prev,
              featuredImage: file,
            }
          : null
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!product) return;

    const formData = new FormData();

    Object.entries(product).forEach(([key, value]) => {
      console.log("data", product);
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

    console.log(product);

    try {
      await axiosInstance.patch(`/admin/product-app/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${tokens.access}`,
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

      <div className="flex gap-4">
        {/* Featured Image */}
        <Image
          src={previewImage || defaultImage}
          alt="Featured Image"
          width={200}
          height={200}
          className="rounded-md"
        />
        <div>
          <label htmlFor="featuredImage">Featured Image</label>
          <input
            type="file"
            id="featuredImage"
            name="featuredImage"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full rounded-md border p-2"
          />
        </div>
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
          <option value="kg">Kg</option>
          <option value="piece">Piece</option>
          <option value="litre">Litre</option>
          <option value="dozen">Dozen</option>
          <option value="pack">Pack</option>
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

      {/* Category */}
      <div>
        <label htmlFor="category">Category</label>
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
  );
}
