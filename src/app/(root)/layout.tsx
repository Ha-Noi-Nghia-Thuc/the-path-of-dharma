import { auth } from "@/auth";
import Header from "@/components/layout/header";
import { db } from "@/database/drizzle";
import { users } from "@/database/schemas";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

/**
 * Root layout for authenticated pages
 * Handles authentication check and user activity tracking
 */
const RootLayout = async ({ children }: RootLayoutProps) => {
  const session = await auth();

  // Redirect to sign-in if not authenticated
  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  // Update user's last activity date
  try {
    const currentDate = new Date().toISOString().slice(0, 10);

    // Get user's last activity date
    const [user] = await db
      .select({ lastActivityDate: users.lastActivityDate }) // Fixed typo
      .from(users)
      .where(eq(users.id, session.user.id))
      .limit(1);

    // Update if it's a new day
    if (user?.lastActivityDate !== currentDate) {
      await db
        .update(users)
        .set({ lastActivityDate: currentDate })
        .where(eq(users.id, session.user.id));
    }
  } catch (error) {
    console.error("Failed to update user activity:", error);
    // Don't block the user experience for this non-critical operation
  }

  return (
    <main className="flex min-h-screen flex-1 flex-col px-5 xs:px-10 md:px-16">
      <div className="mx-auto max-w-7xl w-full">
        <Header session={session} />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default RootLayout;
