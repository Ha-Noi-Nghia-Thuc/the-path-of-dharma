import { signOut } from "@/auth";
import SutraList from "@/components/common/sutra-list";
import { Button } from "@/components/ui/button";
import { sampleSutras } from "@/constants";
import React from "react";

const Page = () => {
  return (
    <>
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
        className="mb-10"
      >
        <Button>Logout</Button>
      </form>

      <SutraList title="Saved Sutras" sutras={sampleSutras} />
    </>
  );
};

export default Page;
