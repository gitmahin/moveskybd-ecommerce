"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";

export const ZoomImage = ({ src, alt }: { src: string; alt: string }) => {
  const [zoomed, setZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [panelPos, setPanelPos] = useState({ top: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });

    // position panel to the right of the image
    setPanelPos({
      top: rect.top + window.scrollY,
      left: rect.right + window.scrollX + 10,
    });
  };

  return (
    <>
      <div
        ref={containerRef}
        className="w-full h-full overflow-hidden cursor-crosshair relative"
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={src}
          alt={alt}
          width={600}
          height={600}
          className="w-full h-full object-cover object-center"
        />
        {/* Lens */}
        {zoomed && (
          <div
            className="absolute border-2 border-white/60 bg-white/10 pointer-events-none w-[80px] h-[80px]"
            style={{
              left: `calc(${position.x}% - 40px)`,
              top: `calc(${position.y}% - 40px)`,
            }}
          />
        )}
      </div>

      {/* Portal — renders outside any overflow:hidden parent */}
      {zoomed &&
        createPortal(
          <div
            className="pointer-events-none fixed z-[99999] w-[400px] h-[400px] border border-border-color_1 rounded-lg overflow-hidden bg-white shadow-2xl"
            style={{
              top: panelPos.top,
              left: panelPos.left,
              backgroundImage: `url(${src})`,
              backgroundSize: "300%",
              backgroundPosition: `${position.x}% ${position.y}%`,
              backgroundRepeat: "no-repeat",
            }}
          />,
          document.body
        )}
    </>
  );
};
