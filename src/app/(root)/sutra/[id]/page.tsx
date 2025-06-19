import { auth } from "@/auth";
import SutraOverview from "@/components/common/sutra-overview";
import { db } from "@/database/drizzle";
import { sutras } from "@/database/schemas";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import Link from "next/link";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const session = await auth();

  const [bookDetails] = await db
    .select()
    .from(sutras)
    .where(eq(sutras.id, id))
    .limit(1);

  if (!bookDetails) redirect("/404");

  return (
    <div className="space-y-16">
      {/* Header Section */}
      <section className="py-12 border-b border-border text-center">
        <div className="max-w-4xl mx-auto space-y-3 px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-muted-foreground mb-2 text-left sm:text-center">
            <Link href="/" className="hover:underline">
              Trang chủ
            </Link>{" "}
            &rarr; <span className="text-foreground">{bookDetails.title}</span>
          </nav>

          <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground">
            {bookDetails.title}
          </h1>

          {bookDetails.author && (
            <p className="text-sm text-muted-foreground">
              {bookDetails.author}
            </p>
          )}
        </div>
      </section>

      {/* Sutra Overview */}
      <section className="px-4 sm:px-6 lg:px-8">
        <SutraOverview {...bookDetails} userId={session?.user?.id as string} />
      </section>

      {/* Summary Section */}
      <section className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">
            Tóm tắt nội dung
          </h2>

          <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
            {bookDetails.summary?.split("\n").map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Related Sutras (Placeholder) */}
      <section className="mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Các Kinh liên quan
        </h2>
        {/* TODO: Add <SutraList sutras={relatedSutras} /> */}
        <p className="text-muted-foreground text-sm">
          Tính năng đang được phát triển.
        </p>
      </section>
    </div>
  );
};

export default Page;
