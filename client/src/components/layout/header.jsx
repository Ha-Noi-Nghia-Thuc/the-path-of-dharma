"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navLinks = [
  { href: "/", label: "Trang Chủ" },
  { href: "/library", label: "Thư Viện" },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="font-heading text-2xl md:text-3xl text-primary hover:text-accent/50 transition-colors duration-200"
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
                      "font-heading relative px-3 py-2 rounded-lg text-base md:text-lg transition-all duration-200",
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
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
