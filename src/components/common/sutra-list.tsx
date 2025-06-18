import SutraCard from "./sutra-card";

interface Sutra {
  id: string;
  title: string;
  description: string;
  // Add other properties as needed
}

interface SutraListProps {
  title: string;
  sutras: Sutra[];
  containerClassName?: string;
}

const SutraList = ({ title, sutras, containerClassName }: SutraListProps) => {
  return (
    <section className={containerClassName}>
      <div className="mb-8">
        <h2 className="font-heading text-xl font-semibold text-foreground mb-2">
          {title}
        </h2>
        <div className="w-12 h-px bg-border"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {sutras.map((sutra) => (
          <SutraCard key={sutra.id} {...sutra} />
        ))}
      </div>
    </section>
  );
};

export default SutraList;
