import { auth } from "@/auth";
import Header from "@/components/admin/header";
import Sidebar from "@/components/admin/sidebar";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  // check authentication and admin role
  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  // TODO: Add role-based access control
  // if (session.user.role !== 'ADMIN') {
  //   redirect('/unauthorized');
  // }

  return (
    <main className="flex min-h-screen w-full">
      <Sidebar session={session} />

      <div className="flex w-[calc(100%-264px)] flex-1 flex-col p-5 xs:p-10">
        <Header session={session} />
        <div className="mt-6">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
