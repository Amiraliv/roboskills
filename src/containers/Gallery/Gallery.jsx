"use client";

import { useEffect, useState } from "react";
import { LayoutData, AnimatedText, MasonryImages } from "../../components";

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/gallery");
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);
  return (
    <section id="gallery">
      <LayoutData>
        <div className="indexGalleryData">
          <h2>
            <AnimatedText text={"گالری فیلم و تصاویر"} />
          </h2>
        </div>

        <MasonryImages images={images} />
      </LayoutData>
    </section>
  );
};

export default Gallery;
