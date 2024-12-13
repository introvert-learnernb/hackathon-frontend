"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import nameSplit from "@/utils/nameSplit";
import axiosInstance from "@/utils/axiosInstance";

export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    hasAcceptedTerms: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.hasAcceptedTerms) {
      setMessage("You must accept the terms and conditions.");
      return;
    }

    setLoading(true);
    setMessage("");

    // Split name into first, middle, and last names
    const [firstName, middleName, lastName] = nameSplit(formData.name);

    const data = {
      email: formData.email,
      password: formData.password,
      phoneNo: formData.phone,
      firstName,
      middleName,
      lastName,
      hasAcceptedTerms: formData.hasAcceptedTerms,
      redirectUrl: "/auth/callback",
    };

    try {
      const res = await axiosInstance.post("/public/user-app/users/signup", data);
      console.log(res.data);
      setMessage("Signup successful! Please check your email.");
    } catch (error: any) {
      console.error(error);
      setMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {/* Form */}
      <form className="max-w-md w-full flex flex-col" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-medium">Sign up</h1>
        <p className="text-sm text text-foreground">
          Already have an account?{" "}
          <Link className="text-primary font-medium underline" href="/sign-in">
            Sign in
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          {/* EMAIL */}
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            placeholder="you@example.com"
            required
            value={formData.email}
            onChange={handleChange}
          />

          {/* PASSWORD */}
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            minLength={8}
            required
            value={formData.password}
            onChange={handleChange}
          />

          {/* NAME */}
          <Label htmlFor="name">Name</Label>
          <Input
            name="name"
            placeholder="Your name..."
            required
            value={formData.name}
            onChange={handleChange}
          />

          {/* PHONE */}
          <Label htmlFor="phone">Phone</Label>
          <Input
            type="text"
            name="phone"
            placeholder="Your phone..."
            value={formData.phone}
            onChange={handleChange}
          />

          {/* TERMS */}
          <Label htmlFor="hasAcceptedTerms">Agree</Label>
          <input
            type="checkbox"
            id="hasAcceptedTerms"
            name="hasAcceptedTerms"
            value={`${formData.hasAcceptedTerms}`}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>

          {message && <p className="text-red-500 mt-4">{message}</p>}
        </div>
      </form>

      {/* Google Sign-In */}
      {/* <form className="w-full max-w-md">
        <button className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition mb-4 disabled:opacity-50 disabled:cursor-not-allowed">
          <Image
            src="https://www.google.com/favicon.ico"
            alt="Google"
            width={20}
            height={20}
            className="w-5 h-5"
          />
          Continue with Google
        </button>
      </form> */}
    </div>
  );
}
