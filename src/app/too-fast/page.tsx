import React from "react";

const Page = () => {
  return (
    <main className="flex min-h-screen flex-1 flex-col px-5 xs:px-10 md:px-16 items-center justify-center">
      <h1 className="font-heading text-5xl text-primary font-semibold">
        Whoa, Slow Down There, Speedy!
      </h1>
      <p className="mt-3 max-w-xl text-center">
        Looks like you&apos;ve been little too eager. We&apos;ve put a temporary
        pause on your excitement. Chill for a bit, and try again shortly
      </p>
    </main>
  );
};

export default Page;
