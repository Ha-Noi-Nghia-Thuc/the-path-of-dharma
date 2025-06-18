import { MoveLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex min-h-screen flex-col-reverse sm:flex-row text-foreground bg-background">
      {/* Form Section */}
      <section className="flex flex-1 items-center justify-center px-6 py-12 sm:px-12">
        <div className="w-full max-w-md rounded-lg bg-card p-8 shadow-sm border border-border">
          {/* Form content */}
          <div>{children}</div>
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
        <div className="absolute inset-0 bg-black/20" />

        {/* Quote overlay */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="text-center text-white max-w-md">
            <blockquote className="text-sm font-medium leading-relaxed">
              "Hãy tự mình là ngọn đèn cho chính mình, hãy tự mình nương tựa
              chính mình."
            </blockquote>
            <cite className="text-xs mt-2 block opacity-80">— Đức Phật</cite>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Layout;
