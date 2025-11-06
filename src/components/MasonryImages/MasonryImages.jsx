"use client";

import "./MasonryImages.scss";
import Masonry from "react-masonry-css";
import { LeaguesCard } from "../.";
import Image from "next/image";

export default function MasonryImages({ images }) {
  const breakpoints = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpoints}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {images.map((src, i) => (
        <div key={i} className="overflow-hidden rounded-xl mb-4">
          <Image
            src={src}
            alt={`photo-${i}`}
            width={500}
            height={500}
            className="w-full h-auto transition-transform duration-500 hover:scale-105"
          />
        </div>
      ))}
    </Masonry>
  );
}
