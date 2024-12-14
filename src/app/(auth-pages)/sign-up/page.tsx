"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import nameSplit from "@/utils/nameSplit";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";

export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    accountType: "Customer", // Default value is "Customer"
    hasAcceptedTerms: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      accountType: formData.accountType,
      hasAcceptedTerms: formData.hasAcceptedTerms,
      redirectUrl: "/auth/callback",
    };

    try {
      const isCustomer = formData.accountType === "Customer";
      const isFarmer = formData.accountType === "Farmer";

      const payload = {
        email: formData.email,
        password: formData.password,
        phoneNo: formData.phone,
        firstName,
        middleName,
        lastName,
        accountType: formData.accountType,
        is_customer: isCustomer,
        is_farmer: isFarmer,
        hasAcceptedTerms: formData.hasAcceptedTerms,
        redirectUrl: "/auth/callback",
      };

      const res = await axiosInstance.post(
        "/public/user-app/users/signup",
        payload
      );

      // Show a success message and open the modal
      const success_message = "Signup successful! Please check your email.";
      setMessage(success_message);
      toast.success(success_message);
      setIsModalOpen(true); // Open the modal
    } catch (error: any) {
      console.error(error);
      setMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setFormData({
      email: "",
      password: "",
      name: "",
      phone: "",
      accountType: "Customer",
      hasAcceptedTerms: false,
    });
    setMessage("");
    setIsModalOpen(false);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {/* Form */}
      <form className="max-w-md w-full flex flex-col" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-medium text-center">Sign up</h1>
        <p className="text-sm text-center text-foreground">
          Already have an account?{" "}
          <Link className="text-primary font-medium underline" href="/sign-in">
            Sign in
          </Link>
        </p>
        <div className="flex flex-col gap-2 mt-8">
          {/* ACCOUNT TYPE */}
          <Label htmlFor="accountType" className="mt-4">
            Account Type
          </Label>
          <div className="flex gap-6">
            <div className="flex items-center">
              <input
                type="radio"
                id="farmer"
                name="accountType"
                value="Farmer"
                checked={formData.accountType === "Farmer"}
                onChange={handleChange}
                className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
              />
              <Label htmlFor="farmer" className="ml-2 text-sm text-gray-700">
                Farmer
              </Label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="customer"
                name="accountType"
                value="Customer"
                checked={formData.accountType === "Customer"}
                onChange={handleChange}
                className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
              />
              <Label htmlFor="customer" className="ml-2 text-sm text-gray-700">
                Customer
              </Label>
            </div>
          </div>

          {/* EMAIL */}
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            placeholder="you@example.com"
            required
            type="email"
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
          <Label htmlFor="name">Full Name</Label>
          <Input
            name="name"
            placeholder="Your name..."
            required
            value={formData.name}
            onChange={handleChange}
          />

          {/* PHONE */}
          <Label htmlFor="phone">Phone No</Label>
          <Input
            type="text"
            name="phone"
            placeholder="Your phone no..."
            value={formData.phone}
            onChange={handleChange}
          />

          {/* TERMS */}
          <div className="flex gap-2 items-center mt-4">
            <input
              type="checkbox"
              id="hasAcceptedTerms"
              name="hasAcceptedTerms"
              value={`${formData?.hasAcceptedTerms}`}
              onChange={handleChange}
            />
            <Label htmlFor="hasAcceptedTerms">
              Agree to Terms and Conditions
            </Label>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-primary text-white py-2 rounded hover:bg-primary disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>

          {message && <p className="text-green-500 mt-4">{message}</p>}
        </div>
      </form>

      {/* Modal for success message */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 text-center">
            <h2 className="text-xl font-semibold text-green-600">
              Verification Email Sent!
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Please check your inbox and follow the instructions to verify your
              account.
            </p>
            <button
              onClick={closeModal}
              className="mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-primary"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
