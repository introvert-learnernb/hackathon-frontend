"use client";
import { SubmitButton } from "@/components/extra/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/utils/axiosInstance";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const payload = {
        persona: email,
        password: password,
        redirectUrl: "/auth/callback",
      };
      const res = await axiosInstance.post(
        "/public/user-app/users/signin",
        payload
      );

      if (res) {
        toast.success(res?.message);
        localStorage.setItem("accessToken", res?.tokens?.access);
        localStorage.setItem("refreshToken", res?.tokens?.refresh);
        if (res?.roles.includes("Farmer")) {
          return router.push("/business/profile-setup");
        } else {
          router.replace("/");
          router.refresh();
        }
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      const error_message = "Invalid Credentials, Try Again!";
      setError(error_message);
      toast.error(error_message);
      setPassword("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {/* Email handler */}
      <form className="max-w-md w-full flex flex-col" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-medium">Sign in</h1>
        <p className="text-sm text-foreground">
          Don't have an account?{" "}
          <Link
            className="text-foreground font-medium underline"
            href="/sign-up"
          >
            Sign up
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            placeholder="you@example.com"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              className="text-xs text-foreground underline"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <SubmitButton
            pendingText="Signing In..."
            // formAction={signInAction}
            disabled={isSubmitting}
          >
            Sign in
          </SubmitButton>
          {error && <div className="text-red-500 mt-2">{error}</div>}

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
        </div>
      </form>

      {/* Google handler */}
      <form className="w-full max-w-md">
        <button
          // formAction={signInWithGoogleAction}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Image
            src="https://www.google.com/favicon.ico"
            alt="Google"
            width={20}
            height={20}
            className="w-5 h-5"
          />
          Continue with Google
        </button>
      </form>
    </div>
  );
}
