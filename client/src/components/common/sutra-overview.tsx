import { BookIcon, StarIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import SutraCover from "./sutra-cover";

const SutraOverview = ({
  title,
  author,
  rating,
  description,
  color,
  cover,
  video,
  summary,
}: Sutra) => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col-reverse items-center gap-12 sm:gap-16 xl:flex-row xl:gap-20">
        {/* Content Section */}
        <div className="flex-1 space-y-6">
          {/* Title */}
          <h1 className="font-heading text-4xl md:text-5xl xl:text-6xl leading-tight text-gray-900 dark:text-gray-100">
            {title}
          </h1>

          {/* Author and Rating */}
          <div className="flex flex-wrap items-center gap-4 text-lg">
            <p className="font-semibold text-gray-700 dark:text-gray-300">
              Tác giả{" "}
              <span className="font-heading text-primary">{author}</span>
            </p>

            <div className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1.5 rounded-full">
              <StarIcon size={16} className="text-yellow-500 fill-current" />
              <span className="font-semibold text-yellow-700 dark:text-yellow-300">
                {rating}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-lg leading-relaxed text-gray-500 dark:text-gray-300 max-w-2xl">
            {description}
          </p>

          {/* Action Button */}
          <Button
            size="lg"
            className="w-full sm:w-auto sm:min-w-48 bg-primary hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <BookIcon size={20} className="mr-2" />
            <span className="font-heading text-lg">Đọc Ngay</span>
          </Button>
        </div>

        {/* Book Cover Section */}
        <div className="flex-1 flex justify-center xl:justify-end">
          <div className="relative group">
            {/* Background decorative covers */}
            <div className="absolute -right-3 -top-2 rotate-6 opacity-25 transition-all duration-300 group-hover:opacity-15 group-hover:rotate-[8deg] hidden sm:block">
              <SutraCover
                variant="wide"
                coverColor={color}
                coverImage={cover}
                alt={`${title} background cover 1`}
              />
            </div>

            <div className="absolute -right-6 -top-4 rotate-12 opacity-15 transition-all duration-300 group-hover:opacity-10 group-hover:rotate-[15deg] hidden md:block">
              <SutraCover
                variant="wide"
                coverColor={color}
                coverImage={cover}
                alt={`${title} background cover 2`}
              />
            </div>

            {/* Main cover */}
            <div className="relative z-10 transition-transform duration-300 group-hover:scale-105">
              <SutraCover
                variant="wide"
                className="shadow-2xl"
                coverColor={color}
                coverImage={cover}
                alt={`${title} cover`}
                priority={true}
              />
            </div>

            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SutraOverview;
