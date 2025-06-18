import SutraForm from "@/components/admin/common/sutra-form";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Thêm kinh điển mới - Quản trị",
  description: "Thêm kinh điển mới vào thư viện",
};

const Page = () => {
  return (
    <div className="space-y-6">
      {/* Navigation */}
      <Button asChild variant="outline">
        <Link href="/admin/sutras" className="inline-flex items-center gap-2">
          <ArrowLeftIcon size={16} />
          Quay lại danh sách
        </Link>
      </Button>

      {/* Page header */}
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">
          Thêm kinh điển mới
        </h1>
        <p className="text-muted-foreground mt-2">
          Điền thông tin để thêm kinh điển vào thư viện
        </p>
      </div>

      {/* Form section */}
      <section className="w-full max-w-2xl">
        <SutraForm type="create" />
      </section>
    </div>
  );
};

export default Page;
