"use client";

import {
  type PointerEvent,
  useCallback,
  useEffect,
  useRef,
} from "react";

type PointerSnapshot = {
  clientX: number;
  clientY: number;
};

let lastPointer: PointerSnapshot | null = null;

function softenSignedCameraAxis(value: number, strength = 1) {
  return value * value * value * strength;
}

function softenOffsetCameraAxis(value: number, strength = 1) {
  return Math.sign(value) * Math.abs(value) ** 1.65 * strength;
}

function getCameraFromPointer({ clientX, clientY }: PointerSnapshot) {
  return {
    x: softenSignedCameraAxis((clientX / window.innerWidth - 0.5) * 2, 1.75),
    y: softenOffsetCameraAxis(clientY / window.innerHeight - 0.12, 1.15),
  };
}

export function useCameraMotion() {
  const shellRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const scrollTimerRef = useRef<number | null>(null);
  const scrollPausedRef = useRef(false);
  const latestCamera = useRef({ x: 0, y: 0 });
  const currentCamera = useRef({ x: 0, y: 0 });

  const applyCamera = useCallback(function applyCamera() {
    const shell = shellRef.current;

    if (!shell) {
      frameRef.current = null;
      return;
    }

    const nextX =
      currentCamera.current.x +
      (latestCamera.current.x - currentCamera.current.x) * 0.14;
    const nextY =
      currentCamera.current.y +
      (latestCamera.current.y - currentCamera.current.y) * 0.14;
    const settled =
      Math.abs(nextX - latestCamera.current.x) < 0.002 &&
      Math.abs(nextY - latestCamera.current.y) < 0.002;

    currentCamera.current = { x: nextX, y: nextY };

    shell.style.setProperty("--camera-x", currentCamera.current.x.toFixed(5));
    shell.style.setProperty("--camera-y", currentCamera.current.y.toFixed(5));

    frameRef.current = settled ? null : requestAnimationFrame(applyCamera);
  }, []);

  const scheduleCamera = useCallback(
    (x: number, y: number) => {
      latestCamera.current = { x, y };

      if (frameRef.current === null) {
        frameRef.current = requestAnimationFrame(applyCamera);
      }
    },
    [applyCamera],
  );

  const pauseCameraForScroll = useCallback(() => {
    scrollPausedRef.current = true;

    if (scrollTimerRef.current !== null) {
      window.clearTimeout(scrollTimerRef.current);
    }

    scrollTimerRef.current = window.setTimeout(() => {
      scrollPausedRef.current = false;
      scrollTimerRef.current = null;

      if (lastPointer) {
        const camera = getCameraFromPointer(lastPointer);
        scheduleCamera(camera.x, camera.y);
      }
    }, 220);
  }, [scheduleCamera]);

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      lastPointer = {
        clientX: event.clientX,
        clientY: event.clientY,
      };

      if (scrollPausedRef.current) {
        return;
      }

      const camera = getCameraFromPointer(lastPointer);
      scheduleCamera(camera.x, camera.y);
    },
    [scheduleCamera],
  );

  const handlePointerLeave = useCallback(() => {
    scheduleCamera(0, 0);
  }, [scheduleCamera]);

  useEffect(() => {
    const shell = shellRef.current;

    shell?.style.setProperty("--camera-x", "0");
    shell?.style.setProperty("--camera-y", "0");

    if (lastPointer) {
      const camera = getCameraFromPointer(lastPointer);
      scheduleCamera(camera.x, camera.y);
    }

    const handlePageShow = () => {
      if (lastPointer) {
        const camera = getCameraFromPointer(lastPointer);
        scheduleCamera(camera.x, camera.y);
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }

      if (scrollTimerRef.current !== null) {
        window.clearTimeout(scrollTimerRef.current);
        scrollTimerRef.current = null;
      }

      scrollPausedRef.current = false;
    };
  }, [scheduleCamera]);

  return {
    handlePointerLeave,
    handlePointerMove,
    pauseCameraForScroll,
    shellRef,
  };
}
