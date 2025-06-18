import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Quản lý kinh điển - Quản trị",
  description: "Quản lý tất cả kinh điển trong hệ thống",
};

const Page = () => {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">
            Quản lý kinh điển
          </h1>
          <p className="text-muted-foreground mt-2">
            Quản lý tất cả kinh điển trong hệ thống
          </p>
        </div>

        <Button asChild>
          <Link
            href="/admin/sutras/new"
            className="inline-flex items-center gap-2"
          >
            <PlusIcon size={16} />
            Thêm kinh điển
          </Link>
        </Button>
      </div>

      {/* Content section */}
      <div className="bg-card rounded-lg border p-6">
        {/* TODO: Add sutras table/grid */}
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Bảng quản lý kinh điển sẽ được hiển thị ở đây
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
