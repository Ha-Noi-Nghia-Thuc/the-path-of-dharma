import React, { ReactNode } from "react";
import Header from "@/components/layout/header";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex min-h-screen flex-1 flex-col px-5 xs:px-10 md:px-16">
      <div className="mx-auto max-w-7xl">
        <Header />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
