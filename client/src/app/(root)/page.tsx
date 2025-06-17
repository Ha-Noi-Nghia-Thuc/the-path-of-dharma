import SutraList from "@/components/common/sutra-list";
import SutraOverview from "@/components/common/sutra-overview";
import { sampleSutras } from "@/constants";

const Home = () => {
  return (
    <>
      <SutraOverview {...sampleSutras[0]} />

      <SutraList
        title="Latest Sutras"
        sutras={sampleSutras}
        containerClassName="mt-28"
      />
    </>
  );
};

export default Home;
