"use client";

import { type ReactNode } from "react";
import { SiteFooter } from "./site-footer";
import { SiteNav } from "./site-nav";
import { useCameraMotion } from "./use-camera-motion";

type CameraShellProps = {
  children: ReactNode;
  className?: string;
};

export function CameraShell({ children, className = "" }: CameraShellProps) {
  const {
    handlePointerLeave,
    handlePointerMove,
    pauseCameraForScroll,
    shellRef,
  } = useCameraMotion();

  return (
    <main
      className={`site-shell scanlines-on ${className}`.trim()}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onTouchMove={pauseCameraForScroll}
      onWheel={pauseCameraForScroll}
      ref={shellRef}
    >
      <div className="ambient-grid" aria-hidden="true" />
      <div className="noise-field" aria-hidden="true" />
      <div className="camera-view">
        <SiteNav />
        {children}
        <SiteFooter />
      </div>
    </main>
  );
}
