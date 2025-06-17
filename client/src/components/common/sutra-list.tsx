import React from "react";
import SutraCard from "./sutra-card";

interface SutraListProps {
  title: string;
  sutras: Sutra[];
  containerClassName?: string;
}

const SutraList = ({ title, sutras, containerClassName }: SutraListProps) => {
  return (
    <section className={containerClassName}>
      <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-6">
        {title}
      </h2>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
        {sutras.map((sutra) => (
          <SutraCard key={sutra.id} {...sutra} />
        ))}
      </ul>
    </section>
  );
};

export default SutraList;
