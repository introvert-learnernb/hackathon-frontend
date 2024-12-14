"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AuthButton from "../extra/header-auth";
import Image from "next/image";

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-transparent backdrop-blur-[20px] h-24 flex items-center justify-center">
      <div className="container mx-auto flex h-16 items-baseline justify-between px-4">
        <Link href="/" className="flex items-baseline">
          <span className="h-8 text-4xl">
            <Image
            alt="logo"
            width={150}
            height={150}
            src={"/Logo.png"}
            className="mt-3"
            />
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="text-md font-semibold font-sans text-secondary-foreground hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            href="/shop"
            className="text-md font-semibold font-sans text-secondary-foreground hover:text-primary transition-colors"
          >
            Shop
          </Link>
          <Link
            href="/about"
            className="text-md font-semibold font-sans text-secondary-foreground hover:text-primary transition-colors"
          >
            About
          </Link>
          <Link
            href="/disclaimer"
            className="text-md font-semibold font-sans text-secondary-foreground hover:text-primary transition-colors"
          >
            Disclaimer
          </Link>
          <Link
            href="/contact"
            className="text-md font-semibold font-sans text-secondary-foreground hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Desktop Login Button */}
        <div className="hidden md:flex items-center space-x-4">
          <Button asChild size="sm" variant={"outline"}>
            <Link href="/sign-in">Sign in</Link>
          </Button>
          <Button asChild size="sm" variant={"default"}>
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="md:hidden mt-3">
              <Menu className="h-8 w-8" />
              <span className="sr-only">Toggle menu</span>
            </button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col space-y-4 mt-6">
              <Link
                href="/"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/disclaimer"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Disclaimer
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Button
                variant="default"
                asChild
                className="w-full justify-start"
                onClick={() => setIsOpen(false)}
              >
                <Link href="/sign-in">Sign in</Link>
              </Button>
              <Button
                variant="default"
                asChild
                className="w-full justify-start"
                onClick={() => setIsOpen(false)}
              >
                <Link href="/sign-up">Sign up</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
