"use client";

import { cn, getInitials } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Session } from "next-auth";

const navLinks = [
  { href: "/", label: "Trang Chủ" },
  { href: "/library", label: "Thư Viện" },
];

const Header = ({ session }: { session: Session }) => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="font-heading font-semibold text-2xl md:text-4xl text-primary hover:text-accent/50 transition-colors duration-200"
        >
          Chánh Đạo
        </Link>

        {/* Navigation */}
        <nav>
          <ul className="flex gap-6 md:gap-8 items-center">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;

              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      "font-heading font-semibold relative px-3 py-2 rounded-lg transition-all duration-200",
                      isActive
                        ? "text-accent/50 bg-primary/10"
                        : "text-primary hover:text-accent/50 hover:bg-primary/10"
                    )}
                  >
                    {label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary-light rounded-full" />
                    )}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/my-profile"
                className="
                  font-heading font-semibold relative px-3 py-2 rounded-lg transition-all duration-200"
              >
                <Avatar>
                  <AvatarFallback className="bg-primary-light border border-primary">
                    {getInitials(session?.user?.name || "IN")}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
