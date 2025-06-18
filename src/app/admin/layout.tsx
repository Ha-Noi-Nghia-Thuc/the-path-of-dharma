import { auth } from "@/auth";
import Header from "@/components/admin/header";
import Sidebar from "@/components/admin/sidebar";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

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
    <main className="flex">
      <Sidebar session={session} />

      <div className="flex min-h-screen w-full pl-14 lg:pl-0">
        <div className="flex w-full lg:w-[calc(100%-256px)] flex-1 flex-col">
          <div className="p-4 lg:p-8 pt-16 lg:pt-8">
            <Header session={session} />
            <div className="mt-6">{children}</div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Layout;
