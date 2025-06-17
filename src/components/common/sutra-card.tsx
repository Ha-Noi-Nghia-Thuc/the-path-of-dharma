import Link from "next/link";
import React from "react";
import SutraCover from "./sutra-cover";

const SutraCard = ({ id, title, color, cover }: Sutra) => {
  return (
    <li className="w-[150px] xs:w-[180px]">
      <Link href={`/sutra/${id}`} className="block text-center">
        <SutraCover coverColor={color} coverImage={cover} />

        <p className="mt-3 text-sm xs:text-base font-semibold leading-snug line-clamp-2">
          {title}
        </p>
      </Link>
    </li>
  );
};

export default SutraCard;
