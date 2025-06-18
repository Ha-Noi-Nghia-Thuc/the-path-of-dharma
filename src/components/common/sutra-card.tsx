import Link from "next/link";
import SutraCover from "./sutra-cover";

interface SutraCardProps {
  id: string | number;
  title: string;
  coverColor: string;
  coverUrl: string;
  author?: string;
}

const SutraCard = ({
  id,
  title,
  coverColor,
  coverUrl,
  author,
}: SutraCardProps) => {
  return (
    <article className="group">
      <Link
        href={`/sutra/${id}`}
        className="block focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg"
      >
        {/* Cover image */}
        <div className="mb-3">
          <SutraCover
            coverColor={coverColor}
            coverUrl={coverUrl}
            alt={`Bìa kinh ${title}`}
            className="transition-transform duration-200 group-hover:scale-[1.02]"
          />
        </div>

        {/* Title and author */}
        <div className="space-y-1">
          <h3 className="text-sm font-medium leading-snug line-clamp-2 text-foreground group-hover:text-muted-foreground transition-colors">
            {title}
          </h3>
          {author && (
            <p className="text-xs text-muted-foreground line-clamp-1">
              {author}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
};

export default SutraCard;
