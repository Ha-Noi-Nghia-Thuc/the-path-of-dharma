import { signOut } from "@/auth";
import SutraList from "@/components/common/sutra-list";
import { Button } from "@/components/ui/button";
import { sampleSutras } from "@/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tài khoản cá nhân",
  description: "Quản lý tài khoản và các kinh điển đã lưu",
};

const Page = () => {
  return (
    <div className="space-y-8">
      {/* Header section */}
      <section className="flex justify-between items-start border-b border-border pb-6">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-foreground">
            Tài khoản cá nhân
          </h1>
          <p className="text-sm text-muted-foreground">
            Quản lý thông tin và các kinh điển đã lưu
          </p>
        </div>

        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button variant="outline" type="submit" size="sm">
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
