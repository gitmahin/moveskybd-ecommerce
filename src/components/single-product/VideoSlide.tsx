"use client";
import { useEffect, useRef } from "react";

export const VideoSlide = ({
  src,
  isActive,
}: {
  src: string;
  isActive: boolean;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isActive) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
  }, [isActive]);

  return (
    <video
      ref={videoRef}
      controls
      preload="none"
      className="w-full h-full object-cover"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};
