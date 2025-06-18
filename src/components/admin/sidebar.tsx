"use client";

import { adminSideBarLinks } from "@/constants";
import { cn, getInitials } from "@/lib/utils";
import * as Icons from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ElementType } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Session } from "next-auth";

const Sidebar = ({ session }: { session: Session }) => {
  const pathname = usePathname();

  return (
    <div className=" sticky left-0 top-0 flex h-dvh flex-col justify-between px-5 pb-5 pt-10">
      <div>
        <Link
          href="/"
          className="font-heading font-semibold text-2xl md:text-4xl text-primary hover:text-accent/50 transition-colors duration-200"
        >
          Chánh Đạo
        </Link>

        <div className="mt-10 flex flex-col gap-5">
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
                    "flex flex-row items-center w-full gap-2 rounded-lg px-5 py-3.5 max-md:justify-center",
                    isSelected && "bg-primary-admin shadow-sm"
                  )}
                >
                  <div className="relative size-5">
                    {LucideIcon && (
                      <LucideIcon
                        className={cn(
                          "size-5 object-contain",
                          isSelected ? "text-white" : "text-dark"
                        )}
                      />
                    )}
                  </div>

                  <p className={cn(isSelected ? "text-white" : "text-dark")}>
                    {link.text}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="my-8 flex w-full flex-row gap-2 rounded-full border px-6 py-2 shadow-sm max-md:px-2">
        <Avatar>
          <AvatarFallback className="bg-amber-100">
            {getInitials(session?.user?.name || "IN")}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col max-md:hidden">
          <p className="font-semibold text-dark-200">{session?.user?.name}</p>
          <p className="text-xs text-light-500">{session?.user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
