import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Bảng điều khiển quản trị - Chánh Đạo",
  description: "Quản lý hệ thống và nội dung",
};

const Page = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">
          Bảng điều khiển
        </h1>
        <p className="text-muted-foreground mt-2">
          Tổng quan về hệ thống và hoạt động
        </p>
      </div>

      {/* TODO: Add dashboard widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Stats cards will go here */}
      </div>
    </div>
  );
};

export default Page;
