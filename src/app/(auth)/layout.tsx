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
      <section className="relative h-48 w-full sm:h-screen sm:flex-1 overflow-hidden">
        <Image
          src="/auth-illustration.jpg"
          alt="Hình minh họa về tu tập và trí tuệ Phật giáo"
          fill
          className="object-cover"
          priority
          quality={90}
          sizes="(max-width: 640px) 100vw, 50vw"
        />

        {/* Enhanced overlay with multiple gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/30" />

        {/* Ambient light effects */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-16 w-24 h-24 bg-orange-200/15 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute top-1/3 right-10 w-20 h-20 bg-white/10 rounded-full blur-2xl animate-pulse delay-500" />

        {/* Quote overlay */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="relative text-center max-w-lg">
            {/* Multiple background layers for enhanced glow */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 rounded-2xl" />

            {/* Enhanced glow effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/15 to-white/5 rounded-2xl blur-xl -z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-yellow-200/10 via-transparent to-orange-200/10 rounded-2xl blur-2xl -z-20" />

            {/* Quote content */}
            <div className="relative z-10 px-8 py-5">
              {/* Lotus symbol above quote */}
              <div className="mb-4 flex justify-center">
                <div className="relative">
                  <div className="w-8 h-8 text-white/60 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        d="M12 2C12 2 8 6 8 12C8 16 10 18 12 18C14 18 16 16 16 12C16 6 12 2 12 2Z"
                        opacity="0.8"
                      />
                      <path
                        d="M12 18C12 18 6 16 6 12C6 8 8 6 12 6C16 6 18 8 18 12C18 16 12 18 12 18Z"
                        opacity="0.6"
                      />
                      <path
                        d="M12 6C12 6 16 8 16 12C16 16 14 18 12 18C10 18 8 16 8 12C8 8 12 6 12 6Z"
                        opacity="0.4"
                      />
                    </svg>
                  </div>
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-sm animate-pulse" />
                </div>
              </div>

              {/* Main quote with enhanced styling */}
              <blockquote className="relative mb-6 tracking-wide drop-shadow-lg">
                <span className="relative font-heading text-xl sm:text-2xl font-medium leading-relaxed text-white ">
                  Chư pháp tùng tâm sinh,
                  <br />
                  tâm vi bản, tâm năng tạo
                  {/* Text glow effect */}
                  <span className="font-heading text-xl sm:text-2xl font-medium leading-relaxed text-white  absolute inset-0 text-white/30 blur-sm">
                    Chư pháp tùng tâm sinh,
                    <br />
                    tâm vi bản, tâm năng tạo
                  </span>
                </span>
              </blockquote>

              {/* Enhanced decorative line */}
              <div className="relative mb-4 flex justify-center">
                <div className="w-20 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                <div className="absolute inset-0 w-20 h-px bg-gradient-to-r from-transparent via-yellow-200/40 to-transparent blur-sm" />
              </div>

              {/* Citation with glow */}
              <cite className="text-white/90 text-sm font-medium not-italic tracking-wider drop-shadow-md">
                — Đức Phật —
              </cite>

              {/* Lotus symbol below citation */}
              <div className="mt-4 flex justify-center">
                <div className="w-4 h-4 text-white/40">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-full h-full"
                  >
                    <circle cx="12" cy="12" r="2" opacity="0.8" />
                    <path
                      d="M12 8C10 8 8 10 8 12C8 14 10 16 12 16C14 16 16 14 16 12C16 10 14 8 12 8Z"
                      opacity="0.4"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced floating lotus petals and light particles */}
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-white/25 rounded-full animate-pulse">
          <div className="absolute inset-0 bg-yellow-200/20 rounded-full blur-sm animate-pulse delay-300" />
        </div>
        <div className="absolute top-3/4 right-1/3 w-2 h-2 bg-white/30 rounded-full animate-pulse delay-1000">
          <div className="absolute inset-0 bg-orange-200/25 rounded-full blur-sm animate-pulse delay-1300" />
        </div>
        <div className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 bg-white/25 rounded-full animate-pulse delay-500">
          <div className="absolute inset-0 bg-white/15 rounded-full blur-sm animate-pulse delay-800" />
        </div>

        {/* Additional floating elements */}
        <div className="absolute top-1/6 right-1/4 w-1.5 h-1.5 bg-yellow-200/30 rounded-full animate-pulse delay-2000" />
        <div className="absolute bottom-1/3 left-1/6 w-1 h-1 bg-white/35 rounded-full animate-pulse delay-1500" />
        <div className="absolute top-2/3 left-1/2 w-2 h-2 bg-orange-200/20 rounded-full animate-pulse delay-700" />
        <div className="absolute top-1/2 right-1/6 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse delay-1200" />

        {/* Subtle light rays */}
        <div className="absolute top-0 left-1/2 w-px h-20 bg-gradient-to-b from-white/20 to-transparent transform -translate-x-1/2 animate-pulse delay-500" />
        <div className="absolute bottom-0 right-1/3 w-px h-16 bg-gradient-to-t from-white/15 to-transparent animate-pulse delay-1000" />

        {/* Mystical orbs */}
        <div className="absolute top-1/5 left-1/5 w-6 h-6 bg-gradient-radial from-white/20 to-transparent rounded-full animate-pulse delay-300 blur-sm" />
        <div className="absolute bottom-1/5 right-1/5 w-4 h-4 bg-gradient-radial from-yellow-200/25 to-transparent rounded-full animate-pulse delay-1500 blur-sm" />
      </section>
    </main>
  );
};

export default Layout;
