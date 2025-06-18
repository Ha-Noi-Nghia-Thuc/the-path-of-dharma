import Link from "next/link";
import React from "react";
import SutraCover from "./sutra-cover";

interface SutraCardProps {
  id: string | number;
  title: string;
  coverColor: string;
  coverUrl: string;
}

const SutraCard = ({ id, title, coverColor, coverUrl }: SutraCardProps) => {
  return (
    <article className="group">
      <Link
        href={`/sutra/${id}`}
        className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
      >
        {/* Cover image */}
        <div className="mb-3">
          <SutraCover
            coverColor={coverColor}
            coverUrl={coverUrl}
            alt={`Bìa kinh ${title}`}
            className="transition-transform duration-200 group-hover:scale-105"
          />
        </div>

        {/* Title and author */}
        <div className="space-y-1">
          <h3 className="text-sm xs:text-base font-semibold leading-snug line-clamp-2 text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
        </div>
      </Link>
    </article>
  );
};

export default SutraCard;
