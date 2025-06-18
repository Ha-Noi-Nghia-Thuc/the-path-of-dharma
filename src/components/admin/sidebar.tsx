"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { adminSideBarLinks } from "@/constants";
import { handleSignOut } from "@/lib/actions/auth";
import { cn, getInitials } from "@/lib/utils";
import * as Icons from "lucide-react";
import { LogOutIcon, MenuIcon, SettingsIcon, UserIcon } from "lucide-react";
import type { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ElementType } from "react";

interface AdminSidebarProps {
  session: Session;
}

// Sidebar content component để tái sử dụng
const SidebarContent = ({
  session,
  onLinkClick,
}: {
  session: Session;
  onLinkClick?: () => void;
}) => {
  const pathname = usePathname();
  const userName = session?.user?.name || "Quản trị viên";
  const userEmail = session?.user?.email || "";

  return (
    <div className="flex h-full w-64 flex-col bg-background border-r border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <Link
          href="/"
          className="font-heading font-semibold text-lg text-foreground hover:text-muted-foreground transition-colors duration-200"
          onClick={onLinkClick}
        >
          Chánh Đạo
        </Link>
        <p className="text-xs text-muted-foreground mt-1">Quản trị hệ thống</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {adminSideBarLinks.map((link) => {
            const isSelected =
              (link.route !== "/admin" &&
                pathname.includes(link.route) &&
                link.route.length > 1) ||
              pathname === link.route;

            const LucideIcon = (Icons as any)[link.icon] as ElementType;

            return (
              <Link key={link.route} href={link.route} onClick={onLinkClick}>
                <div
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                    isSelected
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  )}
                >
                  {LucideIcon && <LucideIcon className="h-4 w-4" />}
                  <span>{link.text}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User profile section */}
      <div className="p-4 border-t border-border">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 p-3 rounded-md bg-accent/30 hover:bg-accent/50 transition-colors w-full text-left">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-accent text-accent-foreground text-xs">
                  {getInitials(userName)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {userName}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {userEmail}
                </p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem asChild>
              <Link href="/admin/profile" className="flex items-center gap-2">
                <UserIcon className="h-4 w-4" />
                <span>Thông tin cá nhân</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/settings" className="flex items-center gap-2">
                <SettingsIcon className="h-4 w-4" />
                <span>Cài đặt</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center gap-2 text-destructive focus:text-destructive"
              onClick={() => {
                handleSignOut();
              }}
            >
              <LogOutIcon className="h-4 w-4" />
              <span>Đăng xuất</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

/**
 * Admin sidebar component
 * Provides navigation for admin panel with responsive design
 */
const AdminSidebar = ({ session }: AdminSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="fixed top-4 left-4 z-50 lg:hidden"
            >
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Mở menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <SidebarContent
              session={session}
              onLinkClick={() => setIsOpen(false)}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block sticky left-0 top-0 h-screen">
        <SidebarContent session={session} />
      </aside>
    </>
  );
};

export default AdminSidebar;
