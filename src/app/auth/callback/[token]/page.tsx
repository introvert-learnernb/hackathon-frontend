"use client";

import axiosInstance from "@/utils/axiosInstance";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function VerifyAccount() {
  const { token } = useParams();
  const [verified, setIsverfied] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!token) return;
    async function Verify() {
      try {
        const res = await axiosInstance.post("/public/user-app/users/verify", {
          token: token as string,
        });
        setIsverfied(true);
      } catch (err) {
        toast.error("Verification failed!!");
        console.log(err);
      }
    }
    Verify();
  }, [token]);

  useEffect(() => {
    if (verified) {
      toast.success("Verification successful!");
      router.push("/");
    }
  }, [verified, router]);

  return null;
}
