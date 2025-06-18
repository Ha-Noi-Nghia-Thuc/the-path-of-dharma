"use client";

import { cn, getInitials } from "@/lib/utils";
import type { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "../ui/avatar";

const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/library", label: "Thư viện" },
];

const Header = ({ session }: { session: Session }) => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="font-heading font-semibold text-2xl text-foreground hover:text-muted-foreground transition-colors duration-200"
        >
          Chánh Đạo
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <ul className="hidden sm:flex gap-6 items-center">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;

              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      "text-sm font-medium relative px-2 py-1 rounded-md transition-colors duration-200",
                      isActive
                        ? "text-foreground bg-accent"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    )}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/my-profile"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-accent text-accent-foreground text-xs">
                {getInitials(session?.user?.name || "U")}
              </AvatarFallback>
            </Avatar>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
