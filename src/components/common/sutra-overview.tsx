import { Button } from "@/components/ui/button";
import { BookOpenIcon, EyeIcon } from "lucide-react";
import SutraCover from "./sutra-cover";

interface Sutra {
  title: string;
  author: string;
  scripture: string;
  description: string;
  totalView?: number;
  coverColor: string;
  coverUrl: string;
  pdfUrl?: string;
  linkUrl?: string;
  tags?: string[];
}

const SutraOverview = ({
  title,
  author,
  scripture,
  description,
  totalView,
  coverColor,
  coverUrl,
  pdfUrl,
  linkUrl,
  tags,
}: Sutra) => {
  const readingUrl = pdfUrl || linkUrl || "#";

  return (
    <section className="max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
        {/* Book Cover Section */}
        <div className="flex-shrink-0 mx-auto lg:mx-0">
          <div className="relative group">
            <SutraCover
              variant="wide"
              className="shadow-lg"
              coverColor={coverColor}
              coverUrl={coverUrl}
              alt={`Bìa kinh ${title}`}
              priority={true}
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 space-y-6 text-center lg:text-left">
          {/* Title */}
          <div className="space-y-2">
            <h1 className="font-heading font-semibold text-2xl sm:text-3xl leading-tight text-foreground">
              {title}
            </h1>
            <p className="text-sm text-muted-foreground">
              Tác giả: <span className="font-medium">{author}</span>
            </p>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-accent rounded-full">
              <span className="text-accent-foreground">
                Thể loại: {scripture}
              </span>
            </span>

            {totalView && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-accent rounded-full">
                <EyeIcon size={12} className="text-accent-foreground" />
                <span className="text-accent-foreground">
                  {totalView.toLocaleString()} lượt xem
                </span>
              </span>
            )}
          </div>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 bg-muted text-muted-foreground rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          <p className="text-sm leading-relaxed text-muted-foreground max-w-2xl">
            {description}
          </p>

          {/* Action Button */}
          <div className="pt-2">
            <Button
              size="sm"
              asChild
              className="inline-flex items-center gap-2"
            >
              <a href={readingUrl} target="_blank" rel="noopener noreferrer">
                <BookOpenIcon size={16} />
                <span className="text-sm">Đọc kinh điển</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SutraOverview;
