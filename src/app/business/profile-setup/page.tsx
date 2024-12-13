"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstance from "@/utils/axiosInstance";
import Image from "next/image";
import { tokens } from "@/data/tokens";
import nameSplit from "@/utils/nameSplit";

export default function FarmerProfileForm() {
  interface Profile {
    name: string;
    phoneNo: string;
    photo: string | File | null;
    email: string;
    bio: string;
    dateJoined: string;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
  }

  const [profile, setProfile] = useState<Profile>({
    name: "",
    phoneNo: "",
    photo: "",
    email: "",
    bio: "",
    dateJoined: "",
    isEmailVerified: false,
    isPhoneVerified: false,
  });

  const [previewImage, setPreviewImage] = useState("");

  const fetchProfile = async () => {
    try {
      const res = await axiosInstance.get("/public/user-app/users/profile", {
        headers: {
          Authorization: `Bearer ${tokens.access}`,
        },
      });
      console.log(res);
      // @ts-ignore
      setProfile({ ...res, name: res.fullName });
      // @ts-ignore
      if (res.photo) {
        // @ts-ignore
        setPreviewImage(res.photo);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreviewImage(URL.createObjectURL(file));
      setProfile((prev) => ({
        ...prev,
        photo: file,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Split name into first, middle, and last names
    const [firstName, middleName, lastName] = nameSplit(profile.name);

    const data = {
      firstName,
      middleName,
      lastName,
      bio: profile.bio,
      phoneNo: profile.phoneNo,
      photo: profile.photo,
    };

    const formData = new FormData();
    Object.entries(profile).forEach(([key, value]) => {
      if (key === "photo" && value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    });

    try {
      await axiosInstance.patch("/public/user-app/users/profile/update", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${tokens.access}`,
        },
      });
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Failed to update profile!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          {previewImage && (
            <Image
              src={previewImage}
              alt="Profile Image"
              width={180}
              height={180}
              className=" w-full aspect-square rounded-md border p-2"
            />
          )}
          <div className="flex-1 mt-4">
            <label htmlFor="photo">Profile Picture</label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full rounded-md border p-2"
            />
          </div>
        </div>

        <div className="flex flex-col justify-between flex-[2]">
          <div>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              required
              className="block w-full rounded-md border p-2"
            />
          </div>

          <div>
            <label htmlFor="phoneNo">Phone Number</label>
            <input
              type="text"
              id="phoneNo"
              name="phoneNo"
              value={profile.phoneNo}
              onChange={handleInputChange}
              required
              className="block w-full rounded-md border p-2"
            />
          </div>

          <div>
            {" "}
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={profile.email}
              disabled
              className="block w-full rounded-md border p-2 bg-gray-200"
            />
          </div>

          <div>
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={profile.bio}
              onChange={handleInputChange}
              className="block w-full rounded-md border p-2"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <div>
          <label htmlFor="dateJoined">Date Joined</label>
          <input
            type="text"
            id="dateJoined"
            name="dateJoined"
            value={new Date(profile.dateJoined).toLocaleDateString()}
            disabled
            className="block w-full rounded-md border p-2 bg-gray-200"
          />
        </div>

        <div className="flex gap-4 ">
          <div className="flex mt-6 items-center gap-4">
            <span>
              Email Verified: {profile.isEmailVerified ? "Yes✅" : "No❌"}
            </span>
            <span>
              Phone Verified: {profile.isPhoneVerified ? "Yes✅" : "No❌"}
            </span>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="px-4 py-3 mt-6 w-full bg-blue-600 text-white rounded-md"
      >
        Update Profile
      </button>
    </form>
  );
}
