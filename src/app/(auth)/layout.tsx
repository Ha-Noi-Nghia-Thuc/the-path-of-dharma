import { MoveLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex min-h-screen flex-col-reverse sm:flex-row text-foreground bg-background">
      {/* Form Section */}
      <section className="flex flex-1 items-center justify-center px-6 py-12 sm:px-12">
        <div className="w-full max-w-md sm:max-w-xl rounded-xl bg-white/5 backdrop-blur-md p-8 sm:p-10 shadow-xl border border-white/10">
          {/* Back to home button */}
          <Link
            href="/"
            className="inline-flex items-center text-primary hover:text-accent transition-colors duration-200"
            aria-label="Quay về trang chủ"
          >
            <MoveLeftIcon
              height={30}
              width={30}
              className="transition-colors"
            />
          </Link>

          {/* Form content */}
          <div className="mt-6">{children}</div>
        </div>
      </section>

      {/* Illustration Section */}
      <section className="relative h-48 w-full sm:h-screen sm:flex-1">
        <Image
          src="/auth-illustration.jpg"
          alt="Hình minh họa về tu tập và trí tuệ Phật giáo"
          fill
          className="object-cover"
          priority
          quality={90}
          sizes="(max-width: 640px) 100vw, 50vw"
        />

        {/* Overlay for better contrast */}
        <div className="absolute inset-0 bg-black/30 sm:bg-black/20" />
      </section>
    </main>
  );
};

export default Layout;
