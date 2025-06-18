import SutraForm from "@/components/admin/common/sutra-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <>
      <Button asChild>
        <Link href="/admin/books">Go Back</Link>
      </Button>

      <section className="w-full max-w-2xl">
        <SutraForm />
      </section>
    </>
  );
};

export default Page;
