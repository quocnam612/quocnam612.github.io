"use client";

import Image from "next/image";
import { useState } from "react";

export type ProjectAlbumImage = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

type ProjectAlbumProps = {
  images: readonly ProjectAlbumImage[];
};

export function ProjectAlbum({ images }: ProjectAlbumProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];
  const lastIndex = images.length - 1;

  if (!activeImage) {
    return null;
  }

  function showPrevious() {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? lastIndex : currentIndex - 1,
    );
  }

  function showNext() {
    setActiveIndex((currentIndex) =>
      currentIndex === lastIndex ? 0 : currentIndex + 1,
    );
  }

  return (
    <section className="steam-album" aria-label="Project screenshots">
      <figure className="steam-album-preview">
        <button
          aria-label="Show previous screenshot"
          className="album-arrow album-arrow-left"
          onClick={showPrevious}
          type="button"
        >
          &lt;
        </button>
        <Image
          key={activeImage.src}
          src={activeImage.src}
          alt={activeImage.alt}
          width={activeImage.width}
          height={activeImage.height}
          priority={activeIndex === 0}
        />
        <button
          aria-label="Show next screenshot"
          className="album-arrow album-arrow-right"
          onClick={showNext}
          type="button"
        >
          &gt;
        </button>
        <figcaption>
          <span>
            {activeIndex + 1}/{images.length}
          </span>
        </figcaption>
      </figure>
    </section>
  );
}
