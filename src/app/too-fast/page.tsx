import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  return (
    <main className="flex min-h-screen flex-1 flex-col px-4 items-center justify-center">
      <div className="text-center space-y-6 max-w-md">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">
            Vui lòng chậm lại
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Bạn đang thao tác quá nhanh. Chúng tôi đã tạm dừng để bảo vệ hệ
            thống. Vui lòng nghỉ ngơi một chút và thử lại sau.
          </p>
        </div>

        <div className="pt-4">
          <Button asChild size="sm">
            <Link href="/">Quay về trang chủ</Link>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Điều này giúp chúng tôi duy trì chất lượng dịch vụ tốt nhất cho tất cả
          người dùng.
        </p>
      </div>
    </main>
  );
};

export default Page;
