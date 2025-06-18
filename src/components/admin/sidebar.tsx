"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { adminSideBarLinks } from "@/constants";
import { cn, getInitials } from "@/lib/utils";
import * as Icons from "lucide-react";
import type { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ElementType } from "react";

interface AdminSidebarProps {
  session: Session;
}

/**
 * Admin sidebar component
 * Provides navigation for admin panel
 */
const AdminSidebar = ({ session }: AdminSidebarProps) => {
  const pathname = usePathname();
  const userName = session?.user?.name || "Quản trị viên";
  const userEmail = session?.user?.email || "";

  return (
    <aside className="sticky left-0 top-0 flex h-screen w-64 flex-col justify-between bg-card border-r border-border px-5 pb-5 pt-10">
      {/* Logo and navigation */}
      <div className="space-y-10">
        {/* Logo */}
        <Link
          href="/"
          className="font-heading font-semibold text-2xl md:text-3xl text-primary hover:text-accent transition-colors duration-200"
        >
          Chánh Đạo
        </Link>

        {/* Navigation links */}
        <nav className="space-y-2">
          {adminSideBarLinks.map((link) => {
            const isSelected =
              (link.route !== "/admin" &&
                pathname.includes(link.route) &&
                link.route.length > 1) ||
              pathname === link.route;

            const LucideIcon = (Icons as any)[link.icon] as ElementType;

            return (
              <Link key={link.route} href={link.route}>
                <div
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {LucideIcon && <LucideIcon className="h-5 w-5" />}
                  <span>{link.text}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User profile section */}
      <div className="flex items-center gap-3 rounded-lg border border-border bg-background/50 px-4 py-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
            {getInitials(userName)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {userName}
          </p>
          <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
