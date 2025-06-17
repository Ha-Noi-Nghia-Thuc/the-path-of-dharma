import { MoveLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex min-h-screen flex-col-reverse sm:flex-row text-light-100 bg-background">
      {/* Left: Form Section */}
      <section className="flex flex-1 items-center justify-center px-6 py-12 sm:px-12">
        <div className="w-full max-w-md sm:max-w-xl rounded-xl bg-white/5 backdrop-blur-md p-8 sm:p-10 shadow-xl border border-white/10 gradient-vertical">
          {/* Logo */}
          <Link href="/">
            <MoveLeftIcon
              height={30}
              width={30}
              className="text-primary hover:text-accent transition-colors"
            />
          </Link>

          {/* Content */}
          <div className="mt-6">{children}</div>
        </div>
      </section>

      {/* Right: Illustration */}
      <section className="relative h-48 w-full sm:h-screen sm:flex-1">
        <Image
          src="/auth-illustration.jpg"
          alt="Minh họa về tu tập và trí tuệ"
          fill
          className="object-cover"
          priority
          quality={90}
        />

        {/* Optional overlay for better contrast */}
        <div className="absolute inset-0 bg-black/30 sm:bg-black/20" />
      </section>
    </main>
  );
};

export default Layout;
