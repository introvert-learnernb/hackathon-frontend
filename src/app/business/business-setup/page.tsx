"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstance from "@/utils/axiosInstance";
import Image from "next/image";
import { tokens } from "@/data/tokens";
import { Category } from "@/types/definitions";

export default function BusinessProfileForm() {
  interface Profile {
    category: Category | null;
    latitude: number;
    longitude: number;
    logo: string | File | null;
    businessName: string;
    description: string;
    story: string;
    contactEmail: string;
    contactNo: string;
    isVerified: string;
  }

  const [profile, setProfile] = useState<Profile>({
    category: null,
    latitude: 0,
    longitude: 0,
    logo: "",
    businessName: "",
    description: "",
    story: "",
    contactEmail: "",
    contactNo: "",
    isVerified: "",
  });

  const [previewLogo, setPreviewLogo] = useState("");
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [isAlreadyCreated, setIsAlreadyCreated] = useState(false);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/public/business-app/categories", {
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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setProfile((prev) => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axiosInstance.get(
        "/public/business-app/business-info",
        {
          headers: {
            Authorization: `Bearer ${tokens.access}`,
          },
        }
      );

      if (res) {
        //@ts-ignore
        setProfile(res);
        setIsAlreadyCreated(true);
        //@ts-ignore
        if (res.logo) {
          //@ts-ignore
          setPreviewLogo(res.logo);
        }
      }
    } catch (error) {
      // @ts-ignore
      if (error.response && error.response.status === 404) {
        console.warn(
          "Business profile not found, initializing with default values."
        );
        setIsAlreadyCreated(false);
        // Set default values
        setProfile({
          category: null,
          latitude: 0,
          longitude: 0,
          logo: "",
          businessName: "",
          description: "",
          story: "",
          contactEmail: "",
          contactNo: "",
          isVerified: "",
        });
      } else {
        console.error("Error fetching profile:", error);
        toast.error("An unexpected error occurred while fetching the profile.");
      }
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchCategories();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreviewLogo(URL.createObjectURL(file));
      setProfile((prev) => ({
        ...prev,
        logo: file,
      }));
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(profile).forEach(([key, value]) => {
      if (key === "logo" && value instanceof File) {
        formData.append(key, value);
      } else if (key === "category") {
        console.log(value.id);
        formData.append(key, value.id);
      } else {
        formData.append(key, value);
      }
    });

    try {
      const reqQuery = isAlreadyCreated
        ? axiosInstance.patch(
            "/public/business-app/business-info/update",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${tokens.access}`,
              },
            }
          )
        : axiosInstance.post(
            "/public/business-app/business-info/create",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${tokens.access}`,
              },
            }
          );
      const res = await reqQuery;
      toast.success("Business profile updated successfully!");
    } catch (err) {
      console.error("Error updating business profile:", err);
      toast.error("Failed to update business profile!");
    }
  };
  const handleCategoryChange = (e: React.FormEvent<HTMLSelectElement>) => {
    //@ts-ignore
    const id = e.target.value;

    if (!categories) throw new Error("categories is null");
    const category = categories.find((category) => category.id === id);
    const name = category ? category.name : "";

    setProfile((prev) => ({
      ...prev,
      category: { id, name },
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Category */}

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <label htmlFor="logo">Logo</label>
          {previewLogo && (
            <Image
              src={previewLogo}
              alt="Business Logo"
              width={200}
              height={200}
              className="rounded-md aspect-square w-full mb-4"
            />
          )}
          <input
            type="file"
            id="logo"
            name="logo"
            accept="image/*"
            onChange={handleLogoUpload}
            className="block w-full rounded-md border p-2"
          />
        </div>
        <div className="flex flex-col justify-between flex-[2]">
          <div>
            <label htmlFor="businessName">Business Name</label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              value={profile.businessName}
              onChange={handleInputChange}
              required
              className="block w-full rounded-md border p-2"
            />
          </div>

          <div>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
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

          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={profile.description}
              onChange={handleInputChange}
              className="block w-full rounded-md border p-2"
            />
          </div>

          <div>
            <label htmlFor="story">Story</label>
            <textarea
              id="story"
              name="story"
              value={profile.story}
              onChange={handleInputChange}
              className="block w-full rounded-md border p-2"
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="contactEmail">Contact Email</label>
        <input
          type="email"
          id="contactEmail"
          name="contactEmail"
          value={profile.contactEmail}
          onChange={handleInputChange}
          required
          className="block w-full rounded-md border p-2"
        />
      </div>

      <div className="flex-1">
        <label htmlFor="contactNo">Contact Number</label>
        <input
          type="text"
          id="contactNo"
          name="contactNo"
          value={profile.contactNo}
          onChange={handleInputChange}
          required
          className="block w-full rounded-md border p-2"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-3 w-full bg-blue-600 text-white rounded-md"
      >
        Update Business Profile
      </button>
    </form>
  );
}
