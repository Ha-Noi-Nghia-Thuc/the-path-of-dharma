import { auth } from "@/auth";
import Header from "@/components/layout/header";
import { db } from "@/database/drizzle";
import { users } from "@/database/schemas";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  // redirect to sign-in if not authenticated
  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  // update user's last activity date
  try {
    const currentDate = new Date().toISOString().slice(0, 10);

    // get user's last activity date
    const [user] = await db
      .select({ lastActivityDate: users.lastActivityDate })
      .from(users)
      .where(eq(users.id, session.user.id))
      .limit(1);

    // update if it's a new day
    if (user?.lastActivityDate !== currentDate) {
      await db
        .update(users)
        .set({ lastActivityDate: currentDate })
        .where(eq(users.id, session.user.id));
    }
  } catch (error) {
    console.error("Failed to update user activity:", error);
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

export default Layout;
