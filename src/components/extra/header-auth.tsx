import Link from "next/link";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";

export default function AuthButton() {
  interface User {
    id: number;
    photo: string;
    firstName: string;
    middleName: string;
    lastName: string;
    fullName: string;
    bio: string;
    phoneNo: string;
    email: string;
    dateJoined: string; // ISO 8601 formatted date
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    roles: string[];
  }
  const [user, setUser] = useState<User | null>(null);

  const access = localStorage.getItem("accessToken");
  const refresh = localStorage.getItem("refreshToken");

  useEffect(() => {
    if (!access || !refresh) return;
    async function fetchUser() {
      const user = await axiosInstance.get("/public/user-app/users/profile", {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      //@ts-ignore
      setUser(user);
    }
    fetchUser();
  }, [access, refresh]);

  const handleSignOut = async () => {
    await axiosInstance.post(
      "/public/user-app/users/logout",
      { refresh },
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    setUser(null);
  };

  return user ? (
    <div className="flex items-center gap-4">
      {/* @ts-ignore */}
      Hey, {user.fullName}!
      <Button type="submit" variant={"outline"} onClick={handleSignOut}>
        Sign out
      </Button>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
