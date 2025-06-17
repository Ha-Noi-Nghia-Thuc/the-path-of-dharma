import SutraList from "@/components/common/sutra-list";
import SutraOverview from "@/components/common/sutra-overview";
import { sampleSutras } from "@/constants";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";

const Home = async () => {
  const result = await db.select().from(users);
  console.log(JSON.stringify(result, null, 2));

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
