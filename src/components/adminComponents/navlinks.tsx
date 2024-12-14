"use client";

import { HomeIcon, User, ShoppingBag, BriefcaseBusiness } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { name: "Dashboard", href: "/business/dashboard", icon: HomeIcon },
  {
    name: "Farmer Profile",
    href: "/business/profile-setup",
    icon: User,
  },
  {
    name: "Business Profile",
    href: "/business/business-setup",
    icon: BriefcaseBusiness,
  },
  {
    name: "Product Setup",
    href: "/business/product-setup",
    icon: ShoppingBag,
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex items-center gap-2 w-full rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600",
              {
                "bg-sky-100 text-blue-600": pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6 block" />
            <p className="hidden block md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
