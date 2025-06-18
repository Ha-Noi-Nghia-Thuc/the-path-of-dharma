import SutraList from "@/components/common/sutra-list";
import SutraOverview from "@/components/common/sutra-overview";
import { sampleSutras } from "@/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trang chủ",
  description:
    "Khám phá kho tàng Kinh điển Phật giáo - Nơi lưu giữ và chia sẻ trí tuệ ngàn đời của Đức Phật và các bậc Tổ sư",
  openGraph: {
    title: "Chánh Đạo - Thư viện Kinh điển Phật giáo",
    description:
      "Khám phá kho tàng Kinh điển Phật giáo - Nơi lưu giữ và chia sẻ trí tuệ ngàn đời",
  },
};

const Home = async () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12 border-b border-border">
        <div className="max-w-3xl mx-auto space-y-4">
          <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground">
            Thư viện Kinh điển Phật giáo
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Nơi lưu giữ và chia sẻ kho tàng trí tuệ ngàn đời của Đức Phật và các
            bậc Tổ sư. Hãy cùng khám phá, học hỏi và thực hành những giáo lý cao
            quý để tìm về an lạc nội tâm.
          </p>
        </div>
      </section>

      {/* Featured sutra section */}
      <SutraOverview {...sampleSutras[0]} />

      {/* Latest sutras section */}
      <SutraList title="Kinh điển nổi bật" sutras={sampleSutras.slice(1)} />
    </div>
  );
};

export default Home;
