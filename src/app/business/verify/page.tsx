"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "@/utils/axiosInstance";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function VerifyBusinessPage() {
  const [verificationData, setVerificationData] = useState({
    registrationCertificate: "",
    taxCertificate: "",
    ownerId: "",
    addressProof: "",
  });

  const [previewImages, setPreviewImages] = useState({
    registrationCertificatePreview: "",
    taxCertificatePreview: "",
    ownerIdPreview: "",
    addressProofPreview: "",
  });

  const router = useRouter();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setPreviewImages((prev) => ({ ...prev, [`${name}Preview`]: previewUrl }));
      setVerificationData((prev) => ({ ...prev, [name]: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(verificationData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const res = await axiosInstance.post(
        "/public/business-app/business-info/verify",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      toast.success("Business verification submitted successfully!");
    } catch (err) {
      console.error("Error verifying business:", err);
      toast.error("Failed to submit business verification!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
      <div>
        <label htmlFor="registrationCertificate">
          Registration Certificate
        </label>
        <input
          type="file"
          id="registrationCertificate"
          name="registrationCertificate"
          accept="image/*,application/pdf"
          onChange={handleFileUpload}
          required
          className="block w-full rounded-md border p-2"
        />
        {previewImages.registrationCertificatePreview && (
          <Image
            src={previewImages.registrationCertificatePreview}
            alt="Registration Certificate Preview"
            width={160}
            height={160}
            className="w-full aspect-square object-contain rounded-md border p-2"
          />
        )}
      </div>

      <div>
        <label htmlFor="taxCertificate">Tax Certificate</label>
        <input
          type="file"
          id="taxCertificate"
          name="taxCertificate"
          accept="image/*,application/pdf"
          onChange={handleFileUpload}
          required
          className="block w-full rounded-md border p-2"
        />
        {previewImages.taxCertificatePreview && (
          <Image
            src={previewImages.taxCertificatePreview}
            alt="Tax Certificate Preview"
            width={160}
            height={160}
            className="w-full aspect-square object-contain rounded-md border p-2"
          />
        )}
      </div>

      <div>
        <label htmlFor="ownerId">Owner ID</label>
        <input
          type="file"
          id="ownerId"
          name="ownerId"
          accept="image/*,application/pdf"
          onChange={handleFileUpload}
          required
          className="block w-full rounded-md border p-2"
        />
        {previewImages.ownerIdPreview && (
          <Image
            src={previewImages.ownerIdPreview}
            alt="Owner ID Preview"
            width={160}
            height={160}
            className="w-full aspect-square object-contain rounded-md border p-2"
          />
        )}
      </div>

      <div>
        <label htmlFor="addressProof">Address Proof</label>
        <input
          type="file"
          id="addressProof"
          name="addressProof"
          accept="image/*,application/pdf"
          onChange={handleFileUpload}
          required
          className="block w-full rounded-md border p-2"
        />
        {previewImages.addressProofPreview && (
          <Image
            src={previewImages.addressProofPreview}
            alt="Address Proof Preview"
            width={160}
            height={160}
            className="w-full aspect-square object-contain rounded-md border p-2"
          />
        )}
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Submit Verification
      </button>
    </form>
  );
}
