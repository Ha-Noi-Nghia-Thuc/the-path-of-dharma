import { signOut } from "@/auth";
import SutraList from "@/components/common/sutra-list";
import { Button } from "@/components/ui/button";
import { sampleSutras } from "@/constants";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Hồ sơ cá nhân - Chánh Đạo",
  description: "Quản lý hồ sơ cá nhân và các kinh điển đã lưu",
};

const Page = () => {
  return (
    <div className="space-y-10">
      {/* Logout section */}
      <section className="flex justify-between items-center">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">
            Hồ sơ cá nhân
          </h1>
          <p className="text-muted-foreground mt-2">
            Quản lý thông tin và các kinh điển đã lưu
          </p>
        </div>

        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button variant="outline" type="submit">
            Đăng xuất
          </Button>
        </form>
      </section>

      {/* Saved sutras section */}
      <SutraList title="Kinh điển đã lưu" sutras={sampleSutras} />
    </div>
  );
};

export default Page;
