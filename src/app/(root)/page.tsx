import SutraList from "@/components/common/sutra-list";
import SutraOverview from "@/components/common/sutra-overview";
import { sampleSutras } from "@/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trang chủ - Chánh Đạo",
  description: "Khám phá kho tàng kinh điển Phật giáo",
};

const Home = async () => {
  // TODO: Replace with actual data fetching
  // const featuredSutra = await getFeaturedSutra();
  // const latestSutras = await getLatestSutras();

  return (
    <div className="space-y-28">
      {/* Featured sutra section */}
      <SutraOverview {...sampleSutras[0]} />

      {/* Latest sutras section */}
      <SutraList title="Kinh điển mới nhất" sutras={sampleSutras} />
    </div>
  );
};

export default Home;
