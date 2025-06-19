"use client";

import config from "@/lib/config";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import SutraCoverSvg from "./sutra-cover-svg";

type SutraCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

const variantStyles: Record<SutraCoverVariant, string> = {
  extraSmall: "w-[29px] h-10",
  small: "w-[55px] h-[76px]",
  medium: "w-[144px] h-[199px]",
  regular: "w-[114px] h-[169px] xs:w-[174px] xs:h-[239px]",
  wide: "w-[256px] h-[354px] xs:w-[296px] xs:h-[404px] sm:w-[320px] sm:h-[440px]",
};

interface SutraCoverProps {
  variant?: SutraCoverVariant;
  className?: string;
  coverColor: string;
  coverUrl: string;
  alt?: string;
  priority?: boolean;
}

/**
 * Sutra cover component with 3D book effect
 * Displays book cover with SVG background and image overlay
 */
const SutraCover = ({
  variant = "regular",
  className,
  coverColor = "#C9A66B",
  coverUrl,
  alt = "Bìa kinh điển",
  priority = false,
}: SutraCoverProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={cn(
        "relative transition-all duration-300 group cursor-pointer",
        "hover:scale-[1.02] hover:shadow-xl",
        "focus-within:scale-[1.02] focus-within:shadow-xl focus-within:outline-none focus-within:ring-2 focus-within:ring-primary/50",
        variantStyles[variant],
        className
      )}
      role="img"
      aria-label={alt}
    >
      {/* Book spine/background SVG */}
      <div className="relative w-full h-full">
        <SutraCoverSvg coverColor={coverColor} />

        {/* Hover shine effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm pointer-events-none" />
      </div>

      {/* Cover image container */}
      <div
        className="absolute z-10 overflow-hidden rounded-sm shadow-inner"
        style={{
          left: "12.5%",
          top: "2%",
          width: "78%",
          height: "83%",
        }}
      >
        {/* Loading state */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/80 animate-pulse flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        )}

        {/* Error state */}
        {imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/80 flex items-center justify-center">
            <div className="text-center p-2">
              <svg
                className="w-6 h-6 mx-auto mb-1 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-xs text-muted-foreground">Không có ảnh</p>
            </div>
          </div>
        )}

        {/* Main cover image */}
        <Image
          src={
            coverUrl?.startsWith("/")
              ? `${config.env.imagekit.urlEndpoint}${coverUrl}`
              : coverUrl || "/placeholder.svg"
          }
          alt={alt}
          fill
          priority={priority}
          className={cn(
            "object-cover transition-all duration-300",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          sizes={
            variant === "wide"
              ? "(max-width: 640px) 256px, (max-width: 768px) 296px, 320px"
              : variant === "regular"
              ? "(max-width: 640px) 114px, 174px"
              : variant === "medium"
              ? "144px"
              : variant === "small"
              ? "55px"
              : "29px"
          }
        />
      </div>

      {/* Book pages effect */}
      <div
        className="absolute z-5 bg-background shadow-sm"
        style={{
          right: "7%",
          top: "6%",
          width: "3px",
          height: "86%",
          borderRadius: "0 2px 2px 0",
          boxShadow: "inset -1px 0 2px rgba(0,0,0,0.1)",
        }}
      />

      <div
        className="absolute z-4 bg-muted shadow-sm"
        style={{
          right: "5%",
          top: "7%",
          width: "2px",
          height: "84%",
          borderRadius: "0 1px 1px 0",
          boxShadow: "inset -1px 0 1px rgba(0,0,0,0.05)",
        }}
      />
    </div>
  );
};

export default SutraCover;
