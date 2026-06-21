"use client";

import { useState } from "react";

export type ProjectVideo = {
  label: string;
  poster: string;
  src: string;
};

type ProjectVideoFrameProps = {
  videos: readonly ProjectVideo[];
};

export function ProjectVideoFrame({ videos }: ProjectVideoFrameProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeVideo = videos[activeIndex];
  const lastIndex = videos.length - 1;

  if (!activeVideo) {
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
    <section className="steam-album project-video-album" aria-label="Project footage">
      <div className="case-panel-heading project-video-heading">
        <span>Project / Footage / Videos</span>
      </div>
      <figure className="steam-album-preview">
        <button
          aria-label="Show previous video"
          className="album-arrow album-arrow-left"
          onClick={showPrevious}
          type="button"
        >
          &lt;
        </button>
        <video
          aria-label={activeVideo.label}
          autoPlay
          className="case-video"
          key={activeVideo.src}
          loop
          muted
          playsInline
          poster={activeVideo.poster}
          preload="auto"
          src={activeVideo.src}
        />
        <button
          aria-label="Show next video"
          className="album-arrow album-arrow-right"
          onClick={showNext}
          type="button"
        >
          &gt;
        </button>
        <figcaption>
          <span>
            {activeIndex + 1}/{videos.length}
          </span>
        </figcaption>
      </figure>
    </section>
  );
}
